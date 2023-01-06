export type IArticle = {
  articleId: React.Key;
  articleCover: string;
  articleTitle: string;
  articleContent:string;
  category: number;
  viewCount: number;
  isTop: number;
  tagList:[]
}
