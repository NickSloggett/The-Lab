# 🚀 The Lab - Web Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.1.0-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-61dafb)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0.0-38bdf8)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22.0-2d3748)](https://prisma.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **AI-Powered Full-Stack Development Platform**
>
> A modern, scalable web application built with Next.js 15, React 19, and cutting-edge AI capabilities. Features real-time AI chat, project management, file handling, and comprehensive analytics.

## 🌟 Features

### 🤖 AI-Powered Development
- **Real-time AI Chat**: Integrated AI assistant with GPT-4o-mini and GPT-4o support
- **Smart Code Generation**: Context-aware code suggestions and implementations
- **Project Analysis**: AI-powered insights and recommendations
- **Multi-Model Support**: Switch between different AI models for various tasks

### 📊 Analytics & Insights
- **Comprehensive Dashboard**: Real-time analytics and performance metrics
- **User Behavior Tracking**: Detailed usage patterns and engagement data
- **Project Metrics**: Development velocity and productivity insights
- **Custom Reports**: Exportable analytics and visualizations

### 📁 File Management
- **Drag-and-Drop Upload**: Seamless file uploads with progress tracking
- **Cloud Storage**: Secure file storage with UploadThing integration
- **File Organization**: Intelligent categorization and search
- **Version Control**: File history and rollback capabilities

### 🔐 Enterprise-Ready Security
- **NextAuth.js Integration**: Secure authentication with multiple providers
- **Role-Based Access Control**: Granular permissions and access management
- **Data Encryption**: End-to-end encryption for sensitive data
- **Audit Logging**: Comprehensive security event tracking

## 🛠 Technology Stack

### Frontend Framework
- **Next.js 15**: App Router, Server Components, Server Actions
- **React 19**: Concurrent features, automatic batching, improved performance
- **TypeScript 5.0**: Advanced type system with module resolution

### UI & Styling
- **Tailwind CSS 4.0**: Utility-first CSS with modern features
- **Radix UI**: Accessible, unstyled UI primitives
- **Framer Motion**: Smooth animations and transitions
- **Lucide Icons**: Consistent, scalable icon system

### Backend & Database
- **Prisma ORM**: Type-safe database access with PostgreSQL
- **NextAuth.js 4**: Authentication and session management
- **Redis**: Caching and session storage
- **Socket.io**: Real-time communication

### AI & External Services
- **OpenAI API**: GPT-4o-mini and GPT-4o integration
- **Vercel AI SDK**: Streaming AI responses and tool calling
- **Resend**: Email delivery and notifications
- **UploadThing**: File upload and storage

### Development Tools
- **ESLint**: Code linting with Next.js configuration
- **Prettier**: Consistent code formatting
- **Jest**: Unit and integration testing
- **Bundle Analyzer**: Build size optimization

## 📋 Prerequisites

- **Node.js** 18.17+ (LTS recommended)
- **npm** 8.0+ or **yarn** 1.22+ or **pnpm** 6.0+
- **PostgreSQL** 13+ (for local development)
- **Redis** 6+ (for caching and sessions)
- **Git** 2.30+

## 🚀 Quick Start

### 1. Clone and Setup

```bash
# Clone the repository
git clone https://github.com/NickSloggett/The-Lab.git
cd The-Lab/web

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### 2. Environment Configuration

Create `.env.local` file:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/thelab"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-here"

# OpenAI
OPENAI_API_KEY="your-openai-api-key"

# Redis (optional, for caching)
REDIS_URL="redis://localhost:6379"
REDIS_TOKEN="your-redis-token"

# UploadThing (optional)
UPLOADTHING_SECRET="your-uploadthing-secret"
UPLOADTHING_APP_ID="your-uploadthing-app-id"

# Email (optional)
RESEND_API_KEY="your-resend-api-key"
```

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# (Optional) Seed database with sample data
npx prisma db seed
```

### 4. Development Server

```bash
# Start development server
npm run dev
# or
yarn dev
# or
pnpm dev

# Open http://localhost:3000
```

### 5. Build for Production

```bash
# Build application
npm run build

# Start production server
npm start

# Analyze bundle size
npm run analyze
```

## 📁 Project Structure

```
web/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── chat/                 # AI chat endpoints
│   │   ├── files/                # File management
│   │   ├── projects/             # Project management
│   │   └── tasks/                # Task management
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/                   # React components
│   ├── ai/                       # AI-related components
│   │   ├── ai-chat.tsx          # Main chat interface
│   │   ├── chat-tab.tsx         # Chat tab component
│   │   ├── context-tab.tsx      # Context tab
│   │   └── models-tab.tsx       # Models selection
│   ├── dashboard/                # Dashboard components
│   ├── files/                    # File management UI
│   ├── insights/                 # Analytics components
│   └── ui/                       # Reusable UI components
├── lib/                          # Utility libraries
│   ├── ai.ts                     # AI integration
│   ├── auth.ts                   # Authentication
│   ├── db.ts                     # Database client
│   ├── session.ts                # Session management
│   └── utils.ts                  # General utilities
├── prisma/                       # Database schema
│   └── schema.prisma
├── public/                       # Static assets
└── types/                        # TypeScript definitions
```

## 🎯 Key Features Deep Dive

### AI Chat System
```typescript
// Real-time streaming with caching
const response = await fetch('/api/chat', {
  method: 'POST',
  body: JSON.stringify({
    message: 'Create a React component',
    model: 'gpt-4o',
    skipCache: false  // Use caching for performance
  })
})
```

### File Upload with Progress
```typescript
import { UploadButton } from "@uploadthing/react"

<UploadButton
  endpoint="fileUploader"
  onClientUploadComplete={(res) => {
    console.log("Files uploaded:", res)
  }}
  onUploadError={(error) => {
    console.error("Upload error:", error)
  }}
/>
```

### Database Queries with Prisma
```typescript
import { prisma } from '@/lib/db'

// Type-safe database operations
const projects = await prisma.project.findMany({
  where: { userId: session.user.id },
  include: { tasks: true }
})
```

## 🔧 Development Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Production build
npm run start        # Production server
npm run preview      # Preview production build

# Code Quality
npm run lint         # ESLint check
npm run lint:fix     # Fix linting issues
npm run format       # Prettier formatting
npm run typecheck    # TypeScript type checking

# Testing
npm run test         # Run tests
npm run test:watch   # Watch mode
npm run test:coverage # Coverage report

# Database
npm run prisma:generate  # Generate Prisma client
npm run prisma:push      # Push schema changes
npm run prisma:studio    # Open Prisma Studio

# Analysis
npm run analyze      # Bundle analyzer
```

## 🚢 Deployment

### Vercel (Recommended)

1. Connect repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main

### Docker

```bash
# Build and run with Docker
docker build -t thelab-web .
docker run -p 3000:3000 thelab-web
```

### Manual Deployment

```bash
# Build for production
npm run build

# Serve static files
npx serve@latest out

# Or use any Node.js hosting service
```

## 🔍 Monitoring & Analytics

### Performance Monitoring
- **Bundle Analyzer**: Track bundle size changes
- **Core Web Vitals**: Lighthouse performance scores
- **Runtime Performance**: React DevTools profiling

### Error Tracking
- **Console Logging**: Structured JSON logging
- **Error Boundaries**: Graceful error handling
- **User Feedback**: In-app error reporting

### Analytics
- **Usage Metrics**: User engagement and feature adoption
- **Performance Metrics**: API response times and throughput
- **Conversion Tracking**: Goal completion and user journeys

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes with tests
4. Run quality checks: `npm run lint && npm run test`
5. Commit with conventional format: `git commit -m 'feat: add amazing feature'`
6. Push and open a PR

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for detailed guidelines.

## 📊 Performance Benchmarks

- **First Contentful Paint**: < 1.2s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Bundle Size**: < 500KB (gzipped)
- **Lighthouse Score**: > 95

## 🔐 Security

- **CSP Headers**: Content Security Policy implementation
- **XSS Protection**: Input sanitization and validation
- **CSRF Protection**: SameSite cookies and tokens
- **Rate Limiting**: API endpoint protection
- **Dependency Scanning**: Automated vulnerability detection

## 📚 Documentation

- [API Reference](./docs/api-reference.md)
- [Component Library](./docs/components.md)
- [Deployment Guide](./docs/deployment.md)
- [Contributing Guidelines](../../CONTRIBUTING.md)

## 🙏 Acknowledgments

Built with modern web technologies:
- [Next.js](https://nextjs.org/) - The React Framework
- [Vercel](https://vercel.com/) - Deployment platform
- [Prisma](https://prisma.io/) - Database toolkit
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Radix UI](https://radix-ui.com/) - UI primitives

---

**Made with ❤️ by Nick Sloggett**

[GitHub](https://github.com/NickSloggett) • [LinkedIn](https://linkedin.com/in/nicksloggett) • [Portfolio](https://nicksloggett.dev)
