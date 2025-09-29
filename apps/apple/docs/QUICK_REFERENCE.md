# ⚡ Quick Reference

Fast answers to common questions and tasks.

---

## 🚀 Common Commands

```bash
# Setup
make bootstrap          # Install all dependencies
make generate          # Generate Xcode project

# Building
make build-ios         # Build iOS app
make build-macos       # Build macOS app
make build-watch       # Build watchOS app

# Code Quality
make lint             # Check code style
make format           # Auto-format code
make test             # Run all tests

# Open Project
open AppleApps.xcodeproj
```

---

## 🎨 Design System

### Colors

```swift
// Brand colors
.foregroundColor(.Brand.primaryFallback)
.foregroundColor(.Brand.secondaryFallback)
.foregroundColor(.Brand.accentFallback)

// UI state colors
.foregroundColor(.UI.success)    // Green
.foregroundColor(.UI.error)      // Red
.foregroundColor(.UI.warning)    // Orange
.foregroundColor(.UI.info)       // Blue

// Surface colors
.background(.Surface.background)
.background(.Surface.card)
.background(.Surface.elevated)

// Text colors
.foregroundColor(.Text.primary)
.foregroundColor(.Text.secondary)
.foregroundColor(.Text.tertiary)
```

### Spacing

```swift
// Spacing values
.Spacing.xs   // 8pt
.Spacing.sm   // 12pt
.Spacing.md   // 16pt
.Spacing.lg   // 24pt
.Spacing.xl   // 32pt

// Usage
VStack(spacing: .Spacing.md) { }
.padding(.Spacing.lg)

// Convenience
.paddingXS()
.paddingSM()
.paddingMD()
.paddingLG()
.paddingXL()
```

### Typography

```swift
// Font sizes
.font(.App.largeTitle)
.font(.App.title)
.font(.App.headline)
.font(.App.body)
.font(.App.caption)

// Text styles
TextStyles.primary("Text")
TextStyles.secondary("Text")
TextStyles.tertiary("Text")
```

### Corner Radius

```swift
.cornerRadius(.Radius.sm)   // 8pt
.cornerRadius(.Radius.md)   // 12pt
.cornerRadius(.Radius.lg)   // 16pt
.cornerRadius(.Radius.xl)   // 24pt
```

### Shadows

```swift
.shadowSm()   // Subtle elevation
.shadowMd()   // Card elevation
.shadowLg()   // Modal elevation
.shadowXl()   // Floating elements
```

---

## 🧩 Components

### Buttons

```swift
// Primary
Button("Action") { }
    .buttonStyle(PrimaryButtonStyle())

// Secondary
Button("Action") { }
    .buttonStyle(SecondaryButtonStyle())

// Outlined
Button("Action") { }
    .buttonStyle(OutlinedButtonStyle())
```

### Cards

```swift
CardView {
    Text("Content")
}

// Custom
CardView(padding: 20, cornerRadius: 16) {
    // Content
}
```

### Alerts

```swift
AlertBanner(
    type: .success,
    message: "Success!"
)

AlertBanner(
    type: .error,
    message: "Error!",
    onDismiss: { }
)
```

### Loading

```swift
LoadingView()
LoadingView(message: "Loading...")
```

### Empty States

```swift
EmptyStateView(
    icon: "tray",
    title: "No Items",
    message: "Add your first item",
    actionTitle: "Add Item",
    action: { }
)
```

---

## 📱 Layouts

### Stacks

```swift
// Vertical
VStack(spacing: .Spacing.md) {
    Text("Top")
    Text("Bottom")
}

// Horizontal
HStack(spacing: .Spacing.md) {
    Text("Left")
    Text("Right")
}

// Depth
ZStack {
    Color.blue
    Text("Overlay")
}
```

### Lists

```swift
List {
    ForEach(items) { item in
        Text(item.name)
    }
}

// With sections
List {
    Section("Header") {
        Text("Item")
    }
}
```

### Grids

```swift
LazyVGrid(
    columns: [
        GridItem(.flexible()),
        GridItem(.flexible())
    ],
    spacing: .Spacing.md
) {
    ForEach(items) { item in
        ItemView(item: item)
    }
}
```

---

## 🔄 State Management

### @State

```swift
@State private var count = 0

Button("Increment") {
    count += 1
}
```

### @StateObject

```swift
@StateObject private var viewModel = MyViewModel()

Text(viewModel.text)
```

### @ObservedObject

```swift
// In parent
@StateObject private var viewModel = MyViewModel()
ChildView(viewModel: viewModel)

// In child
@ObservedObject var viewModel: MyViewModel
```

### @EnvironmentObject

```swift
// Provide
.environmentObject(appState)

// Access
@EnvironmentObject var appState: AppState
```

---

## 🌐 Networking

### Basic GET Request

```swift
let client = HTTPClient()
let url = URL(string: "https://api.example.com/data")!

struct Response: Decodable {
    let title: String
}

let data: Response = try await client.getJSON(url)
```

### POST Request

```swift
struct Request: Encodable {
    let name: String
    let email: String
}

let request = Request(name: "John", email: "john@example.com")
let response: Response = try await client.postJSON(url, body: request)
```

### Error Handling

```swift
do {
    let data = try await client.getJSON(url, as: Response.self)
    // Success
} catch {
    // Handle error
    print("Failed: \(error)")
}
```

---

## 🧪 Testing

### Unit Test Template

```swift
@testable import SharedKit
import XCTest

final class MyTests: XCTestCase {
    var sut: MyClass!
    
    override func setUp() {
        super.setUp()
        sut = MyClass()
    }
    
    override func tearDown() {
        sut = nil
        super.tearDown()
    }
    
    func testSomething() {
        // Arrange
        let input = "test"
        
        // Act
        let result = sut.doSomething(input)
        
        // Assert
        XCTAssertEqual(result, "expected")
    }
}
```

### Async Tests

```swift
func testAsyncFunction() async throws {
    // Arrange
    let expected = "result"
    
    // Act
    let result = try await sut.asyncFunction()
    
    // Assert
    XCTAssertEqual(result, expected)
}
```

---

## 🎯 Navigation

### NavigationStack

```swift
NavigationStack {
    List {
        NavigationLink("Detail") {
            DetailView()
        }
    }
    .navigationTitle("Home")
}
```

### Sheets

```swift
@State private var showSheet = false

Button("Show") {
    showSheet = true
}
.sheet(isPresented: $showSheet) {
    SheetContent()
}
```

### Alerts

```swift
@State private var showAlert = false

Button("Show Alert") {
    showAlert = true
}
.alert("Title", isPresented: $showAlert) {
    Button("OK") { }
} message: {
    Text("Message")
}
```

---

## 🔧 Utilities

### String Extensions

```swift
"test@example.com".isValidEmail    // true
"  hello  ".trimmed                // "hello"
"   ".isBlank                      // true
"long text".truncated(to: 5)       // "long ..."
"hello".capitalizedFirst           // "Hello"
"https://example.com".toURL        // URL?
"hello world".urlEncoded           // "hello%20world"
```

### Date Extensions

```swift
Date().timeAgo                     // "2 hours ago"
Date().shortTimeAgo                // "2h ago"
Date().longFormat                  // "January 1, 2024"
Date().isToday                     // true/false
Date().startOfDay                  // Date
Date().toISO8601String            // ISO string
```

### View Extensions

```swift
// Conditional modifier
.if(condition) { view in
    view.background(.blue)
}

// Hide conditionally
.hidden(shouldHide)

// Haptic feedback
.hapticFeedback()

// Placeholder
.placeholder(when: isLoading) {
    ProgressView()
}
```

---

## 🎨 Modifiers

### Common Modifiers

```swift
// Padding
.padding()
.padding(.horizontal, 16)

// Background
.background(.blue)
.background(.ultraThinMaterial)

// Corner Radius
.cornerRadius(12)

// Shadow
.shadow(radius: 5)
.shadowMd()

// Frame
.frame(width: 200, height: 100)
.frame(maxWidth: .infinity)

// Font
.font(.title)
.fontWeight(.bold)

// Color
.foregroundColor(.blue)
.tint(.blue)

// Overlay
.overlay(
    Circle()
        .stroke(.blue, lineWidth: 2)
)
```

---

## 📚 Resources

### Quick Links

- [Main README](../README.md)
- [Getting Started](GETTING_STARTED_DESIGNERS.md)
- [Visual Guide](SWIFTUI_VISUAL_GUIDE.md)
- [Design System](DESIGN_SYSTEM.md)
- [Architecture](ARCHITECTURE.md)
- [Examples](EXAMPLES.md)
- [Contributing](../CONTRIBUTING.md)

### Keyboard Shortcuts

**Xcode:**
- `⌘ + R` - Run
- `⌘ + B` - Build
- `⌘ + U` - Test
- `⌘ + K` - Clean
- `⌘ + Shift + K` - Clean Build Folder
- `⌘ + ⌥ + Return` - Show Preview
- `⌘ + ⌥ + P` - Refresh Preview
- `⌘ + /` - Comment/Uncomment

---

<div align="center">

**Keep This Handy!** 🔖

Bookmark this page for quick reference.

[Back to Main README](../README.md)

</div>
