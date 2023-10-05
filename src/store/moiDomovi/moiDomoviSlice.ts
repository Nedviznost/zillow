/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { castDraft } from 'immer'
import { GetMyHomesQuery } from 'src/generated/graphql'
import { UseQueryResponse } from 'urql'

import { RootState } from '..'

export type MoiDomoviSliceType = {
  moiDomovi: UseQueryResponse<GetMyHomesQuery, object>[0]
}

export const initialState: MoiDomoviSliceType = {
  moiDomovi: {
    stale: false,
    fetching: false,
  },
}

const moiDomovi = createSlice({
  name: 'myHomes',
  initialState,
  reducers: {
    setMoiDomovi: (
      state,
      action: PayloadAction<MoiDomoviSliceType['moiDomovi']>
    ) => {
      state.moiDomovi = castDraft(action.payload)
    },
  },
})

export const { setMoiDomovi } = moiDomovi.actions

export const selectMoiDomovi = (state: RootState) => state.moiDomovi.moiDomovi

export default moiDomovi.reducer
