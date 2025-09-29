# 🍎 Apple Platforms Boilerplate

> **The ultimate starting point for iOS, iPadOS, macOS, and watchOS development**
>
> Perfect for designers learning to code and developers who want a modern, well-structured foundation.

[![Swift Version](https://img.shields.io/badge/Swift-5.9-orange.svg)](https://swift.org)
[![iOS](https://img.shields.io/badge/iOS-16.0+-blue.svg)](https://developer.apple.com/ios/)
[![macOS](https://img.shields.io/badge/macOS-13.0+-blue.svg)](https://developer.apple.com/macos/)
[![watchOS](https://img.shields.io/badge/watchOS-10.0+-blue.svg)](https://developer.apple.com/watchos/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## ✨ What Makes This Special

This boilerplate is designed with **both designers and developers** in mind:

- 🎨 **Designer-Friendly**: Clear examples, visual documentation, and gradual learning paths
- 🏗️ **Modern Architecture**: SwiftUI, Swift Package Manager, and XcodeGen
- 📱 **Multi-Platform**: One codebase, four platforms (iOS, iPadOS, macOS, watchOS)
- 🎯 **Production-Ready**: Includes networking, state management, and best practices
- 🧪 **Well-Tested**: Example tests and testing patterns
- 📚 **Thoroughly Documented**: Every concept explained with examples
- 🚀 **CI/CD Ready**: GitHub Actions workflows included

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have:

- **macOS Ventura (13.0)** or later
- **Xcode 15.0** or later ([Download from Mac App Store](https://apps.apple.com/us/app/xcode/id497799835))
- **Homebrew** ([Install from brew.sh](https://brew.sh))

### 5-Minute Setup

```bash
# 1. Navigate to the Apple apps directory
cd apps/apple

# 2. Install required tools (XcodeGen, SwiftLint, SwiftFormat)
make bootstrap

# 3. Generate the Xcode project
make generate

# 4. Open in Xcode
open AppleApps.xcodeproj
```

**That's it!** 🎉 Press `⌘ + R` in Xcode to run the app.

---

## 📱 What's Included

### Applications

#### 📱 iOS App
- Modern SwiftUI interface
- Supports iPhone and iPad (universal)
- Adaptive layouts for all screen sizes
- Example networking and state management

#### 💻 macOS App
- Native macOS experience
- Menu bar and window management
- Keyboard shortcuts and accessibility
- Shared business logic with iOS

#### ⌚ watchOS App
- Simplified interface for Apple Watch
- Complications support
- Health integration examples
- Shared data models

### SharedKit Library

A powerful shared Swift Package containing:

- **Networking**: Type-safe API client with async/await
- **Models**: Shared data structures across platforms
- **Utilities**: Common extensions and helpers
- **Design System**: Colors, typography, spacing
- **State Management**: Observable patterns and architecture

---

## 📚 Documentation

### For Designers Learning to Code

Start here if you're new to iOS development:

1. **[Getting Started for Designers](docs/GETTING_STARTED_DESIGNERS.md)**
   - Understanding Xcode
   - SwiftUI basics explained visually
   - Your first modifications
   - Color, typography, and layout

2. **[SwiftUI Visual Guide](docs/SWIFTUI_VISUAL_GUIDE.md)**
   - Component gallery with examples
   - Layout patterns
   - Navigation and transitions
   - Animations and gestures

3. **[Design System Guide](docs/DESIGN_SYSTEM.md)**
   - Using colors and typography
   - Creating consistent spacing
   - Platform-specific design patterns
   - Accessibility best practices

### For Developers

Technical documentation and architecture guides:

1. **[Architecture Overview](docs/ARCHITECTURE.md)**
   - Project structure
   - Dependency management
   - State management patterns
   - Platform-specific code

2. **[API & Networking](docs/NETWORKING.md)**
   - HTTPClient usage
   - Error handling
   - Caching strategies
   - Testing network code

3. **[Testing Guide](docs/TESTING.md)**
   - Unit testing patterns
   - UI testing with SwiftUI
   - Snapshot testing
   - Mocking and fixtures

4. **[Advanced Patterns](docs/ADVANCED_PATTERNS.md)**
   - MVVM architecture
   - Dependency injection
   - Protocol-oriented design
   - Modular architecture

---

## 🛠️ Development Workflow

### Common Commands

```bash
# Generate/regenerate Xcode project
make generate

# Build for iOS Simulator
make build-ios

# Build for macOS
make build-macos

# Build for watchOS Simulator
make build-watch

# Run all tests
make test

# Lint code (check for issues)
make lint

# Format code (auto-fix)
make format
```

### Project Structure

```
apps/apple/
├── AppleApps.xcodeproj/      # Generated Xcode project (don't edit directly)
├── project.yml               # XcodeGen configuration
├── Package.swift             # Swift Package Manager manifest
├── SharedKit/                # Shared code across all platforms
│   ├── Sources/
│   │   ├── Models/          # Data models
│   │   ├── Networking/      # API client
│   │   ├── UI/              # Shared UI components
│   │   ├── Utilities/       # Helpers and extensions
│   │   └── DesignSystem/    # Colors, fonts, spacing
│   └── Tests/               # Unit tests
├── iOSApp/                   # iOS-specific code
│   ├── App.swift            # App entry point
│   ├── Views/               # iOS screens
│   ├── ViewModels/          # iOS view models
│   └── Resources/           # iOS assets
├── macOSApp/                 # macOS-specific code
├── WatchApp/                 # watchOS app
├── WatchAppExtension/        # watchOS extension
└── docs/                     # Documentation
```

### Making Changes

#### Modifying the UI

1. Open `AppleApps.xcodeproj` in Xcode
2. Navigate to the platform you want to modify (e.g., `iOSApp`)
3. Edit `.swift` files
4. Use **Live Preview** (`⌘ + ⌥ + Return`) to see changes instantly

#### Adding Dependencies

Edit `Package.swift` to add new dependencies:

```swift
dependencies: [
    .package(url: "https://github.com/username/package", from: "1.0.0")
]
```

Then run `make generate` to update the project.

#### Adding New Targets

Edit `project.yml` to add new targets or modify existing ones, then run `make generate`.

---

## 🎨 Design System

### Colors

The boilerplate includes a semantic color system:

```swift
import SwiftUI
import SharedKit

// Usage in SwiftUI
Text("Hello")
    .foregroundColor(.brand.primary)
    .background(.brand.surface)
```

### Typography

Consistent typography across all platforms:

```swift
Text("Title")
    .font(.app.title)

Text("Body text")
    .font(.app.body)

Text("Small caption")
    .font(.app.caption)
```

### Spacing

Use semantic spacing values:

```swift
VStack(spacing: .app.medium) {
    // Content
}
.padding(.app.large)
```

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests
make test

# Or in Xcode: ⌘ + U
```

### Writing Tests

Example test:

```swift
import XCTest
@testable import SharedKit

final class HTTPClientTests: XCTestCase {
    func testDecodingJSON() async throws {
        let client = HTTPClient()
        // Test implementation
    }
}
```

See [Testing Guide](docs/TESTING.md) for more examples.

---

## 🚀 Deployment

### iOS App Store

1. **Archive the app**: Product → Archive in Xcode
2. **Upload to App Store Connect**: Window → Organizer → Distribute App
3. **Submit for review**: In App Store Connect

### macOS App Store

Similar process to iOS, but select macOS target.

### TestFlight (Beta Testing)

1. Archive the app
2. Upload to App Store Connect
3. Add beta testers in TestFlight section

---

## 🎓 Learning Resources

### Official Documentation

- [Apple Developer Documentation](https://developer.apple.com/documentation/)
- [SwiftUI Tutorials](https://developer.apple.com/tutorials/swiftui)
- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines)
- [Swift Programming Language](https://docs.swift.org/swift-book)

### Recommended Courses

- [100 Days of SwiftUI](https://www.hackingwithswift.com/100/swiftui) (Free)
- [Stanford CS193p](https://cs193p.sites.stanford.edu) (Free)
- [Apple Developer Videos](https://developer.apple.com/videos/) (Free)

### Community

- [Swift Forums](https://forums.swift.org)
- [r/SwiftUI](https://reddit.com/r/SwiftUI)
- [r/iOSProgramming](https://reddit.com/r/iOSProgramming)

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) first.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.

---

## 🙏 Acknowledgments

Built with these amazing tools and libraries:

- **[Alamofire](https://github.com/Alamofire/Alamofire)** - HTTP networking
- **[Kingfisher](https://github.com/onevcat/Kingfisher)** - Image loading and caching
- **[swift-log](https://github.com/apple/swift-log)** - Logging framework
- **[XcodeGen](https://github.com/yonaskolb/XcodeGen)** - Project generation
- **[SwiftLint](https://github.com/realm/SwiftLint)** - Code linting
- **[SwiftFormat](https://github.com/nicklockwood/SwiftFormat)** - Code formatting

---

## 💡 Tips for Success

### For Designers

1. **Start Small**: Modify colors and text first
2. **Use Live Preview**: See changes instantly without running the full app
3. **Experiment**: SwiftUI is declarative - you can't break anything!
4. **Learn Gradually**: Focus on one platform (iOS) first

### For Developers

1. **Follow Swift Style Guidelines**: The project uses SwiftLint
2. **Write Tests**: Aim for good coverage of business logic
3. **Use Shared Code**: Put platform-agnostic code in SharedKit
4. **Document**: Add comments for complex logic

---

## 🐛 Troubleshooting

### Common Issues

**"Command not found: xcodegen"**
```bash
make bootstrap  # Installs required tools
```

**"No such module 'SharedKit'"**
```bash
make generate  # Regenerates project with dependencies
```

**Build errors after updating dependencies**
```bash
# Clean derived data and rebuild
rm -rf ~/Library/Developer/Xcode/DerivedData
make generate
```

**Preview not working**
- Make sure you're using Xcode 15+
- Try `⌘ + ⌥ + P` to refresh the preview
- Check that your Mac meets the minimum requirements

---

## 📞 Support

Need help? We're here for you:

- **Documentation**: Check the [docs](docs/) folder
- **Issues**: [GitHub Issues](https://github.com/NickSloggett/MobileApp/issues)
- **Discussions**: [GitHub Discussions](https://github.com/NickSloggett/MobileApp/discussions)

---

<div align="center">

**Ready to build something amazing?** 🚀

[Get Started](docs/GETTING_STARTED_DESIGNERS.md) | [View Examples](docs/EXAMPLES.md) | [Architecture Guide](docs/ARCHITECTURE.md)

---

Made with ❤️ by [Nick Sloggett](https://github.com/NickSloggett)

</div>