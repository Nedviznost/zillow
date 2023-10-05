/* eslint-disable camelcase */
import { useEffect } from 'react'
import {
  useGetHomeByIdQuery,
  useSearchHomesByLocationQuery,
  useSearchHomesByLocationDetailedQuery,
  Order_By,
} from 'src/generated/graphql'
import { HomeDetailed } from 'src/types'
import { useAppDispatch, useAppSelector } from '..'
import { selectBounds, selectViewport } from '../map/mapSlice'

import {
  homesFilterActive,
  selectHomesActive,
  selectHomesDetailed,
  setHomes,
  setHomesActive,
  setHomesDetailed,
} from './homeSlice'

export const fixedVariabales = {
  limit: 50,
  where: {
    lat: {
      _gt: 40,
      _lt: 43,
    },
    lng: {
      _gt: 20,
      _lt: 23,
    },
  },
}

export const useFetchHomesMap = () => {
  const dispatch = useAppDispatch()
  const [{ data, fetching, error, stale }] = useSearchHomesByLocationQuery({
    variables: fixedVariabales,
  })
  useEffect(() => {
    dispatch(setHomes({ data, fetching, error, stale }))
  }, [data])
}

export const useGetHighlightedHomeData = (
  highlightedHomeId: number | null | undefined
) => {
  const [highlightedHomeDetails] = useGetHomeByIdQuery({
    variables: {
      id: highlightedHomeId || -9999,
    },
    pause: !highlightedHomeId,
  })

  return highlightedHomeDetails
}

export const useGetHighlightedHomeDataActive = (
  highlightedHomeId: number | null | undefined
) => {
  const data = useAppSelector(selectHomesActive)
  return data.filter((home: HomeDetailed) => home.id === highlightedHomeId)[0]
}

export const useHomesActive = () => {
  const { data } = useAppSelector(selectHomesDetailed)
  const { zoom, longitude, latitude } = useAppSelector(selectViewport)
  const { price, yearBuilt, sqft, beds, bath, homeType, status } =
    useAppSelector(homesFilterActive) as any
  const dispatch = useAppDispatch()

  const bounds = useAppSelector(selectBounds)
  // LNG
  const lngFrom = bounds[0][0]
  const lngTo = bounds[1][0]
  // LAT
  const latFrom = bounds[0][1]
  const latTo = bounds[1][1]

  useEffect(() => {
    let focusData
    if (data?.homes && data?.homes !== undefined) {
      focusData = data?.homes.filter(
        (home) =>
          lngFrom < home.lng &&
          lngTo > home.lng &&
          latFrom < home.lat &&
          latTo > home.lat
      )
      if (price)
        focusData = focusData.filter(
          (home) => home.price! >= price[0] && home.price! <= price[1]
        )
      if (yearBuilt)
        focusData = focusData.filter(
          (home) =>
            home.yearBuilt! >= yearBuilt[0] && home.yearBuilt! <= yearBuilt[1]
        )
      if (homeType)
        focusData = focusData.filter((home) => homeType.includes(home.style))
      if (sqft)
        focusData = focusData.filter(
          (home) => home.sqft! >= sqft[0] && home.sqft! <= sqft[1]
        )
      if (beds) focusData = focusData.filter((home) => home.beds! >= beds)
      if (bath) focusData = focusData.filter((home) => home.bath! >= bath)
      if (status)
        focusData = focusData.filter((home) => home.status! === status)
      focusData = focusData.filter((home) => home.published)

      dispatch(setHomesActive(focusData as any))
    }
  }, [
    bath,
    homeType,
    yearBuilt,
    beds,
    data?.homes,
    dispatch,
    latFrom,
    latTo,
    latitude,
    lngFrom,
    lngTo,
    longitude,
    price,
    sqft,
    zoom,
    status,
  ])
}
export const useHomesDetailed = () => {
  const [{ data, fetching, error, stale }] =
    useSearchHomesByLocationDetailedQuery({
      variables: {
        ...fixedVariabales,
        order_by: {
          plan: Order_By.DescNullsLast,
        },
      },
    })

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(setHomesDetailed({ data, fetching, error, stale }))
  }, [data])
}
