import { IArticle } from "@/api/article"
import { getArticleListApi } from "@/api/article/ArticleApi"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from ".."
export type articleState = {
  articleList: IArticle[]
}
const initialState: articleState = {
  articleList: []
}
export const getArticleList = createAsyncThunk<
  void,
  [number, number, string],
  { state: RootState }
>("", async (payload, { dispatch, getState }) => {
  const res = await getArticleListApi(...payload)
  dispatch(changeArticleList(res.data.rows))
})

const menuSlice = createSlice({
  name: "menuStore",
  initialState,
  reducers: {
    changeArticleList(state, { payload }) {
      console.log(payload)
      state.articleList = payload
    }
  }
})

export default menuSlice.reducer
export const { changeArticleList } = menuSlice.actions
