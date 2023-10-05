/* eslint-disable react/jsx-props-no-spreading */
import Mapbox from 'src/components/organisms/Mapbox'
import ProductListingResult from 'src/components/organisms/ProductListingResults/ProductListingResults'
import {
  HomeMarkers,
  PanelContainer,
  Panel,
  Fetching,
  Error,
} from 'src/components/organisms/MapboxContent/MapboxContent'
import { MapProvider } from 'src/store/map/mapContext'
import { DefaultZoomControls as ZoomControls } from 'src/components/organisms/ZoomControls/ZoomControls'
import * as React from 'react'
import SearchHomesFilter from 'src/components/organisms/SearchHomesFilter'
import { Slide } from '@mui/material'
import { selectMapList } from 'src/store/map/mapSlice'
import { useAppSelector } from 'src/store'

const ProductListingPage = () => {
  const show = useAppSelector(selectMapList)

  return (
    <div className='fixed w-full'>
      <SearchHomesFilter />
      <div className='flex flex-col lg:flex-row'>
        <div className={` flex-1 lg:block `}>
          <div className='sticky top-0 w-full col-span-1 overflow-hidden rounded h-[100vh] '>
            <MapProvider className='h-screen w-full md:h-full'>
              <Mapbox>
                <HomeMarkers />
                <PanelContainer>
                  <Panel position='center-bottom'>
                    <Fetching />
                    <Error />
                  </Panel>
                  <Panel position='right-top'>
                    <ZoomControls />
                  </Panel>
                </PanelContainer>
              </Mapbox>
            </MapProvider>
          </div>
        </div>
        <Slide direction='up' in={!show}>
          <div
            className='absolute top-0 h-screen bg-white z-40 md:hidden'
            style={{ width: '100%', maxWidth: 750 }}
          >
            <ProductListingResult />
          </div>
        </Slide>
        <div
          className='hidden md:flex flex-initial'
          style={{ width: '100%', maxWidth: 750 }}
        >
          <ProductListingResult />
        </div>
      </div>
    </div>
  )
}
export default ProductListingPage
