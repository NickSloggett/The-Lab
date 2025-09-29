import Foundation
import Logging

/// Centralized logging utility
public class AppLogger {
    public static let shared = AppLogger()
    
    private var logger: Logger
    
    private init() {
        logger = Logger(label: "com.thelab.app")
        #if DEBUG
        logger.logLevel = .debug
        #else
        logger.logLevel = .info
        #endif
    }
    
    /// Log debug message
    public static func debug(_ message: String, metadata: Logger.Metadata? = nil) {
        shared.logger.debug("\(message)", metadata: metadata)
    }
    
    /// Log info message
    public static func info(_ message: String, metadata: Logger.Metadata? = nil) {
        shared.logger.info("\(message)", metadata: metadata)
    }
    
    /// Log warning message
    public static func warning(_ message: String, metadata: Logger.Metadata? = nil) {
        shared.logger.warning("\(message)", metadata: metadata)
    }
    
    /// Log error message
    public static func error(_ message: String, error: Error? = nil, metadata: Logger.Metadata? = nil) {
        var fullMetadata = metadata ?? [:]
        if let error = error {
            fullMetadata["error"] = "\(error)"
        }
        shared.logger.error("\(message)", metadata: fullMetadata)
    }
    
    /// Log critical message
    public static func critical(_ message: String, metadata: Logger.Metadata? = nil) {
        shared.logger.critical("\(message)", metadata: metadata)
    }
}
