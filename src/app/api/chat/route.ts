import { NextRequest, NextResponse } from "next/server"

import { MODEL_MAP, streamAnswer } from "@/lib/ai"
import { getCurrentUser } from "@/lib/session"

const SYSTEM_PROMPT = `You are Lab AI, an engineering assistant helping teams build full-stack products.
You can:
- Generate and review code with detailed explanations
- Suggest database schemas and migrations
- Propose architecture and integration approaches
- Help debug web, mobile, and backend issues
Use Markdown for formatting and include code blocks with language hints when relevant.`

export async function POST(req: NextRequest) {
  const user = await getCurrentUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { message, model } = await req.json()

  if (!message) {
    return NextResponse.json({ error: "Missing message" }, { status: 400 })
  }

  const targetModel = (Object.values(MODEL_MAP) as string[]).includes(model)
    ? model
    : MODEL_MAP.fast

  const stream = await streamAnswer({
    prompt: message,
    system: SYSTEM_PROMPT,
    model: targetModel,
  })

  return new NextResponse(stream.toAIStream(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  })
}
