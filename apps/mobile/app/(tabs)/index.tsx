/**
 * Home Screen
 * 
 * This is your main landing screen.
 * Customize it to fit your app!
 */

import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Card } from '@/components/ui'
import { colors, typography, spacing, borderRadius } from '@/design-system'
import { Heart, Star, Zap, Sparkles } from 'lucide-react-native'

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to Your App! 🎉</Text>
          <Text style={styles.subtitle}>
            Built with love for designers who code
          </Text>
        </View>

        {/* Feature Cards */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          
          <Card style={styles.card}>
            <Card.Header>
              <View style={styles.cardHeader}>
                <View style={styles.iconContainer}>
                  <Zap color={colors.warning.DEFAULT} size={24} />
                </View>
                <View style={{ flex: 1 }}>
                  <Card.Title>Hot Reload</Card.Title>
                  <Card.Description>
                    Changes appear instantly on your device
                  </Card.Description>
                </View>
              </View>
            </Card.Header>
          </Card>

          <Card style={styles.card}>
            <Card.Header>
              <View style={styles.cardHeader}>
                <View style={styles.iconContainer}>
                  <Sparkles color={colors.primary.DEFAULT} size={24} />
                </View>
                <View style={{ flex: 1 }}>
                  <Card.Title>Design System</Card.Title>
                  <Card.Description>
                    Beautiful components and tokens ready to use
                  </Card.Description>
                </View>
              </View>
            </Card.Header>
          </Card>

          <Card style={styles.card}>
            <Card.Header>
              <View style={styles.cardHeader}>
                <View style={styles.iconContainer}>
                  <Star color={colors.success.DEFAULT} size={24} />
                </View>
                <View style={{ flex: 1 }}>
                  <Card.Title>Cursor AI Ready</Card.Title>
                  <Card.Description>
                    Optimized for vibe coding with AI
                  </Card.Description>
                </View>
              </View>
            </Card.Header>
          </Card>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <Button 
            variant="primary" 
            size="large" 
            fullWidth
            leftIcon={<Heart color="white" size={20} />}
            onPress={() => alert('Button pressed! 🎉')}
          >
            Primary Button
          </Button>

          <Button 
            variant="outline" 
            size="large" 
            fullWidth
            leftIcon={<Star color={colors.primary.DEFAULT} size={20} />}
            onPress={() => alert('Outline button! ✨')}
          >
            Outline Button
          </Button>

          <Button 
            variant="ghost" 
            size="medium" 
            fullWidth
            onPress={() => alert('Ghost button! 👻')}
          >
            Ghost Button
          </Button>
        </View>

        {/* Getting Started */}
        <Card style={styles.infoCard} variant="elevated">
          <Card.Header>
            <Card.Title>🚀 Ready to Build?</Card.Title>
            <Card.Description>
              Start by editing this file: {'\n'}
              <Text style={styles.code}>app/(tabs)/index.tsx</Text>
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <Text style={styles.infoText}>
              • Use pre-built components from @/components/ui{'\n'}
              • Follow the design system in @/design-system{'\n'}
              • Ask Cursor AI for help anytime!{'\n'}
              • Check out the docs folder for guides
            </Text>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface.background,
  },
  
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing['3xl'],
  },
  
  header: {
    marginBottom: spacing['2xl'],
  },
  
  title: {
    ...typography.h1,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
  },
  
  section: {
    marginBottom: spacing['2xl'],
    gap: spacing.md,
  },
  
  sectionTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  
  card: {
    marginBottom: spacing.sm,
  },
  
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surface.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  infoCard: {
    marginTop: spacing.lg,
    backgroundColor: colors.primary.DEFAULT + '10',
  },
  
  infoText: {
    ...typography.body,
    color: colors.text.secondary,
    lineHeight: 24,
  },
  
  code: {
    ...typography.code,
    color: colors.primary.DEFAULT,
    backgroundColor: colors.surface.elevated,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
})
