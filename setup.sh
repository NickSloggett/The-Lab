#!/bin/bash

# 🎪 The Lab - One-Command Setup Script
# Sets up web, iOS, and Android development environments

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Emoji support
CHECK_MARK="✅"
ROCKET="🚀"
WRENCH="🔧"
PARTY="🎉"
WARNING="⚠️"
ROBOT="🤖"

# Banner
echo ""
echo "${BLUE}╔═══════════════════════════════════════════════════╗${NC}"
echo "${BLUE}║                                                   ║${NC}"
echo "${BLUE}║  ${ROCKET}  ${GREEN}The Lab - AI-Powered Boilerplate Setup${BLUE}   ║${NC}"
echo "${BLUE}║                                                   ║${NC}"
echo "${BLUE}╚═══════════════════════════════════════════════════╝${NC}"
echo ""

# Check prerequisites
echo "${BLUE}${WRENCH} Checking prerequisites...${NC}"
echo ""

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo "${CHECK_MARK} Node.js ${NODE_VERSION} found"
else
    echo "${RED}${WARNING} Node.js not found. Please install Node.js 20+ from https://nodejs.org${NC}"
    exit 1
fi

# Check npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo "${CHECK_MARK} npm ${NPM_VERSION} found"
else
    echo "${RED}${WARNING} npm not found${NC}"
    exit 1
fi

# Check Git
if command -v git &> /dev/null; then
    GIT_VERSION=$(git --version | cut -d' ' -f3)
    echo "${CHECK_MARK} Git ${GIT_VERSION} found"
else
    echo "${RED}${WARNING} Git not found. Please install Git from https://git-scm.com${NC}"
    exit 1
fi

# Check for macOS (for iOS development)
IS_MACOS=false
if [[ "$OSTYPE" == "darwin"* ]]; then
    IS_MACOS=true
    echo "${CHECK_MARK} macOS detected - iOS development available"
    
    # Check Xcode
    if command -v xcodebuild &> /dev/null; then
        XCODE_VERSION=$(xcodebuild -version | head -1 | cut -d' ' -f2)
        echo "${CHECK_MARK} Xcode ${XCODE_VERSION} found"
    else
        echo "${YELLOW}${WARNING} Xcode not found - iOS development will be skipped${NC}"
    fi
    
    # Check Homebrew
    if command -v brew &> /dev/null; then
        echo "${CHECK_MARK} Homebrew found"
    else
        echo "${YELLOW}${WARNING} Homebrew not found - Install from https://brew.sh for iOS setup${NC}"
    fi
fi

echo ""
echo "${GREEN}${CHECK_MARK} All prerequisites met!${NC}"
echo ""

# Ask what to set up
echo "${BLUE}What would you like to set up?${NC}"
echo ""
echo "1) ${ROBOT} Everything (Web + Mobile + AI Backend)"
echo "2) 🌐 Web App only"
echo "3) 📱 Mobile Apps only (iOS + Android)"
echo "4) 🤖 AI Backend only"
echo "5) ⚙️  Custom (choose individually)"
echo ""
read -p "Enter your choice (1-5): " setup_choice

SETUP_WEB=false
SETUP_IOS=false
SETUP_ANDROID=false
SETUP_AI=false

case $setup_choice in
    1)
        SETUP_WEB=true
        SETUP_IOS=$IS_MACOS
        SETUP_ANDROID=true
        SETUP_AI=true
        ;;
    2)
        SETUP_WEB=true
        ;;
    3)
        SETUP_IOS=$IS_MACOS
        SETUP_ANDROID=true
        ;;
    4)
        SETUP_AI=true
        ;;
    5)
        read -p "Set up Web App? (y/n): " choice
        [[ $choice == "y" ]] && SETUP_WEB=true
        
        if [[ $IS_MACOS == true ]]; then
            read -p "Set up iOS/macOS Apps? (y/n): " choice
            [[ $choice == "y" ]] && SETUP_IOS=true
        fi
        
        read -p "Set up Android App? (y/n): " choice
        [[ $choice == "y" ]] && SETUP_ANDROID=true
        
        read -p "Set up AI Backend? (y/n): " choice
        [[ $choice == "y" ]] && SETUP_AI=true
        ;;
    *)
        echo "${RED}Invalid choice${NC}"
        exit 1
        ;;
esac

echo ""
echo "${BLUE}${WRENCH} Setting up your project...${NC}"
echo ""

# Setup Web App
if [[ $SETUP_WEB == true ]]; then
    echo "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo "${BLUE}🌐 Setting up Web App${NC}"
    echo "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    
    cd web
    
    echo "📦 Installing dependencies..."
    npm install --silent
    echo "${CHECK_MARK} Dependencies installed"
    
    # Create .env if it doesn't exist
    if [ ! -f .env ]; then
        echo ""
        echo "${YELLOW}${WRENCH} Configuring environment variables...${NC}"
        
        if [ -f .env.example ]; then
            cp .env.example .env
            echo "${CHECK_MARK} Created .env file from template"
        else
            # Create basic .env
            cat > .env << EOL
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-change-in-production

# AI API Keys
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
GROQ_API_KEY=

# Optional: Email
RESEND_API_KEY=

# Optional: File Upload
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
EOL
            echo "${CHECK_MARK} Created basic .env file"
        fi
        
        echo ""
        echo "${YELLOW}${ROBOT} AI API Configuration${NC}"
        echo "To enable AI features, you need at least one API key:"
        echo ""
        read -p "OpenAI API Key (optional, press Enter to skip): " openai_key
        if [ ! -z "$openai_key" ]; then
            sed -i.bak "s/OPENAI_API_KEY=.*/OPENAI_API_KEY=$openai_key/" .env && rm .env.bak
            echo "${CHECK_MARK} OpenAI API key configured"
        fi
        
        read -p "Anthropic API Key (optional, press Enter to skip): " anthropic_key
        if [ ! -z "$anthropic_key" ]; then
            sed -i.bak "s/ANTHROPIC_API_KEY=.*/ANTHROPIC_API_KEY=$anthropic_key/" .env && rm .env.bak
            echo "${CHECK_MARK} Anthropic API key configured"
        fi
        
        echo ""
        echo "${YELLOW}💡 You can add more API keys later by editing web/.env${NC}"
    else
        echo "${CHECK_MARK} .env file already exists"
    fi
    
    echo ""
    echo "🗄️  Setting up database..."
    npm run prisma:generate --silent
    npm run prisma:push --silent 2>&1 | grep -v "warn" || true
    echo "${CHECK_MARK} Database configured"
    
    cd ..
    
    echo ""
    echo "${GREEN}${CHECK_MARK} Web app setup complete!${NC}"
    echo ""
fi

# Setup iOS/macOS Apps
if [[ $SETUP_IOS == true ]]; then
    echo "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo "${BLUE}📱 Setting up iOS/macOS Apps${NC}"
    echo "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    
    cd apps/apple
    
    echo "🔧 Installing development tools..."
    make bootstrap 2>&1 | grep -v "Already installed" || true
    echo "${CHECK_MARK} Tools installed"
    
    echo ""
    echo "🏗️  Generating Xcode project..."
    make generate --silent
    echo "${CHECK_MARK} Xcode project generated"
    
    cd ../..
    
    echo ""
    echo "${GREEN}${CHECK_MARK} iOS/macOS setup complete!${NC}"
    echo ""
fi

# Setup Android App
if [[ $SETUP_ANDROID == true ]]; then
    echo "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo "${BLUE}🤖 Setting up Android App${NC}"
    echo "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    
    cd web/apps/android
    
    echo "📦 Installing dependencies..."
    npm install --silent
    echo "${CHECK_MARK} Dependencies installed"
    
    # Only install pods if on macOS
    if [[ $IS_MACOS == true ]]; then
        echo ""
        echo "🍎 Setting up iOS dependencies..."
        if [ ! -f "Gemfile" ]; then
            echo "source 'https://rubygems.org'" > Gemfile
            echo "gem 'cocoapods', '~> 1.13'" >> Gemfile
        fi
        bundle install --quiet
        cd ios && bundle exec pod install --silent && cd ..
        echo "${CHECK_MARK} iOS dependencies installed"
    fi
    
    cd ../../..
    
    echo ""
    echo "${GREEN}${CHECK_MARK} Android app setup complete!${NC}"
    echo ""
fi

# Setup AI Backend
if [[ $SETUP_AI == true ]]; then
    echo "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo "${BLUE}🤖 Setting up AI Backend${NC}"
    echo "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    
    cd ai-automation-boilerplate
    
    # Check if Poetry is installed
    if command -v poetry &> /dev/null; then
        echo "📦 Installing Python dependencies..."
        poetry install --quiet
        echo "${CHECK_MARK} Dependencies installed"
    else
        echo "${YELLOW}${WARNING} Poetry not found. Install with: curl -sSL https://install.python-poetry.org | python3 -${NC}"
        echo "${YELLOW}Skipping Python dependencies...${NC}"
    fi
    
    # Create .env if needed
    if [ ! -f .env ]; then
        if [ -f .env.example ]; then
            cp .env.example .env
            echo "${CHECK_MARK} Created .env file"
        fi
    fi
    
    cd ..
    
    echo ""
    echo "${GREEN}${CHECK_MARK} AI backend setup complete!${NC}"
    echo ""
fi

# Summary
echo ""
echo "${GREEN}╔═══════════════════════════════════════════════════╗${NC}"
echo "${GREEN}║                                                   ║${NC}"
echo "${GREEN}║  ${PARTY}  ${GREEN}Setup Complete! You're ready to go!${GREEN}     ║${NC}"
echo "${GREEN}║                                                   ║${NC}"
echo "${GREEN}╚═══════════════════════════════════════════════════╝${NC}"
echo ""

echo "${BLUE}${ROCKET} Next Steps:${NC}"
echo ""

if [[ $SETUP_WEB == true ]]; then
    echo "${BLUE}🌐 Web App:${NC}"
    echo "   cd web && npm run dev"
    echo "   Open http://localhost:3000"
    echo ""
fi

if [[ $SETUP_IOS == true ]]; then
    echo "${BLUE}📱 iOS/macOS App:${NC}"
    echo "   cd apps/apple"
    echo "   open AppleApps.xcodeproj"
    echo "   Press ⌘+R to run"
    echo ""
fi

if [[ $SETUP_ANDROID == true ]]; then
    echo "${BLUE}🤖 Android App:${NC}"
    echo "   cd web/apps/android"
    echo "   npm run android  # or npm run ios"
    echo ""
fi

if [[ $SETUP_AI == true ]]; then
    echo "${BLUE}🤖 AI Backend:${NC}"
    echo "   cd ai-automation-boilerplate"
    echo "   poetry run uvicorn src.api:app --reload"
    echo ""
fi

echo "${BLUE}📚 Documentation:${NC}"
echo "   • Quick Start: docs/QUICK_START.md"
echo "   • AI Guide: docs/AI_GUIDE.md"
echo "   • API Docs: docs/API.md"
echo ""

echo "${BLUE}💡 Tips:${NC}"
echo "   • Add AI API keys in web/.env to enable AI features"
echo "   • Run ${GREEN}docker-compose up${NC} to start everything at once"
echo "   • Check README.md for detailed guides"
echo ""

echo "${GREEN}${PARTY} Happy coding! Build something amazing!${NC}"
echo ""

