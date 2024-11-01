import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
// Configure dotenv before other imports
import { DocumentInterface } from "@langchain/core/documents";
import { Redis } from "@upstash/redis";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { getEmbeddingsCollection, getVectorStore } from "../src/lib/astradb";

async function generateEmbeddings() {
  await Redis.fromEnv().flushdb();

  const vectorStore = await getVectorStore();

  (await getEmbeddingsCollection()).deleteMany({});

  // Load documents from both "src/app/" and "src/data/"
  const appLoader = new DirectoryLoader(
    "src/app/",
    {
      ".tsx": (path) => new TextLoader(path),
    },
    true
  );
  const dataLoader = new DirectoryLoader(
    "src/data/",
    {
      ".tsx": (path) => new TextLoader(path),
    },
    true
  );

  // Load both directories
  const appDocs = (await appLoader.load()).filter((doc) =>
    doc.metadata.source.endsWith("page.tsx")
  );
  const dataDocs = (await dataLoader.load()).filter((doc) =>
    doc.metadata.source.endsWith("resume.tsx")
  );

  // Combine documents
  const docs = [...appDocs, ...dataDocs].map((doc): DocumentInterface => {
    const sourcePath = doc.metadata.source.replace(/\\/g, "/");
    let url = "/";

    if (sourcePath.includes("/src/app")) {
      url = sourcePath.split("/src/app")[1].split("/page.")[0] || "/";
    } else if (sourcePath.includes("/src/data")) {
      url = sourcePath.split("/src/data")[1].split("/resume.")[0] || "/";
    }

    const pageContentTrimmed = doc.pageContent
      .replace(/^import.$/gm, "") // Remove all import statements
      .replace(/ className=(["']).?\1| className={.?}/g, "") // Remove all className props
      .replace(/^\s[\r]/gm, "") // remove empty lines
      .trim();

    return {
      pageContent: pageContentTrimmed, // Use the trimmed content
      metadata: { url },
    };
  });

  const splitter = RecursiveCharacterTextSplitter.fromLanguage("html");
  const splitDocs = await splitter.splitDocuments(docs);
  await vectorStore.addDocuments(splitDocs);
}

generateEmbeddings();
