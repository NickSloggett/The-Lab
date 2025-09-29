# 🎨 Design System Guide

A comprehensive design system for consistent, beautiful interfaces across all Apple platforms.

---

## 🌈 Color System

### Semantic Colors

Our color system uses semantic naming for consistency and easy theme switching:

```swift
extension Color {
    struct Brand {
        static let primary = Color("BrandPrimary")
        static let secondary = Color("BrandSecondary")
        static let accent = Color("BrandAccent")
    }
    
    struct UI {
        static let success = Color("UISuccess")
        static let error = Color("UIError")
        static let warning = Color("UIWarning")
        static let info = Color("UIInfo")
    }
    
    struct Surface {
        static let background = Color("SurfaceBackground")
        static let card = Color("SurfaceCard")
        static let elevated = Color("SurfaceElevated")
    }
    
    struct Text {
        static let primary = Color("TextPrimary")
        static let secondary = Color("TextSecondary")
        static let tertiary = Color("TextTertiary")
        static let inverse = Color("TextInverse")
    }
}
```

### Usage

```swift
// ✅ Good - Semantic colors
Text("Hello")
    .foregroundColor(.Text.primary)
    .background(.Surface.card)

Button("Action") {
    // action
}
.buttonStyle(.borderedProminent)
.tint(.Brand.primary)

// ❌ Avoid - Hardcoded colors
Text("Hello")
    .foregroundColor(Color(red: 0.2, green: 0.4, blue: 0.8))
```

### Platform-Adaptive Colors

Colors automatically adapt to light/dark mode:

```swift
extension Color {
    static func adaptive(light: Color, dark: Color) -> Color {
        Color(UIColor { traitCollection in
            traitCollection.userInterfaceStyle == .dark ? UIColor(dark) : UIColor(light)
        })
    }
    
    // Example usage
    static let brandPrimary = adaptive(
        light: Color(hex: "007AFF"),
        dark: Color(hex: "0A84FF")
    )
}
```

---

## 📝 Typography

### Type Scale

Consistent typography system based on Apple's Human Interface Guidelines:

```swift
extension Font {
    struct App {
        // Display
        static let largeTitle = Font.system(.largeTitle, design: .default, weight: .bold)
        
        // Headlines
        static let title = Font.system(.title, design: .default, weight: .semibold)
        static let title2 = Font.system(.title2, design: .default, weight: .semibold)
        static let title3 = Font.system(.title3, design: .default, weight: .semibold)
        
        // Body
        static let headline = Font.system(.headline, design: .default, weight: .semibold)
        static let body = Font.system(.body, design: .default, weight: .regular)
        static let callout = Font.system(.callout, design: .default, weight: .regular)
        
        // Supporting
        static let subheadline = Font.system(.subheadline, design: .default, weight: .regular)
        static let footnote = Font.system(.footnote, design: .default, weight: .regular)
        static let caption = Font.system(.caption, design: .default, weight: .regular)
        static let caption2 = Font.system(.caption2, design: .default, weight: .regular)
    }
}
```

### Typography Usage

```swift
VStack(alignment: .leading, spacing: 16) {
    Text("Large Title")
        .font(.App.largeTitle)
    
    Text("Title")
        .font(.App.title)
    
    Text("Headline")
        .font(.App.headline)
    
    Text("Body text goes here. This is the standard text size for most content.")
        .font(.App.body)
        .foregroundColor(.Text.primary)
    
    Text("Supporting text or caption")
        .font(.App.caption)
        .foregroundColor(.Text.secondary)
}
```

### Text Styles

```swift
// Primary text
Text("Primary Content")
    .font(.App.body)
    .foregroundColor(.Text.primary)

// Secondary text
Text("Secondary Content")
    .font(.App.subheadline)
    .foregroundColor(.Text.secondary)

// Tertiary text
Text("Tertiary Content")
    .font(.App.caption)
    .foregroundColor(.Text.tertiary)

// Emphasis
Text("Important")
    .font(.App.headline)
    .foregroundColor(.Brand.primary)
```

---

## 📏 Spacing System

### Spacing Values

Use consistent spacing throughout your app:

```swift
extension CGFloat {
    struct Spacing {
        static let xxs: CGFloat = 4
        static let xs: CGFloat = 8
        static let sm: CGFloat = 12
        static let md: CGFloat = 16
        static let lg: CGFloat = 24
        static let xl: CGFloat = 32
        static let xxl: CGFloat = 48
        static let xxxl: CGFloat = 64
    }
}

// Or with a more SwiftUI-friendly approach
extension EdgeInsets {
    static let xs = EdgeInsets(top: 8, leading: 8, bottom: 8, trailing: 8)
    static let sm = EdgeInsets(top: 12, leading: 12, bottom: 12, trailing: 12)
    static let md = EdgeInsets(top: 16, leading: 16, bottom: 16, trailing: 16)
    static let lg = EdgeInsets(top: 24, leading: 24, bottom: 24, trailing: 24)
    static let xl = EdgeInsets(top: 32, leading: 32, bottom: 32, trailing: 32)
}
```

### Spacing Usage

```swift
VStack(spacing: .Spacing.md) {
    Text("Title")
    Text("Subtitle")
}
.padding(.Spacing.lg)

// Or with semantic helpers
VStack(spacing: .md) {
    Text("Title")
}
.padding(.lg)
```

---

## 🔲 Component Styles

### Card Style

```swift
struct CardModifier: ViewModifier {
    func body(content: Content) -> some View {
        content
            .padding(.Spacing.md)
            .background(.Surface.card)
            .cornerRadius(12)
            .shadow(color: .black.opacity(0.05), radius: 10, y: 5)
    }
}

extension View {
    func cardStyle() -> some View {
        modifier(CardModifier())
    }
}

// Usage
VStack {
    Text("Card Content")
}
.cardStyle()
```

### Button Styles

```swift
struct PrimaryButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .fontWeight(.semibold)
            .foregroundColor(.white)
            .frame(maxWidth: .infinity)
            .padding(.Spacing.md)
            .background(.Brand.primary)
            .cornerRadius(12)
            .scaleEffect(configuration.isPressed ? 0.95 : 1.0)
            .animation(.easeInOut(duration: 0.2), value: configuration.isPressed)
    }
}

struct SecondaryButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .fontWeight(.semibold)
            .foregroundColor(.Brand.primary)
            .frame(maxWidth: .infinity)
            .padding(.Spacing.md)
            .background(.Brand.primary.opacity(0.1))
            .cornerRadius(12)
            .scaleEffect(configuration.isPressed ? 0.95 : 1.0)
            .animation(.easeInOut(duration: 0.2), value: configuration.isPressed)
    }
}

// Usage
Button("Primary") {
    // action
}
.buttonStyle(PrimaryButtonStyle())

Button("Secondary") {
    // action
}
.buttonStyle(SecondaryButtonStyle())
```

---

## 🎯 Icons & Images

### Icon Sizes

```swift
extension CGFloat {
    struct IconSize {
        static let xs: CGFloat = 16
        static let sm: CGFloat = 20
        static let md: CGFloat = 24
        static let lg: CGFloat = 32
        static let xl: CGFloat = 48
    }
}

// Usage
Image(systemName: "heart.fill")
    .font(.system(size: .IconSize.md))
    .foregroundColor(.Brand.primary)
```

### Image Styles

```swift
// Avatar
Image("profile")
    .resizable()
    .scaledToFill()
    .frame(width: 60, height: 60)
    .clipShape(Circle())
    .overlay(Circle().stroke(Color.white, lineWidth: 2))

// Thumbnail
Image("photo")
    .resizable()
    .scaledToFill()
    .frame(width: 100, height: 100)
    .cornerRadius(8)
    .clipped()

// Hero image
Image("hero")
    .resizable()
    .scaledToFill()
    .frame(height: 200)
    .clipped()
```

---

## 🎨 Gradients

### Gradient Presets

```swift
extension LinearGradient {
    static let brandPrimary = LinearGradient(
        colors: [Color(hex: "667EEA"), Color(hex: "764BA2")],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )
    
    static let sunset = LinearGradient(
        colors: [Color(hex: "FF512F"), Color(hex: "F09819")],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )
    
    static let ocean = LinearGradient(
        colors: [Color(hex: "2E3192"), Color(hex: "1BFFFF")],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )
}

// Usage
RoundedRectangle(cornerRadius: 12)
    .fill(.brandPrimary)
    .frame(height: 200)
```

---

## 🔘 Border Radius

### Radius Values

```swift
extension CGFloat {
    struct Radius {
        static let xs: CGFloat = 4
        static let sm: CGFloat = 8
        static let md: CGFloat = 12
        static let lg: CGFloat = 16
        static let xl: CGFloat = 24
        static let pill: CGFloat = 999
    }
}

// Usage
RoundedRectangle(cornerRadius: .Radius.md)
    .fill(.Surface.card)
    .frame(width: 200, height: 100)
```

---

## ☁️ Shadows & Elevation

### Shadow Presets

```swift
extension View {
    func shadowSm() -> some View {
        self.shadow(color: .black.opacity(0.05), radius: 2, x: 0, y: 1)
    }
    
    func shadowMd() -> some View {
        self.shadow(color: .black.opacity(0.08), radius: 8, x: 0, y: 4)
    }
    
    func shadowLg() -> some View {
        self.shadow(color: .black.opacity(0.12), radius: 16, x: 0, y: 8)
    }
    
    func shadowXl() -> some View {
        self.shadow(color: .black.opacity(0.16), radius: 24, x: 0, y: 12)
    }
}

// Usage
RoundedRectangle(cornerRadius: 12)
    .fill(.Surface.card)
    .frame(width: 200, height: 100)
    .shadowMd()
```

---

## 📱 Platform-Specific Styles

### iOS Specific

```swift
#if os(iOS)
extension View {
    func iOSStyle() -> some View {
        self
            .listStyle(.insetGrouped)
            .navigationBarTitleDisplayMode(.large)
    }
}
#endif
```

### macOS Specific

```swift
#if os(macOS)
extension View {
    func macOSStyle() -> some View {
        self
            .frame(minWidth: 600, minHeight: 400)
            .toolbar {
                // macOS toolbar items
            }
    }
}
#endif
```

### watchOS Specific

```swift
#if os(watchOS)
extension View {
    func watchOSStyle() -> some View {
        self
            .font(.caption)
            .padding(.horizontal, 4)
    }
}
#endif
```

---

## 🎭 Dark Mode Support

### Adaptive Colors

```swift
extension Color {
    static let adaptiveBackground = Color(
        light: Color(hex: "FFFFFF"),
        dark: Color(hex: "1C1C1E")
    )
    
    static let adaptiveText = Color(
        light: Color(hex: "000000"),
        dark: Color(hex: "FFFFFF")
    )
}
```

### Color Scheme Override

```swift
// Force light mode
ContentView()
    .preferredColorScheme(.light)

// Force dark mode
ContentView()
    .preferredColorScheme(.dark)

// Respect system
ContentView()
    .preferredColorScheme(nil)
```

---

## ♿ Accessibility

### Dynamic Type Support

```swift
// Text automatically scales with user's font size preference
Text("Scalable Text")
    .font(.body)

// Limit scaling if necessary
Text("Fixed Size")
    .font(.body)
    .dynamicTypeSize(...DynamicTypeSize.xxxLarge)
```

### Accessibility Labels

```swift
// Images
Image(systemName: "heart.fill")
    .accessibilityLabel("Favorite")

// Buttons
Button {
    // action
} label: {
    Image(systemName: "trash")
}
.accessibilityLabel("Delete")
.accessibilityHint("Deletes the selected item")

// Custom views
CustomView()
    .accessibilityElement(children: .combine)
    .accessibilityLabel("Combined description")
```

### Minimum Touch Targets

```swift
// Ensure at least 44x44 points for touch targets
Button {
    // action
} label: {
    Image(systemName: "heart")
}
.frame(minWidth: 44, minHeight: 44)
```

---

## 📋 Component Library

### Alert Banner

```swift
struct AlertBanner: View {
    enum AlertType {
        case success, error, warning, info
        
        var color: Color {
            switch self {
            case .success: return .UI.success
            case .error: return .UI.error
            case .warning: return .UI.warning
            case .info: return .UI.info
            }
        }
        
        var icon: String {
            switch self {
            case .success: return "checkmark.circle.fill"
            case .error: return "xmark.circle.fill"
            case .warning: return "exclamationmark.triangle.fill"
            case .info: return "info.circle.fill"
            }
        }
    }
    
    let type: AlertType
    let message: String
    
    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: type.icon)
                .font(.title3)
            Text(message)
                .font(.App.body)
            Spacer()
        }
        .foregroundColor(.white)
        .padding(.Spacing.md)
        .background(type.color)
        .cornerRadius(.Radius.md)
        .shadowMd()
    }
}

// Usage
AlertBanner(type: .success, message: "Changes saved successfully!")
```

### Loading Indicator

```swift
struct LoadingView: View {
    var message: String = "Loading..."
    
    var body: some View {
        VStack(spacing: .Spacing.md) {
            ProgressView()
                .scaleEffect(1.5)
            Text(message)
                .font(.App.body)
                .foregroundColor(.Text.secondary)
        }
        .padding(.Spacing.xl)
        .background(.Surface.card)
        .cornerRadius(.Radius.md)
        .shadowLg()
    }
}
```

### Empty State

```swift
struct EmptyStateView: View {
    let icon: String
    let title: String
    let message: String
    var actionTitle: String?
    var action: (() -> Void)?
    
    var body: some View {
        VStack(spacing: .Spacing.lg) {
            Image(systemName: icon)
                .font(.system(size: 64))
                .foregroundColor(.Text.tertiary)
            
            VStack(spacing: .Spacing.sm) {
                Text(title)
                    .font(.App.title2)
                    .foregroundColor(.Text.primary)
                
                Text(message)
                    .font(.App.body)
                    .foregroundColor(.Text.secondary)
                    .multilineTextAlignment(.center)
            }
            
            if let actionTitle = actionTitle, let action = action {
                Button(actionTitle, action: action)
                    .buttonStyle(PrimaryButtonStyle())
                    .padding(.horizontal, .Spacing.xl)
            }
        }
        .padding(.Spacing.xl)
    }
}

// Usage
EmptyStateView(
    icon: "tray",
    title: "No Items",
    message: "You haven't added any items yet.",
    actionTitle: "Add Item",
    action: { /* action */ }
)
```

---

## 💡 Best Practices

### 1. Use Semantic Names

```swift
// ✅ Good
.foregroundColor(.Brand.primary)
.background(.Surface.card)

// ❌ Avoid
.foregroundColor(.blue)
.background(Color(hex: "F5F5F5"))
```

### 2. Consistent Spacing

```swift
// ✅ Good
VStack(spacing: .Spacing.md) { }
.padding(.Spacing.lg)

// ❌ Avoid
VStack(spacing: 15) { }
.padding(23)
```

### 3. Reusable Modifiers

```swift
// ✅ Good - Create custom modifiers
extension View {
    func primaryCard() -> some View {
        self.modifier(CardModifier())
    }
}

// ❌ Avoid - Repeating styles
.padding()
.background(Color.white)
.cornerRadius(12)
.shadow(radius: 5)
```

### 4. Platform Checks

```swift
#if os(iOS)
    // iOS-specific code
#elseif os(macOS)
    // macOS-specific code
#elseif os(watchOS)
    // watchOS-specific code
#endif
```

---

## 📚 Resources

- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [SF Symbols](https://developer.apple.com/sf-symbols/)
- [Apple Design Resources](https://developer.apple.com/design/resources/)

---

<div align="center">

**Create Beautiful, Consistent Interfaces** 🎨

[Getting Started](GETTING_STARTED_DESIGNERS.md) | [Visual Guide](SWIFTUI_VISUAL_GUIDE.md) | [Architecture](ARCHITECTURE.md)

[Back to Main README](../README.md)

</div>

