/**
 * Explore Screen
 * 
 * Example of a search/explore screen.
 * Customize this for your app's needs!
 */

import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Input, Card } from '@/components/ui'
import { colors, typography, spacing } from '@/design-system'
import { Search } from 'lucide-react-native'

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Explore</Text>
        
        <Input
          placeholder="Search..."
          leftIcon={<Search color={colors.text.tertiary} size={20} />}
          containerStyle={styles.searchInput}
        />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending</Text>
          
          {[1, 2, 3, 4].map((item) => (
            <Card key={item} style={styles.card}>
              <Card.Header>
                <Card.Title>Item {item}</Card.Title>
                <Card.Description>
                  This is a sample item in the explore feed
                </Card.Description>
              </Card.Header>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface.background,
  },
  
  content: {
    padding: spacing.lg,
    paddingBottom: spacing['3xl'],
  },
  
  title: {
    ...typography.h1,
    color: colors.text.primary,
    marginBottom: spacing.lg,
  },
  
  searchInput: {
    marginBottom: spacing.xl,
  },
  
  section: {
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
})
