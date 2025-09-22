'use client'
import { createChart, ISeriesApi, CandlestickData, Time } from 'lightweight-charts'
import { useEffect, useRef } from 'react'

export function Chart() {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!ref.current) return
    const chart = createChart(ref.current, { layout: { background: { color: '#0a0a0a' }, textColor: '#e5e7eb' }, width: ref.current.clientWidth, height: 360 })
    const series: ISeriesApi<'Candlestick'> = chart.addCandlestickSeries()
    const start = Date.now() / 1000 - 60 * 60 * 24
    const data: CandlestickData<Time>[] = Array.from({ length: 120 }, (_, i) => {
      const t = Math.floor(start + i * 60)
      const o = 100 + Math.sin(i / 5) * 2
      const h = o + Math.random() * 2
      const l = o - Math.random() * 2
      const c = l + Math.random() * (h - l)
      return { time: t as Time, open: o, high: h, low: l, close: c }
    })
    series.setData(data)
    const onResize = () => chart.applyOptions({ width: ref.current!.clientWidth })
    window.addEventListener('resize', onResize)
    return () => { window.removeEventListener('resize', onResize); chart.remove() }
  }, [])

  return <div ref={ref} className="w-full rounded-lg border border-neutral-800" />
}


