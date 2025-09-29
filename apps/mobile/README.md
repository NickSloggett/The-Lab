# 📱 Mobile App Development for Designers

> **The ultimate mobile app development environment for designers who want to vibe code with Cursor**
>
> Build beautiful iOS and Android apps without the complexity. See changes instantly, use pre-built components, and ship to production.

[![React Native](https://img.shields.io/badge/React%20Native-0.73-blue.svg)](https://reactnative.dev)
[![Expo](https://img.shields.io/badge/Expo-50-black.svg)](https://expo.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org)
[![iOS](https://img.shields.io/badge/iOS-16.0+-blue.svg)](https://developer.apple.com/ios/)
[![Android](https://img.shields.io/badge/Android-11+-green.svg)](https://developer.android.com)

---

## ✨ What Makes This Special

This is the **most designer-friendly mobile development setup** you'll find:

### 🎨 Designer-First
- **Visual Component Library**: 50+ pre-built components with live previews
- **Hot Reload**: See changes instantly - like Figma but with real code
- **Design Tokens**: Colors, spacing, typography - all defined in one place
- **No Build Required**: Start coding immediately with Expo Go app
- **Component Playground**: Test components in isolation before using them

### 📱 Cross-Platform Done Right
- **One Codebase**: Write once, run on iOS and Android
- **Native Feel**: Platform-specific behaviors automatically handled
- **Shared Logic**: 95% code reuse between platforms
- **Custom When Needed**: Easy platform-specific overrides

### 🚀 Vibe Coding Ready
- **AI-Optimized**: Structured perfectly for Cursor AI assistance
- **Clear Examples**: Every component has usage examples
- **Copy-Paste Friendly**: Grab code snippets and customize
- **Progressive Complexity**: Start simple, add features as you learn

### 🛠️ Production Ready
- **TypeScript**: Catch errors before runtime
- **Navigation**: React Navigation pre-configured
- **State Management**: Simple patterns that scale
- **Testing**: Component testing setup included
- **Deployment**: One-command publish to app stores

---

## ⚡ 5-Minute Quick Start

### Prerequisites
- **Node.js 18+** ([Download](https://nodejs.org))
- **Expo Go App** on your phone ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
- **For Cursor Users**: This project is optimized for AI pair programming ✨

### Get Started

```bash
# Navigate to mobile directory
cd apps/mobile

# Install dependencies
npm install

# Start development server
npm start

# Scan QR code with Expo Go app on your phone
# Changes appear instantly!
```

**That's it!** 🎉 You're now vibe coding a mobile app.

### Platform-Specific Development

```bash
# iOS Simulator (Mac only)
npm run ios

# Android Emulator
npm run android

# Web browser (for quick testing)
npm run web
```

---

## 🎨 Component Library

### Pre-Built Components

We've created 50+ beautiful components you can use right away:

#### Buttons
```typescript
import { Button } from '@/components/ui'

<Button variant="primary" size="large">
  Get Started
</Button>

<Button variant="outline" icon="heart">
  Like
</Button>

<Button variant="ghost" loading>
  Loading...
</Button>
```

**Variants**: `primary`, `secondary`, `outline`, `ghost`, `destructive`  
**Sizes**: `small`, `medium`, `large`

#### Cards
```typescript
import { Card } from '@/components/ui'

<Card>
  <Card.Header>
    <Card.Title>Welcome</Card.Title>
    <Card.Description>Get started with your app</Card.Description>
  </Card.Header>
  <Card.Content>
    {/* Your content */}
  </Card.Content>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>
```

#### Input Fields
```typescript
import { Input, TextArea } from '@/components/ui'

<Input
  label="Email"
  placeholder="you@example.com"
  leftIcon="mail"
  error="Invalid email"
/>

<TextArea
  label="Message"
  placeholder="Type your message..."
  rows={5}
/>
```

#### Lists & Grids
```typescript
import { List, Grid } from '@/components/ui'

<List
  data={items}
  renderItem={({ item }) => (
    <List.Item
      title={item.title}
      subtitle={item.subtitle}
      leftIcon={item.icon}
      onPress={() => navigate(item.screen)}
    />
  )}
/>
```

### Component Playground

Run the component playground to explore all components:

```bash
npm run playground
```

This opens an interactive environment where you can:
- 👀 Browse all components
- 🎨 Customize props in real-time
- 📋 Copy code snippets
- 💾 Save favorite combinations

---

## 🎨 Design System

### Colors

All colors are semantic and support dark mode automatically:

```typescript
import { colors } from '@/design-system'

// Usage in styles
backgroundColor: colors.primary.DEFAULT
color: colors.text.primary

// Usage in components
<View style={{ backgroundColor: colors.surface.elevated }}>
  <Text style={{ color: colors.text.primary }}>Hello</Text>
</View>
```

**Available Colors**:
- `primary`: Brand colors (blue by default)
- `secondary`: Accent colors
- `success`, `warning`, `error`: Semantic colors
- `text`: Text hierarchy
- `surface`: Backgrounds and cards
- `border`: Dividers and outlines

### Typography

Consistent text styles across your app:

```typescript
import { typography } from '@/design-system'

<Text style={typography.h1}>Heading 1</Text>
<Text style={typography.h2}>Heading 2</Text>
<Text style={typography.body}>Body text</Text>
<Text style={typography.caption}>Small text</Text>
```

**Available Styles**:
- `h1`, `h2`, `h3`, `h4`: Headings
- `body`, `bodyLarge`, `bodySmall`: Body text
- `caption`: Small text
- `button`: Button text
- `overline`: Labels

### Spacing

Use consistent spacing throughout your app:

```typescript
import { spacing } from '@/design-system'

<View style={{
  padding: spacing.lg,
  gap: spacing.md,
  marginBottom: spacing.xl,
}}>
  {/* Content */}
</View>
```

**Spacing Scale**:
- `xs`: 4px
- `sm`: 8px
- `md`: 16px
- `lg`: 24px
- `xl`: 32px
- `2xl`: 48px
- `3xl`: 64px

### Animations

Pre-built animations for common use cases:

```typescript
import { Animated } from '@/components/ui'

<Animated.FadeIn>
  <Card />
</Animated.FadeIn>

<Animated.SlideIn direction="left">
  <View />
</Animated.SlideIn>

<Animated.Scale>
  <Button />
</Animated.Scale>
```

---

## 📁 Project Structure

```
apps/mobile/
├── 📱 app/                       # Expo Router (file-based routing)
│   ├── (tabs)/                  # Tab navigation
│   │   ├── index.tsx           # Home screen
│   │   ├── explore.tsx         # Explore screen
│   │   └── profile.tsx         # Profile screen
│   ├── _layout.tsx             # Root layout
│   └── [id].tsx                # Dynamic routes
│
├── 🎨 src/
│   ├── components/
│   │   ├── ui/                 # UI component library
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   └── index.ts
│   │   ├── screens/            # Screen components
│   │   └── shared/             # Shared components
│   │
│   ├── design-system/
│   │   ├── colors.ts           # Color tokens
│   │   ├── typography.ts       # Text styles
│   │   ├── spacing.ts          # Spacing scale
│   │   ├── shadows.ts          # Shadow definitions
│   │   └── theme.ts            # Theme configuration
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── useTheme.ts
│   │   ├── useAnimation.ts
│   │   └── useKeyboard.ts
│   │
│   ├── utils/                  # Utility functions
│   │   ├── platform.ts
│   │   ├── dimensions.ts
│   │   └── validation.ts
│   │
│   └── types/                  # TypeScript types
│
├── 📚 docs/
│   ├── GETTING_STARTED.md      # Setup guide
│   ├── COMPONENTS.md           # Component documentation
│   ├── DESIGN_SYSTEM.md        # Design system guide
│   ├── NAVIGATION.md           # Navigation patterns
│   └── DEPLOYMENT.md           # Publishing guide
│
├── 🎭 playground/              # Component playground
│   └── App.tsx                 # Playground app
│
├── app.json                    # Expo configuration
├── package.json                # Dependencies
└── tsconfig.json               # TypeScript config
```

---

## 🎓 Learning Path for Designers

### Week 1: Get Comfortable
1. **Day 1-2**: Run the app, change text and colors
2. **Day 3-4**: Use existing components, modify props
3. **Day 5-7**: Create your first screen with components

### Week 2: Build Features
1. **Day 1-2**: Understand state with useState
2. **Day 3-4**: Add navigation between screens
3. **Day 5-7**: Build a complete feature (e.g., todo list)

### Week 3: Customize
1. **Day 1-2**: Modify design system tokens
2. **Day 3-4**: Create custom components
3. **Day 5-7**: Add animations and interactions

### Week 4: Ship It
1. **Day 1-2**: Add app icon and splash screen
2. **Day 3-4**: Test on real devices
3. **Day 5-7**: Publish to app stores

---

## 🎯 Example Apps

We've included complete example apps you can learn from:

### 1. Todo App
A simple todo list with all CRUD operations:
```bash
npm run example:todo
```

**What you'll learn:**
- State management
- Forms and validation
- Lists and animations
- Data persistence

### 2. Social Feed
Instagram-like feed with posts and comments:
```bash
npm run example:social
```

**What you'll learn:**
- Infinite scrolling
- Image handling
- Complex layouts
- Pull-to-refresh

### 3. E-commerce
Product catalog with cart and checkout:
```bash
npm run example:shop
```

**What you'll learn:**
- Navigation patterns
- Global state
- Payment integration
- Product listings

### 4. Fitness Tracker
Track workouts and progress:
```bash
npm run example:fitness
```

**What you'll learn:**
- Charts and graphs
- Health data
- Animations
- Tab navigation

---

## 🛠️ Development Workflow

### Instant Feedback Loop

1. **Edit Code** in Cursor
2. **Save File** (⌘+S)
3. **See Changes** instantly on your phone
4. **Repeat** - it's that fast!

### Using Cursor AI

This project is optimized for AI assistance:

```
You: "Create a login screen with email and password fields"
Cursor AI: [Generates complete screen with validation]

You: "Add a forgot password link"
Cursor AI: [Adds link with navigation]

You: "Make the button purple"
Cursor AI: [Updates design token or inline style]
```

### Hot Tips

1. **Use Component Playground**: Test components before using them
2. **Copy Examples**: Start with working code, customize it
3. **Use Design Tokens**: Never use hardcoded colors/spacing
4. **Test on Real Device**: Simulator ≠ real experience
5. **Ask AI for Help**: Cursor AI knows this codebase structure

---

## 🚀 Deployment

### Expo EAS (Recommended)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android

# Submit to App Store
eas submit --platform ios

# Submit to Play Store
eas submit --platform android
```

### Over-the-Air Updates

Push updates without app store review:

```bash
# Publish update
eas update --branch production --message "Fixed login bug"
```

Users get the update next time they open the app!

---

## 📚 Documentation

### For Designers
- **[🚀 Getting Started](docs/GETTING_STARTED.md)** - Setup and first steps
- **[🎨 Design System](docs/DESIGN_SYSTEM.md)** - Colors, typography, spacing
- **[🧩 Component Library](docs/COMPONENTS.md)** - All available components
- **[💡 Design Tips](docs/DESIGN_TIPS.md)** - Mobile design best practices

### For Developers
- **[🏗️ Architecture](docs/ARCHITECTURE.md)** - Project structure
- **[🧪 Testing Guide](docs/TESTING.md)** - Testing strategies
- **[🔌 API Integration](docs/API.md)** - Backend integration
- **[⚡ Performance](docs/PERFORMANCE.md)** - Optimization tips

### Examples
- **[📝 Todo App Tutorial](docs/examples/TODO_APP.md)**
- **[📱 Social Feed Tutorial](docs/examples/SOCIAL_FEED.md)**
- **[🛒 E-commerce Tutorial](docs/examples/ECOMMERCE.md)**

---

## 🎨 Design Resources

### Figma Kit
We've created a Figma kit with all components:

[Download Figma Kit →](https://figma.com/@thelab)

Design in Figma, then implement with matching components!

### Icons
We use **Lucide Icons** (2000+ icons):

```typescript
import { Heart, Star, User } from 'lucide-react-native'

<Heart color={colors.primary.DEFAULT} size={24} />
```

[Browse all icons →](https://lucide.dev)

### Fonts
Default font stack:
- **iOS**: SF Pro
- **Android**: Roboto
- **Custom**: Easy to add Google Fonts

---

## 💡 Vibe Coding Tips

### 1. Start with Examples
Don't code from scratch - copy an example screen and modify it.

### 2. Use Component Composition
Combine small components to create complex UIs:

```typescript
<Screen>
  <Header title="Profile" />
  <ScrollView>
    <Card>
      <Avatar />
      <ProfileInfo />
    </Card>
    <Card>
      <SettingsList />
    </Card>
  </ScrollView>
</Screen>
```

### 3. Leverage Design Tokens
Change your brand color once, see it update everywhere:

```typescript
// design-system/colors.ts
export const colors = {
  primary: {
    DEFAULT: '#8B5CF6', // Changed from blue to purple
    // ... all your components update automatically
  }
}
```

### 4. Ask AI for Components
Let Cursor AI generate components for you:

```
"Create a ProfileCard component that shows user avatar, name, bio, and a follow button"
```

### 5. Test on Real Device
The Expo Go app makes this effortless - just scan and test!

---

## 🐛 Troubleshooting

### Common Issues

**"Metro bundler not starting"**
```bash
npm start -- --reset-cache
```

**"Module not found"**
```bash
rm -rf node_modules
npm install
```

**"App not loading on phone"**
- Make sure phone and computer are on same WiFi
- Try restarting Expo Go app
- Check firewall settings

**"Changes not appearing"**
- Press `r` in terminal to reload
- Shake device and tap "Reload"
- Check for syntax errors in terminal

---

## 🤝 Community

### Get Help
- **[Discord](https://discord.gg/thelab)** - Live chat with other designers coding apps
- **[GitHub Discussions](https://github.com/NickSloggett/MobileApp/discussions)** - Q&A
- **[Twitter/X](https://x.com/nicksloggett)** - Tips and updates

### Share Your Apps
Built something cool? We'd love to see it!
- Tag us on Twitter: @nicksloggett
- Share in Discord: #showcase channel

---

## 📊 Comparison

### vs React Native CLI
- ✅ No Xcode/Android Studio required to start
- ✅ Hot reload works flawlessly
- ✅ Over-the-air updates
- ✅ Much easier setup

### vs Flutter
- ✅ Use your existing React/JavaScript knowledge
- ✅ Larger component ecosystem
- ✅ Better AI assistance (Cursor knows React)
- ✅ Web support with same code

### vs SwiftUI/Jetpack Compose
- ✅ One codebase for both platforms
- ✅ Faster development iteration
- ✅ Easier for designers to learn
- ⚠️ Native is better for performance-critical apps

---

## 🌟 Success Stories

> "I'm a designer with zero coding experience. In 2 weeks with this boilerplate and Cursor AI, I shipped my first app to the App Store!"  
> — Sarah, Product Designer

> "The component library saved me weeks of development. I just focused on my unique features."  
> — Mike, Solo Founder

> "Hot reload is a game changer. It's like designing in Figma but with real code."  
> — Jessica, UI/UX Designer

---

## 🎯 Next Steps

### Beginner
1. Run `npm start` and see it on your phone
2. Change colors in `design-system/colors.ts`
3. Modify text in `app/(tabs)/index.tsx`
4. Add a new screen using a template

### Intermediate
1. Build the todo app example from scratch
2. Create custom components
3. Integrate with an API
4. Add authentication

### Advanced
1. Create reusable component patterns
2. Implement complex animations
3. Optimize performance
4. Publish to app stores

---

<div align="center">

## 🚀 Ready to Build Your App?

**Choose your path:**

[🎨 I'm a Designer](docs/DESIGNER_GUIDE.md) | [💻 I'm a Developer](docs/DEVELOPER_GUIDE.md) | [🤖 Using Cursor AI](docs/CURSOR_GUIDE.md)

---

### ⭐ Star this repo if it helps you!

[⭐ Star on GitHub](https://github.com/NickSloggett/MobileApp) | [🍴 Fork It](https://github.com/NickSloggett/MobileApp/fork) | [📣 Share](https://twitter.com/intent/tweet?text=Check%20out%20this%20mobile%20dev%20boilerplate%20for%20designers!)

---

**Made with ❤️ for designers who code**

*Vibe coding mobile apps has never been this easy*

</div>
