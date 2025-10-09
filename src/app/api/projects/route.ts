import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"

export async function GET() {
  const user = await getCurrentUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const projects = await prisma.project.findMany({
    where: {
      userId: user.id,
    },
    include: {
      tasks: true,
    },
  })

  return NextResponse.json(projects)
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()

  const project = await prisma.project.create({
    data: {
      name: body.name,
      description: body.description,
      userId: user.id,
      metadata: body.metadata ?? {},
    },
  })

  return NextResponse.json(project, { status: 201 })
}
