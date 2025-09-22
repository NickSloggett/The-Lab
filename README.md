# The-Lab 🧪

**A comprehensive trading application ecosystem built with modern technologies**

The-Lab is a multi-platform trading application featuring real-time market data, advanced charting, and a scalable architecture supporting iOS, macOS, web, and backend services.

## 🏗️ Architecture

### Frontend Applications
- **TraderiOS** - Native iOS trading app built with SwiftUI
- **TraderMac** - Native macOS trading app with SwiftUI
- **Web Interface** - Next.js web application with Tailwind CSS

### Backend Services
- **Rust Gateway** - High-performance WebSocket server for real-time data
- **Protocol Buffers** - Efficient data serialization for trading protocols

### Core Packages
- **Core** - Shared business logic and models
- **Indicators** - Technical analysis indicators (Moving Averages, etc.)
- **Networking** - WebSocket client and gRPC communication
- **Rendering** - Chart rendering with Metal and custom views
- **Storage** - Data persistence and caching

## 🚀 Features

- 📱 **Multi-Platform**: Native iOS, macOS, and web applications
- ⚡ **Real-Time Data**: WebSocket-based market data streaming
- 📊 **Advanced Charting**: Custom rendering with Metal and SwiftUI
- 🔧 **Modular Design**: Swift Package Manager for clean architecture
- 🦀 **High Performance**: Rust backend for low-latency operations
- 📡 **Protocol Buffers**: Efficient data serialization
- 🎨 **Modern UI**: SwiftUI and Tailwind CSS for beautiful interfaces

## 🛠️ Technology Stack

- **Frontend**: SwiftUI, Next.js, TypeScript, Tailwind CSS
- **Backend**: Rust, WebSocket, gRPC
- **Data**: Protocol Buffers, JSON
- **Build**: XcodeGen, Swift Package Manager, Cargo
- **Platforms**: iOS, macOS, Web

## 📁 Project Structure

```
The-Lab/
├── Apps/
│   ├── TraderiOS/          # iOS application
│   └── TraderMac/          # macOS application
├── Packages/
│   ├── Core/               # Shared business logic
│   ├── Indicators/         # Technical analysis
│   ├── Networking/         # Communication layer
│   ├── Rendering/          # Chart rendering
│   └── Storage/            # Data persistence
├── gateway/
│   └── rust/               # Rust WebSocket server
├── proto/                  # Protocol Buffer definitions
├── web/                    # Next.js web application
└── scripts/                # Build and deployment scripts
```

## 🚀 Getting Started

### Prerequisites
- Xcode 15+ (for iOS/macOS apps)
- Rust 1.70+ (for gateway server)
- Node.js 18+ (for web app)
- Swift 5.9+

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/NickSloggett/The-Lab.git
   cd The-Lab
   ```

2. **Bootstrap the project**
   ```bash
   ./scripts/bootstrap.sh
   ```

3. **Generate Protocol Buffers**
   ```bash
   ./scripts/generate_protos.sh
   ```

4. **Build iOS/macOS apps**
   ```bash
   ./scripts/xcodegen.sh
   ```

5. **Run the web application**
   ```bash
   cd web
   npm install
   npm run dev
   ```

6. **Start the Rust gateway**
   ```bash
   cd gateway/rust
   cargo run
   ```

## 📱 Platform-Specific Setup

### iOS Development
```bash
open Apps/TraderiOS/TraderiOS.xcodeproj
```

### macOS Development
```bash
open Apps/TraderMac/TraderMac.xcodeproj
```

### Web Development
```bash
cd web
npm install
npm run dev
# Open http://localhost:3000
```

### Rust Gateway
```bash
cd gateway/rust
cargo build
cargo run
```

## 🔧 Development

### Adding New Features
1. Create feature branch: `git checkout -b feature/new-feature`
2. Make changes in appropriate package
3. Update tests and documentation
4. Submit pull request

### Protocol Buffer Updates
```bash
./scripts/generate_protos.sh
```

### Package Dependencies
Update `Package.resolved` files by running:
```bash
swift package resolve
```

## 📊 Current Status

- ✅ Project structure and architecture
- ✅ Basic iOS/macOS applications
- ✅ Web interface with Next.js
- ✅ Rust gateway foundation
- ✅ Protocol Buffer definitions
- ✅ Swift Package Manager setup
- 🚧 Real-time data integration
- 🚧 Advanced charting features
- 🚧 Trading functionality

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

---

**Built with ❤️ by [Nick Sloggett](https://github.com/NickSloggett)**