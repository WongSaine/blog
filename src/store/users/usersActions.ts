import { createAsyncThunk } from '@reduxjs/toolkit'

import { BlogAPI, prepareFetchError } from '../../services'

export const createNewUser = createAsyncThunk(
  'user/createUser',
  async (
    user: {
      email: string
      username: string
      password: string
    },
    thunkAPI
  ) => {
    return await BlogAPI.createNewUser(user)
      .then((r) => r.data.user)
      .catch((e) => {
        return thunkAPI.rejectWithValue(prepareFetchError(e))
      })
  }
)

export const loginUser = createAsyncThunk(
  'user/login',
  async (
    userData: {
      email: string
      password: string
    },
    thunkAPI
  ) => {
    return await BlogAPI.loginUser(userData)
      .then((r) => r.data.user)
      .catch((e) => {
        return thunkAPI.rejectWithValue(prepareFetchError(e))
      })
  }
)

export const updateUser = createAsyncThunk(
  'user/update',
  async (
    userData: {
      email: string
      username: string
      password?: string
      image?: string
    },
    thunkAPI
  ) => {
    const data = Object.keys(userData).reduce((acc, key) => {
      if (userData[key as keyof typeof userData]?.trim().length) {
        acc = {
          ...acc,
          [key]: userData[key as keyof typeof userData]?.trim(),
        }
      }
      return acc
    }, {})

    return await BlogAPI.updateUser(data as typeof userData)
      .then((r) => r.data.user)
      .catch((e) => thunkAPI.rejectWithValue(prepareFetchError(e)))
  }
)
