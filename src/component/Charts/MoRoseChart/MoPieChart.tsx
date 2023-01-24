import React, { useMemo } from "react"
import { MoEchart } from "@/base-ui/MoEchart"
import { IEchartData } from "../types"
import { EChartsOption } from "echarts"

const MoRoseChart: React.FC<{ data: IEchartData[]; name: string }> = ({
  data,
  name
}) => {
  const option: EChartsOption = useMemo(() => {
    return {
      // legend: {
      //   top: 'bottom'
      // },
      // toolbox: {
      //   show: true,
      //   feature: {
      //     mark: { show: true },
      //     dataView: { show: true, readOnly: false },
      //     restore: { show: true },
      //     saveAsImage: { show: true }
      //   }
      // },
      series: [
        {
          type: "pie",
          data,
          name,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            },
            label: {
              show: true,
              fontSize: 30,
              fontWeight: "bold"
            }
          },
          radius: ["40%", "70%"]
        }
      ]
    }
  }, [data, name])
  return <MoEchart option={option} />
}

export default MoRoseChart
