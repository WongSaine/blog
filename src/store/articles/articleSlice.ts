import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { IArticle } from '../../models/IArticle.ts'
import { IArticleResponse } from '../../models/IArticleResponse.ts'

import { fetchArticleBySlug, fetchArticles } from './articlesActions.ts'

export interface IArticlesStore {
  articles: IArticle[]
  page: number
  articlesCount: number
  perPage: number
  currentArticle?: IArticle
  tag?: string
}

const initialState: IArticlesStore = {
  articles: [],
  page: 1,
  articlesCount: 0,
  perPage: 5,
  currentArticle: undefined,
  tag: undefined,
}

export const articleSlice = createSlice({
  initialState,
  name: 'articles',
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = Math.max(action.payload, 1)
    },
    clearArticlePage(state) {
      state.currentArticle = undefined
    },
    setTag(state, action: PayloadAction<string>) {
      state.tag = state.tag === action.payload ? undefined : action.payload
      state.page = 1
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.fulfilled.type, (state, action: PayloadAction<IArticleResponse>) => {
        state.articles = action.payload.articles
        state.articlesCount = action.payload.articlesCount
      })
      .addCase(fetchArticleBySlug.fulfilled.type, (state, action: PayloadAction<IArticle>) => {
        state.currentArticle = action.payload
      })
  },
})

export const articleReducer = articleSlice.reducer
