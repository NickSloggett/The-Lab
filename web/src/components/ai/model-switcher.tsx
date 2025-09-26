"use client"

import { useState } from "react"
import { BrainCircuit } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const MODEL_DESCRIPTIONS = {
  "gpt-4o-mini": {
    label: "Fast",
    summary: "Quick responses for iterative coding and debugging.",
  },
  "gpt-4o": {
    label: "Smart",
    summary: "Balanced reasoning for architecture and product planning.",
  },
  "gpt-4.1": {
    label: "Creative",
    summary: "Narrative generation, UX writing, and innovation workshops.",
  },
} as const

type ModelKey = keyof typeof MODEL_DESCRIPTIONS

interface ModelSwitcherProps {
  value?: ModelKey
  onChange?: (model: ModelKey) => void
}

export function ModelSwitcher({ value = "gpt-4o-mini", onChange }: ModelSwitcherProps) {
  const [current, setCurrent] = useState<ModelKey>(value)

  const handleChange = (model: ModelKey) => {
    setCurrent(model)
    onChange?.(model)
  }

  return (
    <Card className="border-white/10 bg-white/5 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BrainCircuit className="size-4 text-emerald-300" /> Model Selector
        </CardTitle>
        <CardDescription className="text-white/70">
          Tune the AI assistant for different workflows.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={current} onValueChange={(value) => handleChange(value as ModelKey)}>
          <TabsList className="grid grid-cols-3 bg-white/10 text-white">
            {Object.entries(MODEL_DESCRIPTIONS).map(([key, { label }]) => (
              <TabsTrigger key={key} value={key}>
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
          {Object.entries(MODEL_DESCRIPTIONS).map(([key, { summary }]) => (
            <TabsContent key={key} value={key} className="mt-4 space-y-3">
              <p className="text-sm text-white/70">{summary}</p>
              <Button className="bg-emerald-500 hover:bg-emerald-400" onClick={() => handleChange(key as ModelKey)}>
                Use {MODEL_DESCRIPTIONS[key as ModelKey].label}
              </Button>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
