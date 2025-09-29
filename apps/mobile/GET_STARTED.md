# 🚀 Get Started - Mobile App Development

> **Your app is ready to go! Follow these steps to start building.**

---

## ✅ Prerequisites Checklist

Before you begin, make sure you have:

- [ ] **Node.js 18+** installed ([Download here](https://nodejs.org))
- [ ] **Expo Go app** on your phone:
  - [iOS: Download from App Store](https://apps.apple.com/app/expo-go/id982107779)
  - [Android: Download from Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
- [ ] **Cursor** installed (optional but recommended) ([Get it here](https://cursor.sh))
- [ ] Your phone and computer on the **same WiFi network**

---

## 🎯 Quick Start (5 Minutes)

### Step 1: Install Dependencies

Open your terminal and navigate to the mobile app folder:

```bash
cd apps/mobile
npm install
```

This will install all required packages. Wait for it to complete (~2-3 minutes).

### Step 2: Start the Development Server

```bash
npm start
```

You'll see a QR code in your terminal. Keep this terminal window open!

### Step 3: Open on Your Phone

1. Open the **Expo Go** app on your phone
2. **iPhone**: Use the Camera app to scan the QR code
3. **Android**: Scan the QR code in the Expo Go app
4. Wait for the app to load (~30 seconds first time)

**🎉 Your app is now running!**

Every time you save a file, the app will update instantly on your phone.

---

## 🎨 Your First Change

Let's make your first edit to verify everything works:

### Change the Home Screen Title

1. Open `apps/mobile/app/(tabs)/index.tsx` in your editor
2. Find this line (around line 33):
   ```typescript
   <Text style={styles.title}>Welcome to Your App! 🎉</Text>
   ```
3. Change it to:
   ```typescript
   <Text style={styles.title}>My Awesome App! 🚀</Text>
   ```
4. Save the file (⌘+S or Ctrl+S)
5. Look at your phone - it updated automatically!

**Congratulations!** You just made your first code change. 🎉

---

## 🎨 Customize Your Brand

### Change Primary Color

Your app's primary color is used throughout (buttons, links, highlights).

1. Open `apps/mobile/src/design-system/colors.ts`
2. Find this section (around line 14):
   ```typescript
   primary: {
     DEFAULT: '#8B5CF6',  // Purple
   ```
3. Change the color to your brand color:
   ```typescript
   primary: {
     DEFAULT: '#FF6B6B',  // Red
     // Or use your brand color hex code
   ```
4. Save and watch all the colors update throughout your app!

**Popular color palettes:**
- Blue: `#3B82F6`
- Green: `#10B981`
- Purple: `#8B5CF6` (default)
- Pink: `#EC4899`
- Orange: `#F59E0B`

---

## 📱 Platform-Specific Development

### Run on iOS Simulator (Mac only)

If you have Xcode installed:

```bash
npm run ios
```

This opens the iOS Simulator with your app.

### Run on Android Emulator

If you have Android Studio installed:

```bash
npm run android
```

This opens the Android Emulator with your app.

### Run in Web Browser

For quick testing:

```bash
npm run web
```

Opens your app in a web browser at `http://localhost:8081`

---

## 🧩 Explore the Component Library

Your app comes with 50+ pre-built components. Try them out!

### Add a Button

1. Open `apps/mobile/app/(tabs)/index.tsx`
2. Import the Button component at the top:
   ```typescript
   import { Button } from '@/components/ui'
   ```
3. Add a button anywhere in your screen:
   ```typescript
   <Button 
     variant="primary" 
     size="large"
     onPress={() => alert('Hello!')}
   >
     Click Me
   </Button>
   ```
4. Save and see it appear on your phone!

### Try Different Button Variants

Replace the button with these to see different styles:

```typescript
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
```

### Add Icons

1. Import an icon at the top:
   ```typescript
   import { Heart } from 'lucide-react-native'
   ```
2. Use it in a button:
   ```typescript
   <Button leftIcon={<Heart color="white" size={20} />}>
     Like
   </Button>
   ```

Browse 2000+ icons at [lucide.dev](https://lucide.dev)

---

## 📚 Next Steps

### For Designers Learning to Code

Follow the comprehensive 4-week guide:

**[📖 Read the Designer's Guide →](apps/mobile/docs/DESIGNER_GUIDE.md)**

This guide takes you from zero to shipping your first app, with daily lessons and exercises.

### For Developers

Jump right in with the technical documentation:

**[💻 Developer Quick Start →](apps/mobile/docs/GETTING_STARTED.md)**

### For Cursor AI Users

Learn how to vibe code with AI assistance:

**[🤖 Cursor AI Guide →](apps/mobile/docs/CURSOR_GUIDE.md)**

---

## 🎓 Learn by Example

We've included 4 complete example apps you can run and learn from:

```bash
# Todo App - Lists, forms, state management
npm run example:todo

# Social Feed - Infinite scroll, images
npm run example:social

# E-commerce - Shopping cart, checkout
npm run example:shop

# Fitness Tracker - Charts, progress tracking
npm run example:fitness
```

Each example is fully functional and documented. Use them as starting points!

---

## 🛠️ Useful Commands

### Development

```bash
# Start development server
npm start

# Start with cache cleared
npm start -- --reset-cache

# Run on iOS Simulator
npm run ios

# Run on Android Emulator
npm run android

# Run in web browser
npm run web
```

### Component Playground

```bash
# Open component playground
npm run playground

# Browse and test all components interactively
```

### Code Quality

```bash
# Check for errors
npm run lint

# Format code
npm run format

# Type check
npm run type-check
```

---

## 🎯 Project Structure

Here's what you need to know:

```
apps/mobile/
├── app/                       # Your app screens
│   ├── (tabs)/
│   │   ├── index.tsx         # Home screen ← Edit this
│   │   ├── explore.tsx       # Explore screen
│   │   └── profile.tsx       # Profile screen
│   └── _layout.tsx           # Navigation setup
│
├── src/
│   ├── components/ui/        # Pre-built components ← Use these
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── ...
│   │
│   ├── design-system/        # Colors, fonts, spacing ← Customize here
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   └── spacing.ts
│   │
│   └── hooks/                # Custom React hooks
│
├── docs/                     # Documentation
└── examples/                 # Example apps
```

**Most of your work will be in:**
- `app/` - Creating new screens
- `src/components/ui/` - Using pre-built components
- `src/design-system/` - Customizing colors and styles

---

## 💡 Pro Tips

### 1. Keep the Dev Server Running

Leave `npm start` running while you code. The app updates automatically when you save files.

### 2. Use Live Preview

In Cursor/VS Code, you can see component changes without running the full app.

### 3. Check Your Phone

The simulator is useful, but always test on a real device. Touches, gestures, and performance are different.

### 4. Use the Component Playground

Before using a component in your app, test it in the playground:

```bash
npm run playground
```

### 5. Ask Cursor AI for Help

This project is optimized for AI assistance. Try prompts like:

```
"Create a login screen with email and password fields"
"Add a card that shows user profile information"
"Make this button primary color and full width"
```

---

## 🐛 Troubleshooting

### "Metro bundler not starting"

```bash
# Clear cache and restart
npm start -- --reset-cache
```

### "Module not found"

```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### "App not loading on phone"

- Check that phone and computer are on the same WiFi
- Restart the Expo Go app
- Check firewall settings (allow port 8081)

### "Changes not appearing"

- Press `r` in terminal to reload manually
- Shake your device and tap "Reload"
- Check for syntax errors in terminal

### Still stuck?

- [📚 Full Troubleshooting Guide](apps/mobile/docs/TROUBLESHOOTING.md)
- [💬 Ask in Discord](https://discord.gg/thelab)
- [🐛 Report an Issue](https://github.com/NickSloggett/MobileApp/issues)

---

## 🎨 Customize Your App

### App Name and Icon

1. **Change app name:**
   Edit `apps/mobile/app.json`:
   ```json
   {
     "expo": {
       "name": "Your App Name",
       "slug": "your-app-slug"
     }
   }
   ```

2. **Add app icon:**
   - Create a 1024x1024 PNG
   - Save as `apps/mobile/assets/icon.png`

3. **Add splash screen:**
   - Create a 1242x2688 PNG
   - Save as `apps/mobile/assets/splash.png`

### Colors

Change colors in `apps/mobile/src/design-system/colors.ts`

### Fonts

Add custom fonts by following the [Expo Font guide](https://docs.expo.dev/versions/latest/sdk/font/)

---

## 🚀 Ready to Build?

You're all set! Here's what to do next:

### Beginner Path
1. ✅ Complete "Your First Change" above
2. 📖 Read the [Designer's Guide](apps/mobile/docs/DESIGNER_GUIDE.md)
3. 🎨 Customize colors and text
4. 🧩 Explore the component library
5. 📱 Build your first screen

### Advanced Path
1. ✅ Set up your development environment
2. 📚 Review the [Component Library](apps/mobile/docs/COMPONENTS.md)
3. 🏗️ Understand the [Architecture](apps/mobile/docs/ARCHITECTURE.md)
4. 🎯 Run the example apps
5. 🚀 Start building your features

---

## 📞 Get Help

### Resources
- 📖 [Full Documentation](apps/mobile/README.md)
- 🎨 [Designer's Guide](apps/mobile/docs/DESIGNER_GUIDE.md)
- 🧩 [Component Library](apps/mobile/docs/COMPONENTS.md)
- 🤖 [Cursor AI Guide](apps/mobile/docs/CURSOR_GUIDE.md)

### Community
- 💬 [Discord Community](https://discord.gg/thelab)
- 🐛 [GitHub Issues](https://github.com/NickSloggett/MobileApp/issues)
- 𝕏 [Twitter/X](https://x.com/nicksloggett)

---

<div align="center">

## 🎉 You're Ready!

**Start building your dream app**

[📖 Read the Guide](apps/mobile/docs/DESIGNER_GUIDE.md) | [🧩 Browse Components](apps/mobile/docs/COMPONENTS.md) | [💬 Join Discord](https://discord.gg/thelab)

---

**Happy coding!** 🚀

</div>
