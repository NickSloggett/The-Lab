import SwiftUI
import SharedKit

@main
struct macOSApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .defaultSize(width: 800, height: 600)
        .commands {
            CommandGroup(replacing: .help) {
                Button("Documentation") {
                    if let url = URL(string: "https://github.com/NickSloggett/MobileApp") {
                        NSWorkspace.shared.open(url)
                    }
                }
            }
        }
    }
}

struct ContentView: View {
    @State private var selectedSection: Section? = .home
    
    enum Section: String, CaseIterable, Identifiable {
        case home = "Home"
        case components = "Components"
        case profile = "Profile"
        
        var id: String { rawValue }
        
        var icon: String {
            switch self {
            case .home: return "house"
            case .components: return "square.grid.2x2"
            case .profile: return "person"
            }
        }
    }
    
    var body: some View {
        NavigationSplitView {
            // Sidebar
            List(Section.allCases, selection: $selectedSection) { section in
                Label(section.rawValue, systemImage: section.icon)
                    .tag(section as Section?)
            }
            .navigationTitle("TheLab")
            .frame(minWidth: 200)
        } detail: {
            // Content
            Group {
                switch selectedSection {
                case .home:
                    HomeView()
                case .components:
                    ComponentsView()
                case .profile:
                    ProfileView()
                case .none:
                    EmptyStateView(
                        icon: "sidebar.left",
                        title: "Select a Section",
                        message: "Choose a section from the sidebar to get started."
                    )
                }
            }
            .frame(minWidth: 600, minHeight: 400)
        }
    }
}

// MARK: - Home View

struct HomeView: View {
    @State private var appInfo: AppInfo = .init(name: "TheLab macOS", version: "1.0.0")
    @State private var isLoading = false
    
    var body: some View {
        ScrollView {
            VStack(spacing: .Spacing.xl) {
                // Hero Section
                heroSection
                
                // Feature Cards
                featureGrid
            }
            .padding(.Spacing.xl)
        }
        .background(Color.Surface.background)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
    
    private var heroSection: some View {
        VStack(spacing: .Spacing.lg) {
            Image(systemName: "app.badge")
                .font(.system(size: 80))
                .foregroundColor(.Brand.primaryFallback)
            
            Text(appInfo.name)
                .font(.system(size: 36, weight: .bold))
            
            Text("A modern boilerplate for Apple platform development")
                .font(.App.title3)
                .foregroundColor(.Text.secondary)
                .multilineTextAlignment(.center)
            
            HStack(spacing: .Spacing.md) {
                Button("Get Started") {
                    // Action
                }
                .buttonStyle(.borderedProminent)
                .controlSize(.large)
                
                Button("View Docs") {
                    if let url = URL(string: "https://github.com/NickSloggett/MobileApp") {
                        NSWorkspace.shared.open(url)
                    }
                }
                .buttonStyle(.bordered)
                .controlSize(.large)
            }
        }
        .frame(maxWidth: 600)
        .paddingXL()
    }
    
    private var featureGrid: some View {
        LazyVGrid(
            columns: [
                GridItem(.flexible(), spacing: .Spacing.lg),
                GridItem(.flexible(), spacing: .Spacing.lg),
                GridItem(.flexible(), spacing: .Spacing.lg)
            ],
            spacing: .Spacing.lg
        ) {
            FeatureCard(
                icon: "swift",
                title: "SwiftUI",
                description: "Modern declarative UI framework"
            )
            
            FeatureCard(
                icon: "shippingbox",
                title: "SPM",
                description: "Swift Package Manager integration"
            )
            
            FeatureCard(
                icon: "doc.text",
                title: "Docs",
                description: "Comprehensive documentation"
            )
            
            FeatureCard(
                icon: "paintbrush",
                title: "Design System",
                description: "Consistent colors and typography"
            )
            
            FeatureCard(
                icon: "network",
                title: "Networking",
                description: "Built-in HTTP client"
            )
            
            FeatureCard(
                icon: "checkmark.circle",
                title: "Tested",
                description: "Example tests included"
            )
        }
    }
}

struct FeatureCard: View {
    let icon: String
    let title: String
    let description: String
    
    var body: some View {
        CardView {
            VStack(spacing: .Spacing.md) {
                Image(systemName: icon)
                    .font(.system(size: .IconSize.xl))
                    .foregroundColor(.Brand.primaryFallback)
                
                Text(title)
                    .font(.App.headline)
                
                Text(description)
                    .font(.App.caption)
                    .foregroundColor(.Text.secondary)
                    .multilineTextAlignment(.center)
            }
            .frame(height: 160)
        }
    }
}

// MARK: - Components View

struct ComponentsView: View {
    @State private var selectedComponent: String? = "Buttons"
    
    let components = ["Buttons", "Cards", "Alerts", "Loading", "Empty States"]
    
    var body: some View {
        HSplitView {
            // Component List
            List(components, id: \.self, selection: $selectedComponent) { component in
                Text(component)
                    .tag(component as String?)
            }
            .frame(minWidth: 180, idealWidth: 200)
            
            // Component Preview
            Group {
                switch selectedComponent {
                case "Buttons":
                    ButtonExamples()
                case "Cards":
                    CardExamples()
                case "Alerts":
                    AlertExamples()
                case "Loading":
                    LoadingExamples()
                case "Empty States":
                    EmptyStateExamples()
                default:
                    Text("Select a component")
                }
            }
            .frame(minWidth: 400)
        }
    }
}

struct ButtonExamples: View {
    var body: some View {
        ScrollView {
            VStack(spacing: .Spacing.lg) {
                Text("Button Examples")
                    .font(.App.title)
                
                VStack(spacing: .Spacing.md) {
                    Button("Primary Button") {}
                        .buttonStyle(PrimaryButtonStyle())
                        .frame(width: 300)
                    
                    Button("Secondary Button") {}
                        .buttonStyle(SecondaryButtonStyle())
                        .frame(width: 300)
                    
                    Button("Outlined Button") {}
                        .buttonStyle(OutlinedButtonStyle())
                        .frame(width: 300)
                }
            }
            .paddingXL()
        }
    }
}

struct CardExamples: View {
    var body: some View {
        ScrollView {
            VStack(spacing: .Spacing.lg) {
                Text("Card Examples")
                    .font(.App.title)
                
                VStack(spacing: .Spacing.md) {
                    CardView {
                        VStack(alignment: .leading, spacing: 12) {
                            Text("Simple Card")
                                .font(.App.headline)
                            Text("This is a basic card with content.")
                                .font(.App.body)
                                .foregroundColor(.Text.secondary)
                        }
                    }
                    .frame(width: 400)
                }
            }
            .paddingXL()
        }
    }
}

struct AlertExamples: View {
    var body: some View {
        ScrollView {
            VStack(spacing: .Spacing.lg) {
                Text("Alert Examples")
                    .font(.App.title)
                
                VStack(spacing: .Spacing.md) {
                    AlertBanner(type: .success, message: "Success message!")
                    AlertBanner(type: .error, message: "Error occurred.")
                    AlertBanner(type: .warning, message: "Warning message.")
                    AlertBanner(type: .info, message: "Info message.")
                }
                .frame(width: 500)
            }
            .paddingXL()
        }
    }
}

struct LoadingExamples: View {
    var body: some View {
        VStack {
            LoadingView(message: "Loading data...")
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
}

struct EmptyStateExamples: View {
    var body: some View {
        VStack {
            EmptyStateView(
                icon: "tray",
                title: "No Items",
                message: "You haven't added any items yet.",
                actionTitle: "Add Item",
                action: {}
            )
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
}

// MARK: - Profile View

struct ProfileView: View {
    var body: some View {
        ScrollView {
            VStack(spacing: .Spacing.xl) {
                ProfileHeaderView(
                    name: "John Doe",
                    subtitle: "macOS Developer"
                )
                .frame(maxWidth: 500)
                .cardStyle()
                
                // Stats
                HStack(spacing: .Spacing.xl) {
                    StatView(number: "42", label: "Projects")
                    StatView(number: "1.2K", label: "Followers")
                    StatView(number: "384", label: "Following")
                }
                .frame(maxWidth: 500)
                .paddingLG()
                .cardStyle()
            }
            .paddingXL()
            .frame(maxWidth: .infinity)
        }
    }
}

struct StatView: View {
    let number: String
    let label: String
    
    var body: some View {
        VStack(spacing: 8) {
            Text(number)
                .font(.system(size: 32, weight: .bold))
            Text(label)
                .font(.App.subheadline)
                .foregroundColor(.Text.secondary)
        }
    }
}

#Preview {
    ContentView()
        .frame(width: 1000, height: 700)
}