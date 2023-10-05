/* eslint-disable react/jsx-props-no-spreading */
import { GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import Container from 'src/components/atoms/Container'
import AgentCard from 'src/components/organisms/AgentCard'
import AgentListing from 'src/components/templates/AgentListing'

const AgentPage = () => (
  <Container>
    <AgentListing>
      {/* <AgentCard
        uid={null}
        email={null}
        name={null}
        agent={false}
        img={null}
        agencyName={null}
        {...sampleAgentProps}
      />
      <AgentCard
        uid={null}
        email={null}
        name={null}
        agent={false}
        img={null}
        agencyName={null}
        {...sampleAgentProps}
      />
      <AgentCard
        uid={null}
        email={null}
        name={null}
        agent={false}
        img={null}
        agencyName={null}
        {...sampleAgentProps}
      /> */}
    </AgentListing>
  </Container>
)

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' }
}
interface Params extends ParsedUrlQuery {
  id: string
}

export const getStaticProps: GetStaticProps<{}, Params> = async (context) => {
  const id = context.params?.id

  return {
    props: {
      id,
    },
  }
}

export default AgentPage
