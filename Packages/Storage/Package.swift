// swift-tools-version: 6.0
import PackageDescription

let package = Package(
    name: "Storage",
    platforms: [
        .macOS(.v15), .iOS(.v18),
    ],
    products: [
        .library(name: "Storage", targets: ["Storage"]),
    ],
    dependencies: [
        .package(url: "https://github.com/groue/GRDB.swift.git", from: "6.29.0"),
        .package(url: "https://github.com/duckdb/duckdb-swift.git", from: "1.1.3"),
    ],
    targets: [
        .target(
            name: "Storage",
            dependencies: [
                .product(name: "GRDB", package: "GRDB.swift"),
                .product(name: "DuckDB", package: "duckdb-swift"),
            ],
            path: "Sources"
        ),
    ]
)
