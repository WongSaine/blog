import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { articleReducer } from './articles/articleSlice.ts'
import { commonReducer } from './common/commonSlice.ts'
import { userReducer } from './users/usersSlice.ts'

const rootReducer = combineReducers({
  articleReducer,
  commonReducer,
  userReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
