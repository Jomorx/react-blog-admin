import * as echarts from "echarts"

export const initEchart = (el: HTMLDivElement) => {
  const echartInstance = echarts.init(el)

  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options)
  }
  const updateSize = () => {
    echartInstance.resize()
  }
  const destoryEchart = ()=>echartInstance.dispose()
  return {
    echartInstance,
    setOptions,
    updateSize,
    destoryEchart
  }
}
