import { IArticle } from "@/api/article"
import { DataType } from "@/api/types"
export type IArticleState = {
  articleList: DataType<IArticle>
}
