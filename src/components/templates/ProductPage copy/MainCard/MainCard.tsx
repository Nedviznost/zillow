/* eslint-disable @next/next/no-img-element */
import { GetHomeQuery } from 'src/generated/graphql'
import Skeleton from 'src/components/molecules/Skeleton'
import { UseQueryResponse } from 'urql'
import AgentBanner from 'src/components/organisms/AgentBanner'
import InsertLinkIcon from '@mui/icons-material/InsertLink'
import Button from 'src/components/atoms/Button'
import { useState } from 'react'
import { condoSwitch, styleSwitch } from 'src/components/helpers/helpers'
import moment from 'moment'
import Details from '../Details'

export interface IMainCardProps {
  home: UseQueryResponse<GetHomeQuery, object>[0]
  className?: string
}

export const MainCardSkeleton = ({ className }: { className?: string }) => (
  <div className={`${className} p-6 min-h-[30rem]`}>
    <Skeleton className='w-1/4 h-4 mt-12' />
    <Skeleton className='h-4 mt-3 ' />
    <Skeleton className='w-1/4 h-4 mt-1 ' />
    <Skeleton className='w-3/4 h-10 mt-8' />
    <Skeleton className='h-4 mt-4 ' />
    <Skeleton className='w-1/2 h-4 mt-1' />
    <Skeleton className='h-4 mt-6 ' />
    <Skeleton className='w-3/4 h-4 mt-1' />
    <div className='flex items-center gap-3 mt-6'>
      <Skeleton className='flex-shrink-0 rounded-full w-14 h-14' />
      <div className='w-full'>
        <Skeleton className='w-full h-4' />
        <Skeleton className='w-3/4 h-4 mt-1' />
      </div>
    </div>
    <Skeleton className='h-12 mt-2 rounded' />
  </div>
)

const MainCard = ({ home, className }: IMainCardProps) => {
  const [loading, setLoading] = useState(false)
  const homeData = home?.data?.homes_by_pk
  const kvadrat = Math.trunc((homeData?.price || 0) / (homeData?.sqft || 0))

  // if (true) {
  //   return <MainCardSkeleton />
  // }

  function copyText() {
    setLoading(true)
    navigator.clipboard.writeText(`https://nedviznost.mk/dom/${homeData?.id}`)
    setTimeout(() => {
      setLoading(false)
    }, 300)
  }

  const isLand = homeData?.style && homeData?.style.includes('Lot_Land')


  return (
    <div className={`col-span-1 ${className}`}>
      <div className='sticky flex flex-col top-0 px-3 pb-12 md:pb-2'>
        <div className='md:mt-12 text-2xl font-semibold'>
          {' '}
          {homeData?.title}
        </div>
        <div className='flex items-end mt-6'>
          <h2 className=' text-4xl'>€ {homeData?.price.toLocaleString()}</h2>
        </div>
        <h4 className=' text-base mt-4'>
          {' '}
          Цена од квадрат: <b>€{kvadrat}</b>
          <span className='text-sm'>/м2</span>
        </h4>
        <h4 className=' text-base text-gray-700'>
          {homeData?.address}
        </h4>
        <h4 className=' text-base mt-4'>
          <b>
            {styleSwitch(homeData?.status || "", homeData?.style || "")}  {condoSwitch(homeData?.style || "")}
          </b>
        </h4>
        <AgentBanner
          rating={0}
          reviews={0}
          style={homeData?.style || ""}
          uid={homeData?.uid || ""}
        />
        <Details
          title=''
          content={
            isLand
              ? [{ title: 'Квадратура', content: homeData?.sqft }]
              : [
                // { title: 'Тип на дом', content: homeData?.style },
                { title: 'Година на градба', content: homeData?.yearBuilt },
                { title: 'Соби', content: homeData?.beds },
                { title: 'Бaњи', content: homeData?.bath },
                { title: 'Квадратура', content: homeData?.sqft },
              ]
          }
        />
        <div>
          <div className='mb-4 text-xl font-semibold'>Опис</div>
          <div className='max-w-lg leading-relaxed text-gray-800'>
            {homeData?.description}
          </div>
        </div>
        <div>
          <div className='mb-4 text-xl font-semibold'>Додатоци</div>
          <div className='flex flex-wrap max-w-lg gap-3 leading-relaxed text-gray-800'>
            {homeData?.features?.split('|').map((item) => (
              <div
                key={item}
                className='px-2 py-1 border border-white rounded shadow-md bg-gray-50'
              >
                {item}
              </div>
            ))}
          </div>
          <p className='p-2 w-full '>Постирано  {moment(homeData?.created_at).format('llll')}</p>
          {/* <div className='w-full flex flex-col text-center'>
            <div className='pt-12'>
              <Button
                type='button'
                fullWidth
                variant='outlined'
                onClick={() => copyText()}
                isLoading={loading}
              >
                <InsertLinkIcon />
                <span className='pl-2 underline'>{`https://nedviznost.mk/dom/${homeData?.id}`}</span>
              </Button>
            </div>
            <span className='text-xs'>Линк за споделување</span>
          </div> */}
          {/* <div className='w-full flex flex-col text-center'>
            <div className='pt-4'>
              <a
                target='_blank'
                href={`https://nedviznost.mk/dom/${homeData?.id}`}
                rel='noopener noreferrer'
              >
                <span>Отвори во нов прозор</span>
              </a>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default MainCard
