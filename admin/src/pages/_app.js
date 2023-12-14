import React from 'react'
import '../_axios'
import '../styles/remixicon.css'
import 'react-tabs/style/react-tabs.css'
import { Inter } from 'next/font/google'

// Chat Styles
import '../styles/chat.css'
// Globals Styles
import '../styles/globals.css'
// Rtl Styles
import '../styles/rtl.css'
// Dark Mode Styles
import '../styles/dark.css'
// Left Sidebar Dark Mode Styles
import '../styles/leftSidebarDark.css'
// Theme Styles
import theme from '../styles/theme'

import { ThemeProvider, CssBaseline } from '@mui/material'
import Layout from '@/components/_App/Layout'
import { SessionProvider } from 'next-auth/react'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700']
})

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  console.log(Component)
  return (
    <main className={inter.className}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SessionProvider session={session}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </ThemeProvider>
    </main>
  )
}

export default MyApp
