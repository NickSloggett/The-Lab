import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"

export async function POST(req: NextRequest) {
  const user = await getCurrentUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()

  const task = await prisma.task.create({
    data: {
      title: body.title,
      description: body.description,
      status: body.status,
      priority: body.priority,
      dueDate: body.dueDate ? new Date(body.dueDate) : null,
      projectId: body.projectId,
      assigneeId: body.assigneeId,
    },
  })

  return NextResponse.json(task, { status: 201 })
}

export async function PATCH(req: NextRequest) {
  const user = await getCurrentUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()

  const task = await prisma.task.update({
    where: {
      id: body.id,
    },
    data: {
      status: body.status,
      priority: body.priority,
      assigneeId: body.assigneeId,
    },
  })

  return NextResponse.json(task)
}
