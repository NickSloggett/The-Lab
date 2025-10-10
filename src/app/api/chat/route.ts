import { NextRequest, NextResponse } from "next/server"
import { Redis } from "@upstash/redis"

import { MODEL_MAP, streamAnswer } from "@/lib/ai"
import { getCurrentUser } from "@/lib/session"

// Structured logging utility
const logRequest = (level: 'info' | 'error' | 'warn', message: string, data?: any) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    service: 'chat-api',
    ...data
  }
  console.log(JSON.stringify(logEntry))
}

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
  const startTime = Date.now()
  const user = await getCurrentUser()

  if (!user) {
    logRequest('warn', 'Unauthorized access attempt', {
      ip: req.ip,
      userAgent: req.headers.get('user-agent'),
      endpoint: '/api/chat'
    })
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { message, model, skipCache = false } = await req.json()

  if (!message) {
    logRequest('warn', 'Missing message in request', {
      userId: user.id,
      endpoint: '/api/chat'
    })
    return NextResponse.json({ error: "Missing message" }, { status: 400 })
  }

  logRequest('info', 'Chat request received', {
    userId: user.id,
    messageLength: message.length,
    model: model || MODEL_MAP.fast,
    skipCache,
    endpoint: '/api/chat'
  })

  const targetModel = (Object.values(MODEL_MAP) as string[]).includes(model)
    ? model
    : MODEL_MAP.fast

  // Try to get cached response for non-streaming requests
  if (!skipCache && isCacheable(message)) {
    try {
      const cacheKey = generateCacheKey(message, targetModel, user.id)
      const cachedResponse = await redis.get(cacheKey)

      if (cachedResponse) {
        const responseTime = Date.now() - startTime
        logRequest('info', 'Cache hit - returning cached response', {
          userId: user.id,
          cacheKey,
          responseTimeMs: responseTime,
          endpoint: '/api/chat'
        })
        return new NextResponse(cachedResponse as string, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "X-Cache-Status": "HIT",
            "X-Response-Time": responseTime.toString(),
          },
        })
      }
      logRequest('info', 'Cache miss - processing request', {
        userId: user.id,
        cacheKey,
        endpoint: '/api/chat'
      })
    } catch (error) {
      logRequest('error', 'Redis cache error', {
        userId: user.id,
        error: (error as Error).message,
        endpoint: '/api/chat'
      })
      // Continue without caching
    }
  }

  try {
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
        const responseTime = Date.now() - startTime

        // Cache the response asynchronously (don't await)
        redis.setex(cacheKey, CACHE_TTL, responseText).catch(err =>
          logRequest('error', 'Failed to cache response', {
            userId: user.id,
            error: (err as Error).message,
            endpoint: '/api/chat'
          })
        )

        logRequest('info', 'Response generated and cached', {
          userId: user.id,
          responseLength: responseText.length,
          responseTimeMs: responseTime,
          model: targetModel,
          cached: true,
          endpoint: '/api/chat'
        })

        return new NextResponse(responseText, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "X-Cache-Status": "MISS",
            "X-Response-Time": responseTime.toString(),
          },
        })
      } catch (error) {
        logRequest('error', 'Error processing cached response', {
          userId: user.id,
          error: (error as Error).message,
          endpoint: '/api/chat'
        })
        // Fall back to streaming
      }
    }

    const responseTime = Date.now() - startTime
    logRequest('info', 'Streaming response initiated', {
      userId: user.id,
      model: targetModel,
      cached: false,
      responseTimeMs: responseTime,
      endpoint: '/api/chat'
    })

    return new NextResponse(stream.toAIStream(), {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Cache-Status": "BYPASS",
        "X-Response-Time": responseTime.toString(),
      },
    })
  } catch (error) {
    const responseTime = Date.now() - startTime
    logRequest('error', 'AI service error', {
      userId: user.id,
      error: (error as Error).message,
      model: targetModel,
      responseTimeMs: responseTime,
      endpoint: '/api/chat'
    })
    return NextResponse.json(
      { error: "AI service temporarily unavailable" },
      { status: 503 }
    )
  }
}
