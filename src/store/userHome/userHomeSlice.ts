/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { castDraft } from 'immer'
import { GetWishlistedHomesQuery } from 'src/generated/graphql'
import { UseQueryResponse } from 'urql'

import { RootState } from '..'

export type UserHomeSliceType = {
  wishlisted: UseQueryResponse<GetWishlistedHomesQuery, object>[0]
}

export const initialState: UserHomeSliceType = {
  wishlisted: {
    stale: false,
    fetching: false,
  },
}

const userHomeSlice = createSlice({
  name: 'userHome',
  initialState,
  reducers: {
    setWishlistedHomes: (
      state,
      action: PayloadAction<UserHomeSliceType['wishlisted']>
    ) => {
      state.wishlisted = castDraft(action.payload)
    },
    setDeletedHomes: (state, action) => {
      const hid = action.payload.hId
      const data = state.wishlisted.data?.wishlisted.filter(
        (item) => item.hId !== hid
      )
      state.wishlisted = {
        data: {
          wishlisted: data,
        },
      } as any
    },
  },
})

export const { setWishlistedHomes } = userHomeSlice.actions
export const { setDeletedHomes } = userHomeSlice.actions

export const selectWishlistedHomes = (state: RootState) =>
  state.userHome.wishlisted

export default userHomeSlice.reducer
