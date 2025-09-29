# 🤖 AI Integration Guide

> Learn how to add AI capabilities to any feature in The Lab

This guide covers everything you need to know about integrating AI into your applications. From simple chat interfaces to advanced agent workflows.

---

## 📋 Table of Contents

- [Getting Started](#-getting-started)
- [AI Chat Interface](#-ai-chat-interface)
- [Streaming Responses](#-streaming-responses)
- [Multi-Model Support](#-multi-model-support)
- [Vector Search](#-vector-search)
- [AI Agents](#-ai-agents)
- [Code Generation](#-code-generation)
- [Best Practices](#-best-practices)
- [Examples](#-examples)

---

## 🎯 Getting Started

### API Keys

First, get your API keys:

- **OpenAI**: [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- **Anthropic**: [console.anthropic.com](https://console.anthropic.com/)
- **Groq**: [console.groq.com](https://console.groq.com/)

Add them to `web/.env`:

```bash
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GROQ_API_KEY=gsk_...
```

### Available Providers

The Lab supports multiple AI providers out of the box:

| Provider | Models | Speed | Cost | Best For |
|----------|--------|-------|------|----------|
| **OpenAI** | GPT-4, GPT-3.5 | Medium | $$ | General purpose, reliable |
| **Anthropic** | Claude 3 | Medium | $$ | Complex reasoning, safety |
| **Groq** | Mixtral, Llama 2 | Very Fast | $ | Real-time, high throughput |
| **Local** | Ollama models | Fastest | Free | Privacy, development |

---

## 💬 AI Chat Interface

### Basic Chat

The simplest way to add AI chat to your app:

```typescript
// In your React component
import { AIChatInterface } from '@/components/ai/chat-interface'

export default function MyPage() {
  return (
    <AIChatInterface 
      model="gpt-4-turbo"
      systemPrompt="You are a helpful assistant."
    />
  )
}
```

That's it! You now have a fully functional AI chat with:
- ✅ Streaming responses
- ✅ Message history
- ✅ Markdown rendering
- ✅ Code syntax highlighting
- ✅ Error handling
- ✅ Loading states

### Customized Chat

Want more control? Customize every aspect:

```typescript
import { AIChatInterface } from '@/components/ai/chat-interface'

export default function CustomChat() {
  return (
    <AIChatInterface 
      model="claude-3-opus"
      systemPrompt="You are an expert developer assistant."
      
      // Styling
      className="h-screen"
      theme="dark"
      
      // Behavior
      maxTokens={2000}
      temperature={0.7}
      enableStreaming={true}
      
      // Features
      showModelSelector={true}
      enableCodeCopy={true}
      enableMarkdown={true}
      
      // Callbacks
      onMessageSent={(message) => console.log('Sent:', message)}
      onResponseReceived={(response) => console.log('Received:', response)}
      
      // Initial messages
      initialMessages={[
        { role: 'assistant', content: 'Hello! How can I help you code today?' }
      ]}
    />
  )
}
```

---

## 🌊 Streaming Responses

### Using the AI SDK

For custom implementations, use the Vercel AI SDK:

```typescript
import { useChat } from '@ai-sdk/react'

export function MyChat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    initialMessages: []
  })
  
  return (
    <div>
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className={message.role}>
            {message.content}
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit}>
        <input 
          value={input}
          onChange={handleInputChange}
          placeholder="Type a message..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          Send
        </button>
      </form>
    </div>
  )
}
```

### API Route for Streaming

Create `/app/api/chat/route.ts`:

```typescript
import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'

export async function POST(req: Request) {
  const { messages } = await req.json()
  
  const result = await streamText({
    model: openai('gpt-4-turbo'),
    messages,
    system: 'You are a helpful assistant.',
    temperature: 0.7,
    maxTokens: 2000,
  })
  
  return result.toDataStreamResponse()
}
```

---

## 🔄 Multi-Model Support

### Switching Models Dynamically

```typescript
import { openai } from '@ai-sdk/openai'
import { anthropic } from '@ai-sdk/anthropic'
import { createGroq } from '@ai-sdk/groq'

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY
})

// Model selector
const models = {
  'gpt-4': openai('gpt-4-turbo'),
  'claude': anthropic('claude-3-opus-20240229'),
  'mixtral': groq('mixtral-8x7b-32768'),
}

export async function POST(req: Request) {
  const { messages, model = 'gpt-4' } = await req.json()
  
  const result = await streamText({
    model: models[model],
    messages,
  })
  
  return result.toDataStreamResponse()
}
```

### Model Comparison

Compare responses from multiple models:

```typescript
import { generateText } from 'ai'

async function compareModels(prompt: string) {
  const [gpt4, claude, mixtral] = await Promise.all([
    generateText({
      model: openai('gpt-4-turbo'),
      prompt,
    }),
    generateText({
      model: anthropic('claude-3-opus-20240229'),
      prompt,
    }),
    generateText({
      model: groq('mixtral-8x7b-32768'),
      prompt,
    }),
  ])
  
  return { gpt4, claude, mixtral }
}
```

---

## 🔍 Vector Search

### Setting Up Embeddings

Store content with embeddings for semantic search:

```typescript
// lib/ai/embeddings.ts
import { openai } from '@ai-sdk/openai'
import { embed } from 'ai'

export async function storeDocument(id: string, content: string, metadata?: any) {
  // Generate embedding
  const { embedding } = await embed({
    model: openai.embedding('text-embedding-3-small'),
    value: content,
  })
  
  // Store in database (using Prisma)
  await prisma.document.create({
    data: {
      id,
      content,
      embedding,
      metadata,
    },
  })
}
```

### Semantic Search

Find similar content:

```typescript
export async function searchSimilar(query: string, limit = 5) {
  // Generate query embedding
  const { embedding: queryEmbedding } = await embed({
    model: openai.embedding('text-embedding-3-small'),
    value: query,
  })
  
  // Find similar documents (using cosine similarity)
  const results = await prisma.$queryRaw`
    SELECT 
      id, 
      content, 
      metadata,
      1 - (embedding <=> ${queryEmbedding}::vector) as similarity
    FROM documents
    ORDER BY similarity DESC
    LIMIT ${limit}
  `
  
  return results
}
```

### Using Vector Search

```typescript
// In your API route
export async function POST(req: Request) {
  const { query } = await req.json()
  
  // Find similar documents
  const context = await searchSimilar(query, 3)
  
  // Generate response with context
  const result = await streamText({
    model: openai('gpt-4-turbo'),
    messages: [
      {
        role: 'system',
        content: `Use this context to answer: ${JSON.stringify(context)}`
      },
      {
        role: 'user',
        content: query
      }
    ],
  })
  
  return result.toDataStreamResponse()
}
```

---

## 🤖 AI Agents

### Task Agent

Create an agent that performs multi-step tasks:

```python
# ai-automation-boilerplate/my_agent.py
from src.agents.task import TaskAgent, TaskConfig, TaskStep

class EmailProcessorAgent(TaskAgent):
    def __init__(self):
        config = TaskConfig(
            name="email_processor",
            description="Process and categorize emails",
            max_retries=3,
        )
        super().__init__(config)
    
    async def _get_task_steps(self, input_data):
        return [
            TaskStep(
                name="fetch_emails",
                description="Fetch unread emails",
                tool="email_client",
                parameters={"folder": "inbox"}
            ),
            TaskStep(
                name="categorize",
                description="Categorize each email",
                tool="llm_classifier",
                parameters={
                    "content": "{{fetch_emails.result}}",
                    "categories": ["urgent", "normal", "spam"]
                }
            ),
            TaskStep(
                name="send_summary",
                description="Send summary to user",
                tool="notification_service",
                parameters={"data": "{{categorize.result}}"}
            ),
        ]

# Usage
agent = EmailProcessorAgent()
result = await agent.execute({"user_id": "123"})
```

### Decision Agent

Agent that makes intelligent decisions:

```python
from src.agents.decision import DecisionAgent, DecisionConfig

config = DecisionConfig(
    name="priority_decider",
    decision_criteria=["urgency", "impact", "resources"],
    confidence_threshold=0.8,
    llm_provider="openai",
    model="gpt-4-turbo"
)

agent = DecisionAgent(config)

result = await agent.execute({
    "task": "Should we implement feature X?",
    "context": {
        "urgency": "high",
        "impact": "high",
        "resources": "medium",
        "deadline": "2 weeks"
    }
})

print(f"Decision: {result['decision']}")
print(f"Confidence: {result['confidence']}")
print(f"Reasoning: {result['reasoning']}")
```

---

## ⚡ Code Generation

### Generate Components

```bash
# Using the built-in generator
npm run ai:generate component Button

# Options:
npm run ai:generate component Button --with-tests
npm run ai:generate component Button --typescript
```

### Generate API Routes

```bash
npm run ai:generate api users
npm run ai:generate api auth/login
```

### Custom Generator

Create your own generator:

```typescript
// scripts/generate.ts
import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'

async function generateComponent(name: string, description: string) {
  const { text } = await generateText({
    model: openai('gpt-4-turbo'),
    prompt: `
      Generate a React component named ${name}.
      Description: ${description}
      
      Requirements:
      - TypeScript
      - Functional component with hooks
      - Props interface
      - JSDoc comments
      - Responsive design
    `,
  })
  
  // Write to file
  await fs.writeFile(`src/components/${name}.tsx`, text)
  console.log(`✅ Generated ${name} component`)
}
```

---

## 🎯 Best Practices

### 1. Error Handling

Always handle AI errors gracefully:

```typescript
import { generateText } from 'ai'

async function safeGenerate(prompt: string) {
  try {
    const result = await generateText({
      model: openai('gpt-4-turbo'),
      prompt,
    })
    return { success: true, text: result.text }
  } catch (error) {
    console.error('AI Error:', error)
    
    // Fallback to simpler model
    try {
      const fallback = await generateText({
        model: openai('gpt-3.5-turbo'),
        prompt,
      })
      return { success: true, text: fallback.text, fallback: true }
    } catch (fallbackError) {
      return { 
        success: false, 
        error: 'AI service temporarily unavailable' 
      }
    }
  }
}
```

### 2. Rate Limiting

Implement rate limiting to avoid API abuse:

```typescript
// lib/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 m'),
})

export async function checkRateLimit(identifier: string) {
  const { success, limit, remaining, reset } = await ratelimit.limit(identifier)
  
  return { success, limit, remaining, reset }
}
```

### 3. Prompt Engineering

Write effective prompts:

```typescript
// ❌ Bad
const prompt = "Generate code"

// ✅ Good
const prompt = `
You are an expert React developer.

Task: Generate a ${componentName} component

Requirements:
1. TypeScript with strict types
2. Functional component using hooks
3. Props interface with JSDoc
4. Responsive design (mobile-first)
5. Accessibility (ARIA labels)
6. Error boundaries
7. Loading states

Style: Use Tailwind CSS classes
Testing: Include basic tests

Context:
${additionalContext}

Output only the code, no explanations.
`
```

### 4. Cost Optimization

Minimize API costs:

```typescript
// Cache results
import { unstable_cache } from 'next/cache'

const getCachedResponse = unstable_cache(
  async (prompt: string) => {
    return await generateText({ model, prompt })
  },
  ['ai-response'],
  { revalidate: 3600 } // Cache for 1 hour
)

// Use cheaper models for simple tasks
const model = complexity === 'simple' 
  ? openai('gpt-3.5-turbo')  // Cheaper
  : openai('gpt-4-turbo')    // More capable

// Limit token usage
await generateText({
  model,
  prompt,
  maxTokens: 500,  // Limit response length
})
```

### 5. Security

Protect your API keys and endpoints:

```typescript
// middleware.ts
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  // Protect AI endpoints
  if (req.nextUrl.pathname.startsWith('/api/ai')) {
    const token = await getToken({ req })
    
    if (!token) {
      return new Response('Unauthorized', { status: 401 })
    }
  }
}
```

---

## 📚 Examples

### Example 1: AI-Powered Search

```typescript
// app/search/page.tsx
'use client'

import { useState } from 'react'
import { searchSimilar } from '@/lib/ai'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  
  const handleSearch = async () => {
    const results = await searchSimilar(query)
    setResults(results)
  }
  
  return (
    <div>
      <input 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search anything..."
      />
      <button onClick={handleSearch}>Search</button>
      
      <div className="results">
        {results.map((result) => (
          <div key={result.id}>
            <h3>{result.title}</h3>
            <p>{result.content}</p>
            <span>Similarity: {result.similarity.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
```

### Example 2: AI Code Review

```typescript
// app/api/code-review/route.ts
import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'

export async function POST(req: Request) {
  const { code, language } = await req.json()
  
  const { text } = await generateText({
    model: openai('gpt-4-turbo'),
    prompt: `
      Review this ${language} code:
      
      \`\`\`${language}
      ${code}
      \`\`\`
      
      Provide:
      1. Overall assessment
      2. Bugs or issues
      3. Performance improvements
      4. Best practice suggestions
      5. Security concerns
    `,
  })
  
  return Response.json({ review: text })
}
```

### Example 3: AI Content Generator

```typescript
// app/api/generate/route.ts
import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

export async function POST(req: Request) {
  const { type, topic, tone } = await req.json()
  
  const prompts = {
    blog: `Write a blog post about ${topic} in a ${tone} tone.`,
    social: `Create a social media post about ${topic}.`,
    email: `Write a professional email about ${topic}.`,
  }
  
  const result = await streamText({
    model: openai('gpt-4-turbo'),
    prompt: prompts[type],
    temperature: 0.8, // More creative
  })
  
  return result.toDataStreamResponse()
}
```

---

## 🚀 Next Steps

Now that you understand AI integration:

- **[📖 View Examples](examples/)** - Complete example projects
- **[🏗️ Architecture Guide](ARCHITECTURE.md)** - System design
- **[🔌 API Reference](API.md)** - Complete API docs
- **[🚢 Deployment](DEPLOYMENT.md)** - Deploy to production

---

<div align="center">

**Ready to build AI-powered features?** 🤖

[← Back to Quick Start](QUICK_START.md) | [Next: Deployment →](DEPLOYMENT.md)

</div>

