# 🏗️ Architecture Overview

Understanding the structure and patterns used in this boilerplate.

---

## 📁 Project Structure

```
apps/apple/
├── AppleApps.xcodeproj/          # Generated Xcode project
├── project.yml                    # XcodeGen configuration
├── Package.swift                  # Swift Package Manager manifest
│
├── SharedKit/                     # Shared business logic
│   ├── Sources/
│   │   ├── Models/               # Data models
│   │   ├── Networking/           # API client & services
│   │   ├── Services/             # Business logic services
│   │   ├── Utilities/            # Helpers & extensions
│   │   └── DesignSystem/         # Design tokens & components
│   └── Tests/                    # Unit tests
│
├── iOSApp/                        # iOS-specific code
│   ├── App.swift                 # iOS app entry point
│   ├── Views/                    # iOS screens & views
│   ├── ViewModels/               # iOS view models
│   ├── Resources/                # iOS assets & resources
│   └── Info.plist               # iOS configuration
│
├── macOSApp/                      # macOS-specific code
│   ├── App.swift                 # macOS app entry point
│   ├── Views/                    # macOS screens & views
│   └── Info.plist               # macOS configuration
│
├── WatchApp/                      # watchOS app bundle
└── WatchAppExtension/             # watchOS logic
    ├── App.swift                 # watchOS app entry point
    ├── Views/                    # watchOS screens
    └── Info.plist               # watchOS configuration
```

---

## 🎯 Architecture Pattern: MVVM

This boilerplate uses the **Model-View-ViewModel (MVVM)** pattern, which is ideal for SwiftUI.

### Components

```
┌─────────────────────────────────────────────┐
│                   View                      │
│  (SwiftUI Views - UI Layer)                │
│  - Displays data                           │
│  - Handles user input                      │
│  - Observes ViewModel                      │
└─────────────┬───────────────────────────────┘
              │ @StateObject / @ObservedObject
              ▼
┌─────────────────────────────────────────────┐
│                ViewModel                    │
│  (ObservableObject - Presentation Logic)   │
│  - Prepares data for display               │
│  - Handles user actions                    │
│  - Calls services/repositories             │
│  - Updates @Published properties           │
└─────────────┬───────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────┐
│              Model/Service                  │
│  (Business Logic & Data)                   │
│  - Data models                             │
│  - API calls                               │
│  - Business rules                          │
│  - Data persistence                        │
└─────────────────────────────────────────────┘
```

### Example Implementation

**Model** (in SharedKit):
```swift
public struct User: Codable, Identifiable {
    public let id: UUID
    public let name: String
    public let email: String
    
    public init(id: UUID, name: String, email: String) {
        self.id = id
        self.name = name
        self.email = email
    }
}
```

**Service** (in SharedKit):
```swift
public protocol UserServiceProtocol {
    func fetchUser(id: UUID) async throws -> User
    func updateUser(_ user: User) async throws -> User
}

public class UserService: UserServiceProtocol {
    private let httpClient: HTTPClient
    
    public init(httpClient: HTTPClient = HTTPClient()) {
        self.httpClient = httpClient
    }
    
    public func fetchUser(id: UUID) async throws -> User {
        let url = URL(string: "https://api.example.com/users/\(id)")!
        return try await httpClient.getJSON(url, as: User.self)
    }
    
    public func updateUser(_ user: User) async throws -> User {
        // Implementation
        return user
    }
}
```

**ViewModel** (in platform-specific code):
```swift
@MainActor
class UserProfileViewModel: ObservableObject {
    @Published var user: User?
    @Published var isLoading = false
    @Published var errorMessage: String?
    
    private let userService: UserServiceProtocol
    
    init(userService: UserServiceProtocol = UserService()) {
        self.userService = userService
    }
    
    func loadUser(id: UUID) {
        Task {
            isLoading = true
            errorMessage = nil
            
            do {
                user = try await userService.fetchUser(id: id)
            } catch {
                errorMessage = "Failed to load user: \(error.localizedDescription)"
            }
            
            isLoading = false
        }
    }
    
    func updateName(_ newName: String) {
        guard var updatedUser = user else { return }
        updatedUser = User(id: updatedUser.id, name: newName, email: updatedUser.email)
        
        Task {
            do {
                user = try await userService.updateUser(updatedUser)
            } catch {
                errorMessage = "Failed to update user: \(error.localizedDescription)"
            }
        }
    }
}
```

**View** (in platform-specific code):
```swift
struct UserProfileView: View {
    @StateObject private var viewModel = UserProfileViewModel()
    let userId: UUID
    
    var body: some View {
        Group {
            if viewModel.isLoading {
                ProgressView("Loading...")
            } else if let user = viewModel.user {
                userContent(user)
            } else if let error = viewModel.errorMessage {
                errorView(error)
            }
        }
        .onAppear {
            viewModel.loadUser(id: userId)
        }
    }
    
    private func userContent(_ user: User) -> some View {
        VStack(spacing: 16) {
            Text(user.name)
                .font(.title)
            Text(user.email)
                .font(.subheadline)
                .foregroundColor(.secondary)
        }
    }
    
    private func errorView(_ message: String) -> some View {
        VStack {
            Text(message)
                .foregroundColor(.red)
            Button("Retry") {
                viewModel.loadUser(id: userId)
            }
        }
    }
}
```

---

## 🔄 Data Flow

### Unidirectional Data Flow

```
User Action → ViewModel → Service → API
     ↑                                 │
     │                                 ▼
  View ←─────────── @Published ←── Response
```

1. **User interacts** with View (button tap, text input)
2. **View calls** ViewModel method
3. **ViewModel calls** Service/Repository
4. **Service makes** API call or database query
5. **Service returns** data
6. **ViewModel updates** @Published property
7. **View automatically** re-renders

---

## 📦 SharedKit Organization

SharedKit contains all platform-agnostic code:

### Models
```swift
// SharedKit/Sources/Models/User.swift
public struct User: Codable, Identifiable {
    // Shared across all platforms
}
```

### Services
```swift
// SharedKit/Sources/Services/UserService.swift
public class UserService {
    // Business logic shared across platforms
}
```

### Networking
```swift
// SharedKit/Sources/Networking/HTTPClient.swift
public class HTTPClient {
    // Network layer shared across platforms
}
```

### Utilities
```swift
// SharedKit/Sources/Utilities/Extensions.swift
public extension String {
    // Helper methods available everywhere
}
```

---

## 🎨 Platform-Specific Code

Each platform has its own Views and ViewModels:

### iOS
```swift
// iOSApp/Views/UserProfileView.swift
struct UserProfileView: View {
    // iOS-specific UI with NavigationStack, etc.
}
```

### macOS
```swift
// macOSApp/Views/UserProfileView.swift
struct UserProfileView: View {
    // macOS-specific UI with sidebars, toolbars
}
```

### watchOS
```swift
// WatchAppExtension/Views/UserProfileView.swift
struct UserProfileView: View {
    // Simplified UI for watch
}
```

**They all share the same ViewModel and Models from SharedKit!**

---

## 🔌 Dependency Injection

Use protocol-oriented programming for testability:

### Define Protocol
```swift
// SharedKit
public protocol UserServiceProtocol {
    func fetchUser(id: UUID) async throws -> User
}
```

### Implement Service
```swift
public class UserService: UserServiceProtocol {
    private let httpClient: HTTPClient
    
    public init(httpClient: HTTPClient) {
        self.httpClient = httpClient
    }
    
    public func fetchUser(id: UUID) async throws -> User {
        // Real implementation
    }
}
```

### Mock for Testing
```swift
class MockUserService: UserServiceProtocol {
    var mockUser: User?
    
    func fetchUser(id: UUID) async throws -> User {
        if let user = mockUser {
            return user
        }
        throw NSError(domain: "Test", code: 404)
    }
}
```

### Inject in ViewModel
```swift
@MainActor
class UserProfileViewModel: ObservableObject {
    private let userService: UserServiceProtocol
    
    init(userService: UserServiceProtocol = UserService()) {
        self.userService = userService
    }
}
```

### Use in Tests
```swift
func testLoadUser() async {
    let mockService = MockUserService()
    mockService.mockUser = User(id: UUID(), name: "Test", email: "test@example.com")
    
    let viewModel = UserProfileViewModel(userService: mockService)
    await viewModel.loadUser(id: UUID())
    
    XCTAssertEqual(viewModel.user?.name, "Test")
}
```

---

## 🌐 Networking Layer

### HTTPClient

Centralized networking using Alamofire:

```swift
public class HTTPClient {
    private let session: Session
    
    public init(session: Session = .default) {
        self.session = session
    }
    
    // GET request
    public func get<T: Decodable>(
        _ url: URL,
        as type: T.Type = T.self
    ) async throws -> T {
        let data = try await session.request(url).serializingData().value
        return try JSONDecoder().decode(T.self, from: data)
    }
    
    // POST request
    public func post<T: Decodable, E: Encodable>(
        _ url: URL,
        body: E,
        as type: T.Type = T.self
    ) async throws -> T {
        let data = try await session
            .request(url, method: .post, parameters: body, encoder: JSONParameterEncoder.default)
            .serializingData()
            .value
        return try JSONDecoder().decode(T.self, from: data)
    }
}
```

### API Service Pattern

```swift
public class APIService {
    private let httpClient: HTTPClient
    private let baseURL: String
    
    public init(httpClient: HTTPClient = HTTPClient(), baseURL: String = "https://api.example.com") {
        self.httpClient = httpClient
        self.baseURL = baseURL
    }
    
    private func url(path: String) -> URL {
        URL(string: "\(baseURL)\(path)")!
    }
    
    public func fetchUsers() async throws -> [User] {
        try await httpClient.get(url(path: "/users"))
    }
    
    public func createUser(_ user: User) async throws -> User {
        try await httpClient.post(url(path: "/users"), body: user)
    }
}
```

---

## 💾 State Management

### @State vs @StateObject vs @ObservedObject

**@State** - Simple value types, owned by view
```swift
struct ContentView: View {
    @State private var count = 0  // View owns this
    
    var body: some View {
        Button("Count: \(count)") {
            count += 1
        }
    }
}
```

**@StateObject** - Reference type, created and owned by view
```swift
struct ContentView: View {
    @StateObject private var viewModel = MyViewModel()  // View creates and owns
    
    var body: some View {
        Text(viewModel.text)
    }
}
```

**@ObservedObject** - Reference type, passed from parent
```swift
struct ParentView: View {
    @StateObject private var viewModel = MyViewModel()
    
    var body: some View {
        ChildView(viewModel: viewModel)  // Pass to child
    }
}

struct ChildView: View {
    @ObservedObject var viewModel: MyViewModel  // Observes passed object
    
    var body: some View {
        Text(viewModel.text)
    }
}
```

### Environment Objects

For app-wide state:

```swift
// Define
class AppState: ObservableObject {
    @Published var isAuthenticated = false
    @Published var currentUser: User?
}

// Provide at root
@main
struct MyApp: App {
    @StateObject private var appState = AppState()
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(appState)
        }
    }
}

// Access anywhere
struct SomeView: View {
    @EnvironmentObject var appState: AppState
    
    var body: some View {
        if appState.isAuthenticated {
            Text("Logged in")
        }
    }
}
```

---

## 🧪 Testing Strategy

### Unit Tests

Test business logic in isolation:

```swift
@testable import SharedKit
import XCTest

final class UserServiceTests: XCTestCase {
    var sut: UserService!
    var mockHTTPClient: MockHTTPClient!
    
    override func setUp() {
        super.setUp()
        mockHTTPClient = MockHTTPClient()
        sut = UserService(httpClient: mockHTTPClient)
    }
    
    func testFetchUser() async throws {
        // Arrange
        let expectedUser = User(id: UUID(), name: "Test", email: "test@example.com")
        mockHTTPClient.mockResponse = expectedUser
        
        // Act
        let user = try await sut.fetchUser(id: expectedUser.id)
        
        // Assert
        XCTAssertEqual(user.id, expectedUser.id)
        XCTAssertEqual(user.name, expectedUser.name)
    }
}
```

### View Model Tests

Test presentation logic:

```swift
@MainActor
final class UserProfileViewModelTests: XCTestCase {
    var sut: UserProfileViewModel!
    var mockService: MockUserService!
    
    override func setUp() {
        super.setUp()
        mockService = MockUserService()
        sut = UserProfileViewModel(userService: mockService)
    }
    
    func testLoadUser() async {
        // Arrange
        let expectedUser = User(id: UUID(), name: "Test", email: "test@example.com")
        mockService.mockUser = expectedUser
        
        // Act
        sut.loadUser(id: expectedUser.id)
        try? await Task.sleep(nanoseconds: 100_000_000)  // Wait for async
        
        // Assert
        XCTAssertEqual(sut.user?.name, "Test")
        XCTAssertFalse(sut.isLoading)
        XCTAssertNil(sut.errorMessage)
    }
}
```

---

## 🚀 Performance Considerations

### LazyLoading

Use `LazyVStack` and `LazyHStack` for long lists:

```swift
ScrollView {
    LazyVStack {
        ForEach(items) { item in
            ItemRow(item: item)
        }
    }
}
```

### Task Cancellation

Cancel tasks when views disappear:

```swift
struct ContentView: View {
    @StateObject private var viewModel = MyViewModel()
    @State private var task: Task<Void, Never>?
    
    var body: some View {
        ContentView()
            .onAppear {
                task = Task {
                    await viewModel.loadData()
                }
            }
            .onDisappear {
                task?.cancel()
            }
    }
}
```

### Image Caching

Use Kingfisher for efficient image loading:

```swift
import Kingfisher

KFImage(URL(string: imageURL))
    .placeholder {
        ProgressView()
    }
    .retry(maxCount: 3, interval: .seconds(2))
    .onSuccess { result in
        print("Image loaded")
    }
```

---

## 📚 Best Practices

### 1. Keep Views Simple

```swift
// ✅ Good - View is simple, logic in ViewModel
struct UserView: View {
    @StateObject private var viewModel = UserViewModel()
    
    var body: some View {
        List(viewModel.users) { user in
            Text(user.name)
        }
        .onAppear {
            viewModel.loadUsers()
        }
    }
}

// ❌ Avoid - Business logic in View
struct UserView: View {
    @State private var users: [User] = []
    
    var body: some View {
        List(users) { user in
            Text(user.name)
        }
        .onAppear {
            Task {
                // Don't put networking code directly in views
                let url = URL(string: "...")!
                let data = try await URLSession.shared.data(from: url)
                users = try JSONDecoder().decode([User].self, from: data.0)
            }
        }
    }
}
```

### 2. Use Protocols for Dependencies

```swift
// ✅ Good - Protocol allows testing
protocol UserServiceProtocol {
    func fetchUsers() async throws -> [User]
}

class UserViewModel: ObservableObject {
    init(userService: UserServiceProtocol = UserService()) {
        // Can inject mock for testing
    }
}

// ❌ Avoid - Concrete dependency
class UserViewModel: ObservableObject {
    private let service = UserService()  // Hard to test
}
```

### 3. Extract Subviews

```swift
// ✅ Good - Small, focused views
struct ProfileView: View {
    let user: User
    
    var body: some View {
        VStack {
            ProfileHeader(user: user)
            ProfileStats(user: user)
            ProfileBio(user: user)
        }
    }
}

// ❌ Avoid - Monolithic view
struct ProfileView: View {
    let user: User
    
    var body: some View {
        VStack {
            // 200 lines of UI code...
        }
    }
}
```

---

## 🔗 Related Documentation

- [Getting Started for Designers](GETTING_STARTED_DESIGNERS.md)
- [Advanced Patterns](ADVANCED_PATTERNS.md)
- [Testing Guide](TESTING.md)
- [Networking Guide](NETWORKING.md)

---

<div align="center">

**Build Scalable, Maintainable Apps** 🏗️

[Back to Main README](../README.md)

</div>
