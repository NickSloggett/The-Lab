import SwiftUI

// MARK: - Brand Colors
public extension Color {
    struct Brand {
        public static let primary = Color("BrandPrimary", bundle: .module)
        public static let secondary = Color("BrandSecondary", bundle: .module)
        public static let accent = Color("BrandAccent", bundle: .module)
        
        // Fallback colors if assets not defined
        public static let primaryFallback = Color(hex: "007AFF")
        public static let secondaryFallback = Color(hex: "5856D6")
        public static let accentFallback = Color(hex: "FF2D55")
    }
}

// MARK: - UI State Colors
public extension Color {
    struct UI {
        public static let success = Color(hex: "34C759")
        public static let error = Color(hex: "FF3B30")
        public static let warning = Color(hex: "FF9500")
        public static let info = Color(hex: "5AC8FA")
    }
}

// MARK: - Surface Colors
public extension Color {
    struct Surface {
        public static var background: Color {
            #if os(iOS)
            return Color(uiColor: .systemBackground)
            #elseif os(macOS)
            return Color(nsColor: .windowBackgroundColor)
            #else
            return Color.black
            #endif
        }
        
        public static var card: Color {
            #if os(iOS)
            return Color(uiColor: .secondarySystemBackground)
            #elseif os(macOS)
            return Color(nsColor: .controlBackgroundColor)
            #else
            return Color.gray.opacity(0.2)
            #endif
        }
        
        public static var elevated: Color {
            #if os(iOS)
            return Color(uiColor: .tertiarySystemBackground)
            #elseif os(macOS)
            return Color(nsColor: .underPageBackgroundColor)
            #else
            return Color.gray.opacity(0.3)
            #endif
        }
    }
}

// MARK: - Text Colors
public extension Color {
    struct Text {
        public static var primary: Color {
            #if os(iOS) || os(watchOS)
            return Color(uiColor: .label)
            #elseif os(macOS)
            return Color(nsColor: .labelColor)
            #endif
        }
        
        public static var secondary: Color {
            #if os(iOS) || os(watchOS)
            return Color(uiColor: .secondaryLabel)
            #elseif os(macOS)
            return Color(nsColor: .secondaryLabelColor)
            #endif
        }
        
        public static var tertiary: Color {
            #if os(iOS) || os(watchOS)
            return Color(uiColor: .tertiaryLabel)
            #elseif os(macOS)
            return Color(nsColor: .tertiaryLabelColor)
            #endif
        }
        
        public static let inverse = Color.white
    }
}

// MARK: - Gradients
public extension LinearGradient {
    static let brandPrimary = LinearGradient(
        colors: [Color(hex: "667EEA"), Color(hex: "764BA2")],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )
    
    static let sunset = LinearGradient(
        colors: [Color(hex: "FF512F"), Color(hex: "F09819")],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )
    
    static let ocean = LinearGradient(
        colors: [Color(hex: "2E3192"), Color(hex: "1BFFFF")],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
    )
    
    static let forest = LinearGradient(
        colors: [Color(hex: "134E5E"), Color(hex: "71B280")],
        startPoint: .top,
        endPoint: .bottom
    )
}

// MARK: - Color Hex Initializer
public extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (255, 0, 0, 0)
        }
        
        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue: Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
    
    init(light: Color, dark: Color) {
        #if os(iOS) || os(watchOS)
        self.init(uiColor: UIColor { traitCollection in
            traitCollection.userInterfaceStyle == .dark ? UIColor(dark) : UIColor(light)
        })
        #elseif os(macOS)
        self.init(nsColor: NSColor(name: nil) { appearance in
            appearance.name == .darkAqua ? NSColor(dark) : NSColor(light)
        })
        #endif
    }
}

