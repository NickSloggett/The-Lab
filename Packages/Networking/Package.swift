// swift-tools-version: 6.0
import PackageDescription

let package = Package(
    name: "Networking",
    platforms: [
        .macOS(.v15), .iOS(.v18),
    ],
    products: [
        .library(name: "Networking", targets: ["Networking", "ProtoGen"]),
    ],
    dependencies: [
        .package(url: "https://github.com/grpc/grpc-swift.git", from: "1.22.0"),
        .package(url: "https://github.com/apple/swift-protobuf.git", from: "1.27.0"),
    ],
    targets: [
        .target(
            name: "ProtoGen",
            dependencies: [
                .product(name: "GRPC", package: "grpc-swift"),
                .product(name: "SwiftProtobuf", package: "swift-protobuf"),
            ],
            path: "Sources/ProtoGen",
            sources: ["Generated"]
        ),
        .target(
            name: "Networking",
            dependencies: [
                .target(name: "ProtoGen"),
                .product(name: "GRPC", package: "grpc-swift"),
                .product(name: "SwiftProtobuf", package: "swift-protobuf"),
            ],
            path: "Sources/Networking"
        ),
    ]
)
