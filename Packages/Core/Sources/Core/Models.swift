import Foundation

public enum OrderSide: String, Codable, Sendable { case buy, sell }
public enum OrderType: String, Codable, Sendable { case limit, market, stop, stopLimit }
public enum TimeInForce: String, Codable, Sendable { case day, gtc, ioc, fok }

public struct Instrument: Codable, Sendable, Hashable {
    public var symbol: String
    public var tickSize: Double
    public var priceFormat: String
    public init(symbol: String, tickSize: Double, priceFormat: String = "%.2f") {
        self.symbol = symbol; self.tickSize = tickSize; self.priceFormat = priceFormat
    }
}

public struct NewOrder: Codable, Sendable {
    public var instrument: Instrument
    public var side: OrderSide
    public var type: OrderType
    public var price: Double?
    public var quantity: Double
    public var tif: TimeInForce
    public init(instrument: Instrument, side: OrderSide, type: OrderType, price: Double?, quantity: Double, tif: TimeInForce) {
        self.instrument = instrument; self.side = side; self.type = type; self.price = price; self.quantity = quantity; self.tif = tif
    }
}

public struct OrderAckModel: Codable, Sendable { public var clientOrderId: String; public var status: String }

public struct PriceLevel: Codable, Sendable, Hashable {
    public var price: Double
    public var bidQty: Double
    public var askQty: Double
    public init(price: Double, bidQty: Double, askQty: Double) { self.price = price; self.bidQty = bidQty; self.askQty = askQty }
}

public struct LadderState: Sendable {
    public var instrument: Instrument
    public var midPrice: Double
    public var levels: [PriceLevel]
    public init(instrument: Instrument, midPrice: Double, levels: [PriceLevel]) { self.instrument = instrument; self.midPrice = midPrice; self.levels = levels }
}
