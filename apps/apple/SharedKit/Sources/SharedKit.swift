import Foundation
import Alamofire
import Logging

public struct HTTPClient {
    private let session: Session
    private let logger: Logger

    public init(session: Session = .default, logger: Logger = Logger(label: "SharedKit.HTTPClient")) {
        self.session = session
        self.logger = logger
    }

    public func getJSON<T: Decodable>(_ url: URL, as type: T.Type = T.self) async throws -> T {
        logger.info("GET \(url.absoluteString)")
        let data = try await session.request(url).serializingData().value
        return try JSONDecoder().decode(T.self, from: data)
    }
}

public struct AppInfo: Codable, Equatable {
    public let name: String
    public let version: String
    public init(name: String, version: String) {
        self.name = name
        self.version = version
    }
}


