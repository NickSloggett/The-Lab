import SwiftUI

/// A reusable empty state view with icon, title, message, and optional action
public struct EmptyStateView: View {
    let icon: String
    let title: String
    let message: String
    var actionTitle: String?
    var action: (() -> Void)?
    
    public init(
        icon: String,
        title: String,
        message: String,
        actionTitle: String? = nil,
        action: (() -> Void)? = nil
    ) {
        self.icon = icon
        self.title = title
        self.message = message
        self.actionTitle = actionTitle
        self.action = action
    }
    
    public var body: some View {
        VStack(spacing: .Spacing.lg) {
            Image(systemName: icon)
                .font(.system(size: .IconSize.xxl))
                .foregroundColor(.Text.tertiary)
            
            VStack(spacing: .Spacing.sm) {
                Text(title)
                    .font(.App.title2)
                    .foregroundColor(.Text.primary)
                
                Text(message)
                    .font(.App.body)
                    .foregroundColor(.Text.secondary)
                    .multilineTextAlignment(.center)
            }
            
            if let actionTitle = actionTitle, let action = action {
                Button(action: action) {
                    Text(actionTitle)
                }
                .buttonStyle(PrimaryButtonStyle())
                .padding(.horizontal, .Spacing.xl)
            }
        }
        .paddingXL()
    }
}

#Preview {
    EmptyStateView(
        icon: "tray",
        title: "No Items",
        message: "You haven't added any items yet. Tap the button below to get started.",
        actionTitle: "Add Item",
        action: { print("Add tapped") }
    )
}

#Preview("No Action") {
    EmptyStateView(
        icon: "wifi.slash",
        title: "No Connection",
        message: "Please check your internet connection and try again."
    )
}
