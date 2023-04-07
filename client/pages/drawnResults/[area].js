import '@fontsource/ma-shan-zheng'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import DrawnResultsArea from '../../components/drawnResultsArea'
import Loading from '../loading'
import Head from 'next/head'
import { useState } from 'react'

const fetcher = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}drawn-results`)
    const res = await response.json()
    const { data } = res
    return data
}

function Area({ drawnResults }) {
    const router = useRouter()
    const { area } = router.query
    // const { data, error } = useSWR(`drawnResults/${area}`, fetcher)
    const [load, setLoad] = useState(true)
    const res = drawnResults
    const drawnData = res?.entries

    setTimeout(() => {
        setLoad(false)
    }, 2000)

    if (!drawnData) 
        return <Loading/>
    return ( 
        <>
            <Head>
        <title>电子抽签结果</title>
        <meta name="description" content="第十一届亚太大专华语辩论公开赛地区抽签结果" />
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <link rel="icon" href="/favicon.ico" />
            </Head>
            {load && <Loading/>}
            <DrawnResultsArea data={drawnData} area={area} />
            </>
     );
}

export default Area;

export async function getServerSideProps(context) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_STARWARS_URL}get-leaderboard`, {
        method: 'GET',
        headers: {
            'Content-headers': 'application/json'
        }
    })

    const res = await response.json()
    return {
        props: {
            drawnResults: res
        }
    }
}