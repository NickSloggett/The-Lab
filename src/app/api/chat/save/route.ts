import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"

export async function POST(req: NextRequest) {
  const user = await getCurrentUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()

  const conversation = await prisma.aIChat.create({
    data: {
      userId: user.id,
      title: body.title ?? "New conversation",
      messages: body.messages ?? [],
      model: body.model ?? "gpt-4o-mini",
    },
  })

  return NextResponse.json(conversation, { status: 201 })
}
