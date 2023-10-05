/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import produce, { castDraft } from 'immer'
import { filterDefaultValues } from 'src/components/organisms/SearchHomesFilter/filterUtils'
import {
  GetHomeByIdQuery,
  SearchHomesByLocationQuery,
  InputMaybe,
  SearchHomesByLocationQueryVariables,
  Homes_Bool_Exp,
  SearchHomesByLocationDetailedQuery,
} from 'src/generated/graphql'
import { UseQueryArgs, UseQueryResponse } from 'urql'
import { RootState } from '..'
import { showHomes } from '../static'

export interface HomeSliceType {
  homesFilter?: Partial<typeof filterDefaultValues>
  homes: UseQueryResponse<SearchHomesByLocationQuery, object>[0]
  homesDetailed: UseQueryResponse<SearchHomesByLocationDetailedQuery, object>[0]
  homesActive: []
  hoverStates: {
    highlightedHomeId?: SearchHomesByLocationQuery['homes'][0]['id'] | null
    highlightedHome?: GetHomeByIdQuery['homes_by_pk'] | null
  }
}
export const initialState: HomeSliceType = {
  homesFilter: { status: 'se_prodava' },
  homes: {
    fetching: false,
    stale: false,
  },
  homesDetailed: {
    fetching: false,
    stale: false,
  },
  homesActive: [],
  hoverStates: {
    highlightedHomeId: null,
    highlightedHome: null,
  },
}

// Find this link to know how we avoided putting ts-ignore
// https://immerjs.github.io/immer/typescript/

const homeSlice = createSlice({
  name: 'Home',
  initialState,
  reducers: {
    setHomesFilter: (
      state,
      action: PayloadAction<HomeSliceType['homesFilter']>
    ) => {
      state.homesFilter = action.payload
    },
    setHomes: (state, action: PayloadAction<HomeSliceType['homes']>) => {
      state.homes = castDraft(action.payload)
    },
    setHomesDetailed: (
      state,
      action: PayloadAction<HomeSliceType['homesDetailed']>
    ) => {
      state.homesDetailed = castDraft(action.payload)
    },
    setHomesActive: (
      state,
      action: PayloadAction<HomeSliceType['homesActive']>
    ) => {
      state.homesActive = castDraft(action.payload)
    },
    setHighlightedHomeId: (
      state,
      action: PayloadAction<HomeSliceType['hoverStates']['highlightedHomeId']>
    ) => {
      state.hoverStates.highlightedHomeId = action.payload
    },
  },
})

export const {
  setHomesFilter,
  setHomes,
  setHomesDetailed,
  setHomesActive,
  setHighlightedHomeId,
} = homeSlice.actions

/** Selectors */
export const selectState = (state: RootState) => state
export const homesFilterActive = (state: RootState) => state.home.homesFilter
export const selectHomesMap = (state: RootState) => state.home.homes
export const selectHomesDetailed = (state: RootState) =>
  state.home.homesDetailed

export const selectHomesActive = (state: RootState) => state.home.homesActive

export const selectMapFetching = createSelector(
  [selectHomesMap],
  (homes) => homes.fetching
)

type HomesDetailedType = NonNullable<
  HomeSliceType['homesDetailed']['data']
>['homes'][number] & { wishlisted?: boolean }

export type HomesWishlisted = HomeSliceType['homesDetailed'] & {
  data?:
    | (Omit<HomeSliceType['homesDetailed']['data'], 'homes'> & {
        homes: Array<HomesDetailedType>
      })
    | undefined
}

export const selectHomesDetailedWishlisted = createSelector(
  [selectHomesDetailed, (state: RootState) => state.userHome.wishlisted],
  (homesDetailed, wishlisted): HomesWishlisted => {
    const wishlistedIds =
      wishlisted.data?.wishlisted.map((home) => home.id) || []

    const homesUpdated = homesDetailed.data?.homes.map((home) => {
      const isWishlisted = wishlistedIds.includes(home.id)
      if (!isWishlisted) return home

      return {
        ...home,
        wishlisted: true,
      }
    })

    return produce(homesDetailed, (homesDetailedDraft) => {
      if (homesDetailedDraft?.data?.homes) {
        homesDetailedDraft.data.homes = homesUpdated!
      }
    })
  }
)
export const selectMapError = createSelector(
  [selectHomesMap],
  (homes) => homes.error
)

export const selectHighlightedHomeId = (state: RootState) =>
  state.home.hoverStates.highlightedHomeId

export const selectMapWhere = (state: RootState): Homes_Bool_Exp => {
  const [ne, sw] = state.map.bounds as [number, number][]
  return {
    lat: {
      _gt: ne[1],
      _lt: sw[1],
    },
    lng: {
      _gt: ne[0],
      _lt: sw[0],
    },
  }
}

export const selectHomeFilters = createSelector(
  [
    selectMapWhere,
    (state: RootState) => state.map.viewport.zoom,
    (state: RootState) => state.home.homesFilter,
  ],
  (
    whereCondition,
    zoom,
    filter
  ): Omit<
    UseQueryArgs<SearchHomesByLocationQueryVariables>,
    'query'
  >['variables'] => {
    const { beds, bath, sqft, price, yearBuilt, homeType } = filter!
    const bedsInt = Number.isNaN(+beds!) ? 0 : +beds!
    const bathInt = Number.isNaN(+bath!) ? 0 : +bath!

    const homesWhere: InputMaybe<Homes_Bool_Exp> = { ...whereCondition }
    if (beds) homesWhere.beds = { _gte: bedsInt }
    if (bath) homesWhere.bath = { _gte: bathInt }
    if (sqft) homesWhere.sqft = { _gte: sqft[0], _lte: sqft[1] }
    if (price) homesWhere.price = { _gte: price[0], _lte: price[1] }
    if (yearBuilt)
      homesWhere.yearBuilt = { _gte: yearBuilt[0], _lte: yearBuilt[1] }
    if (homeType) homesWhere.style = { _in: homeType }

    const homesLimit = showHomes(zoom) ? 50 : 0

    return { where: homesWhere, limit: homesLimit }
  }
)

export default homeSlice.reducer
