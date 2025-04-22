import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
// Configure dotenv before other imports
import { DocumentInterface } from "@langchain/core/documents";
import { Redis } from "@upstash/redis";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { getEmbeddingsCollection, getVectorStore } from "../src/lib/astradb";

// Helper to check if we're in build context
const isBuildTime = () => {
  return process.env.NODE_ENV === 'production' && 
         (process.env.VERCEL_ENV === 'production' || process.env.SKIP_DB_CONNECTIONS === 'true');
};

async function generateEmbeddings() {
  // Skip execution during build time
  if (isBuildTime()) {
    console.log("Build context detected, skipping embeddings generation");
    return;
  }

  try {
    // Connect to Redis
    const redis = Redis.fromEnv();
    await redis.flushdb();
    console.log("Redis flushed successfully");
  } catch (error) {
    console.warn("Failed to flush Redis:", error);
    // Continue execution even if Redis fails
  }

  // Get vector store with null check
  const vectorStore = await getVectorStore();
  if (!vectorStore) {
    console.error("Failed to initialize vector store, cannot continue");
    return;
  }

  // Get embeddings collection with null check
  const embedCollection = await getEmbeddingsCollection();
  if (embedCollection) {
    try {
      await embedCollection.deleteMany({});
      console.log("Cleared existing embeddings collection");
    } catch (error) {
      console.warn("Failed to clear embeddings collection:", error);
      // Continue execution
    }
  }

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
  
  try {
    await vectorStore.addDocuments(splitDocs);
    console.log(`Successfully added ${splitDocs.length} documents to vector store`);
  } catch (error) {
    console.error("Failed to add documents to vector store:", error);
  }
}

// Only run if not imported
if (require.main === module) {
  generateEmbeddings()
    .then(() => console.log("Done generating embeddings"))
    .catch((error) => {
      console.error("Error generating embeddings:", error);
      process.exit(1);
    });
}