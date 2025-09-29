# ⚡ Quick Reference Card

> **Your cheat sheet for building mobile apps**
>
> Keep this handy while coding!

---

## 🚀 Commands

```bash
# Start development
npm start

# Platform-specific
npm run ios          # iOS Simulator (Mac only)
npm run android      # Android Emulator
npm run web          # Web browser

# Examples
npm run example:todo
npm run example:social
npm run example:shop

# Code quality
npm run lint         # Check for errors
npm run format       # Format code
```

---

## 🧩 Import Components

```typescript
// UI Components
import { Button, Card, Input } from '@/components/ui'

// Design System
import { colors, typography, spacing, shadows } from '@/design-system'

// Icons (2000+ available)
import { Heart, Star, User, Settings } from 'lucide-react-native'

// React Native Core
import { View, Text, ScrollView, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

// Navigation
import { router } from 'expo-router'
```

---

## 🎨 Button

```typescript
// Basic
<Button>Click Me</Button>

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>

// Sizes
<Button size="small">Small</Button>
<Button size="medium">Medium</Button>
<Button size="large">Large</Button>

// With icons
<Button leftIcon={<Heart color="white" size={20} />}>
  Like
</Button>

// States
<Button loading>Loading...</Button>
<Button disabled>Disabled</Button>
<Button fullWidth>Full Width</Button>

// Actions
<Button onPress={() => alert('Clicked!')}>
  Click Me
</Button>
```

---

## 📦 Card

```typescript
<Card>
  <Card.Header>
    <Card.Title>Title</Card.Title>
    <Card.Description>Description text</Card.Description>
  </Card.Header>
  
  <Card.Content>
    {/* Your content */}
  </Card.Content>
  
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>

// Variants
<Card variant="default">Default</Card>
<Card variant="elevated">Elevated</Card>
<Card variant="outlined">Outlined</Card>
```

---

## ✏️ Input

```typescript
// Basic
<Input
  label="Email"
  placeholder="you@example.com"
  value={email}
  onChangeText={setEmail}
/>

// With icon
<Input
  leftIcon={<Mail color={colors.text.tertiary} size={20} />}
/>

// With validation
<Input
  error="Invalid email"
/>

// Password
<Input
  password
  label="Password"
/>

// TextArea
<TextArea
  label="Bio"
  rows={5}
/>
```

---

## 🎨 Colors

```typescript
import { colors } from '@/design-system'

// Primary (your brand color)
colors.primary.DEFAULT
colors.primary.light
colors.primary.dark

// Semantic colors
colors.success.DEFAULT   // Green
colors.warning.DEFAULT   // Orange
colors.error.DEFAULT     // Red
colors.info.DEFAULT      // Blue

// Text colors
colors.text.primary      // Main text
colors.text.secondary    // Secondary text
colors.text.tertiary     // Placeholder text

// Surfaces
colors.surface.background  // Main background
colors.surface.foreground  // Cards
colors.surface.elevated    // Modals

// Borders
colors.border.DEFAULT
colors.border.light
colors.border.dark
```

---

## 📝 Typography

```typescript
import { typography } from '@/design-system'

// Headings
typography.h1     // 32px, bold
typography.h2     // 24px, bold
typography.h3     // 20px, semibold
typography.h4     // 18px, semibold

// Body text
typography.body        // 16px, regular
typography.bodyLarge   // 18px, regular
typography.bodySmall   // 14px, regular

// Special
typography.caption     // 12px, regular
typography.button      // 16px, semibold
typography.code        // 14px, monospace

// Usage
<Text style={typography.h1}>Heading</Text>
<Text style={typography.body}>Body text</Text>
```

---

## 📏 Spacing

```typescript
import { spacing } from '@/design-system'

spacing.xs     // 4px
spacing.sm     // 8px
spacing.md     // 16px (standard)
spacing.lg     // 24px
spacing.xl     // 32px
spacing['2xl'] // 48px
spacing['3xl'] // 64px

// Usage
<View style={{
  padding: spacing.lg,
  gap: spacing.md,
  marginBottom: spacing.xl
}}>
```

---

## 🎭 Border Radius

```typescript
import { borderRadius } from '@/design-system'

borderRadius.sm    // 4px
borderRadius.md    // 8px (standard)
borderRadius.lg    // 12px
borderRadius.xl    // 16px
borderRadius.full  // 9999px (circle)

// Usage
<View style={{ borderRadius: borderRadius.lg }}>
```

---

## 🌟 Icons

```typescript
import { Heart, Star, User } from 'lucide-react-native'
import { colors } from '@/design-system'

<Heart 
  color={colors.primary.DEFAULT} 
  size={24} 
/>

// Common sizes
size={16}  // Small
size={20}  // Medium
size={24}  // Large
size={32}  // Extra large
```

**Browse 2000+ icons:** [lucide.dev](https://lucide.dev)

---

## 📱 Layouts

### Stack (Vertical)

```typescript
<View style={{ gap: spacing.md }}>
  <Card />
  <Card />
  <Card />
</View>
```

### Row (Horizontal)

```typescript
<View style={{ 
  flexDirection: 'row', 
  gap: spacing.sm 
}}>
  <Button style={{ flex: 1 }}>Cancel</Button>
  <Button style={{ flex: 1 }}>Save</Button>
</View>
```

### Scrollable

```typescript
<ScrollView>
  {/* Content that scrolls */}
</ScrollView>
```

### Lists

```typescript
<FlatList
  data={items}
  renderItem={({ item }) => (
    <Card>
      <Card.Content>
        <Text>{item.title}</Text>
      </Card.Content>
    </Card>
  )}
/>
```

---

## 🎯 State

```typescript
import { useState } from 'react'

// Basic state
const [count, setCount] = useState(0)

// Usage
<Button onPress={() => setCount(count + 1)}>
  Count: {count}
</Button>

// Boolean state
const [isLiked, setIsLiked] = useState(false)
<Button onPress={() => setIsLiked(!isLiked)}>
  {isLiked ? 'Unlike' : 'Like'}
</Button>

// Text state
const [text, setText] = useState('')
<Input value={text} onChangeText={setText} />
```

---

## 🧭 Navigation

```typescript
import { router } from 'expo-router'

// Navigate to screen
router.push('/profile')

// Navigate with params
router.push({
  pathname: '/user/[id]',
  params: { id: '123', name: 'John' }
})

// Go back
router.back()

// Get params in screen
import { useLocalSearchParams } from 'expo-router'
const { id, name } = useLocalSearchParams()
```

---

## 🎨 Styling

```typescript
import { StyleSheet } from 'react-native'
import { colors, typography, spacing } from '@/design-system'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: colors.surface.background,
  },
  
  title: {
    ...typography.h1,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  
  card: {
    backgroundColor: colors.surface.elevated,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },
})

// Usage
<View style={styles.container}>
  <Text style={styles.title}>Title</Text>
</View>
```

---

## ✅ Form Validation

```typescript
const [email, setEmail] = useState('')
const [error, setError] = useState('')

const validateEmail = (text: string) => {
  setEmail(text)
  if (!text.includes('@')) {
    setError('Invalid email')
  } else {
    setError('')
  }
}

<Input
  value={email}
  onChangeText={validateEmail}
  error={error}
/>
```

---

## 🔄 Loading State

```typescript
const [loading, setLoading] = useState(false)

const handleSubmit = async () => {
  setLoading(true)
  try {
    await submitForm()
  } finally {
    setLoading(false)
  }
}

<Button loading={loading} onPress={handleSubmit}>
  Submit
</Button>
```

---

## 🎭 Conditional Rendering

```typescript
// If/Else
{isLoggedIn ? (
  <Text>Welcome back!</Text>
) : (
  <Button>Login</Button>
)}

// Show only if true
{error && <Text>{error}</Text>}

// Empty state
{items.length === 0 ? (
  <Text>No items</Text>
) : (
  <FlatList data={items} />
)}
```

---

## 🤖 Cursor AI Prompts

### Component
```
Create a Button using @/components/ui/Button with 
primary variant, large size, and heart icon
```

### Screen
```
Create a profile screen with avatar, name, bio, 
and edit button. Use Card and Button from @/components/ui
```

### Feature
```
Add a todo list with add, edit, delete functionality.
Use design system colors and spacing.
```

---

## 🐛 Common Fixes

### Module not found
```bash
npm install
```

### Metro cache issues
```bash
npm start -- --reset-cache
```

### TypeScript errors
```bash
npm run type-check
```

### Format code
```bash
npm run format
```

---

## 📚 File Structure

```
apps/mobile/
├── app/                    # Your screens
│   ├── (tabs)/
│   │   ├── index.tsx      # Home screen
│   │   └── profile.tsx    # Profile screen
│   └── _layout.tsx
│
├── src/
│   ├── components/ui/     # Use these!
│   └── design-system/     # Customize here
```

---

## 🔗 Quick Links

- 📖 [Full Guide](README.md)
- 🎨 [Designer's Guide](docs/DESIGNER_GUIDE.md)
- 🤖 [Cursor AI Guide](docs/CURSOR_GUIDE.md)
- 🧩 [Components](docs/COMPONENTS.md)
- 💬 [Discord](https://discord.gg/thelab)

---

## 💡 Pro Tips

1. **Always use design tokens** - Never hardcode colors/spacing
2. **Test on real device** - Simulator ≠ real experience
3. **Use hot reload** - Save and watch changes instantly
4. **Ask Cursor AI** - This project is optimized for AI
5. **Copy examples** - Start with working code

---

<div align="center">

**Keep this handy while coding!** ⚡

[📖 Full Docs](README.md) | [🎨 Components](docs/COMPONENTS.md) | [💬 Get Help](https://discord.gg/thelab)

</div>
