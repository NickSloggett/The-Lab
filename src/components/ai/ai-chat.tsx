"use client"

import { useEffect, useRef, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { Loader2, Send } from "lucide-react"
import { useSession } from "next-auth/react"
import ReactMarkdown from "react-markdown"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
            <div className="flex h-[500px] flex-col">
              <ScrollArea className="flex-1 px-6 py-4">
                <div className="space-y-4">
                  {history.length === 0 && (
                    <div className="rounded-lg border border-dashed border-white/20 bg-white/5 p-6 text-center text-sm text-white/60">
                      Start by asking about architecture, code, or deployment strategy.
                    </div>
                  )}

                  {history.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-2xl rounded-lg border border-white/10 px-4 py-3 text-sm shadow-lg backdrop-blur ${
                          message.role === "user"
                            ? "bg-emerald-500/20 text-emerald-100"
                            : "bg-white/10 text-white"
                        }`}
                      >
                        <div className="mb-2 text-xs uppercase tracking-widest text-white/40">
                          {message.role === "user" ? "You" : "Lab AI"}
                        </div>
                        <ReactMarkdown className="prose prose-invert max-w-none text-sm leading-6">
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  ))}
                  <div ref={bottomRef} />
                </div>
              </ScrollArea>

              <form onSubmit={handleSubmit} className="border-t border-white/10 bg-black/20 p-4">
                <div className="flex gap-3">
                  <Input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="Ask about architecture, write code, plan features..."
                    className="border-white/20 bg-black/30 text-white placeholder:text-white/40"
                  />
                  <Button
                    type="submit"
                    className="bg-emerald-500 hover:bg-emerald-400"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                  </Button>
                </div>
              </form>
            </div>
          </TabsContent>

          <TabsContent value="context" className="p-6 text-sm text-white/70">
            <h3 className="text-lg font-semibold text-white">Conversation history</h3>
            <p className="text-white/60">
              Responses incorporate project architecture, Prisma schema, auth rules, and recent decisions to stay consistent across web and mobile apps.
            </p>
          </TabsContent>

          <TabsContent value="models" className="p-6 text-sm text-white/70">
            <h3 className="text-lg font-semibold text-white">Model capabilities</h3>
            <ul className="list-disc space-y-2 pl-6 text-white/70">
              <li><strong>Fast</strong>: Rapid iterations, quick debugging, low latency.</li>
              <li><strong>Smart</strong>: Balanced reasoning, architecture decisions, production advice.</li>
              <li><strong>Creative</strong>: Narrative generation, marketing copy, visionary planning.</li>
            </ul>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
