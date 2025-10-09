import { NextResponse } from "next/server"

import { getCurrentUser } from "@/lib/session"

export async function GET() {
  const user = await getCurrentUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  return NextResponse.json({
    aiRequests: 1240,
    apiCalls: 8520,
    uploadBandwidth: 184,
    projectsActive: 7,
  })
}
