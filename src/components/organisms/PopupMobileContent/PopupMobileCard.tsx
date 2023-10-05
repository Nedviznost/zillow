/* eslint-disable camelcase */
import {
  useDeleteWishlistMutation,
  useInsertUserHomeMutation,
  Viewed_Enum,
  Viewed_Enum_Enum,
} from 'src/generated/graphql'
import Image from 'src/components/atoms/Image'
import { useGetHighlightedHomeDataActive } from 'src/store/home/homeNetwork'
import HeartIconReg from '@heroicons/react/outline/HeartIcon'
import HeartIconSolid from '@heroicons/react/solid/HeartIcon'
import RefreshIcon from '@heroicons/react/outline/RefreshIcon'
import { useAppDispatch, useAppSelector } from 'src/store'
import { selectUid } from 'src/store/user/userSlice'
import Skeleton from 'src/components/molecules/Skeleton'
import { loginNotification } from 'src/lib/util'
import PopDialog from 'src/components/molecules/PopDialog/PopDialog'
import XIcon from '@heroicons/react/outline/XIcon'
import { HomeDetailed } from 'src/types'
import { setHighlightedHomeId } from 'src/store/home/homeSlice'
import { setDeletedHomes } from 'src/store/userHome/userHomeSlice'

export interface IPopupMobileCardProps {
  id: number
  wishlisted: boolean
}

const HomeContentSkeleton = () => (
  <div className='flex flex-col w-48 text-gray-200 '>
    <Image src='https://via.placeholder.com/150' className='w-48 h-36' alt='' />
    <div className='flex flex-col p-2 bg-white/90 backdrop-filter backdrop-blur-sm filter'>
      <Skeleton className='w-full h-6' />
      <Skeleton className='w-3/4 h-4 mt-4' />
      <Skeleton className='w-1/2 h-4 mt-1' />
      <Skeleton className='w-3/4 h-4 mt-2' />
    </div>
  </div>
)

const PopupMobileCard = ({ id, wishlisted }: IPopupMobileCardProps) => {
  const dispatch = useAppDispatch()
  const [{ fetching: wishlistLoading }, updateHomeMutation] =
    useInsertUserHomeMutation()
  const [{ fetching: loading }, updateDeleteMutaion] =
    useDeleteWishlistMutation()
  const uid = useAppSelector(selectUid)
  // const highlightedHomeDetails = useGetHighlightedHomeData(id)
  // const { data, fetching, error } = highlightedHomeDetails!

  // if (fetching) return <HomeContentSkeleton />
  // if (error) return <ErrorSkeleton error='Something went wrong...' />

  const highlightedHomeDetailsActive = useGetHighlightedHomeDataActive(
    id
  ) as HomeDetailed

  const imgSrc =
    (highlightedHomeDetailsActive?.imgs &&
      highlightedHomeDetailsActive?.imgs[0].url) ||
    ''

  const kvadrat = Math.trunc(
    (highlightedHomeDetailsActive?.price || 0) /
    (highlightedHomeDetailsActive?.sqft || 0)
  )

  return (
    <div className='z-10 h-32 fixed left-0 right-0 mx-auto bottom-12 rounded-xl bg-white backdrop-filter shadow-2xl flex w-[90%] justify-self-center self-center md:hidden '>
      <PopDialog id={id}>
        <Image
          src={imgSrc}
          className='w-32 h-full bg-cover rounded-tl-xl rounded-bl-xl'
          alt=''
        />
      </PopDialog>
      <div className='relative flex flex-col cursor-auto filter'>
        <div className='p-2'>
          <div className='flex items-baseline justify-between'>
            <div className='mb-1 text-2xl font-light leading-none'>
              €{highlightedHomeDetailsActive?.price.toLocaleString()}
            </div>
          </div>
          <div className='flex flex-wrap mt-2 text-sm'>
            <span>
              <b>
                {(highlightedHomeDetailsActive &&
                  highlightedHomeDetailsActive?.beds) ||
                  0}
              </b>{' '}
              соби,&nbsp;{' '}
            </span>
            <span>
              <b>{highlightedHomeDetailsActive?.bath}</b> бања,&nbsp;{' '}
            </span>
            <span> {kvadrat} €/м2,&nbsp; </span>
            <div className='w-full  flex justify-between'>
              <span>
                <b>{highlightedHomeDetailsActive?.sqft}</b> Квадрати,&nbsp;
              </span>
              <button
                type='button'
                className='z-40'
                onClick={() => {
                  const hId = id
                  if (!hId || !uid) {
                    loginNotification()
                    return
                  }
                  if (wishlisted) {
                    dispatch(
                      setDeletedHomes({
                        hId,
                      })
                    )
                    updateDeleteMutaion({
                      uid,
                      hId,
                    })
                  } else if (!wishlisted) {
                    updateHomeMutation({
                      hId,
                      type: Viewed_Enum_Enum.Wishlisted,
                      uid,
                    })
                  }
                }}
              >
                {/* eslint-disable-next-line no-nested-ternary */}
                {wishlistLoading || loading ? (
                  <RefreshIcon className='w-8 h-8 p-1 animate-spin-reverse' />
                ) : !wishlisted ? (
                  <HeartIconReg className='w-8 h-8 p-1' />
                ) : (
                  <HeartIconSolid className='w-8 h-8 p-1 fill-red' />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        type='button'
        className='absolute top-1 right-1 p-0.5 rounded-full bg-black/30 hover:bg-black/40'
        onClick={() => dispatch(setHighlightedHomeId(null))}
      >
        <XIcon className='w-5 h-5 text-white' />
      </button>
    </div>
  )
}

export default PopupMobileCard
