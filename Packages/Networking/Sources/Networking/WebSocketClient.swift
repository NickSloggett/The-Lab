import Foundation

public protocol WebSocketClientProtocol: Sendable {
    func connect(url: URL) async throws
    func send(_ data: Data) async throws
    func incoming() -> AsyncStream<Data>
    func close() async
}

public final class NoopWebSocketClient: WebSocketClientProtocol, @unchecked Sendable {
    private let lock = NSLock()
    private var continuation: AsyncStream<Data>.Continuation?

    public init() {}

    public func connect(url: URL) async throws {}

    public func send(_ data: Data) async throws {}

    public func incoming() -> AsyncStream<Data> {
        AsyncStream { continuation in
            self.lock.withLock {
                self.continuation = continuation
            }
        }
    }

    public func close() async {
        lock.withLock {
            continuation?.finish()
        }
    }
}
