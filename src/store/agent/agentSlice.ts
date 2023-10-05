/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { castDraft } from 'immer'

import { RootState } from '..'

export type AgentSliceType = {
  [x: string]: any
}

export const initialState: AgentSliceType = {
  agents: {
    stale: false,
    fetching: false,
  },
}

const agentSlice = createSlice({
  name: 'Agent',
  initialState,
  reducers: {
    setAgents: (state, action: PayloadAction<AgentSliceType>) => {
      state.agent = castDraft(action.payload)
    },
  },
})

export const { setAgents } = agentSlice.actions

export const selectAgents = (state: RootState) => state.agents.agent

export default agentSlice.reducer
