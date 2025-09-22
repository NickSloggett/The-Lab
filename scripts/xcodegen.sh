#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR=$(cd "$(dirname "$0")/.." && pwd)

echo "==> Generating Xcode projects with XcodeGen"

mkdir -p "$ROOT_DIR/Apps/TraderMac"
mkdir -p "$ROOT_DIR/Apps/TraderiOS"

cat > "$ROOT_DIR/Apps/TraderMac/project.yml" <<YAML
name: TraderMac
options:
  minimumXcodeGenVersion: 2.41.0
  deploymentTarget:
    macOS: 15.0
packages:
  Core:
    path: ../../Packages/Core
  Indicators:
    path: ../../Packages/Indicators
  Networking:
    path: ../../Packages/Networking
  Rendering:
    path: ../../Packages/Rendering
  Storage:
    path: ../../Packages/Storage
targets:
  TraderMac:
    type: application
    platform: macOS
    sources:
      - path: Sources
    settings:
      base:
        SWIFT_STRICT_CONCURRENCY: complete
        SWIFT_VERSION: 6.0
    dependencies:
      - package: Core
      - package: Indicators
      - package: Networking
      - package: Rendering
      - package: Storage
YAML

mkdir -p "$ROOT_DIR/Apps/TraderMac/Sources"
cat > "$ROOT_DIR/Apps/TraderMac/Sources/App.swift" <<SWIFT
import SwiftUI
import Rendering

@main
struct TraderMacApp: App {
	var body: some Scene {
		WindowGroup {
			MetalView()
		}
	}
}
SWIFT

cat > "$ROOT_DIR/Apps/TraderiOS/project.yml" <<YAML
name: TraderiOS
options:
  deploymentTarget:
    iOS: 18.0
packages:
  Core:
    path: ../../Packages/Core
  Indicators:
    path: ../../Packages/Indicators
  Networking:
    path: ../../Packages/Networking
  Rendering:
    path: ../../Packages/Rendering
  Storage:
    path: ../../Packages/Storage
targets:
  TraderiOS:
    type: application
    platform: iOS
    sources:
      - path: Sources
    settings:
      base:
        SWIFT_STRICT_CONCURRENCY: complete
        SWIFT_VERSION: 6.0
    dependencies:
      - package: Core
      - package: Indicators
      - package: Networking
      - package: Rendering
      - package: Storage
YAML

mkdir -p "$ROOT_DIR/Apps/TraderiOS/Sources"
cat > "$ROOT_DIR/Apps/TraderiOS/Sources/App.swift" <<SWIFT
import SwiftUI
import Rendering

@main
struct TraderiOSApp: App {
	var body: some Scene {
		WindowGroup {
			MetalView()
		}
	}
}
SWIFT

(cd "$ROOT_DIR/Apps/TraderMac" && xcodegen generate)
(cd "$ROOT_DIR/Apps/TraderiOS" && xcodegen generate)

echo "Projects generated in Apps/TraderMac and Apps/TraderiOS"


