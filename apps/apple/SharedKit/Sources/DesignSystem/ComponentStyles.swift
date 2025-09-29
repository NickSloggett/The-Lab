import SwiftUI

// MARK: - Card Modifier
public struct CardModifier: ViewModifier {
    public init() {}
    
    public func body(content: Content) -> some View {
        content
            .paddingMD()
            .background(Color.Surface.card)
            .cornerRadius(.Radius.md)
            .shadowMd()
    }
}

public extension View {
    /// Apply card styling to any view
    func cardStyle() -> some View {
        modifier(CardModifier())
    }
}

// MARK: - Button Styles

/// Primary button style with brand color
public struct PrimaryButtonStyle: ButtonStyle {
    public init() {}
    
    public func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .fontWeight(.semibold)
            .foregroundColor(.white)
            .frame(maxWidth: .infinity)
            .paddingMD()
            .background(Color.Brand.primaryFallback)
            .cornerRadius(.Radius.md)
            .scaleEffect(configuration.isPressed ? 0.95 : 1.0)
            .animation(.easeInOut(duration: 0.2), value: configuration.isPressed)
    }
}

/// Secondary button style with transparent background
public struct SecondaryButtonStyle: ButtonStyle {
    public init() {}
    
    public func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .fontWeight(.semibold)
            .foregroundColor(.Brand.primaryFallback)
            .frame(maxWidth: .infinity)
            .paddingMD()
            .background(Color.Brand.primaryFallback.opacity(0.1))
            .cornerRadius(.Radius.md)
            .scaleEffect(configuration.isPressed ? 0.95 : 1.0)
            .animation(.easeInOut(duration: 0.2), value: configuration.isPressed)
    }
}

/// Outlined button style
public struct OutlinedButtonStyle: ButtonStyle {
    public init() {}
    
    public func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .fontWeight(.semibold)
            .foregroundColor(.Brand.primaryFallback)
            .frame(maxWidth: .infinity)
            .paddingMD()
            .background(Color.clear)
            .overlay(
                RoundedRectangle(cornerRadius: .Radius.md)
                    .stroke(Color.Brand.primaryFallback, lineWidth: 2)
            )
            .scaleEffect(configuration.isPressed ? 0.95 : 1.0)
            .animation(.easeInOut(duration: 0.2), value: configuration.isPressed)
    }
}

// MARK: - Text Field Styles

public struct RoundedTextFieldStyle: TextFieldStyle {
    public init() {}
    
    public func _body(configuration: TextField<Self._Label>) -> some View {
        configuration
            .paddingMD()
            .background(Color.Surface.card)
            .cornerRadius(.Radius.md)
            .overlay(
                RoundedRectangle(cornerRadius: .Radius.md)
                    .stroke(Color.Text.tertiary.opacity(0.3), lineWidth: 1)
            )
    }
}

// MARK: - List Row Modifier

public struct ListRowModifier: ViewModifier {
    public init() {}
    
    public func body(content: Content) -> some View {
        content
            .padding(.vertical, .Spacing.sm)
            .listRowBackground(Color.Surface.card)
    }
}

public extension View {
    func styledListRow() -> some View {
        modifier(ListRowModifier())
    }
}

