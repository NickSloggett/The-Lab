import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function Home() {
  const [counter, setCounter] = useState(0)
  const [name, setName] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🧪</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">The Lab</h1>
          <p className="text-xl text-gray-600">Multi-Platform Development Boilerplate</p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Counter Demo */}
          <Card>
            <CardHeader>
              <CardTitle>Interactive Demo</CardTitle>
              <CardDescription>Counter functionality</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-blue-600 mb-4">{counter}</div>
                <div className="flex gap-3 justify-center">
                  <Button 
                    variant="outline" 
                    onClick={() => setCounter(counter - 1)}
                  >
                    Decrement
                  </Button>
                  <Button 
                    onClick={() => setCounter(counter + 1)}
                  >
                    Increment
                  </Button>
                </div>
                <Button 
                  variant="ghost" 
                  className="mt-2" 
                  onClick={() => setCounter(0)}
                >
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Form Demo */}
          <Card>
            <CardHeader>
              <CardTitle>Form Demo</CardTitle>
              <CardDescription>Input handling example</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              {name && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-green-800">
                    Hello, <span className="font-semibold">{name}</span>! 👋
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Features */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Platform Features</CardTitle>
              <CardDescription>Technologies included in this boilerplate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <FeatureCard
                  icon="🌐"
                  title="Web App"
                  description="Next.js + React + TypeScript"
                  tech="shadcn/ui + Tailwind"
                />
                <FeatureCard
                  icon="📱"
                  title="iOS App"
                  description="Native SwiftUI application"
                  tech="Swift + SwiftUI"
                />
                <FeatureCard
                  icon="🤖"
                  title="Android App"
                  description="React Native application"
                  tech="React Native + TypeScript"
                />
                <FeatureCard
                  icon="🎨"
                  title="UI Components"
                  description="Beautiful, accessible components"
                  tech="shadcn/ui + Radix"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p>Built with ❤️ using modern development tools</p>
        </div>
      </div>
    </div>
  )
}

interface FeatureCardProps {
  icon: string
  title: string
  description: string
  tech: string
}

function FeatureCard({ icon, title, description, tech }: FeatureCardProps) {
  return (
    <div className="p-4 border rounded-lg bg-white">
      <div className="text-2xl mb-2">{icon}</div>
      <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      <p className="text-xs text-blue-600 font-mono">{tech}</p>
    </div>
  )
}