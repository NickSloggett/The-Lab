import SwiftUI

/// Alert banner types
public enum AlertType {
    case success, error, warning, info
    
    var color: Color {
        switch self {
        case .success: return .UI.success
        case .error: return .UI.error
        case .warning: return .UI.warning
        case .info: return .UI.info
        }
    }
    
    var icon: String {
        switch self {
        case .success: return "checkmark.circle.fill"
        case .error: return "xmark.circle.fill"
        case .warning: return "exclamationmark.triangle.fill"
        case .info: return "info.circle.fill"
        }
    }
}

/// A beautiful alert banner for displaying messages
public struct AlertBanner: View {
    let type: AlertType
    let message: String
    var onDismiss: (() -> Void)?
    
    public init(
        type: AlertType,
        message: String,
        onDismiss: (() -> Void)? = nil
    ) {
        self.type = type
        self.message = message
        self.onDismiss = onDismiss
    }
    
    public var body: some View {
        HStack(spacing: .Spacing.sm) {
            Image(systemName: type.icon)
                .font(.title3)
            
            Text(message)
                .font(.App.body)
                .lineLimit(3)
            
            Spacer()
            
            if let onDismiss = onDismiss {
                Button(action: onDismiss) {
                    Image(systemName: "xmark")
                        .font(.caption)
                        .fontWeight(.bold)
                }
            }
        }
        .foregroundColor(.white)
        .paddingMD()
        .background(type.color)
        .cornerRadius(.Radius.md)
        .shadowMd()
    }
}

#Preview("Success") {
    VStack(spacing: 16) {
        AlertBanner(type: .success, message: "Changes saved successfully!")
        AlertBanner(type: .error, message: "Failed to save changes. Please try again.")
        AlertBanner(type: .warning, message: "Your session will expire in 5 minutes.")
        AlertBanner(type: .info, message: "New features are available. Check them out!")
    }
    .padding()
}

#Preview("With Dismiss") {
    AlertBanner(
        type: .success,
        message: "Task completed successfully!",
        onDismiss: { print("Dismissed") }
    )
    .padding()
}
