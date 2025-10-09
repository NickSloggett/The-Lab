import { openai } from "@ai-sdk/openai"
import { generateText, streamText } from "ai"

export const MODEL_MAP = {
  fast: "gpt-4o-mini",
  smart: "gpt-4o",
  creative: "gpt-4.1",
} as const

const openaiClient = openai({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateAnswer({
  prompt,
  system,
  model = MODEL_MAP.fast,
}: {
  prompt: string
  system?: string
  model?: (typeof MODEL_MAP)[keyof typeof MODEL_MAP]
}) {
  const result = await generateText({
    model: openaiClient(model),
    prompt,
    system,
  })

  return result.text
}

export async function streamAnswer({
  prompt,
  system,
  model = MODEL_MAP.fast,
}: {
  prompt: string
  system?: string
  model?: (typeof MODEL_MAP)[keyof typeof MODEL_MAP]
}) {
  return streamText({
    model: openaiClient(model),
    prompt,
    system,
  })
}
