import { Children } from 'src/types'

export interface IAgentListingProps {}

const AgentListing = ({ children }: { children: Children }) => (
  <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 pb-24'>
    {children}
  </div>
)

export default AgentListing
