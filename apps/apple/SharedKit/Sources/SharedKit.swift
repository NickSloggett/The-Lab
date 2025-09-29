// SharedKit - A shared library for iOS, macOS, and watchOS apps
//
// This module exports all the shared functionality across Apple platforms

// MARK: - Models
@_exported import struct Models.AppInfo
@_exported import struct Models.User
@_exported import struct Models.Todo

// MARK: - Networking
@_exported import class Networking.HTTPClient

// MARK: - Utilities
@_exported import class Utilities.AppLogger

// MARK: - Design System
// Colors, Typography, Spacing, Shadows are automatically available when importing SwiftUI

import Foundation

// Re-export commonly used types
public typealias HTTPClient = Networking.HTTPClient

/// SharedKit version information
public enum SharedKitInfo {
    public static let version = "1.0.0"
    public static let name = "SharedKit"
}