import * as echarts from "echarts"
import React, { useEffect, useRef } from "react"
import { initEchart } from "@/component/MoChart"

type IProps = {
  options?: echarts.EChartsOption
  width?: string
  height?: string
}
const MoChart: React.FC<IProps> = ({
  options,
  width = "100%",
  height = "400px"
}) => {
  const echartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const { setOptions, updateSize } = initEchart(echartRef.current!)
    if (options?.series !== undefined) {
      setOptions(options)
      window.addEventListener("resize", updateSize)
      console.log(123);

    }
    return () => window.removeEventListener("resize", updateSize)
  }, [options])
  return <div ref={echartRef} style={{ width, height }} />
}

export default MoChart
