import { ReactElement } from 'react'
import { SkipNavContent, SkipNavLink } from '@reach/skip-nav'

import { useRouter } from 'next/router'
import Navbar from '../../organisms/Navbar'
import Footer from '../../organisms/Footer'

interface ILayoutProps {
  children: ReactElement | ReactElement[]
}

const NoNavUrls = ['/signup', '/login']

const Layout = ({ children }: ILayoutProps) => {
  const url = useRouter().pathname

  return NoNavUrls.includes(url) ? (
    <main>{children}</main>
  ) : (
    <>
      <Navbar />
      <div className='pb-20' />
      <main>
        <SkipNavContent />
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout
