import SwiftUI

public struct OptionsChainPlaceholder: View {
    public init() {}
    public var body: some View {
        VStack(alignment: .leading) {
            Text("Options Chain").font(.headline)
            Text("Greeks, IV, strategy builder coming next...")
        }
        .padding()
    }
}
