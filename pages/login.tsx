import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import Login from 'src/components/templates/Login/Login'
import { useAuthPageResponses, useRedirectLoggedInUsers } from 'src/hooks'

const LoginPage: NextPage = () => {
  useRedirectLoggedInUsers()
  useAuthPageResponses()

  return (
    <div>
      <NextSeo
        title='Недвижност.мк - Страна за најава'
        description='Најави се на недвижности.мк'
      />
      <Login />
    </div>
  )
}

export default LoginPage
