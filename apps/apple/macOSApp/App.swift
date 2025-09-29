import SwiftUI
import SharedKit

@main
struct macOSApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}

struct ContentView: View {
    @State private var appInfo: AppInfo = .init(name: "TheLab macOS", version: "0.1.0")

    var body: some View {
        VStack(spacing: 12) {
            Text(appInfo.name)
                .font(.title).bold()
            Text("Version: \(appInfo.version)")
                .font(.subheadline)
                .foregroundStyle(.secondary)
        }
        .padding(24)
        .frame(minWidth: 480, minHeight: 320)
    }
}


