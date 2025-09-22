// swift-tools-version: 6.0
import PackageDescription

let package = Package(
    name: "Rendering",
    platforms: [
        .macOS(.v15), .iOS(.v18),
    ],
    products: [
        .library(name: "Rendering", targets: ["Rendering"]),
    ],
    dependencies: [
        .package(path: "../Core"),
    ],
    targets: [
        .target(
            name: "Rendering",
            dependencies: [
                .product(name: "Core", package: "Core"),
            ],
            path: "Sources"
        ),
    ]
)
