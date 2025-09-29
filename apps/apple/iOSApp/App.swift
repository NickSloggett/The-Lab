import SwiftUI
import SharedKit

@main
struct iOSApp: App {
    var body: some Scene {
        WindowGroup {
            MainTabView()
        }
    }
}

struct MainTabView: View {
    var body: some View {
        TabView {
            HomeView()
                .tabItem {
                    Label("Home", systemImage: "house")
                }
            
            ComponentsView()
                .tabItem {
                    Label("Components", systemImage: "square.grid.2x2")
                }
            
            ProfileView()
                .tabItem {
                    Label("Profile", systemImage: "person")
                }
        }
    }
}

// MARK: - Home View

struct HomeView: View {
    @State private var appInfo: AppInfo = .init(name: "TheLab iOS", version: "1.0.0")
    @State private var isLoading = false
    @State private var showAlert = false
    @State private var alertType: AlertType = .success
    
    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: .Spacing.lg) {
                    // Hero Card
                    heroCard
                    
                    // Quick Actions
                    quickActionsGrid
                    
                    // Example Network Call
                    networkExampleCard
                    
                    // Alert Examples
                    if showAlert {
                        AlertBanner(
                            type: alertType,
                            message: alertMessage,
                            onDismiss: { showAlert = false }
                        )
                        .transition(.move(edge: .top).combined(with: .opacity))
                    }
                }
                .paddingMD()
            }
            .background(Color.Surface.background)
            .navigationTitle("Welcome")
            .navigationBarTitleDisplayMode(.large)
        }
    }
    
    private var heroCard: some View {
        CardView {
            VStack(alignment: .leading, spacing: .Spacing.md) {
                HStack {
                    VStack(alignment: .leading, spacing: 8) {
                        Text(appInfo.name)
                            .font(.App.title)
                            .foregroundColor(.Text.primary)
                        
                        Text("Version \(appInfo.version)")
                            .font(.App.subheadline)
                            .foregroundColor(.Text.secondary)
                    }
                    
                    Spacer()
                    
                    Image(systemName: "app.badge")
                        .font(.system(size: .IconSize.xl))
                        .foregroundColor(.Brand.primaryFallback)
                }
                
                Text("A modern boilerplate for iOS, iPadOS, macOS, and watchOS development.")
                    .font(.App.body)
                    .foregroundColor(.Text.secondary)
            }
        }
    }
    
    private var quickActionsGrid: some View {
        LazyVGrid(
            columns: [
                GridItem(.flexible()),
                GridItem(.flexible())
            ],
            spacing: .Spacing.md
        ) {
            QuickActionCard(
                icon: "checkmark.circle",
                title: "Success",
                color: .UI.success
            ) {
                alertType = .success
                showAlert = true
            }
            
            QuickActionCard(
                icon: "xmark.circle",
                title: "Error",
                color: .UI.error
            ) {
                alertType = .error
                showAlert = true
            }
            
            QuickActionCard(
                icon: "exclamationmark.triangle",
                title: "Warning",
                color: .UI.warning
            ) {
                alertType = .warning
                showAlert = true
            }
            
            QuickActionCard(
                icon: "info.circle",
                title: "Info",
                color: .UI.info
            ) {
                alertType = .info
                showAlert = true
            }
        }
    }
    
    private var networkExampleCard: some View {
        CardView {
            VStack(spacing: .Spacing.md) {
                Image(systemName: "network")
                    .font(.system(size: .IconSize.lg))
                    .foregroundColor(.Brand.primaryFallback)
                
                Text("Network Example")
                    .font(.App.headline)
                
                Text("Test the network layer with a real API call")
                    .font(.App.caption)
                    .foregroundColor(.Text.secondary)
                    .multilineTextAlignment(.center)
                
                Button {
                    testNetworkCall()
                } label: {
                    HStack {
                        if isLoading {
                            ProgressView()
                                .tint(.white)
                        }
                        Text(isLoading ? "Loading..." : "Test API Call")
                    }
                }
                .buttonStyle(PrimaryButtonStyle())
                .disabled(isLoading)
            }
        }
    }
    
    private var alertMessage: String {
        switch alertType {
        case .success: return "Operation completed successfully!"
        case .error: return "An error occurred. Please try again."
        case .warning: return "Warning: This action cannot be undone."
        case .info: return "New features are available!"
        }
    }
    
    private func testNetworkCall() {
        Task {
            isLoading = true
            let client = HTTPClient()
            
            do {
                if let url = URL(string: "https://jsonplaceholder.typicode.com/todos/1") {
                    struct TodoResponse: Decodable {
                        let title: String
                        let completed: Bool
                    }
                    
                    let todo: TodoResponse = try await client.getJSON(url)
                    appInfo = .init(name: todo.title.capitalizedFirst, version: appInfo.version)
                    alertType = .success
                    showAlert = true
                }
            } catch {
                alertType = .error
                showAlert = true
            }
            
            isLoading = false
        }
    }
}

struct QuickActionCard: View {
    let icon: String
    let title: String
    let color: Color
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            VStack(spacing: .Spacing.sm) {
                Image(systemName: icon)
                    .font(.system(size: .IconSize.lg))
                    .foregroundColor(color)
                
                Text(title)
                    .font(.App.caption)
                    .foregroundColor(.Text.primary)
            }
            .frame(maxWidth: .infinity)
            .padding(.Spacing.md)
            .background(Color.Surface.card)
            .cornerRadius(.Radius.md)
            .shadowSm()
        }
    }
}

// MARK: - Components View

struct ComponentsView: View {
    var body: some View {
        NavigationStack {
            List {
                Section("Interactive Components") {
                    NavigationLink("Buttons") {
                        ButtonExamplesView()
                    }
                    NavigationLink("Cards") {
                        CardExamplesView()
                    }
                    NavigationLink("Alerts & Banners") {
                        AlertExamplesView()
                    }
                }
                
                Section("State Components") {
                    NavigationLink("Loading States") {
                        LoadingExamplesView()
                    }
                    NavigationLink("Empty States") {
                        EmptyStateExamplesView()
                    }
                }
            }
            .navigationTitle("Components")
        }
    }
}

struct ButtonExamplesView: View {
    var body: some View {
        ScrollView {
            VStack(spacing: .Spacing.lg) {
                CardView {
                    VStack(spacing: .Spacing.md) {
                        Text("Button Styles")
                            .font(.App.headline)
                        
                        Button("Primary Button") {}
                            .buttonStyle(PrimaryButtonStyle())
                        
                        Button("Secondary Button") {}
                            .buttonStyle(SecondaryButtonStyle())
                        
                        Button("Outlined Button") {}
                            .buttonStyle(OutlinedButtonStyle())
                    }
                }
            }
            .paddingMD()
        }
        .navigationTitle("Buttons")
        .navigationBarTitleDisplayMode(.inline)
    }
}

struct CardExamplesView: View {
    var body: some View {
        ScrollView {
            VStack(spacing: .Spacing.lg) {
                CardView {
                    VStack(alignment: .leading, spacing: 12) {
                        Text("Simple Card")
                            .font(.App.headline)
                        Text("This is a basic card with text content.")
                            .font(.App.body)
                            .foregroundColor(.Text.secondary)
                    }
                }
                
                CardView {
                    HStack {
                        Image(systemName: "heart.fill")
                            .foregroundColor(.red)
                        Text("Card with Icon")
                            .font(.App.headline)
                        Spacer()
                        Image(systemName: "chevron.right")
                            .foregroundColor(.Text.tertiary)
                    }
                }
            }
            .paddingMD()
        }
        .navigationTitle("Cards")
        .navigationBarTitleDisplayMode(.inline)
    }
}

struct AlertExamplesView: View {
    var body: some View {
        ScrollView {
            VStack(spacing: .Spacing.md) {
                AlertBanner(type: .success, message: "Changes saved successfully!")
                AlertBanner(type: .error, message: "Failed to save changes.")
                AlertBanner(type: .warning, message: "Your session will expire soon.")
                AlertBanner(type: .info, message: "New features available!")
            }
            .paddingMD()
        }
        .navigationTitle("Alerts")
        .navigationBarTitleDisplayMode(.inline)
    }
}

struct LoadingExamplesView: View {
    var body: some View {
        VStack {
            LoadingView()
            Spacer().frame(height: 40)
            LoadingView(message: "Fetching data...")
        }
        .navigationTitle("Loading States")
        .navigationBarTitleDisplayMode(.inline)
    }
}

struct EmptyStateExamplesView: View {
    var body: some View {
        ScrollView {
            VStack(spacing: .Spacing.xxl) {
                EmptyStateView(
                    icon: "tray",
                    title: "No Items",
                    message: "You haven't added any items yet.",
                    actionTitle: "Add Item",
                    action: {}
                )
                
                Divider()
                
                EmptyStateView(
                    icon: "wifi.slash",
                    title: "No Connection",
                    message: "Please check your internet connection."
                )
            }
        }
        .navigationTitle("Empty States")
        .navigationBarTitleDisplayMode(.inline)
    }
}

// MARK: - Profile View

struct ProfileView: View {
    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: .Spacing.lg) {
                    ProfileHeaderView(
                        name: "John Doe",
                        subtitle: "iOS Developer"
                    )
                    .cardStyle()
                    
                    statsCard
                    
                    settingsCard
                }
                .paddingMD()
            }
            .background(Color.Surface.background)
            .navigationTitle("Profile")
        }
    }
    
    private var statsCard: some View {
        CardView {
            VStack(spacing: .Spacing.md) {
                Text("Statistics")
                    .font(.App.headline)
                
                HStack(spacing: .Spacing.xl) {
                    StatView(number: "42", label: "Projects")
                    StatView(number: "1.2K", label: "Followers")
                    StatView(number: "384", label: "Following")
                }
            }
        }
    }
    
    private var settingsCard: some View {
        CardView(padding: 0) {
            VStack(spacing: 0) {
                SettingsRow(icon: "bell", title: "Notifications", color: .red)
                Divider()
                SettingsRow(icon: "lock", title: "Privacy", color: .blue)
                Divider()
                SettingsRow(icon: "gear", title: "Settings", color: .gray)
            }
        }
    }
}

struct StatView: View {
    let number: String
    let label: String
    
    var body: some View {
        VStack(spacing: 4) {
            Text(number)
                .font(.App.title2)
                .fontWeight(.bold)
            Text(label)
                .font(.App.caption)
                .foregroundColor(.Text.secondary)
        }
    }
}

struct SettingsRow: View {
    let icon: String
    let title: String
    let color: Color
    
    var body: some View {
        HStack {
            Image(systemName: icon)
                .foregroundColor(color)
                .frame(width: .IconSize.md)
            Text(title)
                .font(.App.body)
            Spacer()
            Image(systemName: "chevron.right")
                .foregroundColor(.Text.tertiary)
                .font(.caption)
        }
        .paddingMD()
    }
}

#Preview {
    MainTabView()
}