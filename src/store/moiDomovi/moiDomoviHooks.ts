import { useEffect } from 'react'

import { useGetMyHomesQuery } from 'src/generated/graphql'
import { useAppDispatch, useAppSelector } from '..'
import { selectUid } from '../user/userSlice'
import { setMoiDomovi } from './moiDomoviSlice'

export const useGetMoiDomovi = () => {
  const uid = useAppSelector(selectUid)
  const dispatch = useAppDispatch()

  const [{ data, fetching, stale, error }] = useGetMyHomesQuery({
    variables: {
      where: {
        uid: { _eq: uid },
      },
    },
  })

  useEffect(() => {
    dispatch(
      setMoiDomovi({
        data,
        fetching,
        error,
        stale,
      })
    )
  }, [data, dispatch, error, fetching, stale])
}
