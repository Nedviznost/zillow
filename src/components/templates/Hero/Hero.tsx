import { useRouter } from 'next/dist/client/router'
import { LocationSearch } from 'src/components/organisms/SearchHomesFilter/filterUtils'

export interface IHeroProps {
  className?: string
}

const Hero = ({ className }: IHeroProps) => {
  const router = useRouter()

  return (
    <div
      className={`flex flex-col items-center justify-center w-screen h-2/5 bg-fixed bg-cover-z-10 bg-opacity-80  bg-bottom bg-hero ${className}`}
    >
      <div className='my-auto'>
        <div className='text-5xl font-black tracking-tight text-center text-white sm:text-6xl md:max-w-4xl lg:text-7xl leading-90p'>
          Промената започнува <br /> <em>тука</em>
        </div>
        <LocationSearch
          className='mt-12 '
          onChange={() => router.push({ pathname: '/homes' }, '/homes')}
        />
      </div>
    </div>
  )
}

export default Hero
