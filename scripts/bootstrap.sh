#!/usr/bin/env bash
set -euo pipefail

echo "==> Installing core tools via Homebrew"
brew update
brew install protobuf buf swiftformat swiftlint xcodegen duckdb || true

echo "==> Ensuring protoc plugins for Swift gRPC are present (via SwiftPM fetch)"
(cd Packages/Networking && swift package resolve) || true

echo "==> Rust toolchain (optional for gateway)"
if ! command -v rustup >/dev/null 2>&1; then
  brew install rustup-init || true
  rustup-init -y || true
fi

echo "Bootstrap complete"


