/* eslint-disable camelcase */
import * as React from 'react'
import {
  useDeleteWishlistMutation,
  useInsertUserHomeMutation,
  Viewed_Enum,
  Viewed_Enum_Enum,
} from 'src/generated/graphql'

import { useGetHighlightedHomeDataActive } from 'src/store/home/homeNetwork'
import HeartIconReg from '@heroicons/react/outline/HeartIcon'
import HeartIconSolid from '@heroicons/react/solid/HeartIcon'
import RefreshIcon from '@heroicons/react/outline/RefreshIcon'
import { useAppSelector } from 'src/store'
import { selectUid } from 'src/store/user/userSlice'
import Skeleton from 'src/components/molecules/Skeleton'
import { loginNotification } from 'src/lib/util'
import PopDialog from 'src/components/molecules/PopDialog/PopDialog'
import { HomeDetailed } from 'src/types'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

import SwipeableViews from 'react-swipeable-views'
import { useTheme } from '@mui/material/styles'
import { Box, useMediaQuery } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setDeletedHomes } from 'src/store/userHome/userHomeSlice' 

export interface IPopupHomesContentProps {
  id: number
  wishlisted: boolean
}

const AutoPlaySwipeableViews = SwipeableViews

const HomeContentSkeleton = () => (
  <div className='flex flex-col w-48 text-gray-200 '>
    <Skeleton className='w-56 h-36' />
    <div className='flex flex-col p-2 bg-white/90 backdrop-filter backdrop-blur-sm filter'>
      <Skeleton className='w-3/4 h-4 mb-2' />
      <Skeleton className='w-full h-6' />
    </div>
  </div>
)

const PopupHomesContent = ({ id, wishlisted }: IPopupHomesContentProps) => {
  const isMobile = useMediaQuery('(max-width:770px)')
  const dispatch = useDispatch()
  const theme = useTheme()
  const uid = useAppSelector(selectUid)
  const [hoverClass, setHoverClass] = React.useState('hidden')
  const [{ fetching: wishlistLoading }, updateHomeMutation] =
    useInsertUserHomeMutation()
  const [{ fetching: loading }, updateDeleteMutaion] =
    useDeleteWishlistMutation()

  // const highlightedHomeDetails = useGetHighlightedHomeData(id)

  const highlightedHomeDetailsActive = useGetHighlightedHomeDataActive(
    id
  ) as HomeDetailed

  const kvadrat = Math.trunc(
    (highlightedHomeDetailsActive?.price || 0) /
    (highlightedHomeDetailsActive?.sqft || 0)
  )
  const images = [
    ...(highlightedHomeDetailsActive?.imgs || []).map((item: any) => ({
      id: item.sorting,
      src: item.url,
    })),
  ]

  const [activeStep, setActiveStep] = React.useState(0)
  const maxSteps = images.length

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleStepChange = (step: number) => {
    setActiveStep(step)
  }
  const showNextStep = activeStep === 0
  const showPreviousStep = activeStep === maxSteps - 1

  // const { data, fetching, error } = highlightedHomeDetails!

  if (
    !highlightedHomeDetailsActive &&
    highlightedHomeDetailsActive !== undefined
  )
    return <HomeContentSkeleton />
  // if (error) return <ErrorSkeleton error='Something went wrong...' />

  return (
    <div
      className='hidden md:flex flex-col w-56'
      onMouseOver={() => setHoverClass('')}
      onFocus={() => null}
      onMouseLeave={() => setHoverClass('hidden')}
    >
      <div className='relative h-36'>
        <button
          type='button'
          className={`${!isMobile && hoverClass} absolute left-0 z-20 h-full`}
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          {!showNextStep ? (
            <div
              className={` bg-white/80 hover:bg-white/90 rounded-full p-[0.5px] ml-1`}
            >
              <ChevronLeftIcon />
            </div>
          ) : (
            <div className='bg-red/0 h-full p-4' />
          )}
        </button>
        <button
          type='button'
          className={` ${!isMobile && hoverClass
            } absolute right-0 z-20 h-full `}
          onClick={handleNext}
          disabled={activeStep === maxSteps - 1}
        >
          {!showPreviousStep ? (
            <div className='bg-white/80 hover:bg-white/90 rounded-full p-[0.5px] mr-1'>
              <ChevronRightIcon />
            </div>
          ) : (
            <div className='bg-red/0 h-full p-4' />
          )}
        </button>
        <PopDialog id={id}>
          <AutoPlaySwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {images.map((step, index) => (
              <div key={step.id}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <Box
                    component='img'
                    sx={{
                      display: 'block',
                      overflow: 'hidden',
                      width: '100%',
                      height: '150px',
                      objectFit: 'cover',
                    }}
                    src={step.src}
                    alt={step.src}
                  />
                ) : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>
        </PopDialog>
      </div>
      <div className='relative flex flex-col cursor-auto bg-white/50 backdrop-filter backdrop-blur-sm filter'>
        <div className='p-2'>
          <PopDialog id={id || 0}>
            <div className='flex flex-wrap text-sm leading-none'>
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
              <span>
                <b>{highlightedHomeDetailsActive?.sqft}</b> Квадрати,&nbsp;
              </span>
            </div>
          </PopDialog>
          <div className='flex items-center justify-between '>
            <PopDialog id={id || 0}>
              <div className='text-xl font-light leading-none'>
                €{highlightedHomeDetailsActive?.price}
              </div>
            </PopDialog>
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
  )
}

export default PopupHomesContent
