# 🎨 Designer's Guide to Vibe Coding Mobile Apps

> **From designer to mobile app developer in 4 weeks**
>
> This guide is specifically for designers who want to build their own apps without becoming a "real" developer. Think of it as designing in Figma, but with real, working code.

---

## 🌟 Welcome!

Hey designer! 👋

If you're reading this, you probably:
- Design beautiful interfaces in Figma or Sketch
- Want to build an actual app without learning to "code" code
- Heard about "vibe coding" with AI assistants
- Want to ship something real, not just prototypes

**Good news**: This boilerplate is built for you. Everything is visual, well-documented, and designed to work with Cursor AI.

---

## 📖 Table of Contents

1. [Week 1: Getting Started](#week-1-getting-started)
2. [Week 2: Using Components](#week-2-using-components)
3. [Week 3: Building Screens](#week-3-building-screens)
4. [Week 4: Shipping Your App](#week-4-shipping-your-app)
5. [Cursor AI Prompts](#cursor-ai-prompts)
6. [Common Patterns](#common-patterns)
7. [Design Tips](#design-tips)

---

## Week 1: Getting Started

### Day 1: Setup & First Run

**Goal**: See your app running on your phone

**Steps**:
1. Install Node.js ([download](https://nodejs.org))
2. Download Expo Go app on your phone
3. Open Terminal (Mac) or Command Prompt (Windows)
4. Navigate to the mobile folder:
   ```bash
   cd apps/mobile
   ```
5. Install dependencies:
   ```bash
   npm install
   ```
6. Start the app:
   ```bash
   npm start
   ```
7. Scan the QR code with your phone
8. 🎉 **Your app is running!**

**What you should see**: A sample app with buttons and text that you can interact with.

**Pro tip**: Keep the app running. Every time you save a file, the app updates instantly on your phone. It's like Figma's auto-save!

---

### Day 2: Understanding the File Structure

You don't need to understand everything, but here's what matters:

```
apps/mobile/
├── app/                    # Your app screens (THIS IS WHERE YOU'LL WORK MOST)
│   ├── (tabs)/
│   │   ├── index.tsx      # Home screen
│   │   └── profile.tsx    # Profile screen
│   └── _layout.tsx        # App navigation
│
├── src/
│   ├── components/ui/      # Pre-built components (buttons, cards, etc.)
│   └── design-system/      # Colors, fonts, spacing
│
└── docs/                   # Documentation (you're reading this!)
```

**What to remember**:
- `app/` = Your screens
- `src/components/ui/` = Pre-built components you can use
- `src/design-system/` = Colors and styles

---

### Day 3: Change Something!

Let's make your first change.

**Task**: Change the home screen title

1. Open `app/(tabs)/index.tsx` in Cursor
2. Find this line:
   ```typescript
   <Text style={typography.h1}>Welcome</Text>
   ```
3. Change "Welcome" to "Hello World"
4. Save the file (⌘+S or Ctrl+S)
5. Look at your phone - it changed instantly!

**🎉 Congratulations!** You just "coded" your first change.

---

### Day 4: Play with Colors

Colors are defined in one place: `src/design-system/colors.ts`

**Task**: Change the primary color

1. Open `src/design-system/colors.ts`
2. Find this:
   ```typescript
   primary: {
     DEFAULT: '#8B5CF6',  // Purple
   ```
3. Change it to your brand color (e.g., `'#FF6B6B'` for red)
4. Save and watch everything update!

**What just happened**: Every button, link, and accent color in your app now uses your color. That's the power of design tokens!

---

### Day 5: Using Pre-built Components

You don't have to build everything from scratch. We've created 50+ components for you.

**Task**: Add a button to the home screen

1. Open `app/(tabs)/index.tsx`
2. At the top, import the Button:
   ```typescript
   import { Button } from '@/components/ui'
   ```
3. Add a button anywhere in your screen:
   ```typescript
   <Button variant="primary" size="large">
     Click Me
   </Button>
   ```
4. Save and see it appear!

**Try this**: Change `variant` to `outline` or `ghost`. See how it looks different?

---

### Week 1 Checklist

- [ ] App running on my phone
- [ ] I understand the file structure (basically)
- [ ] I changed some text
- [ ] I changed a color
- [ ] I added a button

**If you completed this, you're ready for Week 2!** 🚀

---

## Week 2: Using Components

### Day 1: The Button Component

Buttons are the most used component. Let's master them.

**All the ways to use a Button**:

```typescript
// Basic button
<Button>Click Me</Button>

// Different styles
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>

// Different sizes
<Button size="small">Small</Button>
<Button size="medium">Medium</Button>
<Button size="large">Large</Button>

// With icons
<Button leftIcon={<Heart />}>Like</Button>
<Button rightIcon={<ChevronRight />}>Next</Button>

// States
<Button loading>Loading...</Button>
<Button disabled>Disabled</Button>

// Actions
<Button onPress={() => alert('Clicked!')}>
  Click Me
</Button>
```

**Task**: Create a button that:
- Is large and primary
- Has a heart icon on the left
- Says "Like this post"
- Shows an alert when clicked

<details>
<summary>Solution</summary>

```typescript
import { Alert } from 'react-native'
import { Heart } from 'lucide-react-native'

<Button 
  variant="primary" 
  size="large"
  leftIcon={<Heart size={20} color="white" />}
  onPress={() => Alert.alert('Liked!')}
>
  Like this post
</Button>
```
</details>

---

### Day 2: The Card Component

Cards group related content together.

**Basic card**:
```typescript
import { Card } from '@/components/ui'

<Card>
  <Card.Header>
    <Card.Title>Profile</Card.Title>
    <Card.Description>Your account information</Card.Description>
  </Card.Header>
  
  <Card.Content>
    {/* Your content here */}
    <Text>Email: user@example.com</Text>
  </Card.Content>
  
  <Card.Footer>
    <Button>Edit</Button>
  </Card.Footer>
</Card>
```

**Task**: Create a profile card with:
- Title: "John Doe"
- Description: "Product Designer"
- Content: Display email and location
- Footer: "Edit Profile" button

---

### Day 3: The Input Component

Forms are essential for any app.

**Basic input**:
```typescript
import { Input } from '@/components/ui'
import { useState } from 'react'

const [email, setEmail] = useState('')

<Input
  label="Email"
  placeholder="you@example.com"
  value={email}
  onChangeText={setEmail}
/>
```

**Input with validation**:
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
  label="Email"
  placeholder="you@example.com"
  value={email}
  onChangeText={validateEmail}
  error={error}
/>
```

**Task**: Create a login form with:
- Email input (with validation)
- Password input (hidden text)
- "Login" button

---

### Day 4: Layout Components

**Spacing between elements**:
```typescript
<View style={{ gap: spacing.md }}>
  <Button>First</Button>
  <Button>Second</Button>
  <Button>Third</Button>
</View>
```

**Horizontal layout**:
```typescript
<View style={{ flexDirection: 'row', gap: spacing.sm }}>
  <Button style={{ flex: 1 }}>Cancel</Button>
  <Button style={{ flex: 1 }} variant="primary">Save</Button>
</View>
```

**Scrollable content**:
```typescript
import { ScrollView } from 'react-native'

<ScrollView>
  <Card />
  <Card />
  <Card />
  {/* More content than fits on screen */}
</ScrollView>
```

---

### Day 5: Icons

We use [Lucide Icons](https://lucide.dev) - over 2000 beautiful icons!

**Using icons**:
```typescript
import { Heart, Star, User, Settings } from 'lucide-react-native'
import { colors } from '@/design-system'

<Heart color={colors.error.DEFAULT} size={24} />
<Star color={colors.warning.DEFAULT} size={20} />
<User color={colors.text.secondary} size={24} />
```

**Icons in buttons**:
```typescript
<Button leftIcon={<Heart size={20} color="white" />}>
  Like
</Button>
```

**Task**: Add these icons to a profile screen:
- Settings icon in the top right
- Heart icon for "Favorites"
- User icon for "Edit Profile"

---

### Week 2 Checklist

- [ ] I can use buttons with different styles
- [ ] I created a card with content
- [ ] I built a form with inputs
- [ ] I understand basic layouts
- [ ] I can use icons

---

## Week 3: Building Screens

### Day 1: Your First Screen from Scratch

**Task**: Create a "Settings" screen

1. Create a new file: `app/settings.tsx`
2. Start with this template:

```typescript
import { View, ScrollView, Text } from 'react-native'
import { Card, Button } from '@/components/ui'
import { colors, spacing, typography } from '@/design-system'

export default function SettingsScreen() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.surface.background }}>
      <View style={{ padding: spacing.lg, gap: spacing.md }}>
        <Text style={typography.h1}>Settings</Text>
        
        <Card>
          <Card.Header>
            <Card.Title>Account</Card.Title>
          </Card.Header>
          <Card.Content>
            <Button>Edit Profile</Button>
            <Button>Change Password</Button>
          </Card.Content>
        </Card>
        
        <Card>
          <Card.Header>
            <Card.Title>Preferences</Card.Title>
          </Card.Header>
          <Card.Content>
            <Button>Notifications</Button>
            <Button>Privacy</Button>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  )
}
```

3. Navigate to `/settings` in your app to see it!

---

### Day 2: Adding State (Making Things Interactive)

**State** = Data that can change. When it changes, the UI updates.

**Example**: A counter

```typescript
import { useState } from 'react'
import { View, Text } from 'react-native'
import { Button } from '@/components/ui'
import { typography, spacing } from '@/design-system'

export default function CounterScreen() {
  const [count, setCount] = useState(0)
  
  return (
    <View style={{ padding: spacing.lg, gap: spacing.md }}>
      <Text style={typography.h1}>{count}</Text>
      
      <Button onPress={() => setCount(count + 1)}>
        Increment
      </Button>
      
      <Button onPress={() => setCount(count - 1)}>
        Decrement
      </Button>
      
      <Button variant="outline" onPress={() => setCount(0)}>
        Reset
      </Button>
    </View>
  )
}
```

**What's happening?**:
1. `useState(0)` creates a variable that starts at 0
2. `setCount(count + 1)` increases it by 1
3. The screen automatically updates when count changes

**Task**: Create a "Like" button that:
- Shows "❤️ Like" when not liked
- Shows "💔 Unlike" when liked
- Changes color when clicked

<details>
<summary>Solution</summary>

```typescript
const [isLiked, setIsLiked] = useState(false)

<Button
  variant={isLiked ? 'primary' : 'outline'}
  onPress={() => setIsLiked(!isLiked)}
>
  {isLiked ? '💔 Unlike' : '❤️ Like'}
</Button>
```
</details>

---

### Day 3: Lists of Data

**Showing a list**:

```typescript
import { FlatList, View, Text } from 'react-native'
import { Card } from '@/components/ui'
import { spacing, typography } from '@/design-system'

const todos = [
  { id: '1', title: 'Design homepage' },
  { id: '2', title: 'Create components' },
  { id: '3', title: 'Ship app' },
]

export default function TodoScreen() {
  return (
    <FlatList
      data={todos}
      renderItem={({ item }) => (
        <Card style={{ marginBottom: spacing.md }}>
          <Card.Content>
            <Text style={typography.body}>{item.title}</Text>
          </Card.Content>
        </Card>
      )}
      contentContainerStyle={{ padding: spacing.lg }}
    />
  )
}
```

**Task**: Create a "Notes" list where each note has:
- Title
- Date
- "View" button

---

### Day 4: Navigation Between Screens

**Link to another screen**:

```typescript
import { router } from 'expo-router'
import { Button } from '@/components/ui'

<Button onPress={() => router.push('/settings')}>
  Go to Settings
</Button>

<Button onPress={() => router.back()}>
  Go Back
</Button>
```

**Pass data to another screen**:

```typescript
// From first screen
<Button onPress={() => router.push({
  pathname: '/user',
  params: { id: '123', name: 'John' }
})}>
  View Profile
</Button>

// In the user screen (app/user.tsx)
import { useLocalSearchParams } from 'expo-router'

const { id, name } = useLocalSearchParams()
// Now you can use id and name!
```

---

### Day 5: Build a Complete Feature

**Task**: Build a "Notes" app with:

1. **List screen** (`app/notes/index.tsx`):
   - Shows all notes
   - Each note has title and preview
   - "Add Note" button at the top

2. **Add screen** (`app/notes/add.tsx`):
   - Title input
   - Content textarea
   - "Save" button

3. **Detail screen** (`app/notes/[id].tsx`):
   - Shows full note
   - "Edit" and "Delete" buttons

**Hint**: Ask Cursor AI!
```
"Create a notes app with a list screen, add screen, and detail screen. Use the Card and Button components from @/components/ui."
```

---

### Week 3 Checklist

- [ ] I created a screen from scratch
- [ ] I understand useState for interactive elements
- [ ] I can display lists of data
- [ ] I can navigate between screens
- [ ] I built a complete feature

---

## Week 4: Shipping Your App

### Day 1: Polish Your App

**Add app icon and splash screen**:

1. Create a 1024x1024 icon in Figma/Photoshop
2. Save as `assets/icon.png`
3. Create a splash screen (1242x2688)
4. Save as `assets/splash.png`

**Customize app name and colors**:

In `app.json`:
```json
{
  "expo": {
    "name": "Your App Name",
    "slug": "your-app-slug",
    "splash": {
      "backgroundColor": "#YOUR_COLOR"
    }
  }
}
```

---

### Day 2: Test on Real Devices

**Test on different screen sizes**:
- Small phone (iPhone SE)
- Large phone (iPhone Pro Max)
- Tablet (iPad)

**Test different scenarios**:
- Slow internet
- No internet
- Interrupted (phone call comes in)
- Background and return

---

### Day 3: Create an Expo Account

```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Create project
eas build:configure
```

---

### Day 4: Build Your App

```bash
# Build for iOS
eas build --platform ios

# Build for Android  
eas build --platform android

# Wait 10-15 minutes for build to complete
```

You'll get a link to download your app!

---

### Day 5: Publish to App Stores

**iOS (TestFlight)**:
```bash
eas submit --platform ios
```

**Android (Google Play)**:
```bash
eas submit --platform android
```

**🎉 Your app is live!**

---

## Cursor AI Prompts

Use these prompts with Cursor to build faster:

### Creating Screens
```
"Create a profile screen with avatar, name, bio, and edit button. Use Card and Button from @/components/ui and follow the design system colors."
```

### Adding Features
```
"Add a todo list feature with add, edit, delete, and mark as complete. Store todos in state. Use the design system components."
```

### Fixing Layouts
```
"This layout looks weird on small screens. Make it responsive and follow iOS/Android design guidelines."
```

### Styling
```
"Make this button match the design system. It should be primary variant, large size, with rounded corners."
```

### Debug
```
"This component isn't working. Here's the error: [paste error]. Fix it."
```

---

## Common Patterns

### Pattern: Form with Validation

```typescript
import { useState } from 'react'
import { View } from 'react-native'
import { Input, Button } from '@/components/ui'
import { spacing } from '@/design-system'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({ email: '', password: '' })
  
  const validate = () => {
    const newErrors = { email: '', password: '' }
    
    if (!email.includes('@')) {
      newErrors.email = 'Invalid email'
    }
    
    if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }
    
    setErrors(newErrors)
    return !newErrors.email && !newErrors.password
  }
  
  const handleSubmit = () => {
    if (validate()) {
      // Submit form
      console.log('Form is valid!', { email, password })
    }
  }
  
  return (
    <View style={{ padding: spacing.lg, gap: spacing.md }}>
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        error={errors.email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        error={errors.password}
        password
      />
      
      <Button onPress={handleSubmit} fullWidth>
        Login
      </Button>
    </View>
  )
}
```

---

### Pattern: Loading State

```typescript
import { useState } from 'react'
import { Button } from '@/components/ui'

const [isLoading, setIsLoading] = useState(false)

const handleSave = async () => {
  setIsLoading(true)
  
  try {
    // Do something async (API call, etc.)
    await saveToAPI()
    alert('Saved!')
  } catch (error) {
    alert('Error saving')
  } finally {
    setIsLoading(false)
  }
}

<Button loading={isLoading} onPress={handleSave}>
  Save
</Button>
```

---

### Pattern: Conditional Rendering

```typescript
const [isLoggedIn, setIsLoggedIn] = useState(false)

return (
  <View>
    {isLoggedIn ? (
      <Text>Welcome back!</Text>
    ) : (
      <Button onPress={() => setIsLoggedIn(true)}>
        Login
      </Button>
    )}
  </View>
)
```

---

## Design Tips

### Mobile-Specific Guidelines

1. **Touch Targets**: Minimum 44x44 pixels
   ```typescript
   <Button style={{ minHeight: 44, minWidth: 44 }}>
   ```

2. **Safe Areas**: Respect notches and home indicators
   ```typescript
   import { SafeAreaView } from 'react-native'
   
   <SafeAreaView>
     {/* Your content */}
   </SafeAreaView>
   ```

3. **Keyboard**: Handle keyboard covering inputs
   ```typescript
   import { KeyboardAvoidingView, Platform } from 'react-native'
   
   <KeyboardAvoidingView 
     behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
   >
     {/* Your form */}
   </KeyboardAvoidingView>
   ```

4. **Loading States**: Always show feedback
   ```typescript
   <Button loading={isLoading}>Submit</Button>
   ```

5. **Empty States**: Design for when there's no data
   ```typescript
   {items.length === 0 ? (
     <View style={{ padding: spacing.xl, alignItems: 'center' }}>
       <Text style={typography.h3}>No items yet</Text>
       <Text style={typography.body}>Add your first item!</Text>
       <Button onPress={handleAdd}>Add Item</Button>
     </View>
   ) : (
     <FlatList data={items} />
   )}
   ```

---

## Next Steps

You've completed the 4-week journey! Here's what you can do next:

### Level Up
- Learn about [React Navigation](https://reactnavigation.org)
- Understand [React Hooks](https://react.dev/reference/react)
- Explore [Expo APIs](https://docs.expo.dev)

### Build Projects
- Todo app
- Notes app
- Instagram clone
- E-commerce app

### Join Community
- [Discord](https://discord.gg/thelab)
- [Twitter/X](https://x.com/nicksloggett)

---

## Help & Support

### Stuck?
1. Read the error message carefully
2. Ask Cursor AI to fix it
3. Search the error on Google
4. Ask in our Discord

### Need Inspiration?
- Check the `examples/` folder
- Browse [Dribbble](https://dribbble.com) for designs
- Look at apps you love and recreate them

---

<div align="center">

**You're a mobile app developer now!** 🎉

Keep building, keep shipping, and remember:
*The best way to learn is by doing.*

[Join Discord](https://discord.gg/thelab) | [Share Your App](https://x.com/nicksloggett) | [Get Help](https://github.com/NickSloggett/MobileApp/discussions)

</div>
