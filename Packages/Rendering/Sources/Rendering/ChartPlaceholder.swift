import SwiftUI

public struct ChartPlaceholder: View {
    public init() {}
    public var body: some View {
        ZStack { Color.black.opacity(0.95) }.overlay(Text("Chart Area").foregroundColor(.white))
    }
}
