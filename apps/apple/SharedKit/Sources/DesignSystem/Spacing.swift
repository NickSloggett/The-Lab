import SwiftUI

// MARK: - Spacing System
public extension CGFloat {
    struct Spacing {
        public static let xxs: CGFloat = 4
        public static let xs: CGFloat = 8
        public static let sm: CGFloat = 12
        public static let md: CGFloat = 16
        public static let lg: CGFloat = 24
        public static let xl: CGFloat = 32
        public static let xxl: CGFloat = 48
        public static let xxxl: CGFloat = 64
    }
    
    struct Radius {
        public static let xs: CGFloat = 4
        public static let sm: CGFloat = 8
        public static let md: CGFloat = 12
        public static let lg: CGFloat = 16
        public static let xl: CGFloat = 24
        public static let pill: CGFloat = 999
    }
    
    struct IconSize {
        public static let xs: CGFloat = 16
        public static let sm: CGFloat = 20
        public static let md: CGFloat = 24
        public static let lg: CGFloat = 32
        public static let xl: CGFloat = 48
        public static let xxl: CGFloat = 64
    }
}

// MARK: - Spacing Extensions
public extension EdgeInsets {
    static let xxs = EdgeInsets(top: 4, leading: 4, bottom: 4, trailing: 4)
    static let xs = EdgeInsets(top: 8, leading: 8, bottom: 8, trailing: 8)
    static let sm = EdgeInsets(top: 12, leading: 12, bottom: 12, trailing: 12)
    static let md = EdgeInsets(top: 16, leading: 16, bottom: 16, trailing: 16)
    static let lg = EdgeInsets(top: 24, leading: 24, bottom: 24, trailing: 24)
    static let xl = EdgeInsets(top: 32, leading: 32, bottom: 32, trailing: 32)
}

// MARK: - Padding View Extensions
public extension View {
    /// Apply small padding (8pt)
    func paddingXS() -> some View {
        padding(.Spacing.xs)
    }
    
    /// Apply small padding (12pt)
    func paddingSM() -> some View {
        padding(.Spacing.sm)
    }
    
    /// Apply medium padding (16pt)
    func paddingMD() -> some View {
        padding(.Spacing.md)
    }
    
    /// Apply large padding (24pt)
    func paddingLG() -> some View {
        padding(.Spacing.lg)
    }
    
    /// Apply extra large padding (32pt)
    func paddingXL() -> some View {
        padding(.Spacing.xl)
    }
}

