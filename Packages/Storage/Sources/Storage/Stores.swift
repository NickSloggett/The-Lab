import DuckDB
import Foundation
import GRDB

public struct Tick: Codable, FetchableRecord, PersistableRecord {
    public var ts: Int64
    public var price: Double
    public var size: Double
}

public final class TickStore {
    private let dbQueue: DatabaseQueue

    public init(path: String) throws {
        dbQueue = try DatabaseQueue(path: path)
        try migrator.migrate(dbQueue)
    }

    private var migrator: DatabaseMigrator {
        var migrator = DatabaseMigrator()
        migrator.registerMigration("createTick") { db in
            try db.create(table: "tick") { t in
                t.column("ts", .integer).notNull()
                t.column("price", .double).notNull()
                t.column("size", .double).notNull()
            }
        }
        return migrator
    }

    public func append(_ ticks: [Tick]) throws {
        try dbQueue.write { db in
            for t in ticks {
                try t.insert(db)
            }
        }
    }
}
