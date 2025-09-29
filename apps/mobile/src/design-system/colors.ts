/**
 * Design System - Colors
 * 
 * All colors in the app are defined here.
 * Supports both light and dark modes automatically.
 * 
 * @example
 * import { colors } from '@/design-system'
 * 
 * <View style={{ backgroundColor: colors.primary.DEFAULT }}>
 *   <Text style={{ color: colors.text.primary }}>Hello</Text>
 * </View>
 */

export const lightColors = {
  // Primary Brand Colors
  primary: {
    DEFAULT: '#8B5CF6',  // Purple
    light: '#A78BFA',
    dark: '#7C3AED',
    contrast: '#FFFFFF', // Text color on primary background
  },

  // Secondary/Accent Colors
  secondary: {
    DEFAULT: '#EC4899',  // Pink
    light: '#F472B6',
    dark: '#DB2777',
    contrast: '#FFFFFF',
  },

  // Semantic Colors
  success: {
    DEFAULT: '#10B981',  // Green
    light: '#34D399',
    dark: '#059669',
    contrast: '#FFFFFF',
  },

  warning: {
    DEFAULT: '#F59E0B',  // Orange
    light: '#FBBF24',
    dark: '#D97706',
    contrast: '#FFFFFF',
  },

  error: {
    DEFAULT: '#EF4444',  // Red
    light: '#F87171',
    dark: '#DC2626',
    contrast: '#FFFFFF',
  },

  info: {
    DEFAULT: '#3B82F6',  // Blue
    light: '#60A5FA',
    dark: '#2563EB',
    contrast: '#FFFFFF',
  },

  // Text Colors
  text: {
    primary: '#1F2937',    // Almost black
    secondary: '#6B7280',  // Gray
    tertiary: '#9CA3AF',   // Light gray
    disabled: '#D1D5DB',   // Very light gray
    inverse: '#FFFFFF',    // White text (for dark backgrounds)
    link: '#8B5CF6',       // Links
  },

  // Surface/Background Colors
  surface: {
    background: '#FFFFFF',    // Main background
    foreground: '#F9FAFB',   // Cards, elevated surfaces
    elevated: '#FFFFFF',      // Modals, dropdowns
    overlay: '#00000040',     // Dark overlay (with opacity)
  },

  // Border Colors
  border: {
    DEFAULT: '#E5E7EB',    // Standard borders
    light: '#F3F4F6',      // Subtle borders
    dark: '#D1D5DB',       // Prominent borders
    focus: '#8B5CF6',      // Focused input borders
  },

  // Special Colors
  transparent: 'transparent',
  black: '#000000',
  white: '#FFFFFF',
}

export const darkColors = {
  // Primary Brand Colors (slightly adjusted for dark mode)
  primary: {
    DEFAULT: '#A78BFA',
    light: '#C4B5FD',
    dark: '#8B5CF6',
    contrast: '#000000',
  },

  secondary: {
    DEFAULT: '#F472B6',
    light: '#F9A8D4',
    dark: '#EC4899',
    contrast: '#000000',
  },

  success: {
    DEFAULT: '#34D399',
    light: '#6EE7B7',
    dark: '#10B981',
    contrast: '#000000',
  },

  warning: {
    DEFAULT: '#FBBF24',
    light: '#FCD34D',
    dark: '#F59E0B',
    contrast: '#000000',
  },

  error: {
    DEFAULT: '#F87171',
    light: '#FCA5A5',
    dark: '#EF4444',
    contrast: '#000000',
  },

  info: {
    DEFAULT: '#60A5FA',
    light: '#93C5FD',
    dark: '#3B82F6',
    contrast: '#000000',
  },

  // Text Colors (inverted for dark mode)
  text: {
    primary: '#F9FAFB',
    secondary: '#D1D5DB',
    tertiary: '#9CA3AF',
    disabled: '#6B7280',
    inverse: '#1F2937',
    link: '#A78BFA',
  },

  // Surface/Background Colors (dark surfaces)
  surface: {
    background: '#111827',   // Dark background
    foreground: '#1F2937',   // Slightly lighter
    elevated: '#374151',     // Even lighter for modals
    overlay: '#00000080',    // Darker overlay
  },

  // Border Colors
  border: {
    DEFAULT: '#374151',
    light: '#1F2937',
    dark: '#4B5563',
    focus: '#A78BFA',
  },

  transparent: 'transparent',
  black: '#000000',
  white: '#FFFFFF',
}

// Export the active theme colors
// In a real app, this would come from a theme context
export const colors = lightColors

// Helper function to get colors based on color scheme
export const getColors = (isDark: boolean) => isDark ? darkColors : lightColors

// Color utilities
export const withOpacity = (color: string, opacity: number): string => {
  return `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`
}

// Gradient presets
export const gradients = {
  primary: ['#8B5CF6', '#EC4899'],
  sunset: ['#F59E0B', '#EF4444'],
  ocean: ['#3B82F6', '#8B5CF6'],
  forest: ['#10B981', '#3B82F6'],
}
