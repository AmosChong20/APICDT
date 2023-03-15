import { ChakraProvider } from '@chakra-ui/react'
import '../styles/globals.css'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { SessionProvider } from 'next-auth/react'
import { Analytics } from '@vercel/analytics/react';
import Head from 'next/head'
import { ThemeProvider,createTheme } from '@mui/material/styles';
import Maintenance from './maintenance'

function MyApp({ Component, pageProps }) {

  const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE_MODE

  if (isMaintenance) {
    return <Maintenance/>
  }

  return (
    <SessionProvider session={pageProps.session}>
      <ChakraProvider>
        <Head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        </Head>
      <NavBar/>
        <Component {...pageProps} />
        <Analytics />
          <Footer />
        </ChakraProvider>
      </SessionProvider>
  )
}

export default MyApp
