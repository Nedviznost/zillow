
import { Marker } from 'react-map-gl'
import HomeIcon from '@heroicons/react/solid/HomeIcon'
import OfficeBuildingIcon from '@heroicons/react/solid/OfficeBuildingIcon'
import {
  SearchHomesByLocationQuery,
  GetWishlistedHomesQuery,
} from 'src/generated/graphql'
import { startLongHoverDispatch, stopLongHoverDispatch } from 'src/hooks'
import HeartIconSolid from '@heroicons/react/solid/HeartIcon'

import { setHighlightedHomeId } from 'src/store/home/homeSlice'
import { useAppSelector } from 'src/store'
import { selectViewport } from 'src/store/map/mapSlice'
import { styleClasses } from 'src/components/helpers/helpers'

export interface IMapMarkerProps {
  home: SearchHomesByLocationQuery['homes'][0]
  highlighted?: boolean
  wishlisted?: GetWishlistedHomesQuery['wishlisted'][0]
}

const MapMarker = ({ home, highlighted, wishlisted }: IMapMarkerProps) => {
  let MarkerIcon = HomeIcon
  const { zoom } = useAppSelector(selectViewport)
  const showDot = zoom > 8

  if (['Coop', 'Apartment'].includes(home?.style || ''))
    MarkerIcon = OfficeBuildingIcon

  const highlightedClasses = highlighted
    ? 'bg-green-600 border border-white'
    : `border border-white`

  const wishlistedClasses = wishlisted && ''

  const statusClasses = styleClasses(home.status || "")

  const showDotClasses =
    !showDot && 'rounded-full p-2 border-[3px] border-white'

  // eslint-disable-next-line no-nested-ternary
  const fullPrice =
    // eslint-disable-next-line no-nested-ternary
    home.price > 1000000
      ? `${Number(home.price / 1000000).toFixed(0) as any}M`
      : home.price > 1000
        ? `${Number(home.price / 1000).toFixed(0) as any}K`
        : `${Number(home.price).toFixed(0) as any}`

  return (
    <Marker latitude={home.lat} longitude={home.lng}>
      {/* <MarkerIcon
        onMouseOver={() =>
          startLongHoverDispatch(setHighlightedHomeId(home.id))
        }
        onTouchStart={() =>
          startLongHoverDispatch(setHighlightedHomeId(home.id))
        }
        onMouseOut={() => stopLongHoverDispatch()}
        // onTouchEnd={() => console.log('Touch end')}
        // onTouchStart={() => console.log('Touched start')}
        // onClick={() => {
        //   router.push(`/homes/${home.id}`)
        // }}
        // onMouseLeave={() => debouncedDispatch(setHighlightedHomeId(null))}
        className={` text-xs w-5 h-5 opacity-90 text-red transition-all shadow-2xl cursor-pointer ease-in-out duration-200 rounded relative ${highlightedClasses} ${wishlistedClasses}`}
      /> */}
      <div className='flex flex-col items-center'>
        <div
          onMouseOver={() =>
            startLongHoverDispatch(setHighlightedHomeId(home.id))
          }
          onFocus={() => null}
          onTouchStart={() =>
            startLongHoverDispatch(setHighlightedHomeId(home.id))
          }
          onMouseOut={() => stopLongHoverDispatch()}
          onBlur={() => null}
          className={` shadow-black px-2 rounded-2xl text-white flex items-center ${statusClasses} ${showDotClasses} ${highlightedClasses} ${wishlistedClasses}`}
        >
          {wishlisted && (
            <HeartIconSolid
              className={showDot ? 'w-4 h-4 fill-white' : 'w-2 h-2 p-0 m-0'}
            />
          )}{' '}
          {showDot && fullPrice}
        </div>
      </div>
    </Marker>
  )
}

export default MapMarker
