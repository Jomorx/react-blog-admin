import { getArticleListApi } from "@/api/article/ArticleApi"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from ".."
import { IArticleState } from "./types"

const initialState: IArticleState = {
  articleList: {
    count:0,
    rows:[]
  }
}
const articleStore = createSlice({
  name: "articleStore",
  initialState,
  reducers: {
    changeArticleListAction(state, { payload }) {
      state.articleList.count = payload.count
      state.articleList.rows =state.articleList.rows.concat(payload.rows)
    }
  }
})
/**
 * 获取所有文章列表
 * @param payload [currentPage,pageSize,searchText]
 */
export const getArticleList = createAsyncThunk<
  void,
  [number, number, string],
  { state: RootState }
>("article/fetchArticle", async (payload, { dispatch }) => {
  const res = await getArticleListApi(...payload)
  dispatch(changeArticleListAction(res.data))
})
export default articleStore.reducer
export const { changeArticleListAction } = articleStore.actions
