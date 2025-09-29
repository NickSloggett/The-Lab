/**
 * Input Component
 * 
 * A text input field with label, error message, and icon support.
 * Follows design system guidelines for consistency.
 * 
 * @example
 * <Input
 *   label="Email"
 *   placeholder="you@example.com"
 *   leftIcon={<Mail />}
 *   error="Invalid email"
 *   value={email}
 *   onChangeText={setEmail}
 * />
 */

import React, { useState } from 'react'
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextInputProps,
  TouchableOpacity,
} from 'react-native'
import { colors, typography, spacing, borderRadius } from '@/design-system'

interface InputProps extends TextInputProps {
  /** Label text */
  label?: string
  
  /** Error message */
  error?: string
  
  /** Helper text */
  helperText?: string
  
  /** Icon on the left */
  leftIcon?: React.ReactNode
  
  /** Icon on the right */
  rightIcon?: React.ReactNode
  
  /** Container style */
  containerStyle?: ViewStyle
  
  /** Input style */
  inputStyle?: ViewStyle
  
  /** Is password field */
  password?: boolean
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  containerStyle,
  inputStyle,
  password = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(password)
  
  const hasError = !!error
  const borderColor = hasError
    ? colors.error.DEFAULT
    : isFocused
    ? colors.border.focus
    : colors.border.DEFAULT

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View
        style={[
          styles.inputContainer,
          { borderColor },
          hasError && styles.inputError,
          isFocused && styles.inputFocused,
        ]}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        
        <TextInput
          style={[styles.input, leftIcon && styles.inputWithLeftIcon, inputStyle]}
          placeholderTextColor={colors.text.tertiary}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={isSecureTextEntry}
          {...props}
        />
        
        {password && (
          <TouchableOpacity
            onPress={() => setIsSecureTextEntry(!isSecureTextEntry)}
            style={styles.rightIcon}
          >
            <Text style={styles.eyeIcon}>{isSecureTextEntry ? '👁️' : '👁️‍🗨️'}</Text>
          </TouchableOpacity>
        )}
        
        {!password && rightIcon && (
          <View style={styles.rightIcon}>{rightIcon}</View>
        )}
      </View>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
      {!error && helperText && <Text style={styles.helperText}>{helperText}</Text>}
    </View>
  )
}

// TextArea Component
interface TextAreaProps extends InputProps {
  rows?: number
}

export const TextArea: React.FC<TextAreaProps> = ({
  rows = 4,
  containerStyle,
  inputStyle,
  ...props
}) => {
  return (
    <Input
      {...props}
      multiline
      numberOfLines={rows}
      containerStyle={containerStyle}
      inputStyle={[styles.textArea, { minHeight: rows * 20 }, inputStyle]}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  
  label: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface.background,
    borderWidth: 1,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    minHeight: 48,
  },
  
  inputFocused: {
    borderWidth: 2,
  },
  
  inputError: {
    borderColor: colors.error.DEFAULT,
  },
  
  input: {
    flex: 1,
    ...typography.body,
    color: colors.text.primary,
    paddingVertical: spacing.md,
  },
  
  inputWithLeftIcon: {
    marginLeft: spacing.sm,
  },
  
  leftIcon: {
    marginRight: spacing.xs,
  },
  
  rightIcon: {
    marginLeft: spacing.xs,
  },
  
  eyeIcon: {
    fontSize: 20,
  },
  
  errorText: {
    ...typography.caption,
    color: colors.error.DEFAULT,
    marginTop: spacing.xs,
  },
  
  helperText: {
    ...typography.caption,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  
  textArea: {
    textAlignVertical: 'top',
    paddingTop: spacing.md,
  },
})
