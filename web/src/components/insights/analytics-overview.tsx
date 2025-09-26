"use client"

import { useMemo } from "react"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const usage = [
  { name: "Mon", ai: 124, api: 80 },
  { name: "Tue", ai: 180, api: 120 },
  { name: "Wed", ai: 210, api: 140 },
  { name: "Thu", ai: 260, api: 170 },
  { name: "Fri", ai: 310, api: 190 },
  { name: "Sat", ai: 280, api: 160 },
  { name: "Sun", ai: 340, api: 220 },
]

export function AnalyticsOverview() {
  const data = useMemo(() => usage, [])

  return (
    <Card className="border-white/10 bg-white/5 text-white">
      <CardHeader>
        <CardTitle>Analytics</CardTitle>
        <CardDescription className="text-white/70">
          Usage trends across AI requests and API throughput.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} syncId="usage-chart" margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorAI" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#34d399" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorAPI" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" stroke="#9ca3af" tickLine={false} axisLine={false} />
            <YAxis stroke="#9ca3af" tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "0.75rem",
              }}
            />
            <Area type="monotone" dataKey="ai" stroke="#34d399" fillOpacity={1} fill="url(#colorAI)" />
            <Area type="monotone" dataKey="api" stroke="#38bdf8" fillOpacity={1} fill="url(#colorAPI)" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
