# 📱 Mobile Development Guide

> Build native iOS, macOS, watchOS, and Android apps with AI integration

This guide covers mobile app development in The Lab, including AI integration for mobile platforms.

---

## 📋 Table of Contents

- [iOS/macOS Development](#-iosmacos-development)
- [Android Development](#-android-development)
- [AI Integration on Mobile](#-ai-integration-on-mobile)
- [Shared Backend](#-shared-backend)
- [Best Practices](#-best-practices)

---

## 🍎 iOS/macOS Development

### Quick Start

```bash
cd apps/apple

# Install tools
make bootstrap

# Generate Xcode project
make generate

# Open Xcode
open AppleApps.xcodeproj

# Press ⌘+R to run!
```

### Project Structure

```
apps/apple/
├── SharedKit/              # Shared code for all Apple platforms
│   ├── Sources/
│   │   ├── AI/            # 🤖 AI integration layer
│   │   ├── DesignSystem/  # Colors, typography, spacing
│   │   ├── Models/        # Data models
│   │   ├── Networking/    # API client
│   │   ├── UI/            # Reusable components
│   │   └── Utilities/     # Helper functions
│   └── Tests/             # Unit tests
│
├── iOSApp/                # iOS-specific code
│   ├── Views/             # SwiftUI views
│   ├── ViewModels/        # View models
│   └── Resources/         # Assets, Info.plist
│
├── macOSApp/              # macOS-specific code
├── WatchApp/              # watchOS app
└── docs/                  # Documentation
```

### Adding AI to iOS

**1. Create AI Service:**

```swift
// SharedKit/Sources/AI/AIService.swift
import Foundation

public class AIService {
    private let apiKey: String
    private let baseURL = "https://api.openai.com/v1"
    
    public init(apiKey: String) {
        self.apiKey = apiKey
    }
    
    public func chat(messages: [ChatMessage]) async throws -> String {
        let url = URL(string: "\(baseURL)/chat/completions")!
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("Bearer \(apiKey)", forHTTPHeaderField: "Authorization")
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let body: [String: Any] = [
            "model": "gpt-4-turbo",
            "messages": messages.map { ["role": $0.role, "content": $0.content] }
        ]
        
        request.httpBody = try JSONSerialization.data(withJSONObject: body)
        
        let (data, _) = try await URLSession.shared.data(for: request)
        let response = try JSONDecoder().decode(ChatResponse.self, from: data)
        
        return response.choices.first?.message.content ?? ""
    }
}

public struct ChatMessage: Codable {
    public let role: String
    public let content: String
    
    public init(role: String, content: String) {
        self.role = role
        self.content = content
    }
}

struct ChatResponse: Codable {
    let choices: [Choice]
    
    struct Choice: Codable {
        let message: ChatMessage
    }
}
```

**2. Use in SwiftUI:**

```swift
// iOSApp/Views/ChatView.swift
import SwiftUI
import SharedKit

struct ChatView: View {
    @StateObject private var viewModel = ChatViewModel()
    @State private var inputText = ""
    
    var body: some View {
        VStack {
            ScrollView {
                ForEach(viewModel.messages) { message in
                    MessageBubble(message: message)
                }
            }
            
            HStack {
                TextField("Type a message...", text: $inputText)
                    .textFieldStyle(.roundedBorder)
                
                Button("Send") {
                    Task {
                        await viewModel.send(inputText)
                        inputText = ""
                    }
                }
                .disabled(inputText.isEmpty || viewModel.isLoading)
            }
            .padding()
        }
        .navigationTitle("AI Chat")
    }
}

@MainActor
class ChatViewModel: ObservableObject {
    @Published var messages: [ChatMessage] = []
    @Published var isLoading = false
    
    private let aiService: AIService
    
    init() {
        // Get API key from environment or secure storage
        let apiKey = ProcessInfo.processInfo.environment["OPENAI_API_KEY"] ?? ""
        self.aiService = AIService(apiKey: apiKey)
    }
    
    func send(_ text: String) async {
        let userMessage = ChatMessage(role: "user", content: text)
        messages.append(userMessage)
        isLoading = true
        
        do {
            let response = try await aiService.chat(messages: messages)
            let aiMessage = ChatMessage(role: "assistant", content: response)
            messages.append(aiMessage)
        } catch {
            print("Error: \(error)")
        }
        
        isLoading = false
    }
}
```

**3. Secure API Key Storage:**

```swift
// SharedKit/Sources/Utilities/KeychainManager.swift
import Foundation
import Security

public class KeychainManager {
    public static func save(key: String, value: String) -> Bool {
        let data = value.data(using: .utf8)!
        
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrAccount as String: key,
            kSecValueData as String: data
        ]
        
        SecItemDelete(query as CFDictionary)
        return SecItemAdd(query as CFDictionary, nil) == errSecSuccess
    }
    
    public static func load(key: String) -> String? {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrAccount as String: key,
            kSecReturnData as String: true,
            kSecMatchLimit as String: kSecMatchLimitOne
        ]
        
        var result: AnyObject?
        let status = SecItemCopyMatching(query as CFDictionary, &result)
        
        guard status == errSecSuccess,
              let data = result as? Data,
              let value = String(data: data, encoding: .utf8)
        else { return nil }
        
        return value
    }
}
```

---

## 🤖 Android Development

### Quick Start

```bash
cd web/apps/android

# Install dependencies
npm install

# Run on Android
npm run android

# Or iOS (if on Mac)
npm run ios
```

### Project Structure

```
web/apps/android/
├── android/               # Native Android code
│   ├── app/
│   │   ├── src/
│   │   │   ├── main/
│   │   │   │   ├── java/  # Java/Kotlin code
│   │   │   │   └── res/   # Resources
│   │   └── build.gradle
│   └── build.gradle
│
├── ios/                   # Native iOS code (React Native)
│   └── Podfile
│
├── src/
│   ├── screens/          # App screens
│   ├── components/       # React components
│   ├── services/
│   │   └── ai/          # 🤖 AI services
│   ├── navigation/      # Navigation setup
│   └── utils/           # Utilities
│
├── App.tsx              # App entry point
└── package.json
```

### Adding AI to React Native

**1. Install AI SDK:**

```bash
npm install @ai-sdk/react @ai-sdk/openai
```

**2. Create AI Service:**

```typescript
// src/services/ai/AIService.ts
import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'

export class AIService {
  private apiKey: string
  
  constructor(apiKey: string) {
    this.apiKey = apiKey
  }
  
  async chat(messages: Array<{ role: string; content: string }>) {
    const { text } = await generateText({
      model: openai('gpt-4-turbo'),
      messages,
      apiKey: this.apiKey,
    })
    
    return text
  }
  
  async generateImage(prompt: string) {
    // Implementation for image generation
  }
}

export const aiService = new AIService(process.env.OPENAI_API_KEY || '')
```

**3. Create Chat Component:**

```typescript
// src/screens/ChatScreen.tsx
import React, { useState } from 'react'
import { View, TextInput, Button, ScrollView, Text } from 'react-native'
import { aiService } from '../services/ai/AIService'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  
  const sendMessage = async () => {
    if (!input.trim()) return
    
    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)
    
    try {
      const response = await aiService.chat([...messages, userMessage])
      const aiMessage: Message = { role: 'assistant', content: response }
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('AI Error:', error)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        {messages.map((msg, idx) => (
          <View key={idx} style={{ 
            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
            backgroundColor: msg.role === 'user' ? '#007AFF' : '#E5E5EA',
            margin: 8,
            padding: 12,
            borderRadius: 16,
          }}>
            <Text style={{ 
              color: msg.role === 'user' ? 'white' : 'black' 
            }}>
              {msg.content}
            </Text>
          </View>
        ))}
      </ScrollView>
      
      <View style={{ flexDirection: 'row', padding: 8 }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, borderRadius: 8, padding: 8 }}
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
          editable={!loading}
        />
        <Button title="Send" onPress={sendMessage} disabled={loading} />
      </View>
    </View>
  )
}
```

**4. Secure Storage for API Keys:**

```typescript
// src/utils/secureStorage.ts
import * as SecureStore from 'expo-secure-store'

export const secureStorage = {
  async save(key: string, value: string) {
    await SecureStore.setItemAsync(key, value)
  },
  
  async load(key: string) {
    return await SecureStore.getItemAsync(key)
  },
  
  async delete(key: string) {
    await SecureStore.deleteItemAsync(key)
  },
}
```

---

## 🤖 AI Integration on Mobile

### Best Practices

#### 1. **Use Backend API When Possible**

Instead of calling AI APIs directly from mobile:

```typescript
// ✅ Good: Use your backend
const response = await fetch('https://your-api.com/ai/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ messages }),
})

// ❌ Avoid: Direct API calls from mobile
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  headers: { 'Authorization': `Bearer ${apiKey}` }, // API key exposed!
})
```

**Benefits:**
- API keys stay secure on backend
- Better rate limiting
- Easier to change AI providers
- Can add caching
- Cost control

#### 2. **Handle Loading States**

```swift
// iOS - SwiftUI
struct AIView: View {
    @StateObject var viewModel = AIViewModel()
    
    var body: some View {
        ZStack {
            // Content
            ChatView()
            
            // Loading overlay
            if viewModel.isLoading {
                ProgressView()
                    .scaleEffect(1.5)
                    .background(Color.black.opacity(0.3))
            }
        }
    }
}
```

```typescript
// React Native
function AIComponent() {
  const [loading, setLoading] = useState(false)
  
  return (
    <View>
      <ChatView />
      {loading && (
        <ActivityIndicator 
          size="large" 
          style={styles.loading} 
        />
      )}
    </View>
  )
}
```

#### 3. **Implement Offline Support**

```swift
// iOS - Cache responses
class AICache {
    static func save(prompt: String, response: String) {
        UserDefaults.standard.set(response, forKey: prompt)
    }
    
    static func load(prompt: String) -> String? {
        return UserDefaults.standard.string(forKey: prompt)
    }
}

// Use cache
func getAIResponse(prompt: String) async throws -> String {
    // Check cache first
    if let cached = AICache.load(prompt: prompt) {
        return cached
    }
    
    // Fetch from API
    let response = try await aiService.chat(messages: [.init(role: "user", content: prompt)])
    
    // Cache for offline use
    AICache.save(prompt: prompt, response: response)
    
    return response
}
```

#### 4. **Error Handling**

```swift
// iOS
enum AIError: LocalizedError {
    case networkError
    case invalidResponse
    case rateLimited
    case apiKeyInvalid
    
    var errorDescription: String? {
        switch self {
        case .networkError:
            return "Network connection failed"
        case .invalidResponse:
            return "Invalid response from AI"
        case .rateLimited:
            return "Too many requests. Please try again later."
        case .apiKeyInvalid:
            return "Invalid API key"
        }
    }
}

// Show user-friendly errors
func handleAIError(_ error: Error) {
    let message = (error as? AIError)?.errorDescription ?? "An error occurred"
    showAlert(title: "Error", message: message)
}
```

---

## 🔗 Shared Backend

### Connect Mobile Apps to Backend

**1. Configure API URL:**

```swift
// iOS - Config.swift
enum Config {
    static let apiURL: String = {
        #if DEBUG
        return "http://localhost:8000"
        #else
        return "https://your-api.com"
        #endif
    }()
}
```

```typescript
// React Native - config.ts
export const config = {
  apiURL: __DEV__ 
    ? 'http://localhost:8000'
    : 'https://your-api.com',
}
```

**2. Create API Client:**

```swift
// iOS - APIClient.swift
class APIClient {
    static let shared = APIClient()
    private let baseURL = URL(string: Config.apiURL)!
    
    func post<T: Decodable>(
        endpoint: String,
        body: Encodable
    ) async throws -> T {
        let url = baseURL.appendingPathComponent(endpoint)
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = try JSONEncoder().encode(body)
        
        let (data, _) = try await URLSession.shared.data(for: request)
        return try JSONDecoder().decode(T.self, from: data)
    }
}
```

**3. Use Backend AI Endpoints:**

```swift
// iOS
struct ChatRequest: Codable {
    let messages: [ChatMessage]
    let model: String
}

struct ChatResponse: Codable {
    let message: String
}

func sendChatMessage(_ text: String) async throws -> String {
    let request = ChatRequest(
        messages: [ChatMessage(role: "user", content: text)],
        model: "gpt-4-turbo"
    )
    
    let response: ChatResponse = try await APIClient.shared.post(
        endpoint: "/api/ai/chat",
        body: request
    )
    
    return response.message
}
```

---

## 🎯 Best Practices

### Performance

1. **Use Streaming for Long Responses**
2. **Implement Response Caching**
3. **Batch Requests When Possible**
4. **Use Appropriate Models** (GPT-3.5 for simple, GPT-4 for complex)

### Security

1. **Never Hardcode API Keys**
2. **Use Backend for AI Calls**
3. **Implement Rate Limiting**
4. **Validate All Inputs**

### UX

1. **Show Loading Indicators**
2. **Handle Errors Gracefully**
3. **Provide Feedback**
4. **Support Offline Mode**
5. **Allow Cancellation**

---

## 📚 Additional Resources

- **[iOS AI Examples](../ai-automation-boilerplate/examples/)**
- **[React Native AI Library](https://github.com/dabit3/react-native-ai)**
- **[Apple ML Documentation](https://developer.apple.com/machine-learning/)**
- **[OpenAI API Reference](https://platform.openai.com/docs/api-reference)**

---

<div align="center">

**📱 Ready to build AI-powered mobile apps?**

[← Back to README](../README.md) | [AI Guide →](AI_GUIDE.md)

</div>

