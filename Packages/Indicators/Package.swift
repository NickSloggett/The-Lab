// swift-tools-version: 6.0
import PackageDescription

let package = Package(
    name: "Indicators",
    platforms: [
        .macOS(.v15), .iOS(.v18),
    ],
    products: [
        .library(name: "Indicators", targets: ["Indicators"]),
    ],
    dependencies: [
        .package(url: "https://github.com/apple/swift-numerics.git", from: "1.0.0"),
    ],
    targets: [
        .target(
            name: "Indicators",
            dependencies: [
                .product(name: "RealModule", package: "swift-numerics"),
            ],
            path: "Sources"
        ),
    ]
)
