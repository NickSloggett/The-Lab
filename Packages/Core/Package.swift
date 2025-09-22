// swift-tools-version: 6.0
import PackageDescription

let package = Package(
    name: "Core",
    platforms: [
        .macOS(.v15), .iOS(.v18),
    ],
    products: [
        .library(name: "Core", targets: ["Core"]),
    ],
    dependencies: [
        .package(url: "https://github.com/apple/swift-numerics.git", from: "1.0.0"),
    ],
    targets: [
        .target(
            name: "Core",
            dependencies: [
                .product(name: "RealModule", package: "swift-numerics"),
            ],
            path: "Sources"
        ),
        .testTarget(
            name: "CoreTests",
            dependencies: ["Core"],
            path: "Tests"
        ),
    ]
)
