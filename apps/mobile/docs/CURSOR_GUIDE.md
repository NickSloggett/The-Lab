# 🤖 Vibe Coding with Cursor AI

> **The ultimate guide to building mobile apps with AI assistance**
>
> This project is optimized for Cursor AI. Use these prompts and techniques to build faster than ever.

---

## ✨ Why This Project + Cursor AI = Magic

This boilerplate is specifically structured for AI assistance:

- ✅ **Type-Safe**: TypeScript helps AI understand your code
- ✅ **Well-Documented**: Every component has examples
- ✅ **Consistent Structure**: AI knows where everything is
- ✅ **Design System**: AI can use your tokens automatically
- ✅ **Clear Patterns**: Predictable code AI can follow

---

## 🎯 The Vibe Coding Workflow

### 1. Describe What You Want
Be specific about what you're building.

**Bad:**
```
make a button
```

**Good:**
```
Create a login button that:
- Uses the primary variant from @/components/ui
- Is large size and full width
- Has a loading state
- Shows "Sign In" text
- Triggers handleLogin function on press
```

### 2. Reference Existing Code
Tell Cursor to follow existing patterns.

```
Create a profile screen similar to the explore screen in 
app/(tabs)/explore.tsx, but show user info instead of search.
Use the Card component and design system colors.
```

### 3. Iterate with Feedback
If the first result isn't perfect, give specific feedback.

```
That's good, but make the button purple using colors.primary.DEFAULT 
and add a heart icon on the left using lucide-react-native
```

---

## 🎨 Component Creation Prompts

### Basic Components

**Button with Icon:**
```
Create a Button using @/components/ui/Button that:
- Has primary variant
- Large size
- Heart icon on the left (from lucide-react-native)
- Text "Like Post"
- Calls onLike function when pressed
```

**Card with Content:**
```
Create a Card using @/components/ui/Card that shows:
- Title: "Welcome"
- Description: "Get started with your app"
- Content section with a short paragraph
- Footer with two buttons: "Skip" (ghost) and "Continue" (primary)
```

**Input with Validation:**
```
Create an email Input using @/components/ui/Input with:
- Label "Email Address"
- Placeholder "you@example.com"
- Mail icon on the left
- Validation that checks for @ symbol
- Error message "Invalid email" if validation fails
```

---

## 📱 Screen Creation Prompts

### List Screens

```
Create a notes list screen that:
1. Uses SafeAreaView for safe areas
2. Has a title "Notes" using typography.h1
3. Shows a FlatList of note cards
4. Each card has title, preview text, and date
5. Has a "+" button in the top right to add notes
6. Uses spacing.lg for padding and colors from design system
7. Cards are tappable and navigate to note detail screen
```

### Form Screens

```
Create a profile edit screen with:
1. ScrollView for scrollable content
2. Avatar at the top (circular, 96px)
3. Input fields for: name, email, bio (textarea)
4. Each input has proper labels and icons
5. Two buttons at bottom: "Cancel" (outline) and "Save" (primary)
6. Use the Input component from @/components/ui
7. Follow design system spacing and colors
```

### Detail Screens

```
Create a product detail screen showing:
1. Large product image at top
2. Title and price below image
3. Description in a Card
4. Reviews section in another Card
5. "Add to Cart" button (primary, large, full width) at bottom
6. Uses colors and typography from design system
7. SafeAreaView for safe areas
```

---

## 🎨 Styling Prompts

### Using Design System

```
Style this button to:
- Use colors.primary.DEFAULT as background
- Use colors.primary.contrast for text color
- Use spacing.lg for padding
- Use borderRadius.lg for rounded corners
- Add shadows.md for elevation
```

### Layouts

```
Create a horizontal layout with:
- Two buttons side by side
- Equal width (flex: 1 each)
- spacing.md gap between them
- Full width of parent
- Left button is outline variant
- Right button is primary variant
```

### Responsive Design

```
Make this card responsive:
- On small screens (< 400px): single column, full width
- On larger screens: max width of 600px, centered
- Use spacing.lg padding on all sides
- Use design system colors for background
```

---

## 🔧 Feature Implementation Prompts

### State Management

```
Add a like feature that:
1. Uses useState to track if post is liked
2. Shows solid heart when liked, outline heart when not liked
3. Changes button color based on liked state
4. Toggles on press
5. Uses colors from design system
```

### Navigation

```
Add navigation that:
1. Navigates to /profile/[id] screen on button press
2. Passes user id and name as params
3. Uses expo-router's router.push
4. Shows loading state while navigating
```

### Forms with Validation

```
Create a signup form with:
1. Inputs for: email, password, confirm password
2. Validate email contains @
3. Validate password is at least 8 characters
4. Validate passwords match
5. Show error messages under each field
6. Disable submit button until form is valid
7. Show loading state on submit button while processing
```

---

## 🎯 Complex Feature Prompts

### Todo List

```
Create a todo list feature with:
1. List screen showing all todos
2. Each todo has: title, completed checkbox, delete button
3. "Add Todo" button at top
4. Add screen with input field and save button
5. Toggle completion state on checkbox tap
6. Delete with confirmation alert
7. Store todos in state using useState
8. Use Card components for each todo
9. Follow design system colors and spacing
```

### Search with Filters

```
Create a search screen with:
1. Search input at top with Search icon
2. Filters section with 3 buttons: All, Active, Completed
3. Results list below showing filtered items
4. Empty state when no results
5. Update results as user types
6. Highlight active filter with primary color
7. Use design system components throughout
```

### Image Gallery

```
Create an image gallery with:
1. Grid layout (2 columns on mobile, 3 on tablet)
2. Each image in a Card with caption
3. Tap image to view full screen
4. Modal showing large image with X button
5. Swipe to close modal
6. Loading state for images
7. Use react-native-safe-area-context for safe areas
```

---

## 🎨 Design System Integration

### Always Reference the Design System

When asking Cursor to style something, reference the design system:

```
Style this using the design system:
- Background: colors.surface.elevated
- Text: typography.body with colors.text.primary
- Padding: spacing.lg
- Border radius: borderRadius.md
- Shadow: shadows.sm
```

### Semantic Color Usage

```
Create an error message that:
- Uses colors.error.DEFAULT for background
- Uses colors.error.contrast for text
- Has error icon from lucide-react-native
- Follows typography.body style
- Has spacing.md padding
```

---

## 🚀 Advanced Prompts

### Custom Hooks

```
Create a useDebounce hook that:
1. Takes a value and delay as parameters
2. Returns debounced value
3. Only updates after delay milliseconds
4. Useful for search inputs
5. Include TypeScript types
```

### Animated Components

```
Create an animated list item that:
1. Fades in when mounted
2. Slides in from the right
3. Uses react-native-reanimated
4. Animation duration: 300ms
5. Delay each item by 100ms
```

### API Integration

```
Create a data fetching hook that:
1. Fetches data from an API endpoint
2. Handles loading state
3. Handles error state
4. Returns { data, loading, error }
5. Uses useEffect and useState
6. Include TypeScript types for response
```

---

## 💡 Pro Tips

### 1. Be Specific About Imports

Instead of:
```
use the Button component
```

Say:
```
import Button from '@/components/ui/Button'
```

### 2. Reference Existing Code

```
Create a screen similar to app/(tabs)/profile.tsx 
but for account settings
```

### 3. Ask for TypeScript Types

```
Create this component with proper TypeScript types 
for all props and state
```

### 4. Request Documentation

```
Add JSDoc comments explaining what this component does 
and how to use it, with examples
```

### 5. Iterate Incrementally

Build features step by step:

```
First, create the basic UI layout

[After Cursor generates it]

Now add state management for the form

[After that works]

Finally, add form validation
```

---

## 🎯 Common Patterns

### Pattern: List with Empty State

```
Create a list component that:
1. Shows FlatList when data has items
2. Shows empty state when data is empty
3. Empty state has:
   - Icon (from lucide-react-native)
   - Title: "No items yet"
   - Description: "Add your first item to get started"
   - Button to add item
4. Use design system colors and typography
```

### Pattern: Loading State

```
Add loading state to this screen that:
1. Shows ActivityIndicator in center when loading
2. Shows content when loaded
3. Shows error message if loading fails
4. Uses colors.primary.DEFAULT for ActivityIndicator
5. Has "Retry" button if error occurs
```

### Pattern: Modal/Sheet

```
Create a bottom sheet modal that:
1. Slides up from bottom when opened
2. Has semi-transparent backdrop
3. Has rounded top corners
4. Contains form with inputs and submit button
5. Closes on backdrop tap or X button
6. Uses design system styling
```

---

## 🎨 Styling Shortcuts

Tell Cursor to apply common styles:

```
Style this as a card:
- Use Card component from @/components/ui
- Add shadows.md elevation
- Use spacing.lg padding
- Background: colors.surface.elevated
```

```
Make this a primary button:
- Use Button component from @/components/ui
- variant="primary"
- size="large"
- fullWidth
```

```
Style this text as a heading:
- Use typography.h2
- Color: colors.text.primary
- Add spacing.md margin bottom
```

---

## 🐛 Debugging with Cursor

### Fix Errors

```
I'm getting this error: [paste error]

The code is in app/(tabs)/index.tsx

Fix the error and explain what was wrong
```

### Improve Performance

```
This list is rendering slowly with 1000 items.

Optimize it using:
- FlatList instead of ScrollView
- getItemLayout for fixed height items
- windowSize and maxToRenderPerBatch props
```

### Accessibility

```
Make this component accessible:
- Add proper accessibility labels
- Support screen readers
- Ensure proper touch target sizes (44x44 minimum)
- Test with VoiceOver/TalkBack
```

---

## 🎓 Learning from Generated Code

When Cursor generates code:

1. **Read it carefully** - Understand what it did
2. **Ask questions** - "Why did you use useEffect here?"
3. **Request explanations** - "Explain how this code works"
4. **Modify and iterate** - "Change the color to red"

---

## 📚 Example Conversations

### Building a Login Screen

**You:**
```
Create a login screen with email and password inputs, 
a "Sign In" button, and a "Forgot Password?" link.
Use components from @/components/ui.
```

**Cursor:** [Generates basic login screen]

**You:**
```
Add form validation:
- Email must contain @
- Password must be at least 8 characters
- Show error messages under inputs
- Disable button until form is valid
```

**Cursor:** [Adds validation]

**You:**
```
Add loading state to the button when submitting
```

**Cursor:** [Adds loading state]

**You:**
```
Perfect! Now add a "Don't have an account? Sign up" 
link at the bottom
```

---

## 🚀 Productivity Hacks

### 1. Use Component Templates

```
Generate a new screen using the same structure as 
app/(tabs)/index.tsx but for [your feature]
```

### 2. Batch Similar Changes

```
Update all buttons in this file to use the primary variant 
and large size
```

### 3. Generate Variations

```
Create 3 variations of this card:
1. With image on top
2. With image on left
3. With no image
```

### 4. Refactor Code

```
Extract this inline styles into a StyleSheet.create() object
```

---

## 🎯 Next Steps

### Practice These Prompts

1. Start with simple component prompts
2. Build a complete screen
3. Add navigation and state
4. Create a full feature

### Learn the Patterns

- Study the generated code
- Understand the design system
- Learn TypeScript types
- Master React hooks

### Build Your App

Use these prompts as templates for your own features!

---

## 💬 Get Help

### Community
- [Discord](https://discord.gg/thelab) - Ask for prompt help
- [GitHub Discussions](https://github.com/NickSloggett/MobileApp/discussions) - Share your prompts

### Resources
- [Cursor Documentation](https://cursor.sh/docs)
- [OpenAI Prompt Guide](https://platform.openai.com/docs/guides/prompt-engineering)

---

<div align="center">

## 🤖 Happy Vibe Coding!

**Remember: Be specific, iterate, and have fun!**

[📖 Back to Main Guide](../README.md) | [🎨 Design System](DESIGN_SYSTEM.md) | [💬 Join Discord](https://discord.gg/thelab)

</div>
