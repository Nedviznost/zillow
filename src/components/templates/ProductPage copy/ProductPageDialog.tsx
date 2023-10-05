/* eslint-disable @next/next/no-img-element */
import ProductPageCarousel from 'src/components/organisms/ProductPageCarousel'
import { useGetHomeQuery } from 'src/generated/graphql'
import Container from 'src/components/atoms/Container'
import Skeleton from 'src/components/molecules/Skeleton'
import { mapUrl } from 'src/components/helpers/helpers'
import { Grid, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import { XIcon } from '@heroicons/react/outline'
import { ScreenSlider } from 'src/components/atoms/ScreenSlider/ScreenSlider'
import MainCard from './MainCard'

export interface IProductPageDialogProps {
  id: number
}

const ProductPageDialog = ({ id }: IProductPageDialogProps) => {
  const [home] = useGetHomeQuery({
    variables: { id },
  })

  console.log(home)

  const isMobile = useMediaQuery('(max-width:770px)')

  const homeData = home?.data?.homes_by_pk

  const images = [
    ...(homeData?.imgs || []).map((item: any) => ({
      id: item.sorting,
      src: item.url,
    })),
    {
      id: 30,
      src: mapUrl(homeData)
    }
  ]

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const [dialog, setDialog] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  if (home.fetching)
    return (
      <Container className='w-screen h-screen'>
        <div className='w-full grid-cols-3 gap-6 lg:grid h-full '>
          <div className='col-span-2 md:space-y-12 w-full'>
            <Skeleton className='w-full h-[300px] md:h-full' />
            <MainCard className='block lg:hidden' home={home} />
          </div>
          <MainCard className='hidden lg:block' home={home} />
        </div>
      </Container>
    )

  function handleImageClick(image: number) {
    setActiveImage(image)
    if (!isMobile) {
      setDialog(true)
    }
  }


  return (
    <Container>
      <div className='w-full grid-cols-3 gap-6 lg:grid h-full'>
        <div className='col-span-2 md:space-y-12 relative' >
          {(isMobile ? !open : open) ?
            <ProductPageCarousel
              images={images}
              setOpen={setOpen}
            /> :
            <div className='relative z-50'>
              <button
                type='button'
                className='md:hidden fixed z-20 top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/40'
                onClick={handleClose}
              >
                <XIcon className='w-5 h-5 text-white' />
              </button>
              <Grid container spacing={1} columns={16}>
                {images.map((step, i) => {
                  const isFirst = i === 0
                  return (
                    <Grid key={step.id} item xs={(isFirst || isMobile) ? 16 : 8} onClick={() => handleImageClick(i)}  >
                      <img src={step.src}
                        className="h-auto object-cover w-full"
                        alt={step.src} />
                    </Grid>
                  )
                }
                )}
              </Grid>
            </div>
          }

          {!open && <MainCard className='block lg:hidden' home={home} />}
        </div>
        <MainCard className='hidden lg:block' home={home} />
        {dialog &&
          <ScreenSlider images={images} selectedImage={activeImage} setDialog={setDialog} />
        }
      </div>
    </Container>
  )
}

export default ProductPageDialog
