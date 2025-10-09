"use client"

import { useState } from "react"
import { Brain, Database, ShieldCheck, Zap, Cloud, Users } from "lucide-react"

import { AIChat } from "@/components/ai/ai-chat"
import { ProjectDashboard } from "@/components/dashboard/project-dashboard"
import { FileManager } from "@/components/files/file-manager"
import { AnalyticsOverview } from "@/components/insights/analytics-overview"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

const features = [
  {
    icon: Brain,
    title: "AI Assistant",
    description: "Code generation, architecture guidance, and debugging with GPT-4o.",
    badge: "AI Native",
  },
  {
    icon: Database,
    title: "Full-Stack Database",
    description: "Prisma ORM with PostgreSQL/SQLite ready schemas.",
    badge: "Prisma",
  },
  {
    icon: ShieldCheck,
    title: "Secure Auth",
    description: "NextAuth, OAuth providers, and JWT sessions with RBAC.",
    badge: "Zero Trust",
  },
  {
    icon: Zap,
    title: "Real-time Ops",
    description: "Socket.io wiring for live collaboration and notifications.",
    badge: "Live",
  },
  {
    icon: Cloud,
    title: "File Pipeline",
    description: "Uploadthing integration for uploads and media workflows.",
    badge: "Edge",
  },
  {
    icon: Users,
    title: "Team Ready",
    description: "Project dashboards, tasks, analytics, and API keys.",
    badge: "Teams",
  },
]

export default function HomePage() {
  const [tab, setTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <header className="border-b border-white/10 bg-black/20 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 text-center">
          <div className="inline-flex items-center gap-2 self-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-white/80">
            <span className="size-2 rounded-full bg-emerald-400" />
            Build once. Ship everywhere.
          </div>
          <div className="text-4xl font-semibold sm:text-5xl">
            The Lab Platform
            <span className="text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text block text-3xl sm:text-4xl">
              AI-enabled full-stack starter for modern teams
            </span>
          </div>
          <p className="text-balance text-lg text-white/70 sm:text-xl">
            Web, mobile, and backend tooling fused with production-ready authentication, database schemas,
            real-time infrastructure, and a built-in AI engineer.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" className="bg-emerald-500 hover:bg-emerald-400">
              Launch Workspace
            </Button>
            <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
              View Documentation
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs uppercase tracking-widest text-white/50">
            <Badge variant="secondary" className="bg-white/10 text-xs font-medium text-white">
              Next.js 15
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-xs font-medium text-white">
              React 19
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-xs font-medium text-white">
              Tailwind v4
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-xs font-medium text-white">
              shadcn latest
            </Badge>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-12">
        <section>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, description, badge }) => (
              <Card key={title} className="border-white/10 bg-white/5 text-white">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="rounded-full border border-white/10 bg-white/10 p-2">
                    <Icon className="size-5 text-emerald-300" />
                  </div>
                  <Badge variant="secondary" className="bg-white/10 text-xs text-white">
                    {badge}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-2">
                  <CardTitle>{title}</CardTitle>
                  <CardDescription className="text-white/70">
                    {description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <Tabs value={tab} onValueChange={setTab} className="flex flex-col gap-6">
            <TabsList className="self-center bg-white/10 text-white">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="ai">AI Studio</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="files">Files</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card className="border-white/10 bg-white/5 text-white">
                <CardHeader>
                  <CardTitle>All-in-one full-stack foundation</CardTitle>
                  <CardDescription className="text-white/70">
                    Pre-integrated stack covering auth, AI, data, and delivery pipelines so your team can build features faster.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <h3 className="text-sm uppercase tracking-widest text-white/60">Deployment</h3>
                    <p className="text-white/80">
                      Optimized for Vercel, AWS, or self-hosted environments. Includes best practices for caching, logging, and observability.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm uppercase tracking-widest text-white/60">Security</h3>
                    <p className="text-white/80">
                      Role-based access control, API key provisioning, and audit trails ready to plug into your compliance workflow.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ai">
              <AIChat />
            </TabsContent>

            <TabsContent value="projects">
              <ProjectDashboard />
            </TabsContent>

            <TabsContent value="files">
              <FileManager />
            </TabsContent>

            <TabsContent value="analytics">
              <AnalyticsOverview />
            </TabsContent>
          </Tabs>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-black/20 py-8 text-center text-sm text-white/50">
        Built with Next.js 15, Tailwind v4, Prisma, and OpenAI. Deploy on Vercel or your own infrastructure.
      </footer>
    </div>
  )
}
