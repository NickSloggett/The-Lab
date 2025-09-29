SHELL := /bin/zsh

.PHONY: bootstrap generate build-ios build-macos build-watch test lint format

bootstrap:
	brew list xcodegen || brew install xcodegen
	brew list swiftlint || brew install swiftlint
	brew list swiftformat || brew install swiftformat
	brew list xcbeautify || brew install xcbeautify

generate:
	xcodegen generate

lint:
	swiftlint || true
	swiftformat . --lint || true

format:
	swiftformat .

build-ios: generate
	xcodebuild -project AppleApps.xcodeproj -scheme iOS -destination 'platform=iOS Simulator,name=iPhone 15' -configuration Debug build | xcbeautify || true

build-macos: generate
	xcodebuild -project AppleApps.xcodeproj -scheme macOS -configuration Debug build | xcbeautify || true

build-watch: generate
	xcodebuild -project AppleApps.xcodeproj -scheme watchOS -destination 'platform=watchOS Simulator,name=Apple Watch Series 9 (41mm)' -configuration Debug build | xcbeautify || true

test: generate
	xcodebuild -project AppleApps.xcodeproj -scheme iOS -destination 'platform=iOS Simulator,name=iPhone 15' -configuration Debug test | xcbeautify || true

