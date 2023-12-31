/* eslint-disable no-console */
import HScroll from 'src/components/molecules/HScroll'
import PropertyCard from 'src/components/organisms/PropertyCard'
import { PropertyCardSkeleton } from 'src/components/organisms/PropertyCard/PropertyCard'
import { useAppSelector } from 'src/store'
import {
  selectHomesActive,
  selectHomesDetailed,
} from 'src/store/home/homeSlice'
import { selectWishlistedHomes } from 'src/store/userHome/userHomeSlice'

export interface INearByHomesProps {
  homeId: number
}

const NearByHomes = ({ homeId }: INearByHomesProps) => {
  const { data, fetching } = useAppSelector(selectHomesDetailed)
  const dataActive = useAppSelector(selectHomesActive)
  const { data: wishlistedHomes } = useAppSelector(selectWishlistedHomes)

  return (
    <HScroll className='mt-12'>
      <div className='flex items-center justify-between space-x-2'>
        <div className='text-2xl'>Имоти во близина e</div>
        <div className='space-x-2'>
          <HScroll.Arrow
            className='left-0 z-10 h-full transition-all border border-white rounded-full hover:shadow-xl hover:bg-primary-50'
            distance={-240}
          />
          <HScroll.Arrow
            right
            className='right-0 z-10 h-full transition-all border border-white rounded-full hover:shadow-xl hover:bg-primary-50'
            distance={-240}
          />
        </div>
      </div>
      <HScroll.Body className='gap-2'>
        <>
          {fetching
            ? [1, 2, 3, 4, 5, 6].map((item) => (
              <PropertyCardSkeleton
                className='flex-shrink-0 w-64'
                key={item}
              />
            ))
            : data?.homes
              .filter((item) => item.id !== homeId)
              .map((item) => (
                <HScroll.Child key={item.id}>
                  <PropertyCard
                    id={item.id}
                    key={item.id}
                    address={item.address}
                    bath={item.bath}
                    beds={item.beds}
                    price={item.price}
                    sqft={item.sqft}
                    style={item.style}
                    status={item.status}
                    wishlisted={wishlistedHomes?.wishlisted.find(
                      (wishlistedItem) => wishlistedItem.hId === item.id
                    )}
                  />
                </HScroll.Child>
              ))}
          {!fetching && !data?.homes.length && (
            <div className='flex items-center justify-center w-full h-96'>
              No nearby properties found.
            </div>
          )}
        </>
      </HScroll.Body>
    </HScroll>
  )
}

export default NearByHomes
