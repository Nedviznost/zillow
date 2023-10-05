/* eslint-disable @next/next/link-passhref */
import {
  GetMyHomesQuery,
  SetHomePublishedDocument,
} from 'src/generated/graphql'
import Image from 'src/components/atoms/Image'
import { getHomeTypes } from 'src/store/static'

import { Switch } from '@headlessui/react'
import { useState } from 'react'
import { client } from 'src/config/urqlClientWonka'
import { notify } from 'src/hooks'
import Link from 'next/link' 
import { Button } from '@mui/material'

export interface IMyHomesCardProps {
  home: GetMyHomesQuery['homes'][number]
}

const setPublishedState = ({
  id,
  published,
}: {
  id: number
  published: boolean
}) => {
  client
    .mutation(SetHomePublishedDocument, {
      id,
      published,
    })
    .toPromise()
    .then((result) => {
      if (result.error) {
        notify({ message: `Oops something went wrong.`, type: 'error' })
      }
      const publishedState = result.data.update_homes_by_pk.published

      if (result.data.update_homes_by_pk) {
        if (publishedState)
          notify({ message: `Домот е објавен. Секој може да го види` })
        else notify({ message: `Домот е скриен. Никој неможе да го види.` })
      }
    })
    .catch((err) =>
      notify({ message: `Oops. something went wrong.`, type: 'error' })
    )
}

const MyHomesCard = ({ home }: IMyHomesCardProps) => {
  const [published, setPublished] = useState(() => home.published)
  const homePlan = getHomeTypes(home.plan)

  return (
    <div key={home.id}>
      <div className='relative h-64 overflow-hidden border border-white rounded shadow-lg'>
        <Link href={`/dom/${home.id}`} >
          <Image
            alt=''
            layout='fill'
            src={home.imgs && home.imgs[0].url}
            className='h-full  cursor-pointer'
          />
        </Link>
        <div className='absolute top-0 left-0 '>
          <div className='z-10 text-white '>
            <div className={` px-1 py-2 text-xs  ${homePlan.bg}`}>
              {homePlan.displayName}
            </div>
          </div>
        </div>
        <div className='absolute top-0 right-0 '>
          <div className='z-10 text-white bg-gray'>
            <div className={` px-2 py-2  `}>
              {home.id}
            </div>
          </div>
        </div>
      </div>
      <div className='mt-2 ml-1 '>
        <div className='font-semibold'>€ {home.price}</div>
        <div className='mt-1 text-gray-800'>{home.address}</div>
        <div className='flex justify-between items-center py-1 mt-1 text-sm text-gray-800'>
          <div className='flex items-center gap-2 '>
            <div>Јавно:</div>
            <Switch
              checked={published || false}
              onChange={(v: any) => {
                setPublished(v)
                setPublishedState({ id: home.id, published: v })
              }}
              className={` ${published ? 'bg-luxury' : 'bg-gray-200'
                } relative inline-flex homes-center p-1 h-6 shadow-inner rounded-full w-12`}
            >
              <span
                className={`${published ? 'translate-x-6' : 'translate-x-0'
                  } inline-block w-4 h-4  transform bg-white rounded-full transition-transform`}
              />
            </Switch>
          </div>

          <Link
            href={`/dom/izmeni/${home.id}`}
          >
            <Button>
              Измени
            </Button>
          </Link>
        </div>

      </div>
    </div >
  )
}

export default MyHomesCard
