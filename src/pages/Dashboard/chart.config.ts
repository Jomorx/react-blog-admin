import { IChartConfig } from "@/component/Charts"

export const chartConfig: IChartConfig[] = [
  {
    title: "标签文章数量",
    type: "pie",
    name: "articleTagCount",
    data: undefined
  },
  {
    title: "分类文章数量",
    type: "rose",
    name: "articleTagCount",
    data: undefined
  },
  {
    title: "文章访问排行",
    type: "bar",
    data: undefined,
    xAxis: {
      type: "category",
      data: undefined
    }
  }
]
