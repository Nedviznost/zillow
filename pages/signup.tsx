import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import SignUp from 'src/components/templates/Signup'
import { useAuthPageResponses, useRedirectLoggedInUsers } from 'src/hooks'

const Signup: NextPage = () => {
  useRedirectLoggedInUsers()
  useAuthPageResponses()
  return (
    <div>
      <NextSeo
        title='Најава | Недвижност.мк Купи продај изнајми имот'
        description='Недвижност.мк Купи продај изнајми имот во Македонија.'
      />
      <SignUp />
    </div>
  )
}

export default Signup
