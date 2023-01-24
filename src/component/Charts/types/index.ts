import { IMoHistogramChart } from "../MoHistogramChart"

export type IEchartData = {
  name: string
  value: any
}
export type IChartConfig = {
  title: string
  type: "pie" | "rose" | "bar"
  name?: string
  data: any
  xAxis?: IMoHistogramChart["xAxis"]
}
