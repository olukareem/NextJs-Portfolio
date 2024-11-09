import { NextResponse } from "next/server"
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses"
import { redis, getTodayKey, formatNumber } from "@/lib/tracking"

const ses = new SESClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export async function POST(req: Request) {
  try {
    const today = getTodayKey()
    
    // Get today's stats
    const views = Number(await redis.get(`views:${today}`)) || 0
    const uniqueVisitors = await redis.scard(`visitors:${today}`) || 0
    
    // Skip report if traffic is too low (likely test traffic)
    const MIN_VIEWS_THRESHOLD = 5
    if (views < MIN_VIEWS_THRESHOLD) {
      return NextResponse.json({ 
        success: true, 
        skipped: true, 
        reason: 'Below minimum views threshold' 
      })
    }
    
    const emailParams = {
      Source: `"Portfolio Analytics" <${process.env.VERIFIED_SENDER_EMAIL!}>`,
      Destination: {
        ToAddresses: ["olukareem@pm.me"],
      },
      Message: {
        Subject: {
          Data: `Daily Portfolio Analytics - ${today}`,
        },
        Body: {
          Html: {
            Data: `
              <h2>Portfolio Analytics for ${today}</h2>
              <p>Your portfolio was viewed <strong>${formatNumber(views)} times</strong> by <strong>${formatNumber(uniqueVisitors)} unique visitors</strong> today.</p>
              <p><small>Note: This report excludes development and testing traffic.</small></p>
            `,
          },
          Text: {
            Data: `Portfolio Analytics for ${today}\n\nYour portfolio was viewed ${formatNumber(views)} times by ${formatNumber(uniqueVisitors)} unique visitors today.\n\nNote: This report excludes development and testing traffic.`,
          },
        },
      },
    }

    const command = new SendEmailCommand(emailParams)
    await ses.send(command)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending report:", error)
    return NextResponse.json(
      { success: false, error: "Failed to send report" },
      { status: 500 }
    )
  }
}