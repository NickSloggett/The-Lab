import SwiftUI

/// A beautiful profile header component
public struct ProfileHeaderView: View {
    let name: String
    let subtitle: String
    let imageName: String
    
    public init(name: String, subtitle: String, imageName: String = "person.circle.fill") {
        self.name = name
        self.subtitle = subtitle
        self.imageName = imageName
    }
    
    public var body: some View {
        HStack(spacing: .Spacing.md) {
            // Profile image
            Image(systemName: imageName)
                .font(.system(size: .IconSize.xl))
                .foregroundColor(.Brand.primaryFallback)
                .frame(width: .IconSize.xxl, height: .IconSize.xxl)
                .background(Color.Brand.primaryFallback.opacity(0.1))
                .clipShape(Circle())
            
            // Info
            VStack(alignment: .leading, spacing: 4) {
                Text(name)
                    .font(.App.title3)
                    .foregroundColor(.Text.primary)
                
                Text(subtitle)
                    .font(.App.subheadline)
                    .foregroundColor(.Text.secondary)
            }
            
            Spacer()
        }
        .paddingMD()
    }
}

#Preview {
    VStack(spacing: 0) {
        ProfileHeaderView(
            name: "John Doe",
            subtitle: "iOS Developer"
        )
        .background(Color.Surface.card)
        
        ProfileHeaderView(
            name: "Jane Smith",
            subtitle: "UX Designer"
        )
        .background(Color.Surface.card)
    }
}

