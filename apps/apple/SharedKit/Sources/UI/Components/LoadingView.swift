import SwiftUI

/// A reusable loading indicator with optional message
public struct LoadingView: View {
    let message: String
    
    public init(message: String = "Loading...") {
        self.message = message
    }
    
    public var body: some View {
        VStack(spacing: .Spacing.md) {
            ProgressView()
                .scaleEffect(1.5)
                .tint(.Brand.primaryFallback)
            
            Text(message)
                .font(.App.body)
                .foregroundColor(.Text.secondary)
        }
        .paddingXL()
        .background(Color.Surface.card)
        .cornerRadius(.Radius.md)
        .shadowLg()
    }
}

#Preview {
    LoadingView()
}

#Preview("Custom Message") {
    LoadingView(message: "Fetching data...")
}

