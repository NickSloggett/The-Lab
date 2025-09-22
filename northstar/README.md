North Star Trading Dev Environment

Overview

This repository scaffolds a native Mac + iOS trading environment with the following pillars:

- Swift 6 (strict concurrency), SwiftUI, AppKit/UIKit interop
- Metal rendering (MTKView), Accelerate/Swift Numerics for compute
- gRPC + WebSocket networking with AsyncSequence streams
- GRDB/SQLite for ticks/bars, DuckDB for analytics, SwiftData for prefs (via apps)
- Rust gateway (tonic) skeleton for adapters/risk/record-replay
- Protobuf management with buf; codegen for Swift and Rust
- Tooling: SwiftLint, SwiftFormat, XcodeGen, pre-commit

Quick start

1) Bootstrap dev tools (Homebrew, protoc, buf, codegen plugins, formatters):

    ./scripts/bootstrap.sh

2) Generate gRPC/Protobuf client code:

    ./scripts/generate_protos.sh

3) Generate Xcode projects (macOS and iOS apps) into ./Apps:

    ./scripts/xcodegen.sh

4) Build Swift packages locally (sanity check):

    (cd Packages/Core && swift build)
    (cd Packages/Indicators && swift build)

5) Launch the macOS app in Xcode (TraderMac) or the iOS app (TraderiOS).

Repo layout

- Apps/
  - TraderMac/ project.yml + sources (SwiftUI shell with MTKViewRepresentable)
  - TraderiOS/ project.yml + sources
- Packages/
  - Core/ (models, concurrency, protocols)
  - Networking/ (gRPC + WebSocket, ProtoGen output)
  - Rendering/ (Metal renderer + representables)
  - Storage/ (GRDB + DuckDB wrappers)
  - Indicators/ (Accelerate / Swift Numerics utils)
- proto/ (buf workspace, .proto files, generators)
- gateway/rust/ (tonic skeleton server)
- scripts/ (bootstrap, proto generation, xcodegen)

Notes

- Xcode Beta 26+ recommended. The environment assumes Swift 6 and strict concurrency.
- DuckDB and GRDB are added as dependencies but may be heavy to compile. Start with Core/Indicators to validate toolchain.
- The gateway is optional for initial UI development; it compiles once Rust is installed via rustup.


