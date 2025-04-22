import { Redis } from '@upstash/redis'

// Singleton pattern to ensure Redis is only initialized when needed
let redisClient: Redis | null = null;

// For backward compatibility - lazily initialized redis instance
// This is needed because some files might still be importing 'redis' directly
export const redis = new Proxy({} as Redis, {
  get: (target, prop) => {
    const client = getRedisClient();
    if (!client) {
      console.warn(`Redis client not initialized but '${String(prop)}' was accessed`);
      // Return a no-op function to prevent crashes
      return typeof prop === 'string' && ['incr', 'sadd', 'get', 'set', 'exists', 'del'].includes(prop) 
        ? async () => null 
        : null;
    }
    return client[prop as keyof Redis];
  }
});

export const getRedisClient = () => {
  // Skip during build time
  if (typeof process !== 'undefined' && 
      process.env.NODE_ENV === 'production' && 
      (process.env.VERCEL_ENV === 'production' || process.env.SKIP_DB_CONNECTIONS === 'true')) {
    return null;
  }
  
  if (!redisClient && process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    try {
      redisClient = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN
      });
    } catch (error) {
      console.error("Failed to initialize Redis client:", error);
      return null;
    }
  }
  return redisClient;
}

export const getTodayKey = () => {
  const date = new Date()
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

// Helper to check if request is from development/testing
export const isTestTraffic = (request: Request): boolean => {
  const userAgent = request.headers.get('user-agent') || ''
  const referer = request.headers.get('referer') || ''
  
  // Exclude known development and testing patterns
  return (
    process.env.NODE_ENV !== 'production' ||  // Not production environment
    userAgent.includes('Postman') ||          // Postman requests
    userAgent.includes('playwright') ||       // Playwright tests
    userAgent.includes('cypress') ||          // Cypress tests
    referer.includes('localhost') ||          // Local development
    referer.includes('127.0.0.1') ||         // Local development
    referer.includes('.vercel.app')          // Vercel preview deployments
  )
}

// Get visitor's IP address from request
export const getIPAddress = (request: Request) => {
  const forwarded = request.headers.get("x-forwarded-for")
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown'
  return ip
}

export const formatNumber = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}