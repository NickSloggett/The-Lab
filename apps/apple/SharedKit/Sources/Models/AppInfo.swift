import Foundation

/// Basic app information model
public struct AppInfo: Codable, Equatable {
    public let name: String
    public let version: String
    
    public init(name: String, version: String) {
        self.name = name
        self.version = version
    }
}

/// Example user model
public struct User: Codable, Identifiable, Equatable {
    public let id: UUID
    public let name: String
    public let email: String
    public let avatarURL: String?
    public let createdAt: Date
    
    public init(
        id: UUID = UUID(),
        name: String,
        email: String,
        avatarURL: String? = nil,
        createdAt: Date = Date()
    ) {
        self.id = id
        self.name = name
        self.email = email
        self.avatarURL = avatarURL
        self.createdAt = createdAt
    }
}

/// Example todo model
public struct Todo: Codable, Identifiable, Equatable {
    public let id: UUID
    public var title: String
    public var isCompleted: Bool
    public let createdAt: Date
    public var completedAt: Date?
    
    public init(
        id: UUID = UUID(),
        title: String,
        isCompleted: Bool = false,
        createdAt: Date = Date(),
        completedAt: Date? = nil
    ) {
        self.id = id
        self.title = title
        self.isCompleted = isCompleted
        self.createdAt = createdAt
        self.completedAt = completedAt
    }
}

