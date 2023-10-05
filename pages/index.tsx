import type { NextPage } from 'next'
import Head from 'next/head'
import { NextSeo } from 'next-seo'
import ProductListingPage from 'src/components/templates/ProductListingPage'
import { useHomesActive, useHomesDetailed } from 'src/store/home/homeNetwork'
import { selectState } from 'src/store/home/homeSlice'
import { useAppSelector } from 'src/store'

const HomePage: NextPage = () => {
  useHomesDetailed()
  useHomesActive()
  const state = useAppSelector(selectState)

  // console.log(state)

  return (
    <>
      <NextSeo
        title='🏡 Недвижност.мк | Купи, продај изнајми имот'
        description='Платформа за купување, продавање и изнајмување на имоти во Македонија.'
      />
      <Head>
        <title>Недвижност.мк | Купи продај изнајми имот</title>
        <meta
          name='description'
          content='Платформа за купување, продавање и изнајмување на имоти во Македонија.'
        />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0,  height=device-height, maximum-scale=1.0, user-scalable=no;user-scalable=0;'
        />
        <meta name="google-site-verification" content="FVAX5JklJWRM_ZrOIFKFA3vD67ei63k0uFI6MmZeqJk" />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <ProductListingPage />
    </>
  )
}

export default HomePage
