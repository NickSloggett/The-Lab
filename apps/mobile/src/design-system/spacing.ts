/**
 * Design System - Spacing
 * 
 * Consistent spacing values used throughout the app.
 * Use these instead of hardcoded numbers.
 * 
 * @example
 * import { spacing } from '@/design-system'
 * 
 * <View style={{ padding: spacing.md, gap: spacing.sm }}>
 *   {/* Content */}
 * </View>
 */

// Base spacing unit (4px)
const BASE_UNIT = 4

// Spacing scale
export const spacing = {
  /** 0px - No spacing */
  none: 0,
  
  /** 4px - Minimal spacing between related items */
  xs: BASE_UNIT * 1,
  
  /** 8px - Small spacing, tight layouts */
  sm: BASE_UNIT * 2,
  
  /** 12px - Small-medium spacing */
  md: BASE_UNIT * 3,
  
  /** 16px - Standard spacing (most common) */
  lg: BASE_UNIT * 4,
  
  /** 20px - Medium-large spacing */
  xl: BASE_UNIT * 5,
  
  /** 24px - Large spacing between sections */
  '2xl': BASE_UNIT * 6,
  
  /** 32px - Extra large spacing */
  '3xl': BASE_UNIT * 8,
  
  /** 40px - Maximum spacing */
  '4xl': BASE_UNIT * 10,
  
  /** 48px - Huge spacing for major sections */
  '5xl': BASE_UNIT * 12,
  
  /** 64px - Massive spacing */
  '6xl': BASE_UNIT * 16,
}

// Component-specific spacing
export const componentSpacing = {
  // Buttons
  button: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  
  buttonSmall: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.xs,
  },
  
  buttonLarge: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    gap: spacing.sm,
  },
  
  // Cards
  card: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  
  // Lists
  list: {
    gap: spacing.sm,
    itemPadding: spacing.lg,
  },
  
  // Forms
  input: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  
  // Screen
  screen: {
    padding: spacing.lg,
    gap: spacing['2xl'],
  },
  
  // Header
  header: {
    paddingHorizontal: spacing.lg,
    height: 56,
  },
}

// Border radius scale
export const borderRadius = {
  /** 0px - No rounding */
  none: 0,
  
  /** 4px - Slight rounding */
  sm: 4,
  
  /** 8px - Standard rounding (most common) */
  md: 8,
  
  /** 12px - Medium rounding */
  lg: 12,
  
  /** 16px - Large rounding */
  xl: 16,
  
  /** 20px - Extra large rounding */
  '2xl': 20,
  
  /** 24px - Maximum rounding */
  '3xl': 24,
  
  /** 9999px - Full pill shape */
  full: 9999,
}

// Icon sizes
export const iconSize = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
}

// Avatar sizes
export const avatarSize = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
  '2xl': 96,
}

// Safe area insets (for screen edges)
export const safeArea = {
  top: 44,    // Status bar height
  bottom: 34, // Home indicator height
  sides: spacing.lg,
}

// Layout utilities
export const layout = {
  maxWidth: {
    sm: 480,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
  minTouchTarget: 44, // Minimum size for interactive elements
}

// Helper functions
export const calculateSpacing = (multiplier: number): number => {
  return BASE_UNIT * multiplier
}

export const rem = (pixels: number): number => {
  return pixels / 16
}
