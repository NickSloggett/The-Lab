# 📖 Code Examples

Real-world examples to help you build amazing apps.

---

## 🚀 Quick Start Examples

### Hello World

The simplest SwiftUI app:

```swift
import SwiftUI

@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            Text("Hello, World!")
                .font(.largeTitle)
        }
    }
}
```

### Basic View with State

```swift
import SwiftUI

struct CounterView: View {
    @State private var count = 0
    
    var body: some View {
        VStack(spacing: 20) {
            Text("Count: \(count)")
                .font(.title)
            
            Button("Increment") {
                count += 1
            }
            .buttonStyle(.borderedProminent)
        }
        .padding()
    }
}

#Preview {
    CounterView()
}
```

---

## 📱 Real-World Examples

### Todo List App

Complete todo list with add, delete, and toggle functionality:

```swift
import SwiftUI
import SharedKit

struct TodoListView: View {
    @State private var todos: [Todo] = []
    @State private var newTodoText = ""
    
    var body: some View {
        NavigationStack {
            VStack {
                // Input field
                HStack {
                    TextField("New todo", text: $newTodoText)
                        .textFieldStyle(.roundedBorder)
                    
                    Button("Add") {
                        addTodo()
                    }
                    .buttonStyle(.borderedProminent)
                    .disabled(newTodoText.isEmpty)
                }
                .padding()
                
                // Todo list
                if todos.isEmpty {
                    EmptyStateView(
                        icon: "checklist",
                        title: "No Todos",
                        message: "Add your first todo to get started!"
                    )
                } else {
                    List {
                        ForEach($todos) { $todo in
                            TodoRow(todo: $todo)
                        }
                        .onDelete(perform: deleteTodos)
                    }
                }
            }
            .navigationTitle("My Todos")
            .toolbar {
                EditButton()
            }
        }
    }
    
    private func addTodo() {
        let todo = Todo(title: newTodoText)
        todos.append(todo)
        newTodoText = ""
    }
    
    private func deleteTodos(at offsets: IndexSet) {
        todos.remove(atOffsets: offsets)
    }
}

struct TodoRow: View {
    @Binding var todo: Todo
    
    var body: some View {
        HStack {
            Button {
                todo.isCompleted.toggle()
            } label: {
                Image(systemName: todo.isCompleted ? "checkmark.circle.fill" : "circle")
                    .foregroundColor(todo.isCompleted ? .green : .gray)
            }
            
            Text(todo.title)
                .strikethrough(todo.isCompleted)
                .foregroundColor(todo.isCompleted ? .secondary : .primary)
        }
    }
}
```

### User Profile Screen

Beautiful profile screen with networking:

```swift
import SwiftUI
import SharedKit

@MainActor
class ProfileViewModel: ObservableObject {
    @Published var user: User?
    @Published var isLoading = false
    @Published var errorMessage: String?
    
    private let httpClient = HTTPClient()
    
    func loadUser() {
        Task {
            isLoading = true
            errorMessage = nil
            
            do {
                // Simulate API call
                try await Task.sleep(nanoseconds: 1_000_000_000)
                user = User(
                    name: "Jane Smith",
                    email: "jane@example.com",
                    avatarURL: nil
                )
            } catch {
                errorMessage = error.localizedDescription
            }
            
            isLoading = false
        }
    }
}

struct ProfileScreen: View {
    @StateObject private var viewModel = ProfileViewModel()
    
    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 24) {
                    if viewModel.isLoading {
                        LoadingView(message: "Loading profile...")
                    } else if let user = viewModel.user {
                        profileContent(user)
                    } else if let error = viewModel.errorMessage {
                        ErrorView(message: error) {
                            viewModel.loadUser()
                        }
                    }
                }
                .padding()
            }
            .navigationTitle("Profile")
            .onAppear {
                if viewModel.user == nil {
                    viewModel.loadUser()
                }
            }
        }
    }
    
    @ViewBuilder
    private func profileContent(_ user: User) -> some View {
        // Profile header
        VStack(spacing: 16) {
            Circle()
                .fill(Color.Brand.primaryFallback.opacity(0.2))
                .frame(width: 100, height: 100)
                .overlay(
                    Text(user.name.prefix(2).uppercased())
                        .font(.title)
                        .fontWeight(.bold)
                )
            
            Text(user.name)
                .font(.title2)
                .fontWeight(.bold)
            
            Text(user.email)
                .font(.subheadline)
                .foregroundColor(.secondary)
        }
        .frame(maxWidth: .infinity)
        .cardStyle()
        
        // Stats
        HStack(spacing: 40) {
            StatColumn(value: "42", label: "Posts")
            StatColumn(value: "1.2K", label: "Followers")
            StatColumn(value: "384", label: "Following")
        }
        .cardStyle()
        
        // Actions
        VStack(spacing: 12) {
            Button("Edit Profile") {
                // Action
            }
            .buttonStyle(PrimaryButtonStyle())
            
            Button("Settings") {
                // Action
            }
            .buttonStyle(SecondaryButtonStyle())
        }
    }
}

struct StatColumn: View {
    let value: String
    let label: String
    
    var body: some View {
        VStack(spacing: 4) {
            Text(value)
                .font(.title2)
                .fontWeight(.bold)
            Text(label)
                .font(.caption)
                .foregroundColor(.secondary)
        }
    }
}

struct ErrorView: View {
    let message: String
    let retry: () -> Void
    
    var body: some View {
        VStack(spacing: 16) {
            Image(systemName: "exclamationmark.triangle")
                .font(.system(size: 48))
                .foregroundColor(.red)
            
            Text("Error")
                .font(.title2)
                .fontWeight(.bold)
            
            Text(message)
                .font(.body)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)
            
            Button("Retry", action: retry)
                .buttonStyle(PrimaryButtonStyle())
        }
        .padding()
    }
}
```

### Settings Screen

Organized settings with sections:

```swift
import SwiftUI

struct SettingsView: View {
    @State private var notificationsEnabled = true
    @State private var darkModeEnabled = false
    @State private var selectedLanguage = "English"
    
    let languages = ["English", "Spanish", "French", "German"]
    
    var body: some View {
        NavigationStack {
            Form {
                Section("Notifications") {
                    Toggle("Enable Notifications", isOn: $notificationsEnabled)
                    
                    if notificationsEnabled {
                        Toggle("Sound", isOn: .constant(true))
                        Toggle("Badge", isOn: .constant(true))
                    }
                }
                
                Section("Appearance") {
                    Toggle("Dark Mode", isOn: $darkModeEnabled)
                    
                    Picker("Language", selection: $selectedLanguage) {
                        ForEach(languages, id: \.self) { language in
                            Text(language).tag(language)
                        }
                    }
                }
                
                Section("About") {
                    LabeledContent("Version", value: "1.0.0")
                    LabeledContent("Build", value: "100")
                    
                    Link(destination: URL(string: "https://example.com")!) {
                        HStack {
                            Text("Privacy Policy")
                            Spacer()
                            Image(systemName: "arrow.up.right.square")
                                .font(.caption)
                        }
                    }
                }
                
                Section {
                    Button("Sign Out", role: .destructive) {
                        // Sign out
                    }
                }
            }
            .navigationTitle("Settings")
        }
    }
}
```

---

## 🎨 Design Pattern Examples

### MVVM Pattern

```swift
// Model
struct Product: Identifiable, Codable {
    let id: UUID
    let name: String
    let price: Double
    let imageURL: String?
}

// ViewModel
@MainActor
class ProductListViewModel: ObservableObject {
    @Published var products: [Product] = []
    @Published var isLoading = false
    @Published var errorMessage: String?
    
    private let httpClient = HTTPClient()
    
    func loadProducts() {
        Task {
            isLoading = true
            errorMessage = nil
            
            do {
                let url = URL(string: "https://api.example.com/products")!
                products = try await httpClient.getJSON(url, as: [Product].self)
            } catch {
                errorMessage = "Failed to load products"
            }
            
            isLoading = false
        }
    }
    
    func deleteProduct(_ product: Product) {
        products.removeAll { $0.id == product.id }
    }
}

// View
struct ProductListView: View {
    @StateObject private var viewModel = ProductListViewModel()
    
    var body: some View {
        NavigationStack {
            Group {
                if viewModel.isLoading {
                    ProgressView()
                } else if let error = viewModel.errorMessage {
                    Text(error)
                } else {
                    List(viewModel.products) { product in
                        ProductRow(product: product)
                    }
                }
            }
            .navigationTitle("Products")
            .onAppear {
                viewModel.loadProducts()
            }
        }
    }
}

struct ProductRow: View {
    let product: Product
    
    var body: some View {
        HStack {
            // Image placeholder
            Circle()
                .fill(Color.gray.opacity(0.3))
                .frame(width: 50, height: 50)
            
            VStack(alignment: .leading) {
                Text(product.name)
                    .font(.headline)
                Text("$\(product.price, specifier: "%.2f")")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
            }
        }
    }
}
```

### Repository Pattern

```swift
// Protocol
protocol UserRepository {
    func fetchUser(id: UUID) async throws -> User
    func saveUser(_ user: User) async throws
    func deleteUser(id: UUID) async throws
}

// Implementation
class APIUserRepository: UserRepository {
    private let httpClient: HTTPClient
    private let baseURL: String
    
    init(httpClient: HTTPClient = HTTPClient(), baseURL: String = "https://api.example.com") {
        self.httpClient = httpClient
        self.baseURL = baseURL
    }
    
    func fetchUser(id: UUID) async throws -> User {
        let url = URL(string: "\(baseURL)/users/\(id)")!
        return try await httpClient.getJSON(url, as: User.self)
    }
    
    func saveUser(_ user: User) async throws {
        let url = URL(string: "\(baseURL)/users/\(user.id)")!
        _ = try await httpClient.putJSON(url, body: user, as: User.self)
    }
    
    func deleteUser(id: UUID) async throws {
        let url = URL(string: "\(baseURL)/users/\(id)")!
        try await httpClient.delete(url)
    }
}

// Mock for testing
class MockUserRepository: UserRepository {
    var users: [UUID: User] = [:]
    
    func fetchUser(id: UUID) async throws -> User {
        guard let user = users[id] else {
            throw URLError(.badServerResponse)
        }
        return user
    }
    
    func saveUser(_ user: User) async throws {
        users[user.id] = user
    }
    
    func deleteUser(id: UUID) async throws {
        users.removeValue(forKey: id)
    }
}
```

---

## 🎯 Advanced Examples

### Custom View Modifiers

```swift
struct ShakeEffect: GeometryEffect {
    var amount: CGFloat = 10
    var shakesPerUnit = 3
    var animatableData: CGFloat
    
    func effectValue(size: CGSize) -> ProjectionTransform {
        ProjectionTransform(CGAffineTransform(
            translationX: amount * sin(animatableData * .pi * CGFloat(shakesPerUnit)),
            y: 0
        ))
    }
}

extension View {
    func shake(times: Int) -> some View {
        modifier(ShakeEffect(animatableData: CGFloat(times)))
    }
}

// Usage
struct ShakeExample: View {
    @State private var attempts = 0
    
    var body: some View {
        Button("Shake Me") {
            withAnimation(.default) {
                attempts += 1
            }
        }
        .shake(times: attempts)
    }
}
```

### Custom Transition

```swift
extension AnyTransition {
    static var slideAndFade: AnyTransition {
        AnyTransition.asymmetric(
            insertion: .move(edge: .trailing).combined(with: .opacity),
            removal: .scale.combined(with: .opacity)
        )
    }
}

// Usage
struct TransitionExample: View {
    @State private var show = false
    
    var body: some View {
        VStack {
            Button("Toggle") {
                withAnimation {
                    show.toggle()
                }
            }
            
            if show {
                Text("Hello!")
                    .transition(.slideAndFade)
            }
        }
    }
}
```

---

## 📚 More Resources

- [SwiftUI Visual Guide](SWIFTUI_VISUAL_GUIDE.md) - Component gallery
- [Architecture Guide](ARCHITECTURE.md) - App structure and patterns
- [Design System](DESIGN_SYSTEM.md) - Colors, typography, spacing
- [Getting Started](GETTING_STARTED_DESIGNERS.md) - For beginners

---

<div align="center">

**Keep Coding!** 💻

[Back to Main README](../README.md)

</div>
