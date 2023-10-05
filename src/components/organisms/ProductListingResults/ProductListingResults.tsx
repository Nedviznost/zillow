import React from 'react'
import { useAppSelector } from 'src/store'
import { selectHomesActive } from 'src/store/home/homeSlice'

import { selectWishlistedHomes } from 'src/store/userHome/userHomeSlice'
import { HomeDetailed } from 'src/types'

import PropertyCard from '../PropertyCard'
import { PropertyCardSkeleton } from '../PropertyCard/PropertyCard'

const ProductListingResult = () => {
  const { data: wishlistedHomes } = useAppSelector(selectWishlistedHomes)
  const data = useAppSelector(selectHomesActive)
  const fetching = false

  const NO_RESULTS = data?.length === 0
  const rezultati = data?.length as number

  if (NO_RESULTS) {
    return (
      <div className='flex flex-col items-center justify-center py-24 h-2/3 w-full'>
        <div className='text-2xl font-light'>Не е пронајден имот.</div>
        <div className='mt-2 text-sm text-gray-600'>
          Пробај друга локација или измени ги филтрите.
        </div>
      </div>
    )
  }

  return (
    <div className='w-full overflow-y-auto h-screen pb-48 relative '>
      <div className=' top-12 md:top-0 flex justify-between border border-x-primary-200 bg-white sticky   z-20 mb-2 p-1'>
        <p className=''>
          {rezultati || 0} {rezultati === 1 ? 'Резултат' : 'Резултати'}
        </p>
      </div>
      <div className='px-2 pt-12 md:pt-0 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2'>
        {fetching
          ? [1, 2, 3, 4, 5, 6].map((item) => (
            <PropertyCardSkeleton className='w-full' key={item} />
          ))
          : data.map((item: HomeDetailed) => (
            <PropertyCard
              id={item.id}
              key={item.id}
              address={item.address}
              bath={item.bath}
              beds={item.beds}
              imgs={item.imgs}
              plan={item.plan}
              price={item.price}
              sqft={item.sqft}
              style={item.style}
              status={item.status}
              created_at={item.created_at}
              wishlisted={wishlistedHomes?.wishlisted.find(
                (wishlistedItem) => wishlistedItem.hId === item.id
              )}
            />
          ))}
      </div>
    </div>
  )
}

export default ProductListingResult
