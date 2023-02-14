import { Grid, GridItem } from '@chakra-ui/react'
import '@fontsource/ma-shan-zheng'
import useSWR from 'swr'
import DrawnResultsArea from '../../components/drawnResultsArea'
import CountriesName from '../../public/data/participatingCountry.json'
import Loading from '../loading'
import Head from 'next/head'

const fetcher = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}drawn-results`)
    const res = await response.json()
    const { data } = res
    return data
}

function DrawnResults() {
    const { Countries } = CountriesName
    const { data, error } = useSWR(`drawnResults`, fetcher)
    if (!data) 
        return <Loading/>
    
    return (
        <>
            <Head>
        <title>电子抽签结果</title>
        <meta name="description" content="第十一届亚太大专华语辩论公开赛抽签结果" />
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Grid templateColumns={'repeat(2, 1fr)'}>
    {Countries.map((country) => {
        return (
            <GridItem key={country.id}><DrawnResultsArea data={data} area={country}/></GridItem>
        )
    })}
            </Grid>
            </>
    )
}

export default DrawnResults;