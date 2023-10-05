import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import Container from 'src/components/atoms/Container/Container'
import TripGuide from 'src/components/organisms/TripGuide/TripGuide'

const NotFoundPage: NextPage = () => (
  <div>
    <NextSeo
      title='Не пронајдена страна - Невижности.мк'
      description='Креирај акаунт со емаил'
    />
    <div className='min-h-screen mt-12'>
      <Container className='flex flex-col justify-center h-full'>
        <div className='max-w-sm'>
          <div className='text-lg font-semibold'>
            404 | Страната не е пронајдена.
          </div>
          <div className='mt-8 mb-16 text-gray-600'>
            Во меѓувреме провери ја{' '}
            <span className='text-red'>мапата за снаоѓање</span>{' '}
          </div>
        </div>
        <TripGuide />
      </Container>
    </div>
  </div>
)

export default NotFoundPage
