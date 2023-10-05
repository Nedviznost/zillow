/* eslint-disable react/jsx-props-no-spreading */
import { GetStaticProps } from 'next'
import AgentCard from 'src/components/organisms/AgentCard'
import Container from 'src/components/atoms/Container'
import Badge from 'src/components/atoms/Badge'
import AgentListing from 'src/components/templates/AgentListing'
import { useAppSelector } from 'src/store'
import { selectAgents } from 'src/store/agent/agentSlice'
import { Agent } from 'src/types'
import { useGetAgents } from 'src/store/agent/agentHooks'

const AgentListingPage = () => {
  useGetAgents()
  const agents = useAppSelector(selectAgents)
  if (!agents) {
    return (
      <Container>
        <div className='flex items-center gap-1 mb-6 text-xl'>
          <div>Агенции</div>{' '}
          <Badge size='sm' variant='primary'>
            Активни агенции
          </Badge>
        </div>

        <AgentListing>{/* <AgentCard {...sampleAgentProps} /> */}</AgentListing>
      </Container>
    )
  }

  return (
    <Container>
      <div className='flex items-center gap-1 mb-6 text-xl'>
        <div>Агенции</div>{' '}
        <Badge size='sm' variant='primary'>
          Активни агенции
        </Badge>
      </div>

      <AgentListing>
        {agents.data.map((agent: Agent) => (
          <AgentCard key={agent.uid} {...agent} />
        ))}
      </AgentListing>
    </Container>
  )
}

export const getStaticProps: GetStaticProps = () => ({
  props: {},
})

export default AgentListingPage
