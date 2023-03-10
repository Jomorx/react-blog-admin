import { MoPieChart } from "../MoPieChart"
import { IChartConfig } from "../types"
import React from "react"
import { MoRoseChart } from "../MoRoseChart"
import { MoHistogramChart } from "../MoHistogramChart"
export const switchChartToRender = (item: IChartConfig) => {
  switch (item.type) {
    case "pie":
      return <MoPieChart data={item.data} name={item.name || ""} />
    case "rose":
      return <MoRoseChart data={item.data} name={item.name || ""} />
    case "bar":
      return <MoHistogramChart data={item.data} xAxis={item.xAxis!} />
  }
}
