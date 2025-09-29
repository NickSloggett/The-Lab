# 🚀 Get Started in 5 Minutes

> The fastest way to start building with The Lab

---

## 🎯 Choose Your Path

<table>
<tr>
<td width="50%">

### 🌐 **I Want to Build a Web App**

Perfect for:
- SaaS products
- Admin dashboards
- AI chat applications
- Data visualization

**Start here:** [Web Quick Start](#-web-app-quick-start)

</td>
<td width="50%">

### 📱 **I Want to Build Mobile Apps**

Perfect for:
- iOS/Android apps
- Cross-platform tools
- Mobile-first products
- Native experiences

**Start here:** [Mobile Quick Start](#-mobile-quick-start)

</td>
</tr>
<tr>
<td width="50%">

### 🤖 **I Want AI Automation**

Perfect for:
- Background tasks
- Data processing
- AI workflows
- Automation tools

**Start here:** [AI Backend Quick Start](#-ai-backend-quick-start)

</td>
<td width="50%">

### 🎨 **I Want Everything**

Perfect for:
- Full-stack products
- Multi-platform apps
- Comprehensive solutions
- Maximum flexibility

**Start here:** [Complete Setup](#-complete-setup)

</td>
</tr>
</table>

---

## 🌐 Web App Quick Start

### 1. Setup (2 minutes)

```bash
# Clone the repository
git clone https://github.com/NickSloggett/The-Lab.git
cd The-Lab/web

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY

# Setup database
npm run prisma:generate
npm run prisma:push

# Start development server
npm run dev
```

### 2. Open Your App

Visit **[http://localhost:3000](http://localhost:3000)** 🎉

### 3. What's Next?

- ✅ Try the AI chat interface
- ✅ Customize the homepage
- ✅ Add a new page
- ✅ Deploy to Vercel

**[📖 Full Web Guide →](web/README.md)**

---

## 📱 Mobile Quick Start

### iOS/macOS (2 minutes)

```bash
cd apps/apple

# Install tools
make bootstrap

# Generate Xcode project
make generate

# Open in Xcode
open AppleApps.xcodeproj

# Press ⌘+R to run!
```

**[📖 Full iOS Guide →](apps/apple/README.md)**

### Android (2 minutes)

```bash
cd web/apps/android

# Install dependencies
npm install

# Run on Android
npm run android
```

**[📖 Full Android Guide →](web/apps/android/README.md)**

---

## 🤖 AI Backend Quick Start

### Setup (3 minutes)

```bash
cd ai-automation-boilerplate

# Install Poetry (if needed)
curl -sSL https://install.python-poetry.org | python3 -

# Install dependencies
poetry install

# Create environment file
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY

# Start API server
poetry run uvicorn src.api:app --reload
```

### 2. Test the API

Visit **[http://localhost:8000/docs](http://localhost:8000/docs)** for API documentation

### 3. Run Example Workflow

```bash
poetry run python examples/email_processing_workflow.py
```

**[📖 Full AI Backend Guide →](ai-automation-boilerplate/README.md)**

---

## 🎪 Complete Setup

### One-Command Magic

```bash
# Clone the repository
git clone https://github.com/NickSloggett/The-Lab.git
cd The-Lab

# Run the setup script
chmod +x setup.sh
./setup.sh

# Follow the interactive prompts!
```

The setup script will:
- ✅ Check your system
- ✅ Install all dependencies
- ✅ Configure environments
- ✅ Setup databases
- ✅ Guide you through API keys

### What Gets Installed?

- 🌐 **Web App** on [localhost:3000](http://localhost:3000)
- 🤖 **AI Backend** on [localhost:8000](http://localhost:8000)
- 📱 **Mobile Apps** ready to run
- 🗄️ **Database** configured
- 🔧 **All tools** installed

---

## 🆘 Having Issues?

### Common Problems

<details>
<summary><b>"Port 3000 already in use"</b></summary>

```bash
# Kill the process
npx kill-port 3000

# Or use a different port
npm run dev -- -p 3001
```
</details>

<details>
<summary><b>"Command not found: node"</b></summary>

Install Node.js from [nodejs.org](https://nodejs.org)

```bash
# Or use Homebrew (macOS)
brew install node
```
</details>

<details>
<summary><b>"Module not found" errors</b></summary>

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```
</details>

<details>
<summary><b>"Prisma errors"</b></summary>

```bash
# Reset database
rm prisma/dev.db
npm run prisma:push
```
</details>

<details>
<summary><b>"Xcode build failed"</b></summary>

```bash
cd apps/apple
make clean
make generate
# Then try building again in Xcode
```
</details>

### Still Stuck?

- 📖 **[Full Troubleshooting Guide](docs/TROUBLESHOOTING.md)**
- 💬 **[Ask on Discord](https://discord.gg/thelab)**
- 🐛 **[Open an Issue](https://github.com/NickSloggett/The-Lab/issues)**

---

## 🎓 Learn More

### Essential Reading

1. **[🚀 Quick Start Guide](docs/QUICK_START.md)** - Detailed setup instructions
2. **[🤖 AI Integration Guide](docs/AI_GUIDE.md)** - Add AI to your features
3. **[🎨 Vibe Coding Guide](docs/VIBE_CODING_GUIDE.md)** - Maximize productivity

### Platform-Specific

- **[🌐 Web Development](web/README.md)** - Next.js, React, TypeScript
- **[📱 Mobile Development](docs/MOBILE.md)** - iOS, Android, React Native
- **[🤖 AI Backend](ai-automation-boilerplate/README.md)** - Python, FastAPI, Agents

### Advanced Topics

- **[🏗️ Architecture](docs/ARCHITECTURE.md)** - System design
- **[🚢 Deployment](docs/DEPLOYMENT.md)** - Go to production
- **[🧪 Testing](docs/TESTING.md)** - Testing strategies
- **[🤝 Contributing](CONTRIBUTING.md)** - Contribute to The Lab

---

## 🎯 Quick Reference

### Useful Commands

```bash
# Web Development
cd web
npm run dev          # Start dev server
npm run build        # Build for production
npm test            # Run tests
npm run lint        # Check code quality

# iOS Development
cd apps/apple
make generate       # Generate Xcode project
make test          # Run tests
make lint          # Check code

# AI Backend
cd ai-automation-boilerplate
poetry run uvicorn src.api:app --reload  # Start API
poetry run pytest                        # Run tests

# Docker (Everything)
docker-compose up   # Start all services
```

### File Locations

```
The-Lab/
├── web/                    # Web app
│   ├── src/app/           # Pages
│   ├── src/components/    # Components
│   └── .env              # Configuration
├── apps/apple/            # iOS/macOS
│   ├── iOSApp/           # iOS code
│   └── SharedKit/        # Shared code
├── web/apps/android/     # Android (React Native)
└── ai-automation-boilerplate/  # AI backend
    ├── src/agents/       # AI agents
    └── examples/         # Example workflows
```

---

## ✨ What to Build First?

### Beginner Projects

1. **📝 Todo App with AI** - Classic app with AI suggestions
2. **💬 Chat Application** - Real-time chat with AI responses
3. **📊 Personal Dashboard** - Track your metrics with AI insights

### Intermediate Projects

1. **🤖 Customer Support Bot** - AI-powered support system
2. **📈 Analytics Platform** - Data viz with AI analysis
3. **🔍 Semantic Search Engine** - Vector search application

### Advanced Projects

1. **🏢 Multi-Tenant SaaS** - Complete SaaS platform
2. **🤖 AI Agent Platform** - Build and deploy AI agents
3. **📱 Full-Stack Mobile App** - Native mobile with cloud backend

---

## 💡 Pro Tips

### 1. Start Simple
```bash
# ✅ Start here
cd web && npm run dev

# ❌ Don't try to run everything at once initially
```

### 2. Use What's Built
```typescript
// ✅ Use included components
import { AIChatInterface } from '@/components/ai/chat-interface'

// ❌ Don't rebuild from scratch
```

### 3. Ship Fast
```bash
# Deploy to Vercel in 2 minutes
cd web
vercel --prod
```

### 4. Get Help
- Discord community
- GitHub issues
- Documentation

---

## 🌟 Success Stories

> *"Went from zero to deployed AI chat app in 30 minutes!"*
> — Developer using The Lab

> *"Finally, a boilerplate that actually works out of the box."*
> — Another happy developer

> *"The documentation is incredible. Everything just makes sense."*
> — Designer learning to code

---

## 🎉 You're Ready!

Pick a path above and start building. Remember:

- ✅ **Setup is quick** - 5 minutes or less
- ✅ **Everything works** - Tested and production-ready
- ✅ **You're not alone** - Community support available
- ✅ **Ship fast** - Deploy in minutes

---

<div align="center">

## 🚀 Let's Build Something Amazing!

**Choose your path:**

[🌐 Web App](web/README.md) | [📱 Mobile](docs/MOBILE.md) | [🤖 AI Backend](ai-automation-boilerplate/README.md) | [📖 Full Docs](docs/QUICK_START.md)

---

**Need help?** [Discord](https://discord.gg/thelab) | [GitHub Issues](https://github.com/NickSloggett/The-Lab/issues) | [Documentation](docs/)

**[⭐ Star on GitHub](https://github.com/NickSloggett/The-Lab)** if this helped you!

---

*Built with ❤️ for developers who want to ship fast*

</div>

