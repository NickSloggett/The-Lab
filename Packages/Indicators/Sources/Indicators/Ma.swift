import Accelerate
import Foundation

public enum MovingAverage {
    public static func simple(_ values: [Double], period: Int) -> [Double] {
        guard period > 0, values.count >= period else { return [] }
        var result = [Double](repeating: .nan, count: values.count)
        var sum: Double = 0
        for i in 0 ..< values.count {
            sum += values[i]
            if i >= period { sum -= values[i - period] }
            if i >= period - 1 { result[i] = sum / Double(period) }
        }
        return result
    }
}
