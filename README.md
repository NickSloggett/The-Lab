# 🧪 The Lab - Multi-Platform Development Boilerplate

> **Your launchpad for building beautiful apps across Apple platforms and the web**
>
> Perfect for designers learning to code, developers who want solid foundations, and teams building cross-platform products.

[![iOS](https://img.shields.io/badge/iOS-16.0+-blue.svg)](https://developer.apple.com/ios/)
[![macOS](https://img.shields.io/badge/macOS-13.0+-blue.svg)](https://developer.apple.com/macos/)
[![watchOS](https://img.shields.io/badge/watchOS-10.0+-blue.svg)](https://developer.apple.com/watchos/)
[![Swift](https://img.shields.io/badge/Swift-5.9-orange.svg)](https://swift.org)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## ✨ What's Inside

### 🍎 Apple Platforms (iOS, iPadOS, macOS, watchOS)

A **world-class boilerplate** for native Apple development:

- 🎨 **Designer-Friendly**: Comprehensive docs for designers learning to code
- 🏗️ **Modern Architecture**: SwiftUI + MVVM + Swift Package Manager
- 📱 **Multi-Platform**: One codebase, four platforms with platform-specific optimizations
- 🎯 **Production-Ready**: Networking, state management, error handling, and testing
- 📚 **Thoroughly Documented**: Step-by-step guides, examples, and best practices
- 🧪 **Well-Tested**: Example tests and testing patterns included
- 🎨 **Design System**: Consistent colors, typography, spacing, and components
- 🚀 **CI/CD Ready**: GitHub Actions workflows for automated building and testing

**[→ Explore Apple Apps](apps/apple/)**

### 🌐 Web Application

A modern Next.js web application:

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** + **shadcn/ui** for beautiful UI
- **Prisma** for database management
- **NextAuth** for authentication
- **API routes** with proper structure

**[→ Explore Web App](web/)**

---

## 🚀 Quick Start

### Apple Platforms (Recommended)

Perfect starting point for iOS/macOS development:

```bash
# 1. Clone the repository
git clone https://github.com/NickSloggett/MobileApp.git
cd MobileApp

# 2. Navigate to Apple apps
cd apps/apple

# 3. Install dependencies (requires Homebrew)
make bootstrap

# 4. Generate Xcode project
make generate

# 5. Open in Xcode
open AppleApps.xcodeproj

# 6. Press ⌘+R to run!
```

**[📖 Detailed Setup Guide for Apple →](apps/apple/README.md)**

### Web Application

```bash
# 1. Navigate to web directory
cd web

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev

# 4. Open http://localhost:3000
```

**[📖 Web App Documentation →](web/README.md)**

---

## 📖 Documentation

### For Designers Learning to Code

Start your coding journey here! 👋

1. **[Getting Started for Designers](apps/apple/docs/GETTING_STARTED_DESIGNERS.md)**
   - Understanding Xcode and SwiftUI
   - Your first modifications
   - Colors, typography, and layout basics
   - Building confidence with code

2. **[SwiftUI Visual Guide](apps/apple/docs/SWIFTUI_VISUAL_GUIDE.md)**
   - Complete component gallery with examples
   - Layout patterns explained visually
   - Navigation and animations
   - Copy-paste ready code

3. **[Design System Guide](apps/apple/docs/DESIGN_SYSTEM.md)**
   - Colors and dark mode support
   - Typography system
   - Consistent spacing
   - Component styles

### For Developers

Build production-ready apps:

1. **[Architecture Overview](apps/apple/docs/ARCHITECTURE.md)**
   - MVVM pattern explained
   - Project structure
   - Dependency injection
   - State management

2. **[Code Examples](apps/apple/docs/EXAMPLES.md)**
   - Real-world examples
   - Common patterns
   - Advanced techniques
   - Best practices

3. **[Contributing Guide](apps/apple/CONTRIBUTING.md)**
   - How to contribute
   - Coding standards
   - Pull request process
   - Testing requirements

---

## 🛠️ What Makes This Special

### Comprehensive Design System

```swift
// Semantic colors that work in light and dark mode
Text("Hello")
    .foregroundColor(.Brand.primaryFallback)
    .background(.Surface.card)

// Consistent spacing
VStack(spacing: .Spacing.md) {
    // Content
}
.paddingLG()

// Beautiful UI components
CardView {
    ProfileHeaderView(
        name: "John Doe",
        subtitle: "iOS Developer"
    )
}
```

### Example Apps Included

Each platform includes a beautiful example app showcasing:

- ✅ **iOS**: Tab-based app with components gallery
- ✅ **macOS**: Sidebar navigation with split view
- ✅ **watchOS**: Simple, watch-optimized interface
- ✅ **Web**: Full-featured Next.js application

### Best Practices Built-In

- **Type-safe networking** with async/await
- **Proper error handling** and loading states
- **Accessibility support** out of the box
- **Dark mode** support everywhere
- **Unit tests** and testing patterns
- **CI/CD** workflows ready to use

---

## 📁 Project Structure

```
The-Lab/
├── 📱 apps/
│   ├── apple/                    # iOS, macOS, watchOS apps ⭐
│   │   ├── SharedKit/           # Shared Swift package
│   │   │   ├── DesignSystem/   # Colors, typography, spacing
│   │   │   ├── UI/             # Reusable components
│   │   │   ├── Networking/     # HTTP client
│   │   │   ├── Models/         # Data models
│   │   │   └── Utilities/      # Helpers and extensions
│   │   ├── iOSApp/             # iOS-specific code
│   │   ├── macOSApp/           # macOS-specific code
│   │   ├── WatchApp/           # watchOS app
│   │   └── docs/               # Comprehensive documentation
│   │
│   └── android/                 # React Native Android app
│
├── 🌐 web/                       # Next.js web application
│   ├── src/
│   │   ├── app/                # App Router pages
│   │   ├── components/         # React components
│   │   └── lib/               # Utilities
│   └── prisma/                # Database schema
│
├── 📚 Trading-Repo/             # Trading algorithms & indicators
│
└── .github/
    └── workflows/              # CI/CD pipelines
```

---

## 🎨 Design Philosophy

This boilerplate follows Apple's Human Interface Guidelines and modern web best practices:

1. **Clarity** - Clear visual hierarchy and purposeful interactions
2. **Consistency** - Predictable behavior across all platforms
3. **Feedback** - Clear responses to user actions
4. **Accessibility** - Usable by everyone
5. **Beauty** - Visually appealing and delightful

---

## 🧪 Testing

### Running Tests

```bash
# Apple platforms
cd apps/apple
make test

# Web
cd web
npm test
```

### What's Tested

- ✅ Models and data structures
- ✅ Utility functions and extensions
- ✅ Business logic and view models
- ✅ API client and networking
- ✅ UI components (where applicable)

**[→ Testing Guide](apps/apple/docs/TESTING.md)**

---

## 🤝 Contributing

We welcome contributions! Whether you're:

- 🐛 Fixing bugs
- ✨ Adding features
- 📝 Improving documentation
- 🎨 Enhancing design
- 🧪 Writing tests

**[→ Read Contributing Guide](apps/apple/CONTRIBUTING.md)**

---

## 📚 Learning Resources

### Official Documentation

- [Apple Developer Documentation](https://developer.apple.com/documentation/)
- [SwiftUI Tutorials](https://developer.apple.com/tutorials/swiftui)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)

### Free Courses

- [100 Days of SwiftUI](https://www.hackingwithswift.com/100/swiftui) by Paul Hudson
- [Stanford CS193p](https://cs193p.sites.stanford.edu) - Developing Apps for iOS
- [Next.js Tutorial](https://nextjs.org/learn) - Official Next.js course

### Communities

- [Swift Forums](https://forums.swift.org)
- [r/SwiftUI](https://reddit.com/r/SwiftUI)
- [r/iOSProgramming](https://reddit.com/r/iOSProgramming)
- [Next.js Discord](https://nextjs.org/discord)

---

## 🎯 Use Cases

This boilerplate is perfect for:

- 📱 **Mobile Apps**: Build native iOS and Android apps
- 💻 **Desktop Apps**: Create macOS applications
- ⌚ **Wearables**: Develop for Apple Watch
- 🌐 **Web Apps**: Launch web applications
- 🎓 **Learning**: Study modern development practices
- 🚀 **Startups**: Rapid prototyping and MVP development
- 🏢 **Enterprise**: Foundation for internal tools

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

You're free to use this boilerplate for:
- ✅ Personal projects
- ✅ Commercial applications
- ✅ Learning and education
- ✅ Client work

---

## 🙏 Acknowledgments

Built with these amazing tools and libraries:

### Apple Platforms

- **[SwiftUI](https://developer.apple.com/xcode/swiftui/)** - Modern UI framework
- **[Alamofire](https://github.com/Alamofire/Alamofire)** - HTTP networking
- **[Kingfisher](https://github.com/onevcat/Kingfisher)** - Image loading
- **[swift-log](https://github.com/apple/swift-log)** - Logging
- **[XcodeGen](https://github.com/yonaskolb/XcodeGen)** - Project generation
- **[SwiftLint](https://github.com/realm/SwiftLint)** - Code linting
- **[SwiftFormat](https://github.com/nicklockwood/SwiftFormat)** - Code formatting

### Web

- **[Next.js](https://nextjs.org)** - React framework
- **[Tailwind CSS](https://tailwindcss.com)** - CSS framework
- **[shadcn/ui](https://ui.shadcn.com)** - UI components
- **[Prisma](https://www.prisma.io)** - Database ORM

---

## 💬 Support

Need help? We're here for you:

- 📖 **Documentation**: Check the [docs folder](apps/apple/docs/)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/NickSloggett/MobileApp/discussions)
- 🐛 **Issues**: [GitHub Issues](https://github.com/NickSloggett/MobileApp/issues)
- 📧 **Email**: [Contact maintainer](mailto:nick@example.com)

---

## 🗺️ Roadmap

### Coming Soon

- [ ] SwiftData integration examples
- [ ] WidgetKit examples
- [ ] App Clips support
- [ ] CloudKit integration
- [ ] Core ML examples
- [ ] More design system components
- [ ] Video tutorials
- [ ] Localization guide

### Ideas & Suggestions

Have ideas? Open a [discussion](https://github.com/NickSloggett/MobileApp/discussions) or [issue](https://github.com/NickSloggett/MobileApp/issues)!

---

## ⭐ Star History

If this boilerplate helped you, consider giving it a star! ⭐

It helps others discover this project.

---

<div align="center">

## 🚀 Ready to Build Something Amazing?

**Choose Your Platform:**

[📱 iOS/macOS/watchOS](apps/apple/) | [🌐 Web App](web/) | [📚 Documentation](apps/apple/docs/)

---

**Built with ❤️ by [Nick Sloggett](https://github.com/NickSloggett)**

*Making great app development accessible to everyone*

[⭐ Star on GitHub](https://github.com/NickSloggett/MobileApp) | [🐛 Report Bug](https://github.com/NickSloggett/MobileApp/issues) | [💡 Request Feature](https://github.com/NickSloggett/MobileApp/discussions)

</div>