import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!
})

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