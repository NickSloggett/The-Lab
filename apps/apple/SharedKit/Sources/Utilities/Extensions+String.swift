import Foundation

public extension String {
    /// Validates if the string is a valid email address
    var isValidEmail: Bool {
        let emailRegex = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}"
        let predicate = NSPredicate(format: "SELF MATCHES %@", emailRegex)
        return predicate.evaluate(with: self)
    }
    
    /// Removes whitespace and newlines from beginning and end
    var trimmed: String {
        trimmingCharacters(in: .whitespacesAndNewlines)
    }
    
    /// Returns true if string is empty or contains only whitespace
    var isBlank: Bool {
        trimmed.isEmpty
    }
    
    /// Truncates string to specified length with ellipsis
    func truncated(to length: Int, trailing: String = "...") -> String {
        guard count > length else { return self }
        return prefix(length) + trailing
    }
    
    /// Capitalizes first letter only
    var capitalizedFirst: String {
        guard !isEmpty else { return self }
        return prefix(1).uppercased() + dropFirst()
    }
}

// MARK: - Date Formatting
public extension String {
    /// Converts ISO8601 string to Date
    var toDate: Date? {
        let formatter = ISO8601DateFormatter()
        return formatter.date(from: self)
    }
}

// MARK: - URL Helpers
public extension String {
    /// Converts string to URL if valid
    var toURL: URL? {
        URL(string: self)
    }
    
    /// URL encodes the string
    var urlEncoded: String? {
        addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed)
    }
}

