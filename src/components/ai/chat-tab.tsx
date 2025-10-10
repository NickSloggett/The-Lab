import { forwardRef, useRef } from "react"
import { Loader2, Send } from "lucide-react"
import ReactMarkdown from "react-markdown"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  createdAt: string
}

interface ChatTabProps {
  history: Message[]
  input: string
  setInput: (value: string) => void
  model: string
  setModel: (model: string) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  isPending: boolean
  bottomRef: React.RefObject<HTMLDivElement>
}

export function ChatTab({ history, input, setInput, model, setModel, onSubmit, isPending, bottomRef }: ChatTabProps) {
  const models = [
    { id: "gpt-4o-mini", label: "Fast (GPT-4o-mini)" },
    { id: "gpt-4o", label: "Smart (GPT-4o)" },
    { id: "gpt-4.1", label: "Creative (GPT-4.1)" },
  ]

  return (
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

      <form onSubmit={onSubmit} className="border-t border-white/10 bg-black/20 p-4">
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
            disabled={isPending}
          >
            {isPending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
          </Button>
        </div>
      </form>
    </div>
  )
}
