import { NextRequest, NextResponse } from "next/server"
import { Redis } from "@upstash/redis"

import { MODEL_MAP, streamAnswer } from "@/lib/ai"
import { getCurrentUser } from "@/lib/session"

// Initialize Redis for caching
const redis = new Redis({
  url: process.env.REDIS_URL!,
  token: process.env.REDIS_TOKEN!,
})

const SYSTEM_PROMPT = `You are Lab AI, an engineering assistant helping teams build full-stack products.
You can:
- Generate and review code with detailed explanations
- Suggest database schemas and migrations
- Propose architecture and integration approaches
- Help debug web, mobile, and backend issues
Use Markdown for formatting and include code blocks with language hints when relevant.`

// Cache TTL in seconds (24 hours)
const CACHE_TTL = 24 * 60 * 60

// Generate cache key for similar requests
function generateCacheKey(message: string, model: string, userId: string): string {
  // Create a hash of the message for cache key (simple approach)
  const messageHash = Buffer.from(message.toLowerCase().trim()).toString('base64').slice(0, 32)
  return `chat:${userId}:${model}:${messageHash}`
}

// Check if message is cacheable (not too long, not containing sensitive data)
function isCacheable(message: string): boolean {
  const wordCount = message.trim().split(/\s+/).length
  return wordCount <= 100 && wordCount >= 3 && !message.includes('password') && !message.includes('secret')
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { message, model, skipCache = false } = await req.json()

  if (!message) {
    return NextResponse.json({ error: "Missing message" }, { status: 400 })
  }

  const targetModel = (Object.values(MODEL_MAP) as string[]).includes(model)
    ? model
    : MODEL_MAP.fast

  // Try to get cached response for non-streaming requests
  if (!skipCache && isCacheable(message)) {
    try {
      const cacheKey = generateCacheKey(message, targetModel, user.id)
      const cachedResponse = await redis.get(cacheKey)

      if (cachedResponse) {
        return new NextResponse(cachedResponse as string, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "X-Cache-Status": "HIT",
          },
        })
      }
    } catch (error) {
      console.warn("Redis cache error:", error)
      // Continue without caching
    }
  }

  const stream = await streamAnswer({
    prompt: message,
    system: SYSTEM_PROMPT,
    model: targetModel,
  })

  // For caching, we need to collect the full response
  // This is a trade-off: caching vs streaming
  if (!skipCache && isCacheable(message)) {
    try {
      const responseText = await stream.toAIStream().text()
      const cacheKey = generateCacheKey(message, targetModel, user.id)

      // Cache the response asynchronously (don't await)
      redis.setex(cacheKey, CACHE_TTL, responseText).catch(err =>
        console.warn("Failed to cache response:", err)
      )

      return new NextResponse(responseText, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "X-Cache-Status": "MISS",
        },
      })
    } catch (error) {
      console.warn("Error caching response:", error)
      // Fall back to streaming
    }
  }

  return new NextResponse(stream.toAIStream(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Cache-Status": "BYPASS",
    },
  })
}
