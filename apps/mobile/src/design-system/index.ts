/**
 * Design System
 * 
 * Central export for all design system tokens.
 * Import everything you need from here.
 * 
 * @example
 * import { colors, typography, spacing, shadows } from '@/design-system'
 */

export * from './colors'
export * from './typography'
export * from './spacing'
export * from './shadows'

// Re-export commonly used items for convenience
export { colors, lightColors, darkColors, getColors, gradients } from './colors'
export { typography, fontFamily, fontWeight, textModifiers } from './typography'
export { spacing, borderRadius, iconSize, avatarSize, componentSpacing } from './spacing'
export { shadows, coloredShadows } from './shadows'
