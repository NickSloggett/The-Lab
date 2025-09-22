import Core
import Rendering
import SwiftUI

@main
struct TraderiOSApp: App {
    var body: some Scene {
        WindowGroup { ContentRoot() }
    }
}

struct ContentRoot: View {
    @State private var ladder = LadderState(
        instrument: .init(symbol: "ESM5", tickSize: 0.25, priceFormat: "%.2f"),
        midPrice: 5000,
        levels: stride(from: 5010.0, through: 4990.0, by: -0.25).map { PriceLevel(price: $0, bidQty: Double.random(in: 0 ... 50), askQty: Double.random(in: 0 ... 50)) }
    )
    var body: some View {
        TabView {
            ChartPlaceholder().tabItem { Label("Chart", systemImage: "chart.xyaxis.line") }
            LadderView(state: ladder) { _ in }.tabItem { Label("DOM", systemImage: "list.number") }
            OptionsChainPlaceholder().tabItem { Label("Options", systemImage: "tablecells") }
        }
    }
}
