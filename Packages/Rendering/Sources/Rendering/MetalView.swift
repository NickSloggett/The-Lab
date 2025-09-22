import MetalKit
import SwiftUI

public struct MetalView: View {
    public init() {}
    public var body: some View { MTKViewRepresentable() }
}

public struct MTKViewRepresentable: NSViewRepresentable {
    public init() {}
    public func makeNSView(context: Context) -> MTKView {
        let view = MTKView()
        view.device = MTLCreateSystemDefaultDevice()
        view.colorPixelFormat = .bgra8Unorm
        return view
    }

    public func updateNSView(_ nsView: MTKView, context: Context) {}
}
