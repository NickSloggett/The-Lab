/**
 * Profile Screen
 * 
 * Example profile/settings screen.
 * Customize this for your app!
 */

import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Card } from '@/components/ui'
import { colors, typography, spacing, borderRadius, avatarSize } from '@/design-system'
import { Settings, Bell, Lock, HelpCircle, LogOut } from 'lucide-react-native'

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JD</Text>
          </View>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.email}>john@example.com</Text>
          
          <Button 
            variant="outline" 
            size="medium" 
            style={styles.editButton}
            onPress={() => alert('Edit Profile')}
          >
            Edit Profile
          </Button>
        </View>

        {/* Settings Sections */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <Card>
            <Card.Content style={styles.menuList}>
              <MenuItem 
                icon={<Settings size={20} color={colors.text.secondary} />}
                label="Settings"
              />
              <MenuItem 
                icon={<Bell size={20} color={colors.text.secondary} />}
                label="Notifications"
              />
              <MenuItem 
                icon={<Lock size={20} color={colors.text.secondary} />}
                label="Privacy"
              />
            </Card.Content>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <Card>
            <Card.Content style={styles.menuList}>
              <MenuItem 
                icon={<HelpCircle size={20} color={colors.text.secondary} />}
                label="Help Center"
              />
            </Card.Content>
          </Card>
        </View>

        <Button 
          variant="destructive" 
          size="large"
          fullWidth
          leftIcon={<LogOut size={20} color="white" />}
          onPress={() => alert('Sign Out')}
        >
          Sign Out
        </Button>
      </ScrollView>
    </SafeAreaView>
  )
}

function MenuItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <View style={menuItemStyles.container}>
      {icon}
      <Text style={menuItemStyles.label}>{label}</Text>
    </View>
  )
}

const menuItemStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  
  label: {
    ...typography.body,
    color: colors.text.primary,
    flex: 1,
  },
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface.background,
  },
  
  content: {
    padding: spacing.lg,
    paddingBottom: spacing['3xl'],
  },
  
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  
  avatar: {
    width: avatarSize['2xl'],
    height: avatarSize['2xl'],
    borderRadius: avatarSize['2xl'] / 2,
    backgroundColor: colors.primary.DEFAULT,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  
  avatarText: {
    ...typography.h2,
    color: colors.primary.contrast,
  },
  
  name: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  
  email: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: spacing.lg,
  },
  
  editButton: {
    minWidth: 120,
  },
  
  section: {
    marginBottom: spacing.xl,
  },
  
  sectionTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  
  menuList: {
    gap: 0,
  },
})
