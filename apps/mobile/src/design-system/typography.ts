/**
 * Design System - Typography
 * 
 * All text styles in the app are defined here.
 * Use these instead of inline styles for consistency.
 * 
 * @example
 * import { typography } from '@/design-system'
 * 
 * <Text style={typography.h1}>Heading</Text>
 * <Text style={typography.body}>Body text</Text>
 */

import { TextStyle, Platform } from 'react-native'

// Font families
export const fontFamily = {
  regular: Platform.select({
    ios: 'System',
    android: 'Roboto',
    default: 'System',
  }),
  medium: Platform.select({
    ios: 'System',
    android: 'Roboto-Medium',
    default: 'System',
  }),
  semibold: Platform.select({
    ios: 'System',
    android: 'Roboto-Medium',
    default: 'System',
  }),
  bold: Platform.select({
    ios: 'System',
    android: 'Roboto-Bold',
    default: 'System',
  }),
}

// Font weights
export const fontWeight = {
  regular: '400' as TextStyle['fontWeight'],
  medium: '500' as TextStyle['fontWeight'],
  semibold: '600' as TextStyle['fontWeight'],
  bold: '700' as TextStyle['fontWeight'],
}

// Line heights
const lineHeight = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
}

// Typography styles
export const typography = {
  // Display - Extra large text
  display: {
    fontFamily: fontFamily.bold,
    fontWeight: fontWeight.bold,
    fontSize: 48,
    lineHeight: 48 * lineHeight.tight,
    letterSpacing: -0.5,
  } as TextStyle,

  // Headings
  h1: {
    fontFamily: fontFamily.bold,
    fontWeight: fontWeight.bold,
    fontSize: 32,
    lineHeight: 32 * lineHeight.tight,
    letterSpacing: -0.5,
  } as TextStyle,

  h2: {
    fontFamily: fontFamily.bold,
    fontWeight: fontWeight.bold,
    fontSize: 24,
    lineHeight: 24 * lineHeight.tight,
    letterSpacing: -0.25,
  } as TextStyle,

  h3: {
    fontFamily: fontFamily.semibold,
    fontWeight: fontWeight.semibold,
    fontSize: 20,
    lineHeight: 20 * lineHeight.normal,
    letterSpacing: -0.25,
  } as TextStyle,

  h4: {
    fontFamily: fontFamily.semibold,
    fontWeight: fontWeight.semibold,
    fontSize: 18,
    lineHeight: 18 * lineHeight.normal,
    letterSpacing: 0,
  } as TextStyle,

  h5: {
    fontFamily: fontFamily.semibold,
    fontWeight: fontWeight.semibold,
    fontSize: 16,
    lineHeight: 16 * lineHeight.normal,
    letterSpacing: 0,
  } as TextStyle,

  h6: {
    fontFamily: fontFamily.semibold,
    fontWeight: fontWeight.semibold,
    fontSize: 14,
    lineHeight: 14 * lineHeight.normal,
    letterSpacing: 0,
  } as TextStyle,

  // Body text
  bodyLarge: {
    fontFamily: fontFamily.regular,
    fontWeight: fontWeight.regular,
    fontSize: 18,
    lineHeight: 18 * lineHeight.relaxed,
    letterSpacing: 0,
  } as TextStyle,

  body: {
    fontFamily: fontFamily.regular,
    fontWeight: fontWeight.regular,
    fontSize: 16,
    lineHeight: 16 * lineHeight.relaxed,
    letterSpacing: 0,
  } as TextStyle,

  bodySmall: {
    fontFamily: fontFamily.regular,
    fontWeight: fontWeight.regular,
    fontSize: 14,
    lineHeight: 14 * lineHeight.relaxed,
    letterSpacing: 0,
  } as TextStyle,

  // Special text
  caption: {
    fontFamily: fontFamily.regular,
    fontWeight: fontWeight.regular,
    fontSize: 12,
    lineHeight: 12 * lineHeight.normal,
    letterSpacing: 0.25,
  } as TextStyle,

  overline: {
    fontFamily: fontFamily.semibold,
    fontWeight: fontWeight.semibold,
    fontSize: 10,
    lineHeight: 10 * lineHeight.normal,
    letterSpacing: 1,
    textTransform: 'uppercase',
  } as TextStyle,

  button: {
    fontFamily: fontFamily.semibold,
    fontWeight: fontWeight.semibold,
    fontSize: 16,
    lineHeight: 16 * lineHeight.tight,
    letterSpacing: 0.5,
  } as TextStyle,

  buttonSmall: {
    fontFamily: fontFamily.semibold,
    fontWeight: fontWeight.semibold,
    fontSize: 14,
    lineHeight: 14 * lineHeight.tight,
    letterSpacing: 0.25,
  } as TextStyle,

  // Code/Monospace
  code: {
    fontFamily: Platform.select({
      ios: 'Courier',
      android: 'monospace',
      default: 'monospace',
    }),
    fontSize: 14,
    lineHeight: 14 * lineHeight.relaxed,
  } as TextStyle,
}

// Text style modifiers
export const textModifiers = {
  bold: { fontWeight: fontWeight.bold } as TextStyle,
  semibold: { fontWeight: fontWeight.semibold } as TextStyle,
  medium: { fontWeight: fontWeight.medium } as TextStyle,
  italic: { fontStyle: 'italic' } as TextStyle,
  underline: { textDecorationLine: 'underline' } as TextStyle,
  lineThrough: { textDecorationLine: 'line-through' } as TextStyle,
  uppercase: { textTransform: 'uppercase' } as TextStyle,
  lowercase: { textTransform: 'lowercase' } as TextStyle,
  capitalize: { textTransform: 'capitalize' } as TextStyle,
  center: { textAlign: 'center' } as TextStyle,
  right: { textAlign: 'right' } as TextStyle,
  left: { textAlign: 'left' } as TextStyle,
}

// Helper function to combine text styles
export const combineTextStyles = (...styles: TextStyle[]): TextStyle => {
  return Object.assign({}, ...styles)
}
