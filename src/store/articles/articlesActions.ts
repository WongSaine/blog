import { createAsyncThunk } from '@reduxjs/toolkit'

import { RootState } from '../index.ts'
import { BlogAPI, prepareFetchError } from '../../services'
import { IArticle } from '../../models/IArticle.ts'

import { articleSlice } from './articleSlice.ts'

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async (_, thunkAPI) => {
  try {
    const limit = (thunkAPI.getState() as RootState).articleReducer.perPage
    const tag = (thunkAPI.getState() as RootState).articleReducer.tag
    const offsetLimit = limit * ((thunkAPI.getState() as RootState).articleReducer.page - 1)
    const result = await BlogAPI.fetchArticles(limit, offsetLimit, tag)
    return result.data
  } catch (e:any) {
    return thunkAPI.rejectWithValue(prepareFetchError(e))
  }
})

export const fetchArticleBySlug = createAsyncThunk('articles/fetchArticleBySlug', async (slug: string, thunkAPI) => {
  try {
    thunkAPI.dispatch(articleSlice.actions.clearArticlePage())
    const result = await BlogAPI.fetchArticleBySlug(slug)
    return result.data.article
  } catch (e:any) {
    return thunkAPI.rejectWithValue(prepareFetchError(e))
  }
})

export const createArticle = createAsyncThunk(
  'articles/createArticle',
  async (
    article: {
      title: string
      description: string
      body: string
      tagList: { value: string }[]
    },
    thunkAPI
  ) => {
    try {
      const data = {
        ...article,
        tagList: article.tagList
          .map((tag) => {
            return tag.value
          })
          .filter((tag) => tag),
      }
      const result = await BlogAPI.createArticle(data)
      return result.data.article as IArticle
    } catch (e:any) {
      return thunkAPI.rejectWithValue(prepareFetchError(e))
    }
  }
)

export const updateArticle = createAsyncThunk(
  'articles/updateArticle',
  async (
    fetchData: {
      article: {
        title: string
        description: string
        body: string
        tagList: { value: string }[]
      }
      slug: string
    },
    thunkAPI
  ) => {
    try {
      const data = {
        ...fetchData.article,
        tagList: fetchData.article.tagList
          .map((tag) => {
            return tag.value
          })
          .filter((tag) => tag),
      }
      const result = await BlogAPI.updateArticle(data, fetchData.slug)
      return result.data.article as IArticle
    } catch (e:any) {
      return thunkAPI.rejectWithValue(prepareFetchError(e))
    }
  }
)
export const deleteArticle = createAsyncThunk('articles/delete', async (slug: string, thunkAPI) => {
  try {
    const result = await BlogAPI.deleteArticle(slug)
    return result.data.article as IArticle
  } catch (e:any) {
    return thunkAPI.rejectWithValue(prepareFetchError(e))
  }
})

export const likeArticle = createAsyncThunk('articles/like', async (slug: string, thunkAPI) => {
  try {
    const result = await BlogAPI.likeArticle(slug)
    return result.data.article as IArticle
  } catch (e:any) {
    return thunkAPI.rejectWithValue(prepareFetchError(e))
  }
})

export const unlikeArticle = createAsyncThunk('articles/unlike', async (slug: string, thunkAPI) => {
  try {
    const result = await BlogAPI.unLikeArticle(slug)
    return result.data.article as IArticle
  } catch (e:any) {
    return thunkAPI.rejectWithValue(prepareFetchError(e))
  }
})
