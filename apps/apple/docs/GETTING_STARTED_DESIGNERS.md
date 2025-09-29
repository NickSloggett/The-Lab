# 🎨 Getting Started for Designers

Welcome! This guide will help you go from designer to iOS developer. No prior coding experience needed.

---

## 🌟 What You'll Learn

By the end of this guide, you'll be able to:

- ✅ Navigate Xcode confidently
- ✅ Understand SwiftUI code
- ✅ Modify colors, fonts, and layouts
- ✅ Create your first view from scratch
- ✅ Use Live Preview to see changes instantly

---

## 📚 Understanding the Basics

### What is SwiftUI?

SwiftUI is Apple's modern framework for building user interfaces. Think of it like Figma, but instead of dragging components, you describe them with code.

**Figma Component:**
```
Frame (Vertical)
  └─ Text: "Hello World"
  └─ Button: "Click Me"
```

**SwiftUI Code:**
```swift
VStack {  // Vertical Stack (like a vertical frame)
    Text("Hello World")
    Button("Click Me") {
        // What happens when clicked
    }
}
```

See? It's very similar! SwiftUI is **declarative** - you describe *what* you want, not *how* to draw it.

---

## 🛠️ Setting Up Xcode

### First Time Setup

1. **Open the Project**
   ```bash
   cd apps/apple
   make generate
   open AppleApps.xcodeproj
   ```

2. **Understanding Xcode's Interface**

   ```
   ┌─────────────────────────────────────────────────┐
   │  Toolbar                                        │
   ├──────────┬──────────────────────┬───────────────┤
   │          │                      │               │
   │ Navigator│   Editor             │  Inspector    │
   │          │   (Your Code Here)   │  (Properties) │
   │  (Files) │                      │               │
   │          │                      │               │
   ├──────────┴──────────────────────┴───────────────┤
   │  Debug Area (Console & Errors)                  │
   └─────────────────────────────────────────────────┘
   ```

   - **Navigator (Left)**: Browse files
   - **Editor (Center)**: Write code
   - **Inspector (Right)**: See properties
   - **Debug Area (Bottom)**: See output and errors

3. **Enable Live Preview**

   Live Preview lets you see your UI as you code!

   - Open any `.swift` file with a `View`
   - Press `⌘ + ⌥ + Return` (Command + Option + Return)
   - Or click the **Resume** button in the preview canvas

   ```swift
   struct ContentView: View {
       var body: some View {
           Text("Hello!")
       }
   }

   // This enables preview:
   #Preview {
       ContentView()
   }
   ```

---

## 🎨 Your First Changes

Let's start with simple modifications to build confidence!

### Change 1: Modify Text

**Find this code** (in `iOSApp/App.swift`):

```swift
Text(appInfo.name)
    .font(.largeTitle).bold()
```

**Try changing it to:**

```swift
Text(appInfo.name)
    .font(.title)           // Smaller font
    .fontWeight(.medium)    // Less bold
    .foregroundColor(.blue) // Blue color
```

**What each part means:**

- `.font(.title)` - Sets the text size (like H1, H2 in design tools)
- `.fontWeight(.medium)` - Sets how bold the text is
- `.foregroundColor(.blue)` - Sets the text color

### Change 2: Modify Spacing

**Find this code:**

```swift
VStack(spacing: 16) {
    // Content here
}
```

**Try different spacing:**

```swift
VStack(spacing: 24) {  // More space between items
    // Content here
}
```

Or try `HStack` for horizontal layout:

```swift
HStack(spacing: 16) {  // Horizontal layout
    // Content here
}
```

### Change 3: Add Padding

Padding adds space around elements (like margin/padding in CSS):

```swift
Text("Hello")
    .padding()           // Adds default padding all around
    .padding(.top, 20)   // Adds 20 points to the top
    .padding(.horizontal, 32)  // Adds 32 points left & right
```

### Change 4: Background Colors

```swift
VStack {
    Text("Hello")
}
.background(Color.blue)           // Solid color
.background(.ultraThinMaterial)   // Frosted glass effect
.background(
    LinearGradient(
        colors: [.blue, .purple],
        startPoint: .top,
        endPoint: .bottom
    )
)
```

---

## 🏗️ Building Your First View

Let's create a simple profile card from scratch!

**Create a new file**: `iOSApp/ProfileView.swift`

```swift
import SwiftUI

struct ProfileView: View {
    var body: some View {
        VStack(spacing: 20) {
            // Profile Image
            Circle()
                .fill(Color.blue)
                .frame(width: 100, height: 100)
                .overlay(
                    Text("👤")
                        .font(.system(size: 50))
                )
            
            // Name
            Text("John Doe")
                .font(.title)
                .fontWeight(.bold)
            
            // Bio
            Text("iOS Developer & Designer")
                .font(.subheadline)
                .foregroundColor(.secondary)
            
            // Stats
            HStack(spacing: 40) {
                StatView(number: "120", label: "Projects")
                StatView(number: "1.5K", label: "Followers")
                StatView(number: "350", label: "Following")
            }
            .padding(.top, 20)
            
            // Action Button
            Button {
                print("Follow tapped!")
            } label: {
                Text("Follow")
                    .fontWeight(.semibold)
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(Color.blue)
                    .cornerRadius(12)
            }
            .padding(.horizontal, 40)
        }
        .padding(30)
    }
}

// Helper view for stats
struct StatView: View {
    let number: String
    let label: String
    
    var body: some View {
        VStack(spacing: 4) {
            Text(number)
                .font(.title2)
                .fontWeight(.bold)
            Text(label)
                .font(.caption)
                .foregroundColor(.secondary)
        }
    }
}

// Enable preview
#Preview {
    ProfileView()
}
```

**To see it:**

1. Save the file
2. Press `⌘ + ⌥ + Return` to open Live Preview
3. See your profile card!

**Try modifying:**

- Change the colors
- Adjust spacing values
- Change the text
- Modify the button style

---

## 🎨 Working with Colors

### System Colors

SwiftUI provides built-in colors that adapt to Dark Mode:

```swift
.foregroundColor(.primary)     // Black in light mode, white in dark
.foregroundColor(.secondary)   // Gray, adapts to theme
.foregroundColor(.blue)        // System blue
.foregroundColor(.red)         // System red
```

### Custom Colors

Define custom colors that work in both light and dark mode:

```swift
extension Color {
    static let brandPrimary = Color(
        light: Color(red: 0.2, green: 0.4, blue: 0.8),
        dark: Color(red: 0.3, green: 0.5, blue: 0.9)
    )
}

// Usage:
Text("Hello")
    .foregroundColor(.brandPrimary)
```

### Color Palettes

Think of colors in terms of purpose, not hardcoded values:

```swift
// ❌ Not recommended
.foregroundColor(Color(red: 0.5, green: 0.2, blue: 0.8))

// ✅ Better - semantic names
.foregroundColor(.brand.primary)
.foregroundColor(.brand.accent)
.foregroundColor(.ui.success)
.foregroundColor(.ui.error)
```

---

## 📐 Layout Fundamentals

### Stacks (Flexbox for SwiftUI)

Think of stacks like Auto Layout or Flexbox:

**VStack** - Vertical Stack
```swift
VStack(alignment: .leading, spacing: 12) {
    Text("Title")
    Text("Subtitle")
    Text("Body")
}
```

**HStack** - Horizontal Stack
```swift
HStack(alignment: .center, spacing: 12) {
    Image(systemName: "star")
    Text("Favorite")
}
```

**ZStack** - Depth Stack (layers)
```swift
ZStack {
    Color.blue  // Background layer
    Text("Hello")  // Foreground layer
}
```

### Spacer & Divider

```swift
HStack {
    Text("Left")
    Spacer()  // Pushes content apart
    Text("Right")
}

VStack {
    Text("Above")
    Divider()  // Horizontal line
    Text("Below")
}
```

### Frames & Sizing

```swift
// Fixed size
Text("Hello")
    .frame(width: 200, height: 100)

// Min/Max size
Text("Hello")
    .frame(minWidth: 100, maxWidth: 300)

// Fill available space
Text("Hello")
    .frame(maxWidth: .infinity)  // Full width
```

---

## 🔤 Typography

### System Fonts

Apple provides semantic font sizes:

```swift
Text("Large Title").font(.largeTitle)  // Biggest
Text("Title").font(.title)
Text("Title 2").font(.title2)
Text("Title 3").font(.title3)
Text("Headline").font(.headline)
Text("Body").font(.body)              // Default
Text("Callout").font(.callout)
Text("Subheadline").font(.subheadline)
Text("Footnote").font(.footnote)
Text("Caption").font(.caption)
Text("Caption 2").font(.caption2)     // Smallest
```

### Custom Fonts

```swift
Text("Hello")
    .font(.system(size: 24, weight: .bold, design: .rounded))
```

Weight options: `.ultraLight`, `.thin`, `.light`, `.regular`, `.medium`, `.semibold`, `.bold`, `.heavy`, `.black`

Design options: `.default`, `.serif`, `.rounded`, `.monospaced`

---

## 🎭 Common Modifiers

Modifiers are like CSS properties. They modify the appearance or behavior:

```swift
Text("Hello")
    // Text styling
    .font(.title)
    .fontWeight(.bold)
    .foregroundColor(.blue)
    .italic()
    .underline()
    .strikethrough()
    
    // Spacing
    .padding()
    .padding(.horizontal, 20)
    
    // Background
    .background(Color.gray.opacity(0.2))
    .cornerRadius(8)
    
    // Border
    .border(Color.blue, width: 2)
    .overlay(
        RoundedRectangle(cornerRadius: 8)
            .stroke(Color.blue, lineWidth: 2)
    )
    
    // Shadow
    .shadow(radius: 5)
    .shadow(color: .black.opacity(0.2), radius: 10, x: 0, y: 5)
    
    // Interaction
    .onTapGesture {
        print("Tapped!")
    }
```

**Order matters!** Modifiers are applied from top to bottom:

```swift
// ❌ Padding outside background
Text("Hello")
    .padding()
    .background(Color.blue)

// ✅ Padding inside background
Text("Hello")
    .background(Color.blue)
    .padding()
```

---

## 🔄 State & Interactivity

### @State - Component State

Think of `@State` like React's `useState`:

```swift
struct CounterView: View {
    @State private var count = 0  // Mutable state
    
    var body: some View {
        VStack {
            Text("Count: \(count)")
            
            Button("Increment") {
                count += 1  // Updates UI automatically
            }
        }
    }
}
```

When `count` changes, SwiftUI automatically re-renders the view!

### @Binding - Two-Way Binding

Pass state to child components:

```swift
struct ParentView: View {
    @State private var isOn = false
    
    var body: some View {
        ToggleView(isOn: $isOn)  // $ creates binding
    }
}

struct ToggleView: View {
    @Binding var isOn: Bool  // Receives binding
    
    var body: some View {
        Toggle("Switch", isOn: $isOn)
    }
}
```

---

## 🎬 Simple Animations

SwiftUI makes animations incredibly easy:

```swift
struct AnimatedView: View {
    @State private var isExpanded = false
    
    var body: some View {
        VStack {
            RoundedRectangle(cornerRadius: 12)
                .fill(Color.blue)
                .frame(width: isExpanded ? 200 : 100,
                       height: 100)
                .animation(.spring(), value: isExpanded)  // Animate changes
            
            Button("Toggle") {
                isExpanded.toggle()
            }
        }
    }
}
```

**Animation types:**

```swift
.animation(.default, value: state)          // Default ease
.animation(.linear(duration: 0.3), value: state)  // Linear
.animation(.easeInOut, value: state)        // Ease in and out
.animation(.spring(), value: state)         // Spring physics
```

---

## 🧭 Navigation

### NavigationStack (iOS 16+)

```swift
NavigationStack {
    List {
        NavigationLink("Profile") {
            ProfileView()
        }
        NavigationLink("Settings") {
            SettingsView()
        }
    }
    .navigationTitle("Home")
}
```

### Sheets (Modals)

```swift
struct ContentView: View {
    @State private var showingSheet = false
    
    var body: some View {
        Button("Show Sheet") {
            showingSheet = true
        }
        .sheet(isPresented: $showingSheet) {
            SheetContent()
        }
    }
}
```

---

## 🎯 Common Patterns

### Cards

```swift
VStack(alignment: .leading, spacing: 12) {
    Text("Card Title")
        .font(.headline)
    Text("Card description goes here")
        .font(.subheadline)
        .foregroundColor(.secondary)
}
.padding()
.background(Color(.systemBackground))
.cornerRadius(12)
.shadow(color: .black.opacity(0.1), radius: 10, y: 5)
```

### Buttons

```swift
// Filled button
Button("Primary Action") {
    // Action
}
.buttonStyle(.borderedProminent)

// Outlined button
Button("Secondary Action") {
    // Action
}
.buttonStyle(.bordered)

// Custom button
Button {
    // Action
} label: {
    HStack {
        Image(systemName: "star.fill")
        Text("Custom")
    }
    .padding()
    .background(Color.blue)
    .foregroundColor(.white)
    .cornerRadius(8)
}
```

### Lists

```swift
List {
    Section("Fruits") {
        Text("Apple")
        Text("Banana")
        Text("Orange")
    }
    
    Section("Vegetables") {
        Text("Carrot")
        Text("Broccoli")
    }
}
```

---

## 🐛 Troubleshooting

### Preview Not Working

**Problem**: Preview shows loading or error

**Solutions**:
1. Press `⌘ + ⌥ + P` to refresh
2. Make sure you have `#Preview { }` at the bottom of your file
3. Clean build folder: `⌘ + Shift + K`
4. Restart Xcode

### Build Errors

**Problem**: Red errors in code

**Solutions**:
1. Read the error message - it usually tells you what's wrong
2. Check for typos in function names
3. Make sure all `{` have matching `}`
4. Run `make generate` if you added dependencies

### "Cannot find 'X' in scope"

**Problem**: SwiftUI can't find a component or function

**Solutions**:
1. Add `import SwiftUI` at the top
2. Check spelling and capitalization (Swift is case-sensitive)
3. Make sure the file is included in your target

---

## 📱 Testing on Device

### Running on Simulator

1. In Xcode, select a simulator from the device menu (top bar)
2. Press `⌘ + R` to run
3. The app opens in the simulator

### Running on Your iPhone/iPad

1. Connect your device via USB
2. Select your device from the device menu
3. You may need to trust the device and sign the app
4. Press `⌘ + R` to run

**Note**: You need a (free) Apple Developer account to run on physical devices.

---

## 🎓 Next Steps

Congratulations! You now know the basics. Here's what to learn next:

1. **[SwiftUI Visual Guide](SWIFTUI_VISUAL_GUIDE.md)** - See more component examples
2. **[Design System](DESIGN_SYSTEM.md)** - Learn about our color and typography system
3. **Practice** - Recreate screens from your favorite apps
4. **[Advanced Patterns](ADVANCED_PATTERNS.md)** - MVVM, data flow, and more

---

## 💡 Tips for Success

1. **Use Live Preview**: It's faster than running the full app
2. **Start Small**: Modify existing code before writing from scratch
3. **Experiment**: You can't break anything! Use version control
4. **Google Error Messages**: Someone has had the same problem
5. **Read Apple Docs**: They're actually quite good
6. **Join Communities**: r/SwiftUI, Swift Forums, Twitter

---

## 📚 Recommended Resources

### Video Tutorials

- [100 Days of SwiftUI](https://www.hackingwithswift.com/100/swiftui) - Free, comprehensive course
- [Stanford CS193p](https://cs193p.sites.stanford.edu) - University course, free on YouTube
- [Apple WWDC Videos](https://developer.apple.com/videos/) - Official tutorials

### Interactive Learning

- [Swift Playgrounds](https://www.apple.com/swift/playgrounds/) - Learn Swift on iPad
- [Hacking with Swift](https://www.hackingwithswift.com) - Tutorials and challenges

### Reference

- [Apple Documentation](https://developer.apple.com/documentation/swiftui)
- [SwiftUI Lab](https://swiftui-lab.com) - Advanced techniques
- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines)

---

<div align="center">

**You've got this!** 🎉

Questions? Check out [GitHub Discussions](https://github.com/NickSloggett/MobileApp/discussions)

[Back to Main README](../README.md) | [SwiftUI Visual Guide →](SWIFTUI_VISUAL_GUIDE.md)

</div>
