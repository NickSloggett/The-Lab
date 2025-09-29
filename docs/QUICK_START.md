# 🚀 Quick Start Guide

> Get up and running in 5 minutes or less!

This guide will help you set up and run The Lab on your machine. We'll start with the easiest path (web app) and then cover mobile if you're interested.

---

## 📋 Prerequisites

Before we begin, make sure you have:

- **Node.js 20+** - [Download here](https://nodejs.org)
- **A code editor** - We recommend [Cursor](https://cursor.sh) or [VS Code](https://code.visualstudio.com)
- **Terminal/Command Line** - Built into your OS

**For iOS development** (optional):
- macOS with Xcode 15+
- Homebrew

**For Android development** (optional):
- Android Studio

---

## ⚡ Fastest Path: Automated Setup

```bash
# 1. Clone the repository
git clone https://github.com/NickSloggett/The-Lab.git
cd The-Lab

# 2. Run the setup script
./setup.sh

# 3. Follow the prompts!
```

The setup script will:
- ✅ Check your system
- ✅ Install dependencies
- ✅ Configure environment variables
- ✅ Set up databases
- ✅ Generate project files

**That's it!** 🎉 Skip to [What's Next](#-whats-next) section.

---

## 🔧 Manual Setup

Prefer to do it manually? Here's how:

### 1. Web App (Start Here!)

The web app is the easiest to get running:

```bash
# Navigate to web directory
cd web

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env and add your API keys
# (You can skip this for now and add them later)

# Set up database
npm run prisma:generate
npm run prisma:push

# Start development server
npm run dev
```

**Open [http://localhost:3000](http://localhost:3000)** 🎉

You should see the homepage! Try navigating around, signing up, and exploring the AI features.

#### Adding AI API Keys

To enable AI features, edit `web/.env` and add your API keys:

```bash
# Get keys from:
# OpenAI: https://platform.openai.com/api-keys
# Anthropic: https://console.anthropic.com/
# Groq: https://console.groq.com/

OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GROQ_API_KEY=gsk_...
```

Restart the dev server after adding keys.

---

### 2. iOS/macOS App (Optional)

**Requirements**: macOS with Xcode 15+

```bash
# Navigate to Apple apps directory
cd apps/apple

# Install build tools
make bootstrap

# Generate Xcode project
make generate

# Open in Xcode
open AppleApps.xcodeproj
```

In Xcode:
1. Select a target (iOSApp, macOSApp, or WatchApp)
2. Choose a simulator or device
3. Press **⌘+R** to build and run

**That's it!** The app should launch.

---

### 3. Android App (Optional)

**Requirements**: Node.js, Android Studio (or just try it on your phone!)

```bash
# Navigate to Android app directory
cd web/apps/android

# Install dependencies
npm install

# For iOS (if on Mac)
bundle install
cd ios && bundle exec pod install && cd ..

# Run on Android
npm run android

# Or iOS
npm run ios
```

This will:
- Start Metro bundler
- Build the app
- Launch on simulator/emulator or connected device

**Pro tip**: To run on a real device, connect your phone via USB and enable developer mode!

---

### 4. AI Backend (Optional)

**Requirements**: Python 3.11+, Poetry

The AI backend provides advanced features like agents and workflows:

```bash
# Navigate to AI backend
cd ai-automation-boilerplate

# Install Poetry (if not installed)
curl -sSL https://install.python-poetry.org | python3 -

# Install dependencies
poetry install

# Copy environment file
cp .env.example .env

# Edit .env and add API keys
# Add OPENAI_API_KEY, PINECONE_API_KEY, etc.

# Run the API server
poetry run uvicorn src.api:app --reload

# Or run example workflows
poetry run python examples/email_processing_workflow.py
```

API docs available at: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🐳 Docker Setup (Everything at Once)

Want to run everything with one command?

```bash
# Start all services
docker-compose up

# Or in detached mode
docker-compose up -d
```

This starts:
- 🌐 Web app on port 3000
- 🤖 AI backend on port 8000
- 🗄️ PostgreSQL database on port 5432
- 📊 Redis cache on port 6379

**Access:**
- Web: [http://localhost:3000](http://localhost:3000)
- API: [http://localhost:8000](http://localhost:8000)
- API Docs: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## ✅ Verify Everything Works

### Web App Checklist

- [ ] Homepage loads
- [ ] Can navigate between pages
- [ ] Can sign up/sign in
- [ ] AI chat interface works (if API key added)
- [ ] No errors in browser console

### Mobile App Checklist

- [ ] App launches
- [ ] Navigation works
- [ ] No build errors
- [ ] Can connect to API (check network settings)

### AI Backend Checklist

- [ ] Server starts without errors
- [ ] Can access /docs endpoint
- [ ] API endpoints respond
- [ ] Example workflows run

---

## 🎨 What's Next?

Now that everything is running, here's what you can do:

### Learn the Basics

1. **[📖 Explore the Architecture](ARCHITECTURE.md)** - Understand how it all works
2. **[🤖 AI Integration Guide](AI_GUIDE.md)** - Add AI to your features
3. **[🎨 Design System](DESIGN_SYSTEM.md)** - Customize the UI

### Build Something

1. **Add a New Page** - Start with the web app
2. **Create an AI Feature** - Chat, search, insights
3. **Customize the UI** - Make it yours!

### Example Projects

Check out `docs/examples/` for:
- **AI Chat App** - Build ChatGPT clone
- **Dashboard** - Analytics with AI insights
- **Search** - Semantic search implementation
- **Automation Bot** - Task automation

### Common Tasks

```bash
# Web: Add a new page
cd web/src/app
mkdir my-page
touch my-page/page.tsx

# Web: Add a component
cd web/src/components
mkdir my-component
touch my-component/index.tsx

# iOS: Add a new view
cd apps/apple/iOSApp
mkdir Views/MyView
touch Views/MyView/MyView.swift

# Generate types from database
cd web
npm run prisma:generate
```

---

## 🚨 Troubleshooting

### Common Issues

#### "Command not found: node"
**Solution**: Install Node.js from [nodejs.org](https://nodejs.org)

#### "Port 3000 already in use"
**Solution**: Kill the process using port 3000
```bash
# macOS/Linux
lsof -ti:3000 | xargs kill

# Or use a different port
npm run dev -- -p 3001
```

#### "Module not found" errors
**Solution**: Reinstall dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

#### iOS Build Fails
**Solution**: Clean and rebuild
```bash
cd apps/apple
make clean
make generate
# Open Xcode and Product > Clean Build Folder
```

#### Android Build Fails
**Solution**: Clean and reinstall
```bash
cd web/apps/android
cd android && ./gradlew clean && cd ..
npm start -- --reset-cache
```

#### Database Issues
**Solution**: Reset the database
```bash
cd web
rm -f prisma/dev.db
npm run prisma:push
```

#### AI API Not Working
**Solution**: Check API keys
```bash
# Make sure .env has valid keys
cat web/.env | grep API_KEY

# Test the key
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer YOUR_KEY"
```

---

## 🆘 Getting Help

If you're stuck:

1. **Check the docs** - Most answers are in `docs/`
2. **Search issues** - [GitHub Issues](https://github.com/NickSloggett/The-Lab/issues)
3. **Ask the community** - [Discord](https://discord.gg/thelab)
4. **Open an issue** - We're happy to help!

### Before Asking for Help

Please provide:
- Your OS (macOS, Windows, Linux)
- Node.js version (`node -v`)
- What you were trying to do
- Error messages (full stack trace)
- Steps to reproduce

---

## 📚 Next Steps

Ready to dive deeper?

- **[🏗️ Architecture Guide](ARCHITECTURE.md)** - System design
- **[🤖 AI Integration](AI_GUIDE.md)** - Add AI features
- **[🎨 Design System](DESIGN_SYSTEM.md)** - UI customization
- **[🔌 API Reference](API.md)** - Complete API docs
- **[🚢 Deployment](DEPLOYMENT.md)** - Go to production

---

<div align="center">

**🎉 Congratulations! You're all set up!**

Now go build something amazing! 🚀

[← Back to README](../README.md) | [Next: AI Guide →](AI_GUIDE.md)

</div>

