import SwiftUI

// MARK: - Shadow Modifiers
public extension View {
    /// Small shadow for subtle elevation
    func shadowSm() -> some View {
        self.shadow(color: .black.opacity(0.05), radius: 2, x: 0, y: 1)
    }
    
    /// Medium shadow for cards
    func shadowMd() -> some View {
        self.shadow(color: .black.opacity(0.08), radius: 8, x: 0, y: 4)
    }
    
    /// Large shadow for modals
    func shadowLg() -> some View {
        self.shadow(color: .black.opacity(0.12), radius: 16, x: 0, y: 8)
    }
    
    /// Extra large shadow for floating elements
    func shadowXl() -> some View {
        self.shadow(color: .black.opacity(0.16), radius: 24, x: 0, y: 12)
    }
    
    /// Custom shadow
    func shadow(
        color: Color = .black.opacity(0.1),
        radius: CGFloat = 5,
        x: CGFloat = 0,
        y: CGFloat = 2
    ) -> some View {
        self.shadow(color: color, radius: radius, x: x, y: y)
    }
}
