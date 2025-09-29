import SwiftUI

// MARK: - Typography System
public extension Font {
    struct App {
        // Display
        public static let largeTitle = Font.system(.largeTitle, design: .default, weight: .bold)
        
        // Headlines
        public static let title = Font.system(.title, design: .default, weight: .semibold)
        public static let title2 = Font.system(.title2, design: .default, weight: .semibold)
        public static let title3 = Font.system(.title3, design: .default, weight: .semibold)
        
        // Body
        public static let headline = Font.system(.headline, design: .default, weight: .semibold)
        public static let body = Font.system(.body, design: .default, weight: .regular)
        public static let callout = Font.system(.callout, design: .default, weight: .regular)
        
        // Supporting
        public static let subheadline = Font.system(.subheadline, design: .default, weight: .regular)
        public static let footnote = Font.system(.footnote, design: .default, weight: .regular)
        public static let caption = Font.system(.caption, design: .default, weight: .regular)
        public static let caption2 = Font.system(.caption2, design: .default, weight: .regular)
        
        // Custom weights
        public static func title(weight: Font.Weight) -> Font {
            Font.system(.title, design: .default, weight: weight)
        }
        
        public static func body(weight: Font.Weight) -> Font {
            Font.system(.body, design: .default, weight: weight)
        }
        
        // Custom designs
        public static let bodyRounded = Font.system(.body, design: .rounded)
        public static let bodySerif = Font.system(.body, design: .serif)
        public static let bodyMonospaced = Font.system(.body, design: .monospaced)
    }
}

// MARK: - Text Styles
public struct TextStyles {
    /// Primary body text style
    public static func primary(_ text: String) -> Text {
        Text(text)
            .font(.App.body)
            .foregroundColor(.Text.primary)
    }
    
    /// Secondary helper text style
    public static func secondary(_ text: String) -> Text {
        Text(text)
            .font(.App.subheadline)
            .foregroundColor(.Text.secondary)
    }
    
    /// Tertiary caption text style
    public static func tertiary(_ text: String) -> Text {
        Text(text)
            .font(.App.caption)
            .foregroundColor(.Text.tertiary)
    }
    
    /// Headline style
    public static func headline(_ text: String) -> Text {
        Text(text)
            .font(.App.headline)
            .foregroundColor(.Text.primary)
    }
    
    /// Title style
    public static func title(_ text: String) -> Text {
        Text(text)
            .font(.App.title)
            .foregroundColor(.Text.primary)
    }
}
