@testable import SharedKit
import XCTest

final class AppInfoTests: XCTestCase {
    func testAppInfoInitialization() {
        // Arrange & Act
        let appInfo = AppInfo(name: "TestApp", version: "1.0.0")
        
        // Assert
        XCTAssertEqual(appInfo.name, "TestApp")
        XCTAssertEqual(appInfo.version, "1.0.0")
    }
    
    func testAppInfoEquality() {
        // Arrange
        let appInfo1 = AppInfo(name: "TestApp", version: "1.0.0")
        let appInfo2 = AppInfo(name: "TestApp", version: "1.0.0")
        let appInfo3 = AppInfo(name: "DifferentApp", version: "1.0.0")
        
        // Assert
        XCTAssertEqual(appInfo1, appInfo2)
        XCTAssertNotEqual(appInfo1, appInfo3)
    }
    
    func testAppInfoCodable() throws {
        // Arrange
        let appInfo = AppInfo(name: "TestApp", version: "1.0.0")
        let encoder = JSONEncoder()
        let decoder = JSONDecoder()
        
        // Act
        let data = try encoder.encode(appInfo)
        let decoded = try decoder.decode(AppInfo.self, from: data)
        
        // Assert
        XCTAssertEqual(appInfo, decoded)
    }
}

final class UserTests: XCTestCase {
    func testUserInitialization() {
        // Arrange
        let id = UUID()
        let name = "John Doe"
        let email = "john@example.com"
        
        // Act
        let user = User(id: id, name: name, email: email)
        
        // Assert
        XCTAssertEqual(user.id, id)
        XCTAssertEqual(user.name, name)
        XCTAssertEqual(user.email, email)
        XCTAssertNil(user.avatarURL)
    }
    
    func testUserWithAvatar() {
        // Arrange
        let avatarURL = "https://example.com/avatar.jpg"
        
        // Act
        let user = User(
            name: "John Doe",
            email: "john@example.com",
            avatarURL: avatarURL
        )
        
        // Assert
        XCTAssertEqual(user.avatarURL, avatarURL)
    }
    
    func testUserEquality() {
        // Arrange
        let id = UUID()
        let user1 = User(id: id, name: "John", email: "john@example.com")
        let user2 = User(id: id, name: "John", email: "john@example.com")
        let user3 = User(name: "Jane", email: "jane@example.com")
        
        // Assert
        XCTAssertEqual(user1, user2)
        XCTAssertNotEqual(user1, user3)
    }
}

final class TodoTests: XCTestCase {
    func testTodoInitialization() {
        // Arrange & Act
        let todo = Todo(title: "Test Task")
        
        // Assert
        XCTAssertEqual(todo.title, "Test Task")
        XCTAssertFalse(todo.isCompleted)
        XCTAssertNil(todo.completedAt)
    }
    
    func testCompletedTodo() {
        // Arrange
        let completedDate = Date()
        
        // Act
        let todo = Todo(
            title: "Completed Task",
            isCompleted: true,
            completedAt: completedDate
        )
        
        // Assert
        XCTAssertTrue(todo.isCompleted)
        XCTAssertEqual(todo.completedAt, completedDate)
    }
    
    func testTodoMutation() {
        // Arrange
        var todo = Todo(title: "Task")
        
        // Act
        todo.isCompleted = true
        todo.completedAt = Date()
        
        // Assert
        XCTAssertTrue(todo.isCompleted)
        XCTAssertNotNil(todo.completedAt)
    }
}

