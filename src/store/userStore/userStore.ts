import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IUserState } from "./types"

const initialState: IUserState = {
  userInfo: {
    nickname: "",
    account: ""
  }
}
const articleStore = createSlice({
  name: "articleStore",
  initialState,
  reducers: {
    initUserAction(state, { payload }: PayloadAction<IUserState["userInfo"]>) {
      state.userInfo = payload
    },
    removeUserAction(state) {
      state.userInfo = { nickname: "", account: "" }
    }
  }
})
/**
 * 获取所有文章列表
 * @param payload [currentPage,pageSize,searchText]
 */
// export const loginAction = createAsyncThunk<
//   void,
//   {
//     account: string
//     password: string
//   },
//   { state: IUserState }
// >("article/fetchArticle", async ({account,password}, { dispatch }) => {
//   const { data } = await LoginApi(account, password)
//   if (data.token) {
//     setToken(data.token)
//     navigate("/", { replace: true })
//   }
// })
export default articleStore.reducer
export const { initUserAction,removeUserAction } = articleStore.actions
