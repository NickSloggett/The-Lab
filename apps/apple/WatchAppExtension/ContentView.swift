import SwiftUI
import SharedKit

struct ContentView: View {
    @State private var info: AppInfo = .init(name: "TheLab", version: "1.0.0")
    @State private var selectedTab = 0
    
    var body: some View {
        TabView(selection: $selectedTab) {
            HomeView()
                .tag(0)
            
            StatsView()
                .tag(1)
            
            SettingsView()
                .tag(2)
        }
        .tabViewStyle(.page)
    }
}

struct HomeView: View {
    @State private var info: AppInfo = .init(name: "TheLab", version: "1.0.0")
    
    var body: some View {
        VStack(spacing: 12) {
            Image(systemName: "app.badge")
                .font(.system(size: .IconSize.xl))
                .foregroundColor(.Brand.primaryFallback)
            
            Text(info.name)
                .font(.App.headline)
            
            Text("v\(info.version)")
                .font(.App.caption2)
                .foregroundColor(.Text.secondary)
            
            Button {
                // Action
            } label: {
                Text("Start")
                    .font(.App.caption)
            }
            .buttonStyle(.borderedProminent)
        }
        .padding(.Spacing.sm)
    }
}

struct StatsView: View {
    var body: some View {
        VStack(spacing: 8) {
            Text("Stats")
                .font(.App.headline)
            
            HStack(spacing: 16) {
                MiniStat(value: "42", label: "Tasks")
                MiniStat(value: "8", label: "Done")
            }
        }
        .padding(.Spacing.xs)
    }
}

struct MiniStat: View {
    let value: String
    let label: String
    
    var body: some View {
        VStack(spacing: 4) {
            Text(value)
                .font(.App.title3)
                .fontWeight(.bold)
            Text(label)
                .font(.caption2)
                .foregroundColor(.Text.secondary)
        }
    }
}

struct SettingsView: View {
    var body: some View {
        VStack(spacing: 8) {
            Image(systemName: "gear")
                .font(.system(size: .IconSize.lg))
                .foregroundColor(.Text.secondary)
            
            Text("Settings")
                .font(.App.caption)
            
            Text("Swipe to navigate")
                .font(.caption2)
                .foregroundColor(.Text.tertiary)
        }
        .padding(.Spacing.xs)
    }
}

#Preview {
    ContentView()
}