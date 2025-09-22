import Foundation

public actor SequencedReducer<State, Event> {
    private var state: State
    private var lastSequence: UInt64 = 0

    public init(initial: State) {
        state = initial
    }

    public func reduce(sequence: UInt64, _ apply: (inout State) -> Void) {
        guard sequence > lastSequence else { return }
        lastSequence = sequence
        apply(&state)
    }

    public func getState() -> State { state }
}
