import Head from 'next/head'
import Header from '../components/header'
import Timelines from '../components/Timelines'
import styles from '../styles/Home.module.css'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Loading from './loading'
import Rankings from '../components/Rankings'
// import logo from '../public/logo/logoF.png'

export default function Home({ rankings }) {
  const res = rankings
  const { data: session, status } = useSession()
  const router = useRouter()
  useEffect(() => {
    if (status != 'loading' && session) {
      if (session.user.role === 'Committee') {
        router.push('/userHome')
      }
      else if (session.user.role === 'Judge') {
        router.push('/matches')
      }
      else if (session.user.role === 'Participant') {
        router.push('/userHome')
      }
    }
  }, [session, status])

  if (status === 'loading') {
    return (
      <Loading/>
    )
  }
  
  return (
    <div>
      <Head>
        <title>亚太辩论</title>
        <meta name="description" content="第十一届亚太大专华语辩论公开赛" />
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <meta name="google-site-verification" content="byoMix_03ekYKtLn9WcCnMAg1KBR0X4Tyu3ko7toHv4" />
        <link rel='canonical' href='https://apicdt2023.com'/>
        {/* <link rel="shortcut icon" href="/images/favicon.ico" /> */}
      </Head>

      <div>
        <Header title="第十一届亚太大专华语辩论公开赛"/>
        <Timelines  />
        {/* <Rankings ranking={res}/> */}
      </div>
    </div>
  )
}
export async function getServerSideProps(context) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}schools`, {
      method: 'GET',
      headers: {
          'Content-type': 'application/json'
      }
  })
  const res = await response.json()

  return {
      props: {
          rankings: res
      }
  }
}
