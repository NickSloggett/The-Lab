"use client"

import { lazy, Suspense, useEffect, useRef, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { Loader2, Send } from "lucide-react"
import { useSession } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Lazy load components for code splitting
const ChatTab = lazy(() => import("./chat-tab").then(module => ({ default: module.ChatTab })))
const ContextTab = lazy(() => import("./context-tab").then(module => ({ default: module.ContextTab })))
const ModelsTab = lazy(() => import("./models-tab").then(module => ({ default: module.ModelsTab })))

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  createdAt: string
}

const models = [
  { id: "gpt-4o-mini", label: "Fast (GPT-4o-mini)" },
  { id: "gpt-4o", label: "Smart (GPT-4o)" },
  { id: "gpt-4.1", label: "Creative (GPT-4.1)" },
]

export function AIChat() {
  const { status } = useSession()
  const [history, setHistory] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [model, setModel] = useState(models[0].id)
  const bottomRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState("chat")

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [history])

  const mutation = useMutation({
    mutationFn: async (payload: { message: string; model: string }) => {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok || !response.body) {
        throw new Error("Failed to get response")
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let result = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        result += decoder.decode(value, { stream: true })
      }

      return result.trim()
    },
    onSuccess: (data) => {
      setHistory((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data,
          createdAt: new Date().toISOString(),
        },
      ])
    },
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!input.trim() || mutation.isPending) return

    const message: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
      createdAt: new Date().toISOString(),
    }

    setHistory((prev) => [...prev, message])
    setInput("")

    mutation.mutate({
      message: message.content,
      model,
    })
  }

  const clearHistory = () => setHistory([])

  if (status !== "authenticated") {
    return (
      <Card className="border-white/10 bg-white/5 text-white">
        <CardHeader>
          <CardTitle>AI Studio</CardTitle>
          <CardDescription className="text-white/70">
            Sign in to access the AI assistant.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button>Sign In</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-white/10 bg-white/5 text-white">
      <CardHeader className="border-b border-white/10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <CardTitle>AI Studio</CardTitle>
            <CardDescription className="text-white/70">
              Ask questions, generate code, and plan architecture with your embedded AI engineer.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/60">
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">
              {models.find((m) => m.id === model)?.label}
            </span>
            <Button variant="outline" className="border-white/20 text-white" onClick={clearHistory}>
              Clear
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col">
          <TabsList className="mx-auto mt-4 bg-white/10">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="context">Conversation</TabsTrigger>
            <TabsTrigger value="models">Models</TabsTrigger>
          </TabsList>
          <TabsContent value="chat" className="mt-0">
            <Suspense fallback={<div className="flex h-[500px] items-center justify-center"><Loader2 className="size-8 animate-spin" /></div>}>
              <ChatTab
                history={history}
                input={input}
                setInput={setInput}
                model={model}
                setModel={setModel}
                onSubmit={handleSubmit}
                isPending={mutation.isPending}
                bottomRef={bottomRef}
              />
            </Suspense>
          </TabsContent>

          <TabsContent value="context" className="mt-0">
            <Suspense fallback={<div className="flex items-center justify-center p-6"><Loader2 className="size-8 animate-spin" /></div>}>
              <ContextTab />
            </Suspense>
          </TabsContent>

          <TabsContent value="models" className="mt-0">
            <Suspense fallback={<div className="flex items-center justify-center p-6"><Loader2 className="size-8 animate-spin" /></div>}>
              <ModelsTab />
            </Suspense>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
