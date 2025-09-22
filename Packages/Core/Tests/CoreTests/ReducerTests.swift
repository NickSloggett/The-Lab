@testable import Core
import XCTest

final class ReducerTests: XCTestCase {
    func testSequenceOrdering() async {
        let reducer = SequencedReducer<Int, Int>(initial: 0)
        await reducer.reduce(sequence: 2) { $0 = 2 }
        await reducer.reduce(sequence: 1) { $0 = 1 }
        let value = await reducer.getState()
        XCTAssertEqual(value, 2)
    }
}
