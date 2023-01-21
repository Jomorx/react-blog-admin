import * as echarts from "echarts"
import { useCallback, useEffect } from "react"

export const initEchart = (el: HTMLDivElement) => {
  const echartInstance = echarts.init(el)

  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options)
  }

  const updateSize = () => {
    echartInstance.resize()
  }

  return {
    echartInstance,
    setOptions,
    updateSize
  }
}
