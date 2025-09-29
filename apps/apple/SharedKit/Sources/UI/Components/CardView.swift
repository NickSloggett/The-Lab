import SwiftUI

/// A beautifully styled card container
public struct CardView<Content: View>: View {
    let content: Content
    var padding: CGFloat = .Spacing.md
    var cornerRadius: CGFloat = .Radius.md
    
    public init(
        padding: CGFloat = .Spacing.md,
        cornerRadius: CGFloat = .Radius.md,
        @ViewBuilder content: () -> Content
    ) {
        self.padding = padding
        self.cornerRadius = cornerRadius
        self.content = content()
    }
    
    public var body: some View {
        content
            .padding(padding)
            .background(Color.Surface.card)
            .cornerRadius(cornerRadius)
            .shadowMd()
    }
}

#Preview {
    VStack(spacing: 20) {
        CardView {
            VStack(alignment: .leading, spacing: 12) {
                Text("Card Title")
                    .font(.App.headline)
                Text("This is a card with some content inside it.")
                    .font(.App.body)
                    .foregroundColor(.Text.secondary)
            }
        }
        
        CardView {
            HStack {
                Image(systemName: "star.fill")
                    .foregroundColor(.yellow)
                Text("Featured Item")
                    .font(.App.headline)
                Spacer()
                Image(systemName: "chevron.right")
                    .foregroundColor(.Text.tertiary)
            }
        }
    }
    .padding()
    .background(Color.Surface.background)
}
