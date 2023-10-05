import { Avatar, Skeleton } from '@mui/material'
import { useEffect, useState } from 'react'
import { db } from 'src/config/firebase'
import { getDoc, doc } from 'firebase/firestore'
import { condoSwitch } from 'src/components/helpers/helpers'
import { MailIcon, PhoneIcon } from '@heroicons/react/solid'

export interface IAgentBannerProps {
  style?: string
  rating: number
  reviews: number
  uid?: string
}
export interface OwnerProps {
  uid: string
  agencyName: string
  agent: boolean
  email: string
  img: string
  agencyImg: string
  name: string
  phone: string
}

const AgentBanner = ({ style, uid }: IAgentBannerProps) => {
  const defaultOwner = {
    uid: '',
    agencyName: '',
    agent: false,
    email: '',
    img: '',
    agencyImg: '',
    name: '',
    phone: '',
  } as OwnerProps

  const [owner, setOwner] = useState(defaultOwner)
  const [loading, setLoading] = useState(false)

  const fetchOwner = async () => {
    const userId = uid || ''
    const docRef = doc(db, 'korisnici', userId)
    const docSnap = await await getDoc(docRef)
    if (docSnap.exists()) {
      setOwner(docSnap.data() as OwnerProps)
    } else {
      console.log('No such document!')
    }
  }
  useEffect(() => {
    setLoading(true)
    if (uid) {
      fetchOwner()
      setLoading(false)
    }
  }, [uid])

  if (!uid) {
    return (
      <div className='py-2 flex justify-between '>
        <div className='flex items-start justify-between gap-2 mt-3 w-full'>
          <div className='w-full'>
            <div className='text-lg font-medium leading-none'>
              <Skeleton className='  ' />
              <Skeleton className='  ' />
            </div>
            {/* <div className='mt-2 text-sm text-gray-600 truncate'>Bouckville NY</div> */}
            <div className='mt-1 text-md text-gray-600 truncate'>
              <Skeleton className=' w-full ' />
            </div>
            {/* <div className='flex items-center mt-2 text-sm truncate '>
          <span className='font-semibold text-primary-600 '>4.5</span>
          <Rating value={rating} />
          <span className='ml-2 text-gray-600'>
            ({reviews.toLocaleString()} ratings)
          </span>
        </div> */}
          </div>
        </div>
        <div className='w-1/3 '>
          <Skeleton className='  rounded-full  h-full' />
          <div className='inset-0 flex items-center justify-center'>
            <div className='inline-block px-3 py-1 text-sm text-black truncate bg-white bg-opacity-90 rounded-tr-md rounded-bl-md w-full'>
              <Skeleton className='flex w-full ' />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='py-2 flex justify-between bg-gray-50 p-2 my-4 rounded-2xl shadow-md '>
      <div className='flex items-start justify-between gap-2 mt-3'>
        <div>
          <div className='text-lg font-medium leading-none capitalize'>
            {condoSwitch(style || '')}{' '}
            {condoSwitch(style || '').includes('Стан') ||
              condoSwitch(style || '').includes('Имот')
              ? 'постиран'
              : 'постирана'}{' '}
            од {owner.name}
          </div>
          {/* <div className='mt-2 text-sm text-gray-600 truncate'>Bouckville NY</div> */}
          <a href={`tel:${owner.phone}`}>
            <div className='mt-1 text-md text-gray-600 truncate flex items-center'>
              <PhoneIcon className='w-4 h-4' />   <p className='pl-2'> {owner.phone}</p>
            </div>
          </a>
          {owner.agent &&
            <div className='mt-1 text-md text-gray-600 truncate flex items-center'>
              <MailIcon className='w-4 h-4' />  <p className='pl-2'>  {owner.email}</p>
            </div>}
          {/* <div className='flex items-center mt-2 text-sm truncate '>
          <span className='font-semibold text-primary-600 '>4.5</span>
          <Rating value={rating} />
          <span className='ml-2 text-gray-600'>
            ({reviews.toLocaleString()} ratings)
          </span>
        </div> */}
        </div>
      </div>
      <div className=' '>
        <Avatar
          alt=''
          src={owner.agent ? owner.agencyImg : owner.img}
          className='mx-4'
          sx={{ width: 60, height: 60 }}
        />
        <div className='inset-0 flex items-center justify-center'>
          <div className='inline-block px-3 py-1 text-sm text-black truncate bg-white bg-opacity-90 rounded-tr-md rounded-bl-md'>
            {owner.agent ? owner.agencyName : owner.name}
          </div>
        </div>
      </div>
    </div >
  )
}

export default AgentBanner
