import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import Skeleton from 'src/components/molecules/Skeleton'
import { useAppSelector } from 'src/store'
import Image from 'src/components/atoms/Image2'
import { selectUid } from 'src/store/user/userSlice'
import { useGetWishlistedHomesDetailedQuery } from 'src/generated/graphql'
import Container from 'src/components/atoms/Container'
import Link from 'src/components/atoms/Link/Link'
import HeartIconSolid from '@heroicons/react/solid/HeartIcon' 
import { useRedirectUnAuthenticatedUsers } from 'src/hooks'

const Grid = ({ children }: { children: React.ReactNode }) => (
  <div className='grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-3'>
    {children}
  </div>
)

const WishlistPage: NextPage = () => {
  useRedirectUnAuthenticatedUsers()

  const uid = useAppSelector(selectUid)

  const [{ data, fetching }] = useGetWishlistedHomesDetailedQuery({
    variables: {
      uid: uid!,
    },
    pause: !uid,
  })

  const wishlistCount = data?.wishlisted.length || 0

  if (fetching) {
    return (
      <Container className='min-h-screen'>
        <div className='mb-4 text-xl'>Посакувани</div>
        <Grid>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Skeleton key={item} className='w-full h-64 rounded' />
          ))}
        </Grid>
      </Container>
    )
  }

  if (wishlistCount === 0) {
    return (
      <div className='flex items-center justify-center gap-2 h-screen50'>
        <div>Не се пронајдени посакувани</div>
      </div>
    )
  }

  return (
    <Container className='min-h-screen'>
      <div className='flex'>
        <span className='mb-4 text-xl'>Посакувани </span>
        <HeartIconSolid className='w-8 h-8 p-1 fill-red' />
      </div>
      <Grid>
        {data?.wishlisted.map((item) => (
          <div key={item.id} className='relative '>
            <Link href={`/dom/${item.hId}`}>
              <Image
                alt=''
                height={130}
                className=''
                src={
                  (item.home &&
                    item.home.imgs &&
                    item.home.imgs[0].url) ||
                  ''
                }
              />
            </Link>
            <div className='mt-2 text-sm text-gray-600'>
              {(item.home && item.home.address) || ''}
            </div>
            <div className='mt-1 mb-2 font-medium'>
              € {item.home && item.home.price.toLocaleString()}
            </div>
          </div>
        ))}
      </Grid>
    </Container>
  )
}

export default WishlistPage
