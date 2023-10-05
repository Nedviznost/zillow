/* eslint-disable @next/next/no-img-element */

export interface IAgentCardProps {
  uid: string | null
  email: string | null
  name: string | null
  agent: boolean
  phone: string | null
  img: string | null
  agencyImg: string | null
  agencyName: string | null
}

const AgentCard = ({ agencyName, name, phone, agencyImg }: IAgentCardProps) => (
  <div className='mb-5'>
    <div className='relative h-56 overflow-hidden border border-white rounded-lg shadow-md'>
      <img
        className='absolute inset-0 h-full w-full object-cover object-top'
        alt=''
        src={agencyImg || ""}
      />
      <div className='absolute inset-0 flex items-end justify-start'>
        <div className='inline-block px-3 py-1 text-black truncate bg-white bg-opacity-90 rounded-tr-md rounded-bl-md'>
          {agencyName}
        </div>
      </div>
    </div>
    <div className='flex items-start justify-between gap-2 mx-1 mt-3'>
      <div>
        <div className='text-lg font-medium leading-none'>{name}</div>
        {/* <div className='mt-2 text-sm text-gray-600 truncate'>Bouckville NY</div> */}
        <div className='mt-1 text-sm text-gray-600 truncate'>{phone}</div>
        <div className='flex items-center mt-2 text-sm truncate '>
          {/* <span className='font-semibold text-primary-600 '>4.5</span>
          <Rating value={rating} />
          <StarIcon className='w-4 h-4 ml-0.5 text-primary-600' />
          <span className='ml-2 text-gray-600'>
            ({reviews.toLocaleString()} ratings)
          </span> */}
        </div>
      </div>
    </div>
  </div>
)

export default AgentCard
