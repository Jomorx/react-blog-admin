import { EChartsOption } from "echarts"

export const chartConfig: {
  title: string
  option: EChartsOption
}[] = [
  {
    title: "标签文章数量",
    option: {
      series: [
        {
          name: "articleTagCount",
          type: "pie",
          data: undefined,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ],
      tooltip: {}
    }
  },
  {
    title: "分类文章数量",
    option: {
      series: [
        {
          type: "pie",
          data: undefined,
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
          // label: {
          //   show: true,
          //   position: "center"
          // }
        }
      ],
      tooltip: {}
    }
  }
  // {
  //   title: "文章访问排行",
  //   option: { series: undefined }
  // }
]
