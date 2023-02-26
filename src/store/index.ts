import { configureStore } from "@reduxjs/toolkit"
import { articleStore } from "./articleStore"
import { userStore } from "./userStore"

const store = configureStore({
  reducer: {
    articleStore,
    userStore
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: true
    })
})
export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export {}
