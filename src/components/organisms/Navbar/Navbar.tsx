/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @next/next/no-html-link-for-pages */
import { useRouter } from 'next/router'
import * as React from 'react'
import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'src/store'
import MyLink from 'src/components/atoms/Link'
import PopoverParent, {
  PopoverGroup,
} from 'src/components/molecules/PopoverMenuItem'
import Sidebar from 'src/components/molecules/Sidebar'
import MenuIcon from '@heroicons/react/outline/MenuIcon'
import { signout } from 'src/store/user'
import Brand from 'src/components/atoms/Brand'
import { selectUserName, selectUid, selectUser } from 'src/store/user/userSlice'
import Container from 'src/components/atoms/Container/Container'
import Button from 'src/components/atoms/Button/Button'
import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import Link from 'next/link'
import { selectMapList, setList } from 'src/store/map/mapSlice'
import { selectHomesActive } from 'src/store/home/homeSlice'

export interface INavbarProps { }


const ButtonLink = ({ title, url }: { title: string; url: string }) => (
  <MyLink
    href={url}
    className='py-1.5 px-4 text-sm rounded-full border border-primary-600 font-medium text-primary-600 capitalize'
  >
    {title}
  </MyLink>
)


const NavSidebar = ({
  open,
  setOpen,
  uid,
  name,
}: {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  uid: string | null | undefined
  name: string | null | undefined
}) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)



  return (
    <Sidebar open={open} setOpen={setOpen}>
      <Sidebar.Header setOpen={setOpen} />
      <Sidebar.Body>
        <div className='flex flex-col gap-2'>
          {uid && (
            <Link href='/profil' >
              {/* <a onClick={() => setOpen(false)}> */}
              Мој профил
              {/* </a> */}
            </Link>
          )}
          {uid && (
            <Link href='/posakuvani' >
              {/* <a onClick={() => setOpen(false)}> */}
              Посакувани
              {/* </a> */}

            </Link>
          )}
          {uid && (
            <Link href='/dom/moi'  >

              Мои домови

            </Link>
          )}
          {uid && (
            <Link href='/dom/nov' >

              Додај нов дом

            </Link>
          )}
          <Link href='/agencii' >

            Агенции

          </Link>
          <p className='text-center text-xs'> Инфо линкови </p>
          <div className=' border-b border-gray-400' />
          <Link href='/detali' >

            Детали

          </Link>

        </div>
        <div className='flex flex-col items-start h-full'>
          <div className='w-full h-full flex items-center justify-center text-center flex-col'>
            {!uid && (
              <h1 className=' text-2xl'>
                Мора да сте пријавни за да имате достап до менито
              </h1>
            )}
            {!uid && (
              <>
                <MyLink
                  href='/login'
                  className='py-2 block w-full border text-center mt-1.5 capitalize'
                >
                  Најави се
                </MyLink>
                <MyLink
                  href='/signup'
                  className='py-2 block w-full  border text-center mt-1.5 capitalize'
                >
                  Креирај нов профил
                </MyLink>
              </>
            )}
          </div>
        </div>
      </Sidebar.Body>
      <Sidebar.Footer>
        {!uid ? (
          <>
            <MyLink
              href='/login'
              className='py-2 block w-full border border-primary-500 rounded-full text-primary-500 text-center mt-1.5 font-medium capitalize'
            >
              Логирај се
            </MyLink>
            <MyLink
              href='/signup'
              className='py-2 block w-full bg-primary-500 font-medium border border-primary-500 rounded-full text-white text-center mt-1.5 capitalize'
            >
              Приклучи се
            </MyLink>
          </>
        ) : (
          <MyLink href='/profil' className='flex items-center justify-between'>
            <Avatar src={user?.img || ''} />
            {name || ''}
            <Button
              variant='outlined'
              color='black'
              onClick={() => dispatch(signout())}
            >
              Одјави се
            </Button>
          </MyLink>
        )}
      </Sidebar.Footer>
    </Sidebar>
  )
}

const pathWithFixedNav: string[] = []

const settings = [
  {
    name: 'Профил',
    url: '/profil',
  },
  {
    name: 'Посакувани ♥',
    url: '/posakuvani',
  },
  {
    name: 'Мои домови',
    url: '/dom/moi',
  },
  {
    name: 'Агенции',
    url: '/agencii',
  },
]

const Navbar = () => {
  const router = useRouter()
  const url = router.pathname
  const navCls = useMemo(
    () => (pathWithFixedNav.includes(url) ? 'absolute' : 'fixed'),
    [url]
  )
  const [open, setOpen] = useState(false)
  const uid = useAppSelector(selectUid)
  const userName = useAppSelector(selectUserName)

  const dispatch = useAppDispatch()
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setTimeout(() => {
      setAnchorElUser(null)
    }, 200)
  }
  const user = useAppSelector(selectUser)
  const show = useAppSelector(selectMapList)
  const homesActive = useAppSelector(selectHomesActive)
  const [showAlt, setShowAlt] = useState(false)

  return (
    <nav
      className={`${navCls} z-30 flex items-center justify-center w-full  h-16 bg-white/90 border-b-2 border-white/80 top`}
    >
      <div className='relative w-full'>
        <NavSidebar open={open} setOpen={setOpen} uid={uid} name={userName} />
        <Container className='flex  justify-between w-full max-w-6xl h-10'>
          <div className='flex lg:hidden'>
            {(url === "/") && <button
              type='button'
              className={!showAlt ? 'text-primary-500' : ' text-gray-700'}
              onClick={() => {
                setShowAlt((prevState) => !prevState)
                dispatch(setList(showAlt))
              }}
            >
              {!show ? 'Мапа' : 'Листа'} {`(${homesActive.length})`}
            </button>}
          </div>
          <MyLink href='/' className='  font-black text-primary-600 '>
            <Brand />
          </MyLink>
          <div className='hidden md:block' />
          <div className='flex lg:hidden'>
            <button type='button' onClick={() => setOpen((state) => !state)}>
              <MenuIcon className='w-8 h-8 text-primary-600' />
            </button>
          </div>
          <div className='hidden py-2 lg:flex'>
            <PopoverGroup className='z-40 flex items-center ml-auto space-x-4'>
              {!uid ? (
                <>
                  <ButtonLink title='Логирај се' url='/login' />
                  <ButtonLink title='Креирај акаунт' url='/signup' />
                </>
              ) : (
                <PopoverParent>
                  <Box
                    sx={{ flexGrow: 0, cursor: 'pointer' }}
                    onClick={handleOpenUserMenu}
                  >
                    <span className='pr-2 capitalize'> {user?.name}</span>
                    <Tooltip title='Отвори опции'>
                      <IconButton sx={{ p: 0 }}>
                        <Avatar
                          src={user?.img ||
                            '/no_cover.png'
                          }
                        />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: '45px' }}
                      id='menu-appbar'
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      {settings.map((setting) => (
                        <Link href={setting.url} key={setting.name} passHref>
                          <MenuItem onClick={handleCloseUserMenu}>
                            {setting.name}
                          </MenuItem>
                        </Link>
                      ))}
                      <MyLink
                        href='/dom/nov'
                        className='bg-luxury w-full mx-2 px-3 py-1.5 rounded-full text-white'
                      >
                        Додај нов
                      </MyLink>
                      <MenuItem onClick={() => dispatch(signout())}>
                        Одјави се
                      </MenuItem>
                    </Menu>
                  </Box>
                </PopoverParent>
              )}
            </PopoverGroup>
          </div>
        </Container>
      </div>
    </nav>
  )
}

export default Navbar
