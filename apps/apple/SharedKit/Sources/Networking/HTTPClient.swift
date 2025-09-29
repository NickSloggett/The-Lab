import Foundation
import Alamofire

/// HTTP client for making network requests
public class HTTPClient {
    private let session: Session
    
    public init(session: Session = .default) {
        self.session = session
    }
    
    // MARK: - GET
    
    /// Performs a GET request and decodes JSON response
    public func getJSON<T: Decodable>(_ url: URL, as type: T.Type = T.self) async throws -> T {
        AppLogger.info("GET \(url.absoluteString)")
        
        do {
            let data = try await session.request(url).serializingData().value
            let decoded = try JSONDecoder().decode(T.self, from: data)
            AppLogger.debug("GET \(url.absoluteString) - Success")
            return decoded
        } catch {
            AppLogger.error("GET \(url.absoluteString) - Failed", error: error)
            throw error
        }
    }
    
    // MARK: - POST
    
    /// Performs a POST request with JSON body
    public func postJSON<T: Decodable, E: Encodable>(
        _ url: URL,
        body: E,
        as type: T.Type = T.self
    ) async throws -> T {
        AppLogger.info("POST \(url.absoluteString)")
        
        do {
            let data = try await session
                .request(url, method: .post, parameters: body, encoder: JSONParameterEncoder.default)
                .serializingData()
                .value
            let decoded = try JSONDecoder().decode(T.self, from: data)
            AppLogger.debug("POST \(url.absoluteString) - Success")
            return decoded
        } catch {
            AppLogger.error("POST \(url.absoluteString) - Failed", error: error)
            throw error
        }
    }
    
    // MARK: - PUT
    
    /// Performs a PUT request with JSON body
    public func putJSON<T: Decodable, E: Encodable>(
        _ url: URL,
        body: E,
        as type: T.Type = T.self
    ) async throws -> T {
        AppLogger.info("PUT \(url.absoluteString)")
        
        do {
            let data = try await session
                .request(url, method: .put, parameters: body, encoder: JSONParameterEncoder.default)
                .serializingData()
                .value
            let decoded = try JSONDecoder().decode(T.self, from: data)
            AppLogger.debug("PUT \(url.absoluteString) - Success")
            return decoded
        } catch {
            AppLogger.error("PUT \(url.absoluteString) - Failed", error: error)
            throw error
        }
    }
    
    // MARK: - DELETE
    
    /// Performs a DELETE request
    public func delete(_ url: URL) async throws {
        AppLogger.info("DELETE \(url.absoluteString)")
        
        do {
            _ = try await session
                .request(url, method: .delete)
                .serializingData()
                .value
            AppLogger.debug("DELETE \(url.absoluteString) - Success")
        } catch {
            AppLogger.error("DELETE \(url.absoluteString) - Failed", error: error)
            throw error
        }
    }
    
    /// Performs a DELETE request and decodes response
    public func deleteJSON<T: Decodable>(
        _ url: URL,
        as type: T.Type = T.self
    ) async throws -> T {
        AppLogger.info("DELETE \(url.absoluteString)")
        
        do {
            let data = try await session
                .request(url, method: .delete)
                .serializingData()
                .value
            let decoded = try JSONDecoder().decode(T.self, from: data)
            AppLogger.debug("DELETE \(url.absoluteString) - Success")
            return decoded
        } catch {
            AppLogger.error("DELETE \(url.absoluteString) - Failed", error: error)
            throw error
        }
    }
}
