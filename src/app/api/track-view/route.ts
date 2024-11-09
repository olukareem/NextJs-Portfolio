import { NextResponse } from "next/server"
import { redis, getTodayKey, getIPAddress, isTestTraffic } from "@/lib/tracking"

export async function POST(req: Request) {
  try {
    // Skip tracking for test traffic
    if (isTestTraffic(req)) {
      return NextResponse.json({ success: true, skipped: true })
    }

    const ip = getIPAddress(req)
    
    // Additional checks to exclude your own traffic
    const excludedIPs = (process.env.EXCLUDED_IPS || '').split(',')
    if (excludedIPs.includes(ip)) {
      return NextResponse.json({ success: true, skipped: true })
    }

    const today = getTodayKey()
    
    // Increment total views for today
    await redis.incr(`views:${today}`)
    
    // Add IP to today's unique visitors set
    await redis.sadd(`visitors:${today}`, ip)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error tracking view:", error)
    return NextResponse.json(
      { success: false, error: "Failed to track view" },
      { status: 500 }
    )
  }
}