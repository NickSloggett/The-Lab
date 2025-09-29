# 🎨 Vibe Coding Guide

> Build with flow, ship with confidence

This guide is designed to help you achieve peak productivity and enjoyment while coding with The Lab. It's optimized for AI-assisted development and "vibe coding" - that magical state where everything just flows.

---

## 🌊 What is Vibe Coding?

**Vibe coding** is about:
- ✨ Fast iteration without friction
- 🤖 Leveraging AI to handle boilerplate
- 🎨 Focusing on creativity, not configuration
- 🚀 Shipping features, not fighting tooling
- 😊 Enjoying the process

---

## 🚀 Quick Wins

### 1. Use the Setup Script

```bash
./setup.sh
```

One command, everything configured. No thinking required.

### 2. Start with Templates

Don't start from scratch - use what's already there:

```bash
# Web page from template
cp web/src/app/dashboard/page.tsx web/src/app/my-feature/page.tsx

# iOS view from template
cp apps/apple/iOSApp/Views/ChatView.swift apps/apple/iOSApp/Views/MyView.swift
```

### 3. Let AI Write Boilerplate

Use Cursor/Copilot for repetitive code:

```typescript
// Type a comment and let AI complete:

// Create a user profile card component with name, avatar, and bio
// [AI will generate the component]
```

---

## 🤖 AI-Assisted Development

### Using Cursor/Copilot Effectively

**1. Start with Clear Comments**

```typescript
// ✅ Good: Specific and clear
// Create a responsive dashboard with 4 metric cards showing:
// - Total users (with percentage change)
// - Revenue (formatted as currency)
// - Active sessions (with live indicator)
// - Conversion rate (as percentage with trend arrow)

// ❌ Bad: Vague
// Make a dashboard
```

**2. Build Incrementally**

```typescript
// Step 1: Basic structure
export function Dashboard() {
  return <div>Dashboard</div>
}

// Step 2: Add metrics (ask AI to add)
// Add 4 metric cards with sample data

// Step 3: Add interactivity (ask AI to add)
// Make cards clickable and show details modal

// Step 4: Add real data (ask AI to add)
// Connect to API endpoint /api/metrics
```

**3. Use AI for Refactoring**

```typescript
// Select code and ask:
// "Refactor this to use TypeScript strict types"
// "Extract this into a reusable hook"
// "Add error handling and loading states"
// "Make this component more accessible"
```

---

## 🎯 The Vibe Coding Workflow

### Morning Setup (5 min)

```bash
# 1. Start services
cd web && npm run dev &
cd ai-automation-boilerplate && poetry run uvicorn src.api:app --reload &

# 2. Open editors
cursor .
open apps/apple/AppleApps.xcodeproj

# 3. Plan your day
# Write 3 things you want to ship today in a comment:
# TODO: 
# - [ ] Add user profile page
# - [ ] Implement AI chat
# - [ ] Deploy to staging
```

### Feature Development (2-3 hours)

**Phase 1: Plan (5 min)**
```typescript
/**
 * Feature: User Profile
 * 
 * Requirements:
 * - Display user info (name, email, avatar)
 * - Allow editing
 * - Save to database
 * - Show loading/error states
 * 
 * Components needed:
 * - ProfileView (main component)
 * - ProfileForm (edit form)
 * - Avatar (image with upload)
 */
```

**Phase 2: Build (1-2 hours)**
```bash
# Let AI help with structure
# Type: "Create ProfileView component following the plan above"

# Build incrementally
# 1. Static version
# 2. Add state
# 3. Add API calls
# 4. Add error handling
# 5. Polish UI
```

**Phase 3: Test (30 min)**
```bash
# Manual testing
# Try all user flows

# Automated testing (let AI write tests)
# "Write tests for ProfileView component"
npm test
```

**Phase 4: Ship (10 min)**
```bash
git add .
git commit -m "feat: add user profile page"
git push
# Auto-deploys on push!
```

### Afternoon Polish (1-2 hours)

- 🎨 Refine UI/UX
- 📝 Write documentation
- 🧪 Add tests
- 🐛 Fix bugs
- ✨ Add delightful details

---

## ⚡ Speed Tips

### 1. Use Aliases

Add to your `.zshrc` or `.bashrc`:

```bash
# Quick navigation
alias lab="cd ~/The-Lab"
alias web="cd ~/The-Lab/web"
alias ios="cd ~/The-Lab/apps/apple"

# Quick start
alias start-web="cd ~/The-Lab/web && npm run dev"
alias start-ai="cd ~/The-Lab/ai-automation-boilerplate && poetry run uvicorn src.api:app --reload"

# Quick commands
alias gen="npm run ai:generate"
alias test-all="npm test && cd apps/apple && make test && cd ../.."
```

### 2. Keyboard Shortcuts

**Cursor:**
- `Cmd+K`: AI chat
- `Cmd+L`: AI edit
- `Cmd+Shift+L`: AI explain
- `Cmd+I`: AI insert

**Xcode:**
- `Cmd+R`: Build & run
- `Cmd+B`: Build
- `Cmd+U`: Run tests
- `Cmd+Shift+K`: Clean

### 3. Snippets

Create custom snippets for common patterns:

**VS Code/Cursor** (`.vscode/snippets.code-snippets`):

```json
{
  "React Component": {
    "prefix": "rfc",
    "body": [
      "interface ${1:Component}Props {",
      "  $2",
      "}",
      "",
      "export function ${1:Component}({ $3 }: ${1:Component}Props) {",
      "  return (",
      "    <div>",
      "      $0",
      "    </div>",
      "  )",
      "}"
    ]
  }
}
```

---

## 🎨 UI Development Flow

### 1. Start with shadcn/ui

Don't build from scratch:

```bash
# Add components as needed
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
```

### 2. Use Tailwind Utilities

```typescript
// ✅ Quick and easy
<div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
  
// ❌ Avoid custom CSS files when possible
```

### 3. Copy-Paste-Modify

Find similar components and adapt:

```bash
# Find all button usages
rg "Button" --type tsx

# Copy and modify
cp src/components/ui/button.tsx src/components/ui/icon-button.tsx
```

---

## 🤖 AI Features Fast Track

### Add AI Chat (5 min)

```typescript
import { AIChatInterface } from '@/components/ai/chat-interface'

export default function Page() {
  return <AIChatInterface model="gpt-4-turbo" />
}
```

### Add AI Insights (10 min)

```typescript
import { AIInsights } from '@/components/ai/insights'

export default function Dashboard() {
  const data = useData()
  return (
    <div>
      <h1>Dashboard</h1>
      <AIInsights data={data} />
    </div>
  )
}
```

### Add Vector Search (15 min)

```typescript
// 1. Store content
import { storeEmbedding } from '@/lib/ai'
await storeEmbedding('doc-1', 'content')

// 2. Search
import { searchSimilar } from '@/lib/ai'
const results = await searchSimilar('query')
```

---

## 🚀 Deployment Fast Track

### Web App (2 min)

```bash
cd web
vercel --prod
```

### AI Backend (5 min)

```bash
cd ai-automation-boilerplate
railway up
```

### Mobile Apps (10 min)

**iOS:**
1. Product → Archive
2. Window → Organizer → Distribute
3. Upload to TestFlight

**Android:**
```bash
cd web/apps/android
npm run build:android
# Upload to Play Console
```

---

## 💡 Pro Tips

### 1. Keep It Simple

```typescript
// ✅ Simple and clear
const user = await db.user.findUnique({ where: { id } })
if (!user) throw new Error('Not found')

// ❌ Over-engineered
class UserRepository {
  constructor(private db: Database) {}
  async findById(id: string): Promise<Result<User, UserError>> {
    // 50 lines of abstraction...
  }
}
```

### 2. Iterate Fast

```
Build → Ship → Get Feedback → Improve
```

Don't wait for perfection. Ship and iterate.

### 3. Use What's There

The Lab includes:
- ✅ Authentication → Use it
- ✅ Database → Use it
- ✅ AI components → Use them
- ✅ UI components → Use them

Don't rebuild what's already built.

### 4. Document as You Go

```typescript
// ✅ Good
/**
 * Processes user signup with email verification
 * 
 * Flow:
 * 1. Validate email
 * 2. Create user in database
 * 3. Send verification email
 * 4. Return success
 */
export async function signup(email: string) {
  // Implementation
}

// ❌ Leaves future you confused
export async function signup(email: string) {
  // Some complex logic
}
```

### 5. Take Breaks

- ⏰ 25 min work → 5 min break (Pomodoro)
- 🚶 Walk after each feature
- 💧 Stay hydrated
- 😊 Enjoy the process!

---

## 🎯 Daily Rituals

### Morning (Start Strong)

```bash
# 1. Fresh start
git pull
npm install  # Update dependencies

# 2. Clear goals
# Write down 3 things to ship today

# 3. Quick wins
# Start with easiest task for momentum
```

### Afternoon (Peak Productivity)

```bash
# 1. Deep work on hardest problem
# 2. Use AI for heavy lifting
# 3. Take breaks
```

### Evening (Wind Down)

```bash
# 1. Ship what you built
git push

# 2. Document decisions
# Write quick notes about what you learned

# 3. Plan tomorrow
# Write 3 things for tomorrow
```

---

## 🎨 Staying in Flow

### When You're Stuck

1. **Talk to AI**: Explain your problem to Cursor/Copilot
2. **Take a Walk**: Fresh perspective
3. **Simplify**: Maybe you're overthinking
4. **Ask for Help**: Discord, GitHub discussions

### When You're Tired

1. **Switch Tasks**: Frontend → Backend, Code → Docs
2. **Easy Wins**: Fix small bugs, improve UI
3. **Learn**: Watch tutorial, read docs
4. **Rest**: Best investment for tomorrow

### When You're Excited

1. **Ship Quick Wins**: Take advantage of the energy
2. **But Don't Overcommit**: Maintain sustainability
3. **Document Ideas**: Write them down for later
4. **Share**: Show off your work!

---

## 🌟 The Vibe Coding Mindset

### ✅ Do

- Ship often
- Use AI assistance
- Keep it simple
- Have fun
- Iterate fast
- Learn continuously

### ❌ Avoid

- Perfectionism
- Over-engineering
- Analysis paralysis
- Burnout
- Comparison
- Scope creep

---

## 📚 Resources

- **[Quick Start](QUICK_START.md)** - Get running fast
- **[AI Guide](AI_GUIDE.md)** - Master AI features
- **[Examples](examples/)** - Copy-paste solutions
- **[Discord](https://discord.gg/thelab)** - Community help

---

<div align="center">

## 🎉 Now Go Build Something Amazing!

**Remember:** The best code is code that ships.

*Stay in the flow, trust the process, ship with confidence.*

[← Back to README](../README.md)

</div>

