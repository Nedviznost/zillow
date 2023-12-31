import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { from } from 'rxjs'

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import userReducer from './user'
import mapReducer from './map/mapSlice'
import agentReducer from './agent/agentSlice'
import homeReducer from './home/homeSlice'
import utilReducer from './utils/utilsStore'
import userHomeReducer from './userHome/userHomeSlice'
import moiDomoviReducer from './moiDomovi/moiDomoviSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    agents: agentReducer,
    map: mapReducer,
    home: homeReducer,
    utils: utilReducer,
    userHome: userHomeReducer,
    moiDomovi: moiDomoviReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const composedEnhancers = composeWithDevTools()

export const store$ = from(store)
export type StoreObservableType = typeof store$

// Questions about synchronous Redux
// https://stackoverflow.com/questions/34570758/why-do-we-need-middleware-for-async-flow-in-redux
// https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout/35415559#35415559

// Urql debouncing
// https://github.com/FormidableLabs/urql/discussions/1547#discussioncomment-623426
