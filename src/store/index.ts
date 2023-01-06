import {configureStore} from '@reduxjs/toolkit'
import articleStore from './articleStore'
 const store =  configureStore({
    reducer:{
        articleStore
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
export default store  
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export {}