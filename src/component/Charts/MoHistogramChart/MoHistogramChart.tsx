import { MoEchart } from "@/base-ui/MoEchart"
import { EChartsOption } from "echarts"
import React, { useMemo } from "react"
import { IMoHistogramChart } from "./types"

const MoHistogramChart: React.FC<IMoHistogramChart> = ({ xAxis, data }) => {
  const option: EChartsOption = useMemo(
    () => ({
      xAxis,
      yAxis: {
        type: "value"
      },
      series: [{ data, type: "bar" }]
    }),
    [data, xAxis]
  )
  return <MoEchart option={option} />
}

export default MoHistogramChart
