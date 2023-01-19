import { getArticleListApi } from "@/api/article/ArticleApi"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from ".."
import { IConsoleState } from "./types"

const initialState: IConsoleState = {
  articleList: {
    count:0,
    rows:[]
  }
}
const consoleStore = createSlice({
  name: "articleStore",
  initialState,
  reducers: {

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
})
export default consoleStore.reducer
// export const {  } = consoleStore.actions
