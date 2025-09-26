"use client"

import { useMemo } from "react"
import { formatDistanceToNow } from "date-fns"
import { ArrowRight, PlusCircle } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const demoProjects = [
  {
    id: "proj_123",
    name: "Unified Dashboard",
    status: "in-progress",
    description: "Real-time analytics dashboard across web and mobile.",
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    completion: 72,
  },
  {
    id: "proj_456",
    name: "Payments API",
    status: "review",
    description: "Stripe billing integration with usage-based pricing tiers.",
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    completion: 58,
  },
]

export function ProjectDashboard() {
  const projects = useMemo(() => demoProjects, [])

  return (
    <Card className="border-white/10 bg-white/5 text-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Projects</CardTitle>
          <CardDescription className="text-white/70">
            Central hub for tracking initiatives across web, iOS, and Android applications.
          </CardDescription>
        </div>
        <Button className="bg-emerald-500 hover:bg-emerald-400">
          <PlusCircle className="mr-2 size-4" /> New Project
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {projects.map((project) => (
          <div key={project.id} className="rounded-lg border border-white/10 bg-black/20 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm uppercase tracking-widest text-white/40">{project.id}</div>
                <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                <p className="text-sm text-white/70">{project.description}</p>
              </div>
              <Link href="#" className="inline-flex items-center gap-1 text-sm text-emerald-300">
                View Details <ArrowRight className="size-4" />
              </Link>
            </div>
            <Separator className="my-3 bg-white/10" />
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
              <span className="inline-flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-400" /> {project.status}
              </span>
              <span>{project.completion}% complete</span>
              <span>Updated {formatDistanceToNow(project.updatedAt, { addSuffix: true })}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
