@testable import SharedKit
import XCTest

final class StringExtensionsTests: XCTestCase {
    func testIsValidEmail() {
        // Valid emails
        XCTAssertTrue("test@example.com".isValidEmail)
        XCTAssertTrue("user.name@example.co.uk".isValidEmail)
        XCTAssertTrue("user+tag@example.com".isValidEmail)
        
        // Invalid emails
        XCTAssertFalse("invalid".isValidEmail)
        XCTAssertFalse("@example.com".isValidEmail)
        XCTAssertFalse("user@".isValidEmail)
        XCTAssertFalse("".isValidEmail)
    }
    
    func testTrimmed() {
        XCTAssertEqual("  hello  ".trimmed, "hello")
        XCTAssertEqual("\n\tworld\n".trimmed, "world")
        XCTAssertEqual("no-spaces".trimmed, "no-spaces")
        XCTAssertEqual("   ".trimmed, "")
    }
    
    func testIsBlank() {
        XCTAssertTrue("".isBlank)
        XCTAssertTrue("   ".isBlank)
        XCTAssertTrue("\n\t".isBlank)
        XCTAssertFalse("hello".isBlank)
        XCTAssertFalse("  hello  ".isBlank)
    }
    
    func testTruncated() {
        let longString = "This is a very long string"
        
        XCTAssertEqual(longString.truncated(to: 10), "This is a ...")
        XCTAssertEqual(longString.truncated(to: 100), longString)
        XCTAssertEqual(longString.truncated(to: 10, trailing: "…"), "This is a …")
    }
    
    func testCapitalizedFirst() {
        XCTAssertEqual("hello".capitalizedFirst, "Hello")
        XCTAssertEqual("HELLO".capitalizedFirst, "HELLO")
        XCTAssertEqual("".capitalizedFirst, "")
        XCTAssertEqual("h".capitalizedFirst, "H")
    }
    
    func testToURL() {
        XCTAssertNotNil("https://example.com".toURL)
        XCTAssertNotNil("http://example.com/path?query=value".toURL)
        XCTAssertNil("not a url".toURL)
        XCTAssertNil("".toURL)
    }
    
    func testURLEncoded() {
        XCTAssertEqual("hello world".urlEncoded, "hello%20world")
        XCTAssertEqual("test@example.com".urlEncoded, "test@example.com")
        XCTAssertEqual("a+b=c".urlEncoded, "a+b=c")
    }
}

final class DateExtensionsTests: XCTestCase {
    func testIsToday() {
        let today = Date()
        XCTAssertTrue(today.isToday)
        
        let yesterday = Calendar.current.date(byAdding: .day, value: -1, to: Date())!
        XCTAssertFalse(yesterday.isToday)
    }
    
    func testIsYesterday() {
        let yesterday = Calendar.current.date(byAdding: .day, value: -1, to: Date())!
        XCTAssertTrue(yesterday.isYesterday)
        
        let today = Date()
        XCTAssertFalse(today.isYesterday)
    }
    
    func testStartOfDay() {
        let date = Date()
        let startOfDay = date.startOfDay
        
        let components = Calendar.current.dateComponents([.hour, .minute, .second], from: startOfDay)
        XCTAssertEqual(components.hour, 0)
        XCTAssertEqual(components.minute, 0)
        XCTAssertEqual(components.second, 0)
    }
    
    func testEndOfDay() {
        let date = Date()
        let endOfDay = date.endOfDay
        
        let components = Calendar.current.dateComponents([.hour, .minute, .second], from: endOfDay)
        XCTAssertEqual(components.hour, 23)
        XCTAssertEqual(components.minute, 59)
        XCTAssertEqual(components.second, 59)
    }
    
    func testFormatting() {
        let date = Date()
        
        // Just test that formatting doesn't crash and returns non-empty strings
        XCTAssertFalse(date.timeAgo.isEmpty)
        XCTAssertFalse(date.shortTimeAgo.isEmpty)
        XCTAssertFalse(date.longFormat.isEmpty)
        XCTAssertFalse(date.mediumFormat.isEmpty)
        XCTAssertFalse(date.shortFormat.isEmpty)
        XCTAssertFalse(date.mediumWithTime.isEmpty)
    }
}

// Performance tests
final class PerformanceTests: XCTestCase {
    func testStringValidationPerformance() {
        let emails = (0..<1000).map { "user\($0)@example.com" }
        
        measure {
            for email in emails {
                _ = email.isValidEmail
            }
        }
    }
    
    func testDateFormattingPerformance() {
        let dates = (0..<100).map { _ in Date() }
        
        measure {
            for date in dates {
                _ = date.timeAgo
                _ = date.shortFormat
            }
        }
    }
}
