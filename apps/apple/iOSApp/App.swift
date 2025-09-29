import SwiftUI
import SharedKit

@main
struct iOSApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}

struct ContentView: View {
    @State private var appInfo: AppInfo = .init(name: "TheLab iOS", version: "0.1.0")

    var body: some View {
        VStack(spacing: 16) {
            Text(appInfo.name)
                .font(.largeTitle).bold()
            Text("Version: \(appInfo.version)")
                .font(.subheadline)
                .foregroundStyle(.secondary)
            Button("Test Network Call") {
                Task {
                    let client = HTTPClient()
                    if let url = URL(string: "https://jsonplaceholder.typicode.com/todos/1") {
                        struct Todo: Decodable { let title: String }
                        if let todo: Todo = try? await client.getJSON(url) {
                            appInfo = .init(name: todo.title, version: appInfo.version)
                        }
                    }
                }
            }
        }
        .padding()
    }
}


