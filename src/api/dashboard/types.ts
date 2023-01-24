export interface IGetChartDataApi {
  articleData: { viewCount: number; articleTitle: string }[]
  tagData: { tagId: number; count: number; tag: { tagName: string } }[]
  categoryData: {
    categoryId: number
    count: number
    category: { categoryName: string }
  }[]
}
