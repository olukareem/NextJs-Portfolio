import { getVectorStore } from "@/lib/astradb";
import { UpstashRedisCache } from "@/lib/cache";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
  PromptTemplate,
} from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { Redis } from "@upstash/redis";
import {
  LangChainStream,
  StreamingTextResponse,
  Message as VercelChatMessage,
} from "ai";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { createRetrievalChain } from "langchain/chains/retrieval";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body.messages;

    const chatHistory = messages
      .slice(0, -1)
      .map((m: VercelChatMessage) =>
        m.role === "user"
          ? new HumanMessage(m.content)
          : new AIMessage(m.content)
      );

    const currentMessageContent = messages[messages.length - 1].content;

    // Initialize Redis with error handling
    let redisClient;
    try {
      redisClient = Redis.fromEnv();
    } catch (error) {
      console.warn("Failed to initialize Redis client:", error);
      redisClient = null;
    }

    const cache = redisClient ? new UpstashRedisCache({
      client: redisClient,
    }) : undefined;

    const { stream, handlers } = LangChainStream();

    const chatModel = new ChatOpenAI({
      modelName: "gpt-4o-mini",
      streaming: true,
      callbacks: [handlers],
      verbose: true,
      cache,
    });

    const rephrasingModel = new ChatOpenAI({
      modelName: "gpt-4o-mini",
      verbose: true,
      cache,
    });

    // Get vector store with null check
    const vectorStore = await getVectorStore();
    if (!vectorStore) {
      console.error("Failed to initialize vector store");
      return Response.json(
        { error: "Failed to initialize search functionality" },
        { status: 500 }
      );
    }

    const retriever = vectorStore.asRetriever();

    const rephrasePrompt = ChatPromptTemplate.fromMessages([
      new MessagesPlaceholder("chat_history"),
      ["user", "{input}"],
      [
        "user",
        "Given the above conversation, generate a search query to look up in order to get information relevant to the current question. " +
          "Don't leave out any relevant keywords. Only return the query and no other text.",
      ],
    ]);

    const historyAwareRetrieverChain = await createHistoryAwareRetriever({
      llm: rephrasingModel,
      retriever,
      rephrasePrompt,
    });

    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        "You are a personable and engaging chatbot designed for a personal portfolio website. You serve as Olu Kareem's personal assistant, answering user questions and providing context-rich responses that reflect Olu's skills and experiences. " +
          "Your goal is to answer user questions comprehensively, using the provided context and relevant metadata to enhance responses. " +
          "Whenever applicable, include links to portfolio pages or relevant resources formatted in Markdown (e.g., [Link Text](URL)) to provide more in-depth information. " +
          "Ensure your messages are in Markdown format to improve readability.\n\n" +
          "Use the following context to inform your responses:\n{context}\n\n" +
          "If you don't have enough information to answer a question, please let the user know and suggest they check out the portfolio sections for more details. " +
          "Maintain a friendly and professional tone, and keep your responses concise yet informative. Feel free to ask follow-up questions if it will help you provide a better answer.",
      ],
      new MessagesPlaceholder("chat_history"),
      ["user", "{input}"],
    ]);

    const combineDocsChain = await createStuffDocumentsChain({
      llm: chatModel,
      prompt,
      documentPrompt: PromptTemplate.fromTemplate(
        "Page URL {url}\n\nPage content:\n{page_content}"
      ),
      documentSeparator: "\n--------\n",
    });

    const retrievalChain = await createRetrievalChain({
      combineDocsChain,
      retriever: historyAwareRetrieverChain,
    });

    retrievalChain.invoke({
      input: currentMessageContent,
      chat_history: chatHistory,
    });

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}