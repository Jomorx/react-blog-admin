import React, { useMemo } from "react"
import { MoEchart } from "@/base-ui/MoEchart"
import { IEchartData } from "../types"
import { EChartsOption } from "echarts"

const MoPieChart: React.FC<{ data: IEchartData[]; name: string }> = ({
  data,
  name
}) => {
  const option: EChartsOption = useMemo(() => {
    return {
      tooltip: {
        trigger: "item"
      },
      legend: {
        orient: "horizontal",
        left: "left"
      },
      series: [
        {
          name,
          type: "pie",
          radius: "50%",
          data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    }
  }, [data, name])
  return <MoEchart option={option} />
}

export default MoPieChart
