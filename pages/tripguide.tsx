import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import Container from 'src/components/atoms/Container/Container'
import TripGuide from 'src/components/organisms/TripGuide/TripGuide'

const NotFoundPage: NextPage = () => (
  <div>
    <NextSeo
      title='Не е пронајдена страната | Недвижност.мк'
      description='Креирај акаунт со твојот google или емаил.'
    />
    <div className='min-h-screen mt-12 bg-primary-25'>
      <Container className='flex flex-col justify-center h-full'>
        <TripGuide />
      </Container>
    </div>
  </div>
)

export default NotFoundPage
