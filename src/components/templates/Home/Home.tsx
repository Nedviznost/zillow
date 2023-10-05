import BannerSplit from 'src/components/organisms/BannerHomeLoan'
import BadgeCheckIcon from '@heroicons/react/outline/BadgeCheckIcon'
import ScrollText from 'src/components/molecules/ScrollBanner'
import Container from 'src/components/atoms/Container'
import Link from 'src/components/atoms/Link'
import Hero from '../Hero'

export interface IHomeProps {}

const Home = () => (
  <main>
    <Hero className=' py-20' />
    <Container className='mt-48 mb-36 md:flex  gap-32 justify-center'>
      <div>
        <BannerSplit.Heading>Продај Имот</BannerSplit.Heading>
        <BannerSplit.Description className='mt-4'>
          <ul>
            <li className='flex items-center gap-2'>
              <BadgeCheckIcon className='w-5 h-5' /> Постирај го твојот дом.
            </li>
            <li className='flex items-center gap-2'>
              <BadgeCheckIcon className='w-5 h-5' /> Screen tenants.
            </li>
            <li className='flex items-center gap-2'>
              <BadgeCheckIcon className='w-5 h-5' /> Sign a lease.
            </li>
            <li className='flex items-center gap-2'>
              <BadgeCheckIcon className='w-5 h-5' /> Get paid.
            </li>
          </ul>
          <div className='mt-2'>All in one place!</div>
        </BannerSplit.Description>
        <button
          type='button'
          className='px-4 py-2 mt-8 border rounded-full text-primary-600 border-primary-600'
        >
          Постирај го твојот дом, БЕСПЛАТНО
        </button>
      </div>
      <div>
        <BannerSplit.Heading>Купи дом</BannerSplit.Heading>
        <BannerSplit.Description className='mt-4'>
          <ul>
            <li className='flex items-center gap-2'>
              <BadgeCheckIcon className='w-5 h-5' /> Пронајди го твојот дом.
            </li>
            <li className='flex items-center gap-2'>
              <BadgeCheckIcon className='w-5 h-5' /> Screen tenants.
            </li>
            <li className='flex items-center gap-2'>
              <BadgeCheckIcon className='w-5 h-5' /> Sign a lease.
            </li>
            <li className='flex items-center gap-2'>
              <BadgeCheckIcon className='w-5 h-5' /> Get paid.
            </li>
          </ul>
          <div className='mt-2'>All in one place!</div>
        </BannerSplit.Description>
        <button
          type='button'
          className='px-4 py-2 mt-8 border rounded-full text-primary-600 border-primary-600'
        >
          Пронајди го твојот дом
        </button>
      </div>
    </Container>

    <Container className='mt-48 mb-36 flex'>
      <div>
        <div className='max-w-md text-4xl font-semibold '>
          <em className='select-none text-luxury'>Најголема</em> платформа за
          продажба на имоти во Македонија.
        </div>
        <div className='max-w-md mt-4 text-gray-600'>
          Без разлика дали{' '}
          <ScrollText
            input={['купувате', 'продавате', 'изнајмувате']}
            className='font-bold text-primary-600 '
          />
          , тука сме да помомогнеме.
        </div>
      </div>
    </Container>

    <div className='container mx-auto mt-12 space-y-24'>
      <div className='flex flex-col items-center justify-center h-96'>
        <div className='text-4xl font-bold tracking-tighter text-luxury'>
          Прва платформа за продажба на имоти
        </div>
        <div className='max-w-lg mt-4 text-center tex-gray-600'>
          Најпосетена страна за имоти со преку{' '}
          <strong className='whitespace-nowrap text-primary-500'>
            1 милион
          </strong>{' '}
          просечна посетеност месечно
        </div>
        <Link
          className='flex items-center px-8 py-3 mt-6 font-semibold text-white capitalize rounded-full bg-primary-500' // bg-gradient-to-tr from-primary-400 to-primary-600
          href='/signup'
        >
          Приклучи се
        </Link>
      </div>
    </div>
  </main>
)

export default Home
