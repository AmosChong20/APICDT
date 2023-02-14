import { ChakraProvider } from '@chakra-ui/react'
import '../styles/globals.css'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { SessionProvider } from 'next-auth/react'
import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
    <ChakraProvider>
      <NavBar/>
        <Component {...pageProps} />
        <Analytics />
    <Footer/>
        </ChakraProvider>
      </SessionProvider>
  )
}

export default MyApp
