import SwiftUI
import SharedKit

struct ContentView: View {
    @State private var info: AppInfo = .init(name: "TheLab watchOS", version: "0.1.0")

    var body: some View {
        VStack(spacing: 8) {
            Text(info.name)
                .font(.headline)
            Text("v\(info.version)")
                .font(.caption2)
                .foregroundStyle(.secondary)
        }
        .padding()
    }
}


