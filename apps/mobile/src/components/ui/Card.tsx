/**
 * Card Component
 * 
 * A container component for grouping related content.
 * Supports header, content, and footer sections.
 * 
 * @example
 * <Card>
 *   <Card.Header>
 *     <Card.Title>Profile</Card.Title>
 *     <Card.Description>Your account information</Card.Description>
 *   </Card.Header>
 *   <Card.Content>
 *     {/* Your content */}
 *   </Card.Content>
 *   <Card.Footer>
 *     <Button>Save</Button>
 *   </Card.Footer>
 * </Card>
 */

import React from 'react'
import { View, Text, StyleSheet, ViewStyle, TextStyle, ViewProps } from 'react-native'
import { colors, typography, spacing, borderRadius, shadows } from '@/design-system'

interface CardProps extends ViewProps {
  children: React.ReactNode
  variant?: 'default' | 'elevated' | 'outlined'
  style?: ViewStyle
}

interface CardHeaderProps extends ViewProps {
  children: React.ReactNode
  style?: ViewStyle
}

interface CardTitleProps extends ViewProps {
  children: React.ReactNode
  style?: TextStyle
}

interface CardDescriptionProps extends ViewProps {
  children: React.ReactNode
  style?: TextStyle
}

interface CardContentProps extends ViewProps {
  children: React.ReactNode
  style?: ViewStyle
}

interface CardFooterProps extends ViewProps {
  children: React.ReactNode
  style?: ViewStyle
}

// Main Card Component
export const Card: React.FC<CardProps> & {
  Header: React.FC<CardHeaderProps>
  Title: React.FC<CardTitleProps>
  Description: React.FC<CardDescriptionProps>
  Content: React.FC<CardContentProps>
  Footer: React.FC<CardFooterProps>
} = ({ children, variant = 'default', style, ...props }) => {
  const variantStyle = styles[`${variant}Card`]
  
  return (
    <View style={[styles.card, variantStyle, style]} {...props}>
      {children}
    </View>
  )
}

// Header Component
const CardHeader: React.FC<CardHeaderProps> = ({ children, style, ...props }) => {
  return (
    <View style={[styles.header, style]} {...props}>
      {children}
    </View>
  )
}

// Title Component
const CardTitle: React.FC<CardTitleProps> = ({ children, style, ...props }) => {
  return (
    <Text style={[styles.title, style]} {...props}>
      {children}
    </Text>
  )
}

// Description Component
const CardDescription: React.FC<CardDescriptionProps> = ({ children, style, ...props }) => {
  return (
    <Text style={[styles.description, style]} {...props}>
      {children}
    </Text>
  )
}

// Content Component
const CardContent: React.FC<CardContentProps> = ({ children, style, ...props }) => {
  return (
    <View style={[styles.content, style]} {...props}>
      {children}
    </View>
  )
}

// Footer Component
const CardFooter: React.FC<CardFooterProps> = ({ children, style, ...props }) => {
  return (
    <View style={[styles.footer, style]} {...props}>
      {children}
    </View>
  )
}

// Attach sub-components
Card.Header = CardHeader
Card.Title = CardTitle
Card.Description = CardDescription
Card.Content = CardContent
Card.Footer = CardFooter

const styles = StyleSheet.create({
  // Main card styles
  card: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
  },
  
  defaultCard: {
    backgroundColor: colors.surface.foreground,
    ...shadows.sm,
  },
  
  elevatedCard: {
    backgroundColor: colors.surface.foreground,
    ...shadows.lg,
  },
  
  outlinedCard: {
    backgroundColor: colors.surface.background,
    borderWidth: 1,
    borderColor: colors.border.DEFAULT,
  },
  
  // Header styles
  header: {
    padding: spacing.lg,
    gap: spacing.xs,
  },
  
  title: {
    ...typography.h3,
    color: colors.text.primary,
  },
  
  description: {
    ...typography.body,
    color: colors.text.secondary,
  },
  
  // Content styles
  content: {
    padding: spacing.lg,
  },
  
  // Footer styles
  footer: {
    padding: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
})
