import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

function App(): React.JSX.Element {
  const [counter, setCounter] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.header}>
          <Text style={styles.title}>The Lab</Text>
          <Text style={styles.subtitle}>Multi-Platform Development Boilerplate</Text>
        </View>

        <View style={styles.demoSection}>
          <Text style={styles.sectionTitle}>Counter Demo</Text>
          <Text style={styles.counter}>{counter}</Text>
          
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={[styles.button, styles.decrementButton]} 
              onPress={() => setCounter(counter - 1)}
            >
              <Text style={styles.buttonText}>Decrement</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.incrementButton]} 
              onPress={() => setCounter(counter + 1)}
            >
              <Text style={[styles.buttonText, styles.incrementButtonText]}>Increment</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.resetButton} 
            onPress={() => setCounter(0)}
          >
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Features</Text>
          
          <FeatureCard 
            icon="🌐" 
            title="Web App" 
            description="Next.js + React + shadcn/ui" 
          />
          <FeatureCard 
            icon="📱" 
            title="iOS App" 
            description="SwiftUI" 
          />
          <FeatureCard 
            icon="🤖" 
            title="Android App" 
            description="React Native" 
          />
          <FeatureCard 
            icon="🎨" 
            title="UI Components" 
            description="Tailwind CSS + shadcn/ui" 
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

function FeatureCard({icon, title, description}: FeatureCardProps): React.JSX.Element {
  return (
    <View style={styles.featureCard}>
      <Text style={styles.featureIcon}>{icon}</Text>
      <View style={styles.featureContent}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  demoSection: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 20,
  },
  counter: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 30,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  decrementButton: {
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  incrementButton: {
    backgroundColor: '#3b82f6',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  incrementButtonText: {
    color: '#ffffff',
  },
  resetButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  resetButtonText: {
    fontSize: 14,
    color: '#6b7280',
  },
  featuresSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
});

export default App;

