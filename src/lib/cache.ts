import { BaseCache } from "@langchain/core/caches";
import { Generation } from "@langchain/core/outputs";
import { Redis } from "@upstash/redis";

export class UpstashRedisCache extends BaseCache<Generation[]> {
  private client: Redis;
  private ttl?: number;

  constructor(fields: { client: Redis; ttl?: number }) {
    super();
    this.client = fields.client;
    this.ttl = fields.ttl;
  }

  public async lookup(prompt: string, llmKey: string): Promise<Generation[] | null> {
    try {
      const key = this.getCacheKey(prompt, llmKey);
      const value = await this.client.get<string>(key);
      if (!value) return null;
      return JSON.parse(value) as Generation[];
    } catch (e) {
      console.error("Error looking up cache key:", e);
      return null;
    }
  }

  public async update(prompt: string, llmKey: string, value: Generation[]): Promise<void> {
    try {
      const key = this.getCacheKey(prompt, llmKey);
      const serializedValue = JSON.stringify(value);
      
      if (this.ttl) {
        await this.client.set(key, serializedValue, { ex: this.ttl });
      } else {
        await this.client.set(key, serializedValue);
      }
    } catch (e) {
      console.error("Error updating cache:", e);
    }
  }

  private getCacheKey(prompt: string, llmKey: string): string {
    return `${llmKey}:${prompt}`;
  }
}