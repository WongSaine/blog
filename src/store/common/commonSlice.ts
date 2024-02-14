import { type AnyAction, type AsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { IErrors } from '../../models/IError.ts'

interface IState {
  isLoading: boolean
  errors: IErrors
  successMessages?: string[]
}

const initialState: IState = {
  isLoading: false,
  errors: { status: 0, errors: [] },
  successMessages: undefined,
}

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>
type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith('rejected')
}

function isFulfilledAction(action: AnyAction): action is FulfilledAction {
  return action.type.endsWith('fulfilled')
}

function isPendingAction(action: AnyAction): action is PendingAction {
  return action.type.endsWith('pending')
}

//TODO make success message
export const commonSlice = createSlice({
  initialState,
  name: 'common',
  reducers: {
    setErrors(state, action: PayloadAction<IErrors>) {
      state.errors = action.payload
    },
    setSuccess(state, action: PayloadAction<string>) {
      state.successMessages?.push(action.payload)
    },
    removeSuccessByIdx(state, action: PayloadAction<number>) {
      //@ts-ignore
      state.successMessages = state.successMessages?.filter((message, idx) => idx !== action.payload)
    },
    clearSuccess(state) {
      state.successMessages = undefined
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isRejectedAction, (state, action) => {
        state.isLoading = false
        state.errors = action.payload as IErrors
      })
      .addMatcher(isFulfilledAction, (state) => {
        state.isLoading = false
      })
      .addMatcher(isPendingAction, (state) => {
        state.errors = initialState.errors
        state.successMessages = initialState.successMessages
        state.isLoading = true
      })
  },
})

export const commonReducer = commonSlice.reducer
