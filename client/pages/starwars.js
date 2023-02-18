import { Flex, Heading, Box, Button, Stack, Select, Alert, AlertIcon, AlertTitle } from '@chakra-ui/react'
import "@fontsource/ma-shan-zheng"
import "@fontsource/montserrat"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import AlertDialog from '../components/alert'
import { useSession } from 'next-auth/react'
import countries from '../public/data/participatingCountry.json'
import moment from 'moment'
import Loading from './loading'
import Head from 'next/head'

function Starwars({ initialTime }) {
    const { data: session } = useSession()
    const { Countries } = countries

    const [date, setDate] = useState(new Date())
    const [submitted, setSubmitted] = useState(false)
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [showFailAlert, setShowFailAlert] = useState(false)
    const [showTimeAlert, setTimeAlert] = useState(false)
    const [area, setArea] = useState()
    const router = useRouter()

    useEffect(() => {
        const timerForTime = setInterval(() => setDate(Date.now()), 999)
        
        return () => {
            clearInterval(timerForTime)
        }
    }, [])

    if (!date) {
        return (
            <Loading/>
        )
    }

    if (!session) 
        return (
            <Loading/>
        )
    const email = session.user.email

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!area) {
            setShowFailAlert(true)
            setTimeout(() => {
                setShowFailAlert(false)
            }, 500)
            return null
        }
        const endTime = date
        const startTime = new Date('2023-02-18T15:30:00')
        const newDuration = endTime - startTime.getTime()
        if (newDuration < 0) {
            setTimeAlert(true)
            setTimeout(() => {
                setTimeAlert(false)
            }, 500)
            return null
        }
        const duration = newDuration / 1000
        setSubmitted(true)
        setShowSuccessAlert(true)
        setTimeout(() => {
            setShowSuccessAlert(false)
            router.push(`/drawnResults/${area}`)
        }, 2000)

        try {
            const userResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}schools?filters[leaderEmail][$eq]=${email}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                }
            })
            console.log(email)
            const userRes = await userResponse.json()
            const schoolName = userRes.data[0].attributes.schoolNameCN
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}drawn-results`, {
                method: 'POST',
                body: JSON.stringify({
                    data: {
                        area: area,
                        schoolName: schoolName,
                        timeUsed: duration
                    }
                }),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            console.log(response)
            const res = await response.json()
            const { data } = res
        }
        catch (e) {
            console.log(e)
        }

    }

    if (session === null) {
        router.push('/login')
    }

    return ( 
        <>
            <Head>
        <title>电子抽签系统</title>
        <meta name="description" content="第十一届亚太大专华语辩论公开赛抽签" />
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
            <Flex fontFamily={'Ma Shan Zheng'} h={'92vh'} justify='center' align='center' flexDirection={'column'}>
            {showSuccessAlert ? <Flex justify={'center'} position='absolute' mt='-400px'>
                        <Alert status='error' zIndex={1} color={'black'} w={'50vw'}>
                        <AlertIcon />
                        <AlertTitle>成功提交！页面将于5秒后跳转！</AlertTitle>
                                </Alert>
                        </Flex> : <Box></Box>}
                        {showFailAlert ? <Flex justify={'center'} position='absolute' mt='-400px'>
                        <Alert status='error' zIndex={1} color={'black'} w={'50vw'} >
                        <AlertIcon />
                        <AlertTitle>请选择地区！</AlertTitle>
                                </Alert>
                </Flex> : <Box></Box>}
                {showTimeAlert ? <Flex justify={'center'} position='absolute' mt='-400px'>
                        <Alert status='error' zIndex={1} color={'black'} w={'50vw'}>
                        <AlertIcon />
                        <AlertTitle>还未到抽签时间！</AlertTitle>
                                </Alert>
                        </Flex> : <Box></Box>}
            <Stack align={'center'}>
                {/* <Heading mb={10} fontSize={100}>{`${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`}</Heading> */}
                {/* <Text fontFamily={'Montserrat'} fontWeight={800} fontSize={100} mb={10}><Time value={date} format="hh:mm:ss" /></Text> */}
                <Select borderColor={'Black'} w='150px' placeholder='地区' onChange={(e) => {setArea(e.target.value)}} zIndex={0}>
                        {Countries.map(country => {
                            return (
                                <option key={country.id}>{country}</option>
                                )
                            })}
                        </Select>
                <Heading fontSize={138} mb={10}>{moment(date).format("hh:mm:ss a")}</Heading>
                <Button fontSize={'72px'} p={10} mb={20} onClick={handleSubmit}>提交</Button>
            </Stack>
            {/* {submitted ? <Button mt={10}><Link href='/'>查看结果</Link></Button> : <Box></Box>} */}
            </Flex>
            </>
    );
}

Starwars.auth = true
export default Starwars;

Starwars.getInitialProps = async () => {
    const time = moment().format("hh:mm:ss a")

    return {
        props: {
            initialTime: time
        }
    }
}