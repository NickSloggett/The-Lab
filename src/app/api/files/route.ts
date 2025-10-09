import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"

export async function GET() {
  const user = await getCurrentUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const files = await prisma.upload.findMany({
    where: {
      userId: user.id,
    },
  })

  return NextResponse.json(files)
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()

  const upload = await prisma.upload.create({
    data: {
      filename: body.filename,
      url: body.url,
      type: body.type,
      size: body.size,
      metadata: body.metadata ?? {},
      userId: user.id,
    },
  })

  return NextResponse.json(upload, { status: 201 })
}
