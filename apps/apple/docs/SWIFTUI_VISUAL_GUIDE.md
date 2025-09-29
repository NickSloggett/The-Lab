# 🎨 SwiftUI Visual Guide

A comprehensive visual reference of SwiftUI components with code examples.

---

## 📋 Table of Contents

- [Text & Typography](#-text--typography)
- [Images](#-images)
- [Buttons](#-buttons)
- [Layout Containers](#-layout-containers)
- [Lists & Grids](#-lists--grids)
- [Forms & Inputs](#-forms--inputs)
- [Navigation](#-navigation)
- [Modals & Sheets](#-modals--sheets)
- [Animations](#-animations)
- [Gestures](#-gestures)

---

## 📝 Text & Typography

### Basic Text

```swift
// Simple text
Text("Hello, World!")

// Styled text
Text("Styled Text")
    .font(.title)
    .foregroundColor(.blue)
    .fontWeight(.bold)

// Multiline text
Text("This is a long text that will automatically wrap to multiple lines when it runs out of space.")
    .lineLimit(3)
    .multilineTextAlignment(.center)
```

### Text Modifiers

```swift
VStack(alignment: .leading, spacing: 16) {
    Text("Bold").bold()
    Text("Italic").italic()
    Text("Underline").underline()
    Text("Strikethrough").strikethrough()
    Text("Monospaced").monospaced()
    
    Text("Red Text").foregroundColor(.red)
    Text("Large Title").font(.largeTitle)
    Text("Headline").font(.headline)
    Text("Body").font(.body)
    Text("Caption").font(.caption)
}
```

### Text Combinations

```swift
// Combining different styles
Text("Hello ")
    .font(.body)
    .foregroundColor(.black)
+ Text("World")
    .font(.body)
    .foregroundColor(.blue)
    .bold()

// Markdown support (iOS 15+)
Text("This is **bold** and this is *italic*")
```

---

## 🖼️ Images

### System Icons (SF Symbols)

```swift
// Basic icon
Image(systemName: "star")

// Styled icon
Image(systemName: "heart.fill")
    .font(.largeTitle)
    .foregroundColor(.red)

// Resizable icon
Image(systemName: "photo")
    .resizable()
    .scaledToFit()
    .frame(width: 50, height: 50)
```

### Custom Images

```swift
// From asset catalog
Image("myImage")
    .resizable()
    .scaledToFit()
    .frame(width: 200, height: 200)

// Aspect ratio modes
Image("photo")
    .resizable()
    .scaledToFill()  // Fills space, may crop
    .frame(width: 200, height: 200)
    .clipped()  // Clips overflow

Image("photo")
    .resizable()
    .scaledToFit()  // Fits in space, may letterbox
    .frame(width: 200, height: 200)
```

### Image Modifiers

```swift
Image("profile")
    .resizable()
    .scaledToFill()
    .frame(width: 100, height: 100)
    .clipShape(Circle())  // Circular image
    .overlay(Circle().stroke(Color.white, lineWidth: 4))
    .shadow(radius: 10)

// Corner radius
Image("photo")
    .resizable()
    .scaledToFill()
    .frame(width: 200, height: 150)
    .cornerRadius(12)
```

---

## 🔘 Buttons

### Button Styles

```swift
VStack(spacing: 16) {
    // Default button
    Button("Default Button") {
        print("Tapped")
    }
    
    // Prominent button (iOS 15+)
    Button("Prominent") {
        print("Tapped")
    }
    .buttonStyle(.borderedProminent)
    
    // Bordered button
    Button("Bordered") {
        print("Tapped")
    }
    .buttonStyle(.bordered)
    
    // Borderless button
    Button("Borderless") {
        print("Tapped")
    }
    .buttonStyle(.borderless)
    
    // Plain button
    Button("Plain") {
        print("Tapped")
    }
    .buttonStyle(.plain)
}
```

### Custom Button Designs

```swift
// Custom filled button
Button(action: {
    print("Tapped")
}) {
    Text("Custom Button")
        .fontWeight(.semibold)
        .foregroundColor(.white)
        .frame(maxWidth: .infinity)
        .padding()
        .background(Color.blue)
        .cornerRadius(12)
}

// Icon button
Button(action: {
    print("Liked")
}) {
    HStack {
        Image(systemName: "heart.fill")
        Text("Like")
    }
    .padding()
    .background(Color.red.opacity(0.1))
    .foregroundColor(.red)
    .cornerRadius(8)
}

// Floating action button
Button(action: {
    print("Add")
}) {
    Image(systemName: "plus")
        .font(.title2)
        .foregroundColor(.white)
        .frame(width: 60, height: 60)
        .background(Color.blue)
        .clipShape(Circle())
        .shadow(radius: 10)
}
```

### Button States

```swift
struct ButtonStateExample: View {
    @State private var isLoading = false
    @State private var isEnabled = true
    
    var body: some View {
        VStack(spacing: 16) {
            // Loading button
            Button(action: {
                isLoading = true
                // Simulate async work
                DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
                    isLoading = false
                }
            }) {
                HStack {
                    if isLoading {
                        ProgressView()
                            .progressViewStyle(CircularProgressViewStyle(tint: .white))
                    }
                    Text(isLoading ? "Loading..." : "Submit")
                }
                .frame(maxWidth: .infinity)
                .padding()
                .background(Color.blue)
                .foregroundColor(.white)
                .cornerRadius(10)
            }
            .disabled(isLoading)
            
            // Disabled button
            Button("Disabled Button") {
                print("This won't fire")
            }
            .disabled(!isEnabled)
            .buttonStyle(.borderedProminent)
        }
        .padding()
    }
}
```

---

## 📦 Layout Containers

### VStack (Vertical Stack)

```swift
VStack(alignment: .leading, spacing: 20) {
    Text("Item 1")
    Text("Item 2")
    Text("Item 3")
}
.padding()
.background(Color.gray.opacity(0.1))
.cornerRadius(12)
```

### HStack (Horizontal Stack)

```swift
HStack(alignment: .center, spacing: 16) {
    Image(systemName: "star.fill")
        .foregroundColor(.yellow)
    Text("Featured")
    Spacer()
    Image(systemName: "chevron.right")
        .foregroundColor(.secondary)
}
.padding()
```

### ZStack (Depth Stack)

```swift
ZStack {
    // Background
    Rectangle()
        .fill(Color.blue)
        .frame(width: 200, height: 200)
    
    // Middle layer
    Circle()
        .fill(Color.white.opacity(0.5))
        .frame(width: 150, height: 150)
    
    // Foreground
    Text("Overlay Text")
        .font(.headline)
        .foregroundColor(.white)
}
```

### LazyVStack & LazyHStack

For better performance with long lists:

```swift
ScrollView {
    LazyVStack(spacing: 16) {
        ForEach(0..<100) { index in
            Text("Row \(index)")
                .frame(height: 50)
                .frame(maxWidth: .infinity)
                .background(Color.gray.opacity(0.1))
                .cornerRadius(8)
        }
    }
    .padding()
}
```

---

## 📋 Lists & Grids

### Basic List

```swift
List {
    Text("Item 1")
    Text("Item 2")
    Text("Item 3")
}

// With ForEach
List(0..<10) { index in
    Text("Row \(index)")
}

// With custom data
struct Item: Identifiable {
    let id = UUID()
    let name: String
}

let items = [
    Item(name: "Apple"),
    Item(name: "Banana"),
    Item(name: "Orange")
]

List(items) { item in
    Text(item.name)
}
```

### Sectioned List

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
        Text("Lettuce")
    }
}
```

### List with Accessories

```swift
List {
    Label("Home", systemImage: "house")
    
    HStack {
        Label("Profile", systemImage: "person")
        Spacer()
        Image(systemName: "chevron.right")
            .foregroundColor(.secondary)
    }
    
    HStack {
        Label("Settings", systemImage: "gear")
        Spacer()
        Text("5")
            .font(.caption)
            .foregroundColor(.white)
            .padding(6)
            .background(Color.red)
            .clipShape(Circle())
    }
}
```

### Grid Layout (iOS 16+)

```swift
ScrollView {
    LazyVGrid(
        columns: [
            GridItem(.flexible()),
            GridItem(.flexible()),
            GridItem(.flexible())
        ],
        spacing: 16
    ) {
        ForEach(0..<9) { index in
            RoundedRectangle(cornerRadius: 12)
                .fill(Color.blue)
                .frame(height: 100)
                .overlay(
                    Text("\(index + 1)")
                        .font(.title)
                        .foregroundColor(.white)
                )
        }
    }
    .padding()
}
```

---

## 📝 Forms & Inputs

### Form

```swift
Form {
    Section("Personal Information") {
        TextField("Name", text: $name)
        TextField("Email", text: $email)
            .keyboardType(.emailAddress)
            .textInputAutocapitalization(.never)
    }
    
    Section("Preferences") {
        Toggle("Enable Notifications", isOn: $notificationsEnabled)
        Picker("Theme", selection: $selectedTheme) {
            Text("Light").tag(0)
            Text("Dark").tag(1)
            Text("Auto").tag(2)
        }
    }
    
    Section {
        Button("Save") {
            // Save action
        }
    }
}
```

### Text Field

```swift
struct TextFieldExamples: View {
    @State private var text = ""
    @State private var password = ""
    @State private var number = ""
    
    var body: some View {
        VStack(spacing: 16) {
            // Basic text field
            TextField("Enter text", text: $text)
                .textFieldStyle(.roundedBorder)
            
            // Secure field (password)
            SecureField("Password", text: $password)
                .textFieldStyle(.roundedBorder)
            
            // Number input
            TextField("Number", text: $number)
                .keyboardType(.numberPad)
                .textFieldStyle(.roundedBorder)
            
            // Custom styled
            TextField("Email", text: $text)
                .padding()
                .background(Color.gray.opacity(0.1))
                .cornerRadius(10)
                .overlay(
                    RoundedRectangle(cornerRadius: 10)
                        .stroke(Color.blue, lineWidth: 1)
                )
        }
        .padding()
    }
}
```

### TextEditor (Multiline)

```swift
struct TextEditorExample: View {
    @State private var text = "Enter your text here..."
    
    var body: some View {
        TextEditor(text: $text)
            .frame(height: 200)
            .padding()
            .background(Color.gray.opacity(0.1))
            .cornerRadius(12)
            .padding()
    }
}
```

### Toggle

```swift
@State private var isOn = false

Toggle("Enable Feature", isOn: $isOn)
    .toggleStyle(.switch)

// Custom styled toggle
Toggle(isOn: $isOn) {
    HStack {
        Image(systemName: "bell.fill")
        Text("Notifications")
    }
}
.tint(.blue)
```

### Picker

```swift
@State private var selection = 0

// Menu style
Picker("Options", selection: $selection) {
    Text("Option 1").tag(0)
    Text("Option 2").tag(1)
    Text("Option 3").tag(2)
}
.pickerStyle(.menu)

// Segmented style
Picker("Options", selection: $selection) {
    Text("One").tag(0)
    Text("Two").tag(1)
    Text("Three").tag(2)
}
.pickerStyle(.segmented)

// Wheel style
Picker("Options", selection: $selection) {
    ForEach(0..<100) { number in
        Text("\(number)").tag(number)
    }
}
.pickerStyle(.wheel)
```

### Slider

```swift
@State private var value: Double = 50

VStack {
    Text("Value: \(Int(value))")
    
    Slider(value: $value, in: 0...100, step: 1)
    
    // Custom styled slider
    Slider(value: $value, in: 0...100) {
        Text("Volume")
    } minimumValueLabel: {
        Image(systemName: "speaker.fill")
    } maximumValueLabel: {
        Image(systemName: "speaker.wave.3.fill")
    }
    .tint(.blue)
}
.padding()
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
        NavigationLink("About") {
            AboutView()
        }
    }
    .navigationTitle("Home")
    .navigationBarTitleDisplayMode(.large)
}
```

### Tab View

```swift
TabView {
    HomeView()
        .tabItem {
            Label("Home", systemImage: "house")
        }
    
    SearchView()
        .tabItem {
            Label("Search", systemImage: "magnifyingglass")
        }
    
    ProfileView()
        .tabItem {
            Label("Profile", systemImage: "person")
        }
}
```

### Navigation Bar Items

```swift
NavigationStack {
    ContentView()
        .navigationTitle("Title")
        .toolbar {
            ToolbarItem(placement: .navigationBarLeading) {
                Button("Cancel") {
                    // Action
                }
            }
            
            ToolbarItem(placement: .navigationBarTrailing) {
                Button("Done") {
                    // Action
                }
            }
        }
}
```

---

## 📱 Modals & Sheets

### Sheet

```swift
struct SheetExample: View {
    @State private var showingSheet = false
    
    var body: some View {
        Button("Show Sheet") {
            showingSheet = true
        }
        .sheet(isPresented: $showingSheet) {
            SheetContentView()
        }
    }
}

struct SheetContentView: View {
    @Environment(\.dismiss) var dismiss
    
    var body: some View {
        NavigationStack {
            VStack {
                Text("Sheet Content")
            }
            .navigationTitle("Sheet")
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Done") {
                        dismiss()
                    }
                }
            }
        }
    }
}
```

### Alert

```swift
struct AlertExample: View {
    @State private var showingAlert = false
    
    var body: some View {
        Button("Show Alert") {
            showingAlert = true
        }
        .alert("Alert Title", isPresented: $showingAlert) {
            Button("Cancel", role: .cancel) { }
            Button("OK") {
                // Action
            }
        } message: {
            Text("This is the alert message")
        }
    }
}
```

### Confirmation Dialog

```swift
struct ConfirmationExample: View {
    @State private var showingDialog = false
    
    var body: some View {
        Button("Show Options") {
            showingDialog = true
        }
        .confirmationDialog("Select Option", isPresented: $showingDialog) {
            Button("Option 1") {
                // Action
            }
            Button("Option 2") {
                // Action
            }
            Button("Delete", role: .destructive) {
                // Delete action
            }
            Button("Cancel", role: .cancel) { }
        }
    }
}
```

---

## 🎬 Animations

### Basic Animations

```swift
struct AnimationExample: View {
    @State private var scale: CGFloat = 1.0
    @State private var rotation: Double = 0
    
    var body: some View {
        VStack(spacing: 40) {
            // Scale animation
            Circle()
                .fill(Color.blue)
                .frame(width: 100, height: 100)
                .scaleEffect(scale)
                .onTapGesture {
                    withAnimation(.spring()) {
                        scale = scale == 1.0 ? 1.5 : 1.0
                    }
                }
            
            // Rotation animation
            Rectangle()
                .fill(Color.red)
                .frame(width: 100, height: 100)
                .rotationEffect(.degrees(rotation))
                .onTapGesture {
                    withAnimation(.easeInOut(duration: 0.5)) {
                        rotation += 90
                    }
                }
        }
    }
}
```

### Animation Types

```swift
// Linear
withAnimation(.linear(duration: 1.0)) {
    // Changes
}

// Ease In/Out
withAnimation(.easeInOut(duration: 0.5)) {
    // Changes
}

// Spring
withAnimation(.spring(response: 0.5, dampingFraction: 0.7)) {
    // Changes
}

// Delay
withAnimation(.default.delay(0.5)) {
    // Changes
}

// Repeat
withAnimation(.default.repeatCount(3, autoreverses: true)) {
    // Changes
}

// Forever
withAnimation(.default.repeatForever(autoreverses: true)) {
    // Changes
}
```

### Transitions

```swift
struct TransitionExample: View {
    @State private var show = false
    
    var body: some View {
        VStack {
            Button("Toggle") {
                withAnimation {
                    show.toggle()
                }
            }
            
            if show {
                Text("Hello!")
                    .transition(.scale)
                
                Text("Slide")
                    .transition(.slide)
                
                Text("Opacity")
                    .transition(.opacity)
                
                Text("Combined")
                    .transition(.scale.combined(with: .opacity))
            }
        }
    }
}
```

---

## 👆 Gestures

### Tap Gesture

```swift
Text("Tap me!")
    .onTapGesture {
        print("Tapped")
    }

// Long press
Text("Long press me")
    .onLongPressGesture {
        print("Long pressed")
    }
```

### Drag Gesture

```swift
struct DragExample: View {
    @State private var offset = CGSize.zero
    
    var body: some View {
        Circle()
            .fill(Color.blue)
            .frame(width: 100, height: 100)
            .offset(offset)
            .gesture(
                DragGesture()
                    .onChanged { value in
                        offset = value.translation
                    }
                    .onEnded { _ in
                        withAnimation {
                            offset = .zero
                        }
                    }
            )
    }
}
```

### Magnification Gesture

```swift
struct MagnifyExample: View {
    @State private var scale: CGFloat = 1.0
    
    var body: some View {
        Image(systemName: "photo")
            .font(.system(size: 50))
            .scaleEffect(scale)
            .gesture(
                MagnificationGesture()
                    .onChanged { value in
                        scale = value
                    }
            )
    }
}
```

---

## 🎨 Advanced Layouts

### Geometry Reader

```swift
GeometryReader { geometry in
    VStack {
        Text("Width: \(geometry.size.width)")
        Text("Height: \(geometry.size.height)")
    }
    .frame(width: geometry.size.width, height: geometry.size.height)
    .background(Color.blue.opacity(0.3))
}
```

### Alignment Guides

```swift
HStack(alignment: .customAlignment) {
    VStack {
        Text("Top")
        Text("Middle")
            .alignmentGuide(.customAlignment) { d in d[VerticalAlignment.center] }
        Text("Bottom")
    }
    
    VStack {
        Text("Top")
        Text("Middle")
            .alignmentGuide(.customAlignment) { d in d[VerticalAlignment.center] }
        Text("Bottom")
    }
}

extension VerticalAlignment {
    private enum CustomAlignment: AlignmentID {
        static func defaultValue(in context: ViewDimensions) -> CGFloat {
            context[VerticalAlignment.center]
        }
    }
    
    static let customAlignment = VerticalAlignment(CustomAlignment.self)
}
```

---

## 💡 Tips & Best Practices

1. **Use Live Preview**: Speeds up development significantly
2. **Extract Subviews**: Keep views small and focused
3. **Use Semantic Colors**: `.primary`, `.secondary` instead of hardcoded colors
4. **Leverage Modifiers**: They're composable and reusable
5. **Prefer LazyStacks**: For long lists, use `LazyVStack`/`LazyHStack`
6. **Accessibility**: Always add labels for images and buttons

---

<div align="center">

**Need More Examples?**

[Getting Started Guide](GETTING_STARTED_DESIGNERS.md) | [Design System](DESIGN_SYSTEM.md) | [Advanced Patterns](ADVANCED_PATTERNS.md)

[Back to Main README](../README.md)

</div>
