## Apple multi-platform scaffold

This directory provides SwiftUI apps for iOS, macOS, and watchOS using XcodeGen and a shared Swift package (`SharedKit`). It includes SPM libraries, linting/formatting, CI, and a Makefile.

### Prerequisites
- Xcode 15+
- Homebrew

### Quick start
```bash
cd apps/apple
make bootstrap
make generate
make build-ios
make build-macos
make build-watch
```

### Structure
- `project.yml` — XcodeGen spec defining all targets and dependencies
- `Package.swift` — Shared SPM package `SharedKit`
- `iOSApp/`, `macOSApp/`, `WatchApp/`, `WatchAppExtension/` — SwiftUI apps
- `.swiftlint.yml`, `.swiftformat` — lint and format configuration
- `Makefile` — helper commands for common tasks
- `.github/workflows/apple-ci.yml` — CI to build all platforms on macOS runners

### Dependencies
- Alamofire (networking)
- Kingfisher (image loading)
- swift-log (structured logging)

### Notes
- Regenerate the Xcode project after changes to `project.yml` using `make generate`.
- Lint and format with `make lint` and `make format`.


