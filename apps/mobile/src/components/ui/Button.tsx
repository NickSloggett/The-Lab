/**
 * Button Component
 * 
 * A versatile button component with multiple variants and sizes.
 * Supports icons, loading states, and disabled states.
 * 
 * @example
 * <Button variant="primary" size="large" onPress={() => console.log('Pressed')}>
 *   Click Me
 * </Button>
 * 
 * <Button variant="outline" leftIcon={<Heart />}>
 *   Like
 * </Button>
 */

import React from 'react'
import {
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
} from 'react-native'
import { colors, typography, spacing, borderRadius, shadows } from '@/design-system'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
type ButtonSize = 'small' | 'medium' | 'large'

interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  /** Button text */
  children: React.ReactNode
  
  /** Visual variant */
  variant?: ButtonVariant
  
  /** Size */
  size?: ButtonSize
  
  /** Icon on the left */
  leftIcon?: React.ReactNode
  
  /** Icon on the right */
  rightIcon?: React.ReactNode
  
  /** Loading state */
  loading?: boolean
  
  /** Disabled state */
  disabled?: boolean
  
  /** Full width button */
  fullWidth?: boolean
  
  /** Custom styles */
  style?: ViewStyle
  
  /** Custom text styles */
  textStyle?: TextStyle
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  leftIcon,
  rightIcon,
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
  textStyle,
  ...props
}) => {
  const containerStyle: ViewStyle[] = [
    styles.base,
    styles[`${variant}Container`],
    styles[`${size}Container`],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ]

  const textStyles: TextStyle[] = [
    styles.baseText,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ]

  const showLoading = loading && !disabled
  const isDisabled = disabled || loading

  return (
    <TouchableOpacity
      style={containerStyle}
      disabled={isDisabled}
      activeOpacity={0.7}
      {...props}
    >
      {showLoading && (
        <ActivityIndicator
          size={size === 'small' ? 'small' : 'small'}
          color={variant === 'outline' || variant === 'ghost' ? colors.primary.DEFAULT : colors.white}
          style={styles.loader}
        />
      )}
      
      {!showLoading && leftIcon && (
        <View style={styles.iconContainer}>{leftIcon}</View>
      )}
      
      <Text style={textStyles}>{children}</Text>
      
      {!showLoading && rightIcon && (
        <View style={styles.iconContainer}>{rightIcon}</View>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  // Base styles
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.lg,
    ...shadows.sm,
  },
  
  baseText: {
    ...typography.button,
  },
  
  fullWidth: {
    width: '100%',
  },
  
  disabled: {
    opacity: 0.5,
  },
  
  disabledText: {
    opacity: 0.7,
  },
  
  iconContainer: {
    marginHorizontal: spacing.xs,
  },
  
  loader: {
    marginRight: spacing.sm,
  },
  
  // Variant styles - Primary
  primaryContainer: {
    backgroundColor: colors.primary.DEFAULT,
  },
  
  primaryText: {
    color: colors.primary.contrast,
  },
  
  // Variant styles - Secondary
  secondaryContainer: {
    backgroundColor: colors.secondary.DEFAULT,
  },
  
  secondaryText: {
    color: colors.secondary.contrast,
  },
  
  // Variant styles - Outline
  outlineContainer: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.border.dark,
  },
  
  outlineText: {
    color: colors.text.primary,
  },
  
  // Variant styles - Ghost
  ghostContainer: {
    backgroundColor: 'transparent',
    shadowColor: 'transparent',
    elevation: 0,
  },
  
  ghostText: {
    color: colors.primary.DEFAULT,
  },
  
  // Variant styles - Destructive
  destructiveContainer: {
    backgroundColor: colors.error.DEFAULT,
  },
  
  destructiveText: {
    color: colors.error.contrast,
  },
  
  // Size styles - Small
  smallContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minHeight: 32,
  },
  
  smallText: {
    ...typography.buttonSmall,
  },
  
  // Size styles - Medium
  mediumContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    minHeight: 44,
  },
  
  mediumText: {
    ...typography.button,
  },
  
  // Size styles - Large
  largeContainer: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    minHeight: 56,
  },
  
  largeText: {
    ...typography.button,
    fontSize: 18,
  },
})
