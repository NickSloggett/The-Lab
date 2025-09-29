# Contributing to Apple Platforms Boilerplate

First off, thank you for considering contributing! 🎉

## 🤝 Code of Conduct

Be respectful, inclusive, and constructive in all interactions.

## 🚀 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce**
- **Expected vs actual behavior**
- **Screenshots** (if applicable)
- **Environment details** (OS version, Xcode version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. Include:

- **Clear title and description**
- **Use case and motivation**
- **Examples** of how it would work
- **Mockups or screenshots** (if applicable)

### Pull Requests

1. **Fork the repo** and create your branch from `main`
2. **Make your changes** following our coding standards
3. **Add tests** if applicable
4. **Update documentation** if needed
5. **Run linting and formatting**: `make lint && make format`
6. **Test your changes**: `make test`
7. **Create a pull request**

## 📝 Coding Standards

### Swift Style Guide

We follow [Swift API Design Guidelines](https://swift.org/documentation/api-design-guidelines/).

#### Key Points

- **Use meaningful names**: `fetchUserProfile()` not `getUP()`
- **Follow conventions**: Classes are `UpperCamelCase`, variables are `lowerCamelCase`
- **Document public APIs**: Add doc comments for public types and methods
- **Keep functions small**: Aim for single responsibility
- **Use guard for early returns**: Make the happy path clear

#### Example

```swift
/// Fetches user profile from the server
/// - Parameter userId: The unique identifier for the user
/// - Returns: A User object if successful
/// - Throws: NetworkError if the request fails
public func fetchUserProfile(userId: UUID) async throws -> User {
    guard let url = buildURL(for: userId) else {
        throw NetworkError.invalidURL
    }
    
    return try await httpClient.getJSON(url, as: User.self)
}
```

### SwiftUI Best Practices

1. **Extract subviews** when views get complex (>150 lines)
2. **Use @ViewBuilder** for conditional content
3. **Prefer composition** over inheritance
4. **Use semantic colors** from the design system
5. **Add Preview macros** to all views

#### Example

```swift
struct ProfileView: View {
    let user: User
    
    var body: some View {
        VStack(spacing: .Spacing.md) {
            headerView
            bioView
            statsView
        }
    }
    
    private var headerView: some View {
        // Header implementation
    }
    
    private var bioView: some View {
        // Bio implementation
    }
    
    private var statsView: some View {
        // Stats implementation
    }
}

#Preview {
    ProfileView(user: .mock)
}
```

## 🏗️ Project Structure

### Adding New Features

1. **Models** go in `SharedKit/Sources/Models/`
2. **Networking** code goes in `SharedKit/Sources/Networking/`
3. **UI Components** go in `SharedKit/Sources/UI/Components/`
4. **Platform-specific** code goes in respective app folders
5. **Tests** mirror the source structure in `SharedKit/Tests/`

### Creating New Components

When adding a new UI component:

1. Create the component file in `SharedKit/Sources/UI/Components/`
2. Make it public: `public struct MyComponent: View { ... }`
3. Add documentation comments
4. Include multiple `#Preview` variations
5. Add example usage to the iOS app
6. Document in `docs/SWIFTUI_VISUAL_GUIDE.md`

Example:

```swift
/// A beautiful button with loading state
public struct LoadingButton: View {
    let title: String
    let isLoading: Bool
    let action: () -> Void
    
    public init(
        title: String,
        isLoading: Bool = false,
        action: @escaping () -> Void
    ) {
        self.title = title
        self.isLoading = isLoading
        self.action = action
    }
    
    public var body: some View {
        Button(action: action) {
            HStack {
                if isLoading {
                    ProgressView()
                }
                Text(title)
            }
        }
        .buttonStyle(PrimaryButtonStyle())
        .disabled(isLoading)
    }
}

#Preview("Normal") {
    LoadingButton(title: "Submit", action: {})
}

#Preview("Loading") {
    LoadingButton(title: "Submit", isLoading: true, action: {})
}
```

## 🧪 Testing

### Writing Tests

- Test public APIs and business logic
- Use descriptive test names: `testFetchUserReturnsValidUser`
- Follow Arrange-Act-Assert pattern
- Mock external dependencies

Example:

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
    
    override func tearDown() {
        sut = nil
        mockHTTPClient = nil
        super.tearDown()
    }
    
    func testFetchUserReturnsValidUser() async throws {
        // Arrange
        let expectedUser = User(id: UUID(), name: "Test", email: "test@example.com")
        mockHTTPClient.mockResponse = expectedUser
        
        // Act
        let user = try await sut.fetchUser(id: expectedUser.id)
        
        // Assert
        XCTAssertEqual(user.id, expectedUser.id)
        XCTAssertEqual(user.name, expectedUser.name)
        XCTAssertEqual(mockHTTPClient.requestCount, 1)
    }
}
```

### Running Tests

```bash
# Run all tests
make test

# Run specific test
xcodebuild -project AppleApps.xcodeproj -scheme iOS \
  -destination 'platform=iOS Simulator,name=iPhone 15' \
  test -only-testing:SharedKitTests/UserServiceTests/testFetchUserReturnsValidUser
```

## 📚 Documentation

### Code Documentation

Use [Swift-DocC](https://www.swift.org/documentation/docc/) style comments:

```swift
/// Brief description
///
/// Detailed description that can span
/// multiple lines and include examples.
///
/// ## Example
/// ```swift
/// let result = calculateTotal(items: items)
/// ```
///
/// - Parameters:
///   - items: Array of items to calculate
///   - discount: Optional discount percentage
/// - Returns: The calculated total
/// - Throws: `CalculationError` if items are invalid
public func calculateTotal(items: [Item], discount: Double? = nil) throws -> Double {
    // Implementation
}
```

### Markdown Documentation

When adding documentation:

1. Use clear, descriptive headings
2. Include code examples
3. Add previews/screenshots where helpful
4. Keep it friendly for beginners
5. Link to related docs

## 🔀 Git Workflow

### Branch Naming

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation changes
- `refactor/description` - Code refactoring

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add user profile screen
fix: resolve crash on empty data
docs: update getting started guide
refactor: simplify network layer
test: add user service tests
chore: update dependencies
```

### Pull Request Process

1. **Update your branch** with latest `main`
2. **Run all checks**: `make lint && make test`
3. **Write a clear PR description**:
   - What changed and why
   - Screenshots if UI changed
   - Breaking changes (if any)
4. **Request reviews** from maintainers
5. **Address feedback** promptly
6. **Squash commits** before merging (if requested)

## 🎨 Design System

When adding new colors, spacing, or styles:

1. Add to appropriate file in `SharedKit/Sources/DesignSystem/`
2. Use semantic naming: `primaryAction` not `blue`
3. Support light and dark modes
4. Document in `docs/DESIGN_SYSTEM.md`
5. Add examples in the iOS app

Example:

```swift
// In Colors.swift
public extension Color {
    struct Brand {
        public static let primaryAction = Color(
            light: Color(hex: "007AFF"),
            dark: Color(hex: "0A84FF")
        )
    }
}
```

## ❓ Questions?

- Check existing [documentation](docs/)
- Search [issues](https://github.com/NickSloggett/MobileApp/issues)
- Ask in [discussions](https://github.com/NickSloggett/MobileApp/discussions)
- Open a new issue

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

<div align="center">

**Thank you for contributing!** 🙏

Every contribution, no matter how small, makes this project better.

</div>
