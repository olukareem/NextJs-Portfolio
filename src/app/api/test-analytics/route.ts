import { NextResponse } from "next/server"
import { redis, getTodayKey } from "@/lib/tracking"

export async function GET() {
  try {
    const today = getTodayKey()
    
    // Get today's stats
    const views = await redis.get(`views:${today}`)
    const uniqueVisitors = await redis.scard(`visitors:${today}`)
    
    // Get all stored dates
    const keys = await redis.keys('views:*')
    const allStats = await Promise.all(
      keys.map(async (key) => {
        const date = key.replace('views:', '')
        const dayViews = await redis.get(key)
        const dayVisitors = await redis.scard(`visitors:${date}`)
        return {
          date,
          views: dayViews,
          uniqueVisitors: dayVisitors
        }
      })
    )

    return NextResponse.json({
      today: {
        date: today,
        views,
        uniqueVisitors,
      },
      allStats: allStats.sort((a, b) => b.date.localeCompare(a.date)) // Most recent first
    })
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    )
  }
}