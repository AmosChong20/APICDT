import { Grid, GridItem, Flex } from '@chakra-ui/react'
import '@fontsource/ma-shan-zheng'
import useSWR from 'swr'
import DrawnResultsArea from '../../components/drawnResultsArea'
import CountriesName from '../../public/data/participatingCountry.json'
import Loading from '../loading'
import Head from 'next/head'
import { useState, useEffect } from 'react'

const fetcher = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}drawn-results`)
    const res = await response.json()
    const { data } = res
    return data
}

function DrawnResults() {
    const { Countries } = CountriesName
    const [notTimeYet, setNotTimeYet] = useState(true)
    const { data, error } = useSWR(`drawnResults`, fetcher)

    useEffect(() => {
        if (new Date() < new Date('2023-03-17T17:00:00')) {
            setNotTimeYet(true)
        }
        else {
            setNotTimeYet(false)
        }
    }, [])

    if (!data) 
        return <Loading />

    return (
        <>
            <Head>
        <title>电子抽签结果</title>
        <meta name="description" content="第十一届亚太大专华语辩论公开赛抽签结果" />
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <link rel="icon" href="/favicon.ico" />
            </Head>
            {notTimeYet && <Flex justify={'center'} mt={'70px'} ml={'-15px'} fontFamily={'ZCOOL XiaoWei'} fontSize={'26px'} h={'92vh'} color='black'>电子抽签系统暂未开放！</Flex>}
            {!notTimeYet &&
                <Grid templateColumns={'repeat(2, 1fr)'}>
                    {Countries.map((country) => {
                        return (
                            <GridItem key={country.id}><DrawnResultsArea data={data} area={country} /></GridItem>
                        )
                    })}
                </Grid>}
            </>
    )
}

export default DrawnResults;