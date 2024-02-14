import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { IUser } from '../../models/IUser.ts'
import { loadFromStorage, setToStorage } from '../../services'
import { clearStorage } from '../../services/localStorageServicce.ts'

interface IUserStore {
  user?: IUser
}

const initialState: IUserStore = {
  user: loadFromStorage('user') ?? undefined,
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logOut(state) {
      state.user = undefined
      clearStorage('user')
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => {
        return action.type.startsWith('user') && action.type.endsWith('fulfilled')
      },
      (state, action: PayloadAction<IUser>) => {
        state.user = action.payload
        setToStorage('user', action.payload)
      }
    )
  },
})

export const userReducer = usersSlice.reducer
