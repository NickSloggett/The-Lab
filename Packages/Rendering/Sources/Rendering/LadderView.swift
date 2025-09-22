import Core
import SwiftUI

public struct LadderView: View {
    let state: LadderState
    let onPlace: (NewOrder) -> Void

    public init(state: LadderState, onPlace: @escaping (NewOrder) -> Void) {
        self.state = state; self.onPlace = onPlace
    }

    public var body: some View {
        List(state.levels.sorted { $0.price > $1.price }, id: \.self) { level in
            HStack {
                Text(String(format: state.instrument.priceFormat, level.price))
                    .frame(minWidth: 80, alignment: .trailing)
                Text("\(Int(level.bidQty))").foregroundColor(.green).frame(width: 50, alignment: .trailing)
                Text("\(Int(level.askQty))").foregroundColor(.red).frame(width: 50, alignment: .trailing)
                Spacer()
                Button("Buy") { onPlace(NewOrder(instrument: state.instrument, side: .buy, type: .limit, price: level.price, quantity: 1, tif: .gtc)) }
                Button("Sell") { onPlace(NewOrder(instrument: state.instrument, side: .sell, type: .limit, price: level.price, quantity: 1, tif: .gtc)) }
            }
        }
    }
}
