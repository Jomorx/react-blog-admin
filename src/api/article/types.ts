export type IArticle = {
  articleId: number
  articleCover: string
  articleTitle: string
  articleContent: string
  category: number
  viewCount: number
  isTop: number
  tagList: { tagId: number; tagName: string }[]
}
