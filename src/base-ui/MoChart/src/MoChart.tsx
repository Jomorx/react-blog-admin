import * as echarts from "echarts"
import React, { useEffect, useRef } from "react"
import { initEchart } from "@/base-ui/MoChart"

type IProps = {
  options: echarts.EChartsOption
  width?: string
  height?: string
}
const MoChart: React.FC<IProps> = ({
  options,
  width = "100%",
  height = "300px"
}) => {
  const echartRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    // console.log(options.series[0].data);

    if (options.series[0].data !== undefined) {
      const { setOptions, updateSize } = initEchart(
        echartRef.current as HTMLDivElement
      )

      setOptions(options)
      window.addEventListener("resize", updateSize)
      return () => window.removeEventListener("resize", updateSize)
    }
  }, [options.series[0].data,options])
  return <div ref={echartRef} style={{ width, height }} />
}

export default MoChart
