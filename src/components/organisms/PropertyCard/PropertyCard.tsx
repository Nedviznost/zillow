/* eslint-disable react/jsx-no-bind */
/* eslint-disable camelcase */
import Image from 'src/components/atoms/Image'
import HeartIconReg from '@heroicons/react/outline/HeartIcon'
import RefreshIcon from '@heroicons/react/outline/RefreshIcon'
import HeartIconSolid from '@heroicons/react/solid/HeartIcon'

import {
  GetWishlistedHomesQuery,
  Homes,
  useDeleteWishlistMutation,
  useInsertUserHomeMutation,
  Viewed_Enum,
  Viewed_Enum_Enum,
} from 'src/generated/graphql'
import { useAppSelector } from 'src/store'

import { selectUid } from 'src/store/user/userSlice'
import {
  debouncedDispatch,
  startLongHoverDispatch,
  stopLongHoverDispatch,
  useKeypress,
} from 'src/hooks'
import { setHighlightedHomeId } from 'src/store/home/homeSlice'
import { loginNotification } from 'src/lib/util'
import { getHomeTypes } from 'src/store/static'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import PopDialog from 'src/components/molecules/PopDialog/PopDialog'
import React, { useState } from 'react'
import { Box, useMediaQuery } from '@mui/material'
import SwipeableViews from 'react-swipeable-views'
import { useTheme } from '@mui/material/styles'
import { useDispatch } from 'react-redux'
import { setDeletedHomes } from 'src/store/userHome/userHomeSlice'
import moment from "moment"
import 'moment/locale/mk'

import { condoSwitch, styleSwitch } from 'src/components/helpers/helpers'

const AutoPlaySwipeableViews = SwipeableViews

export type IPropertyCardProps = Partial<Homes> & {
  wishlisted?: GetWishlistedHomesQuery['wishlisted'][number]
}

const PropertyCard = ({
  id,
  address,
  beds,
  bath,
  price,
  imgs,
  plan,
  sqft,
  wishlisted,
  style,
  status,
  created_at
}: IPropertyCardProps) => {
  moment.locale('mk')
  const [hoverClass, setHoverClass] = useState('hidden')

  const isMobile = useMediaQuery('(max-width:770px)')

  // const setHighlightedHome = (value: number | null | undefined) =>
  //   dispatch({ type: 'SET_HIGHLIGHTED_ID', payload: value })
  const [{ fetching: wishlistLoading }, updateHomeMutation] =
    useInsertUserHomeMutation()
  const [{ fetching: loading }, updateDeleteMutaion] =
    useDeleteWishlistMutation()

  const uid = useAppSelector(selectUid)

  useKeypress('Escape', () => debouncedDispatch(setHighlightedHomeId(null)))

  const homePlan = getHomeTypes(plan)

  const images = [
    ...(imgs || []).map((item: any) => ({
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
  const theme = useTheme()
  const dispatch = useDispatch()
  return (
    <div
      onMouseOver={() => {
        startLongHoverDispatch(setHighlightedHomeId(id))
        setHoverClass('')
      }}
      onFocus={() => startLongHoverDispatch(setHighlightedHomeId(id))}
      onMouseLeave={() => {
        stopLongHoverDispatch()
        setHoverClass('hidden')
      }}
      className=' min-h-64 md:h-full'
    >
      <div className='relative overflow-hidden border border-white rounded-md shadow-lg h-44 md:h-56'>
        <button
          type='button'
          className={`${!isMobile && hoverClass} absolute left-0 z-10 h-full`}
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
          className={`${!isMobile && hoverClass} absolute right-0 z-10 h-full`}
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
        <PopDialog id={id || 0}>
          <p className=' absolute text-xs z-10 m-1 px-1 py-0.5  bg-opacity-60  bg-gray-800 text-white font-semibold rounded-md  '>
            {moment(created_at, "YYYYMMDD").fromNow()}
          </p>
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
                      height: '235px',
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
        <PopDialog id={id || 0}>
          <div className=' h-56'>
            <Image
              className='absolute h-full transition-transform duration-1000 scale-105 rounded hover:scale-100'
              src={(imgs && imgs[0].url) || ''}
              alt=''
            />
          </div>
        </PopDialog>
        {plan && false && (
          <div className='absolute top-0 left-0 p-1'>
            <div className={` px-2 py-0.5 text-xs text-white font-semibold opacity-90 bg-gray-600 rounded-2xl`}>
              {homePlan.displayName}
            </div>
          </div>
        )}
        <div className='font-semibold'>
          <button
            type='button'
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
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
            className='absolute top-0 right-0 z-10 flex items-start justify-end text-white rounded-none rounded-bl backdrop-filter backdrop-blur bg-black/50'
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
      <div className='mt-2 mb-4 ml-1 px-2'>
        <div className='flex items-center mt-0.5 space-x-1 text-sm'>
          {style !== "Lot_Land"! &&
            <div>
              <b>{beds}</b> Соби,{' '}
            </div>
          }
          {style !== "Lot_Land"! &&
            <div>
              <b>{bath}</b> Бaњи,{' '}
            </div>
          }
          <div>
            <b>{sqft}</b> Квадрати
          </div>

        </div>
        <div>
          {styleSwitch(status || "", (style || ""))}  {condoSwitch(style || "")}
        </div>
        <div className='mt-1 text-sm text-gray-500'>{address}</div>
        <div className='text-lg font-medium'>€ {price?.toLocaleString()}</div>
      </div>
    </div>
  )
}

export const PropertyCardSkeleton = ({ className }: { className?: string }) => (
  <div className={`${className && className}`}>
    <div className='relative overflow-hidden bg-gray-200 border border-white rounded-md shadow-lg h-80 animate-pulse' />

    <div className='mt-2 mb-4 ml-1 text-gray-200'>
      <div className='w-1/4 text-lg bg-gray-200 rounded-full animate-pulse'>
        -
      </div>
      <div className='flex w-3/4 mt-0.5 text-sm bg-gray-200 rounded-full animate-pulse'>
        -
      </div>
      <div className='w-2/3 mt-1 text-sm bg-gray-200 rounded-full animate-pulse'>
        -
      </div>
    </div>
  </div>
)

export default PropertyCard
