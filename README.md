# The Lab 🧪

**A comprehensive multi-platform development boilerplate**

The Lab is a modern boilerplate repository designed to kickstart your next project across web, iOS, and Android platforms. It includes all the essential tools, configurations, and best practices for rapid development.

## 🏗️ What's Included

### Web Application
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components
- **ESLint** - Code linting and formatting
- **Modern React** - Latest React features and patterns

### iOS Application
- **SwiftUI** - Modern iOS development framework
- **Swift** - Apple's programming language
- **Native iOS** - Fully native performance
- **iOS 17+** - Latest iOS features and APIs

### Android Application
- **React Native** - Cross-platform mobile development
- **TypeScript** - Type-safe development
- **Modern RN** - Latest React Native features
- **Android & iOS** - Single codebase, multiple platforms

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** (for web and React Native)
- **Xcode 15+** (for iOS development)
- **Android Studio** (for Android development)
- **Git** (for version control)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/NickSloggett/The-Lab.git
   cd The-Lab
   ```

2. **Web Application**
   ```bash
   cd web
   npm install
   npm run dev
   # Open http://localhost:3000
   ```

3. **iOS Application**
   ```bash
   # Open the iOS app in Xcode
   open apps/ios/TheLabApp.xcodeproj
   # Or use Swift Package Manager
   ```

4. **Android Application**
   ```bash
   cd apps/android
   npm install
   npx react-native run-android
   ```

## 📁 Project Structure

```
The-Lab/
├── web/                    # Next.js web application
│   ├── src/
│   │   ├── app/           # App Router pages
│   │   ├── components/    # React components
│   │   └── lib/          # Utilities and configurations
│   ├── public/           # Static assets
│   └── package.json      # Web dependencies
├── apps/
│   ├── ios/              # iOS SwiftUI application
│   │   ├── TheLabApp.swift
│   │   └── ContentView.swift
│   └── android/          # React Native application
│       ├── App.tsx
│       ├── android/      # Android-specific code
│       └── ios/          # iOS-specific code
└── README.md             # This file
```

## 🛠️ Development

### Web Development
```bash
cd web
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### iOS Development
```bash
# Using Xcode
open apps/ios/TheLabApp.xcodeproj

# Using command line
cd apps/ios
xcodebuild -scheme TheLabApp -destination 'platform=iOS Simulator,name=iPhone 15'
```

### Android Development
```bash
cd apps/android
npm run android      # Run on Android device/emulator
npm run ios          # Run on iOS simulator
npm run lint         # Run ESLint
npm run test         # Run tests
```

## 🎨 UI Components

### Web (shadcn/ui)
- **Button** - Interactive buttons with variants
- **Card** - Content containers
- **Input** - Form input fields
- **Label** - Form labels
- **Textarea** - Multi-line text input
- **Select** - Dropdown selections
- **Navigation** - Menu components

### iOS (SwiftUI)
- **Native Views** - Text, Button, VStack, HStack
- **Navigation** - NavigationView, NavigationLink
- **Styling** - Colors, fonts, spacing
- **Animations** - Built-in SwiftUI animations

### Android (React Native)
- **Core Components** - View, Text, TouchableOpacity
- **Styling** - StyleSheet API
- **Navigation** - React Navigation (configurable)
- **Platform APIs** - Native module integration

## 📱 Platform Features

| Feature | Web | iOS | Android |
|---------|-----|-----|---------|
| TypeScript | ✅ | ❌ | ✅ |
| Hot Reload | ✅ | ✅ | ✅ |
| Native Performance | ❌ | ✅ | ✅ |
| Cross-Platform | ✅ | ❌ | ✅ |
| App Store | ❌ | ✅ | ✅ |
| Web Deployment | ✅ | ❌ | ❌ |

## 🔧 Customization

### Adding New Web Components
```bash
cd web
npx shadcn@latest add [component-name]
```

### Adding React Native Dependencies
```bash
cd apps/android
npm install [package-name]
npx react-native link [package-name]  # If needed
```

### iOS Dependencies
```swift
// Add to Package.swift or use Xcode Package Manager
dependencies: [
    .package(url: "https://github.com/...", from: "1.0.0")
]
```

## 🚀 Deployment

### Web Deployment
- **Vercel** (Recommended)
  ```bash
  cd web
  npm run build
  # Deploy to Vercel
  ```

- **Netlify**
  ```bash
  cd web
  npm run build
  # Deploy to Netlify
  ```

### Mobile Deployment
- **iOS**: Archive and upload to App Store Connect
- **Android**: Generate APK/AAB and upload to Google Play Console

## 📚 Learning Resources

### Web Development
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)

### iOS Development
- [SwiftUI Tutorials](https://developer.apple.com/tutorials/swiftui)
- [Swift Documentation](https://docs.swift.org/swift-book)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines)

### Android Development
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Native Tutorial](https://reactnative.dev/docs/tutorial)
- [Android Development Guide](https://developer.android.com/guide)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [GitHub Repository](https://github.com/NickSloggett/The-Lab)
- [Issues](https://github.com/NickSloggett/The-Lab/issues)
- [Discussions](https://github.com/NickSloggett/The-Lab/discussions)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) for the amazing React framework
- [shadcn/ui](https://ui.shadcn.com) for beautiful UI components
- [React Native](https://reactnative.dev) for cross-platform mobile development
- [Apple](https://developer.apple.com) for SwiftUI and iOS development tools

---

**Built with ❤️ by [Nick Sloggett](https://github.com/NickSloggett)**

*Ready to build something amazing? Start coding! 🚀*