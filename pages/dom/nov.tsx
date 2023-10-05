/**
 *
 * Idea: The components don't have to use hooks that query data when state changes.
 * We should use observables.
 *
 * How to do ComponentDidMount???
 */

import { NextPage } from 'next'
import Container from 'src/components/atoms/Container'
import AddNewHomeTemplate from 'src/components/templates/AddNewHomeTemplate'
import { NextSeo } from 'next-seo'

const NewHome: NextPage = () => (
  <>
    <NextSeo
      title='Додај нов дом | Недвижност.мк - Платформа за продавање и купување на имоти во Македонија.'
      description='Недвижност.мк - Платформа за продавање и купување на имоти во Македонија.'
    />
    <Container>
      <AddNewHomeTemplate />
    </Container>
  </>
)

export default NewHome
