/**
 *
 * Idea: The components don't have to use hooks that query data when state changes.
 * We should use observables.
 *
 * How to do ComponentDidMount???
 */

import { NextPage } from 'next'
import { useAppSelector } from 'src/store'
import Container from 'src/components/atoms/Container'
import MyHomesCard from 'src/components/organisms/MyHomesCard/MyHomesCard'
import Link from 'src/components/atoms/Link/Link'
import { selectMoiDomovi } from 'src/store/moiDomovi/moiDomoviSlice'
import { selectUid } from 'src/store/user/userSlice'
import { useGetMoiDomovi } from 'src/store/moiDomovi/moiDomoviHooks'
import { useRedirectUnAuthenticatedUsers } from 'src/hooks'

const MyHomes: NextPage = () => {
  useRedirectUnAuthenticatedUsers()
  useGetMoiDomovi()
  const uid = useAppSelector(selectUid)
  const { data } = useAppSelector(selectMoiDomovi)

  return (
    <Container className='min-h-screen pb-20'>
      <div className='flex items-center justify-between mb-4'>
        <div className='text-xl font-semibold text-luxury'>Мои Домови</div>
        <Link
          href='/dom/nov'
          className='bg-luxury px-3 py-1.5 rounded-full text-white'
        >
          Додај нов дом
        </Link>
      </div>
      <div className='grid grid-cols-1 gap-3 md:grid-cols-3'>
        {uid && data?.homes.map((item) => (
          <MyHomesCard key={item.id} home={item} />
        ))}
      </div>
    </Container>
  )
}

export default MyHomes
