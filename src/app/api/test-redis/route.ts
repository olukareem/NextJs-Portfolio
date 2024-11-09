import { redis } from "@/lib/tracking";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Test Redis connection
    const testKey = "test:connection";
    await redis.set(testKey, "working");
    const result = await redis.get(testKey);
    await redis.del(testKey);

    return NextResponse.json({
      status: "success",
      redisConnected: result === "working",
      message: "Redis connection is working properly",
    });
  } catch (error) {
    console.error("Redis connection error:", error);
    return NextResponse.json(
      {
        status: "error",
        redisConnected: false,
        message: "Failed to connect to Redis",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
