import { DataAPIClient } from "@datastax/astra-db-ts";
import { AstraDBVectorStore } from "@langchain/community/vectorstores/astradb";
import { OpenAIEmbeddings } from "@langchain/openai";

// Remove module-level validation that runs during build time
// and move it into the functions

export async function getVectorStore() {
  const endpoint = process.env.ASTRA_DB_ENDPOINT;
  const token = process.env.ASTRA_DB_APPLICATION_TOKEN;
  const collection = process.env.ASTRA_DB_COLLECTION;

  // Only validate when the function is actually called
  if (!token || !endpoint || !collection) {
    console.warn("Missing Astra DB configuration. Check environment variables.");
    return null;
  }

  try {
    return AstraDBVectorStore.fromExistingIndex(
      new OpenAIEmbeddings({ modelName: "text-embedding-3-small" }),
      {
        token,
        endpoint,
        collection,
        collectionOptions: {
          vector: {
            dimension: 1536,
            metric: "cosine",
          },
        },
      }
    );
  } catch (error) {
    console.error("Error initializing AstraDB vector store:", error);
    return null;
  }
}

export async function getEmbeddingsCollection() {
  const endpoint = process.env.ASTRA_DB_ENDPOINT;
  const token = process.env.ASTRA_DB_APPLICATION_TOKEN;
  const collection = process.env.ASTRA_DB_COLLECTION;

  // Only validate when the function is actually called
  if (!token || !endpoint || !collection) {
    console.warn("Missing Astra DB configuration. Check environment variables.");
    return null;
  }

  try {
    const client = new DataAPIClient(token);
    const db = client.db(endpoint);
    return db.collection(collection);
  } catch (error) {
    console.error("Error connecting to AstraDB:", error);
    return null;
  }
}