import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import LeftSidebar from '@/components/_App/LeftSidebar'
import TopNavbar from '@/components/_App/TopNavbar'
import Footer from '@/components/_App/Footer'
import ScrollToTop from './ScrollToTop'
import ControlPanelModal from './ControlPanelModal'
import { useSession } from 'next-auth/react'

const Layout = ({ children }) => {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [active, setActive] = useState(false)

  const toogleActive = () => {
    setActive(!active)
  }

  const showPanel =
    status === 'authenticated' &&
    !(
      router.pathname === '/authentication/sign-in' ||
      router.pathname === '/authentication/forgot-password' ||
      router.pathname === '/authentication/lock-screen' ||
      router.pathname === '/authentication/confirm-mail' ||
      router.pathname === '/authentication/session-expired' ||
      router.pathname === '/authentication/logout'
    )

  return (
    <>
      <Head>
        <title>Humcen - Cross Border IP Platform</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>

      <div className={`main-wrapper-content ${active && 'active'}`}>
        {showPanel && (
          <>
            <TopNavbar toogleActive={toogleActive} />
            <LeftSidebar toogleActive={toogleActive} />
          </>
        )}

        <div className='main-content'>
          {children}
          {showPanel && <Footer />}
        </div>
      </div>

      {/* ScrollToTop */}
      <ScrollToTop />
      {showPanel && <ControlPanelModal />}
    </>
  )
}

export default Layout
