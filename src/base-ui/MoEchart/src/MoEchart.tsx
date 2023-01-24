import * as echarts from "echarts"
import React, { useEffect, useRef } from "react"
import { initEchart } from "@/base-ui/MoEchart"

type IProps = {
  option: echarts.EChartsOption
  width?: string
  height?: string
}
const MoEchart: React.FC<IProps> = ({
  option,
  width = "100%",
  height = "300px"
}) => {
  const echartRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const { setOptions, updateSize, destoryEchart } = initEchart(
      echartRef.current as HTMLDivElement
    )
    setOptions(option)
    window.addEventListener("resize", updateSize)
    return () => {
      window.removeEventListener("resize", updateSize)
      destoryEchart()
    }
  }, [option])
  return <div ref={echartRef} style={{ width, height }} />
}

export default MoEchart
