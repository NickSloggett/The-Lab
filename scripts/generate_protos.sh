#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR=$(cd "$(dirname "$0")/.." && pwd)
PROTO_DIR="$ROOT_DIR/proto"
OUT_DIR="$ROOT_DIR/Packages/Networking/Sources/ProtoGen/Generated"

mkdir -p "$OUT_DIR"

echo "==> buf generate (Swift)"
cat > "$PROTO_DIR/buf.gen.yaml" <<YAML
version: v1
managed:
  enabled: true
plugins:
  - plugin: buf.build/apple/swift
    out: $OUT_DIR
  - plugin: buf.build/grpc/swift
    out: $OUT_DIR
YAML

(cd "$PROTO_DIR" && buf generate)

echo "Proto generation complete at $OUT_DIR"


