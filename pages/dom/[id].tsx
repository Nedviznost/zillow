/* eslint-disable react/destructuring-assignment */
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { NextSeo } from 'next-seo'
import { ParsedUrlQuery } from 'querystring'
import { client, ssrCache } from 'src/config/urqlClientWonka'
import { GetHomeDocument, useGetHomeQuery } from 'src/generated/graphql'

import { useRouter } from 'next/router'
import { getQueryParam } from 'src/lib/util'
import { useAppDispatch } from 'src/store'
import { setViewport } from 'src/store/map/mapSlice'
import { useEffect } from 'react'
import { setHighlightedHomeId } from 'src/store/home/homeSlice'
import { useHomesDetailed } from 'src/store/home/homeNetwork'
import ProductPageDialog from 'src/components/templates/ProductPage copy/ProductPageDialog'


const ProductPage = (props: any) => {

  const { data } = Object.values(props)[0] as any;
  const homeData = JSON.parse(data)?.homes_by_pk


  useHomesDetailed()

  const id = parseInt(getQueryParam(useRouter().query.id), 10)
  const [home] = useGetHomeQuery({
    variables: { id },
  })
  const dispatch = useAppDispatch()

  const homeId = home.data?.homes_by_pk?.id
  const lat = home.data?.homes_by_pk?.lat
  const lng = home.data?.homes_by_pk?.lng

  useEffect(() => {
    dispatch(setHighlightedHomeId(homeId))
    if (!lat || !lng) return
    dispatch(
      setViewport({
        latitude: lat,
        longitude: lng,
        zoom: 11,
      })
    )
  }, [dispatch, homeId, lat, lng])

  const router = useRouter()

  useEffect(() => {
    if (!home.fetching && !home.data?.homes_by_pk) {
      router.push('/404')
    }
  }, [home.data?.homes_by_pk, home.fetching, router])

  return (
    <>
      <NextSeo
        title='🏡 Недвижност.мк | Купи-продај имот'
        description="Ова е опис на дом"
      />
      <Head>
        <title>Недвижност.мк | {homeData.title}</title>
        <meta
          name={homeData?.description}
          content={homeData?.description}
        />
        <meta name="description" content={homeData?.description} key={homeData?.id} />
        <meta property="og:title" content={homeData.title} />
        <meta
          property="og:description"
          content={homeData?.description}
        />
        <meta
          property="og:image"
          content={homeData?.imgs[0].url}
        />
        <meta
          property="og:image:alt"
          content='🏡 Недвижност.мк | Купи-продај имот'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <ProductPageDialog id={homeData?.id || 0} />
    </>
  )
}

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' }
}

interface Params extends ParsedUrlQuery {
  id: string
}

// This function gets called at build time
export const getStaticProps: GetStaticProps<{}, Params> = async (context) => {
  const id = context.params?.id || -90
  await client?.query(GetHomeDocument, { id }).toPromise()

  const props = ssrCache.extractData() || null

  return {
    props,
  }
}

export default ProductPage
