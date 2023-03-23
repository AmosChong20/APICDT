import { Flex, Heading, Box, Button, Stack, Select, Alert, AlertIcon, AlertTitle } from '@chakra-ui/react'
import "@fontsource/ma-shan-zheng"
import "@fontsource/montserrat"
import "@fontsource/zcool-xiaowei"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import AlertDialog from '../components/alert'
import { useSession } from 'next-auth/react'
import countries from '../public/data/participatingCountry.json'
import moment from 'moment'
import Loading from './loading'
import Head from 'next/head'
import starTime from '../public/data/starwars.json'

function Starwars({ initialTime }) {
    const { data: session } = useSession()
    const { Countries } = countries
    const { Starwars } = starTime

    const [date, setDate] = useState(new Date())
    const [submitted, setSubmitted] = useState(false)
    const [notTimeYet, setNotTimeYet] = useState(false)
    const [afterTime, setAfterTime] = useState(false)
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [showFailAlert, setShowFailAlert] = useState(false)
    const [showTimeAlert, setTimeAlert] = useState(false)
    const [showRepeatAlert, setRepeatAlert] = useState(false)
    const [area, setArea] = useState()
    const [selectedArea, setSelectedArea] = useState()
    const router = useRouter()

    // useEffect(() => {
    //     const timerForTime = setInterval(() => setDate(Date.now()), 1000)
        
    //     return () => {
    //         clearInterval(timerForTime)
    //     }
    // }, [])

    // useEffect(() => {
    //     if (new Date() < new Date('2023-03-17T17:00:00')) {
    //         setNotTimeYet(true)
    //     }
    //     else {
    //         setNotTimeYet(false)
    //     }
    // }, [])

    // if (!date) {
    //     return (
    //         <Loading />
    //     )
    // }

    if (!session)
        return (
            <Loading />
        )
    const email = session.user.email

    if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@demo.com$/)) {
        return (
            <Flex justify={'center'} mt={'70px'} ml={'-15px'} fontFamily={'ZCOOL XiaoWei'} fontSize={'26px'} h={'92vh'} color='black'>电子抽签系统暂未开放！</Flex>
        )
    }

    const handleAreaChange = async (e) => {
        console.log(e.target.value)
        if (!e.target.value) {
            setSelectedArea(null)
            return null
        }
        setArea(e.target.value)
        setSelectedArea(Starwars.filter((country) => country.area === e.target.value))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // if (!area) {
        //     setShowFailAlert(true)
        //     setTimeout(() => {
        //         setShowFailAlert(false)
        //     }, 500)
        //     return null
        // }
        if (submitted) {
            return null
        }
        setSubmitted(true)
        setTimeout(() => {
            setSubmitted(false)
        }, 5000)
        const clickedTime = Date.now()
        const startTime = new Date(selectedArea[0].startTime)
        const newDuration = clickedTime - startTime.getTime()
        const endTime = new Date(selectedArea[0].endTime)

        if (clickedTime > endTime.getTime()) {
            setAfterTime(true)
            setSubmitted(false)
            setTimeout(() => {
                setAfterTime(false)
            }, 500)
            return null
        }

        if (newDuration < 0) {
            setTimeAlert(true)
            setSubmitted(false)
            setTimeout(() => {
                setTimeAlert(false)
            }, 500)
            return null
        }
        const duration = newDuration / 1000

        try {
            const userResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}schools?filters[accountEmail][$eq]=${email}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                }
            })
            const userRes = await userResponse.json()
            const schoolName = userRes.data[0].attributes.schoolNameCN
            const schoolResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}drawn-results?filters[schoolName][$eq]=${schoolName}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                }
            })
            const schoolRes = await schoolResponse.json()

            if (schoolRes.data.length > 0) {
                setRepeatAlert(true)
                setTimeout(() => {
                    setRepeatAlert(false)
                }, 2000)
                return null
            }

            // setShowSuccessAlert(true)
            // setTimeout(() => {
            //     setShowSuccessAlert(false)
            // }, 2000)
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
            const res = await response.json()
            console.log(res)
            router.push(`/drawnResults/${area}`)
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
            {submitted && <Loading/> }
            {notTimeYet && <Flex justify={'center'} mt={'70px'} ml={'-15px'} fontFamily={'ZCOOL XiaoWei'} fontSize={'26px'} h={'92vh'} color='black'>电子抽签系统暂未开放！</Flex>}
            {!notTimeYet &&
                <Flex fontFamily={'ZCOOL XiaoWei'} h={'92vh'} align='center' justify={'center'} flexDirection={'column'}>
                    {selectedArea ?
                        <Stack align='center' justify={'center'}>
                            {showSuccessAlert ? <Flex justify={'center'} position='absolute' mt={'40px'} fontSize={'26px'}>
                                <Alert status='success' zIndex={1} color={'black'} w={'50vw'}>
                                    <AlertIcon />
                                    <AlertTitle>成功提交！页面将于2秒后跳转！</AlertTitle>
                                </Alert>
                            </Flex> : <Box></Box>}
                            {showRepeatAlert ? <Flex justify={'center'} position='relative' mt='-450px' fontSize={'26px'}>
                                <Alert status='error' zIndex={1} color={'black'} w={'50vw'}>
                                    <AlertIcon />
                                    <AlertTitle>此队伍已提交！</AlertTitle>
                                </Alert>
                            </Flex> : <Box></Box>}
                            {showFailAlert ? <Flex justify={'center'} position='relative' mt='-450px' fontSize={'26px'}>
                                <Alert status='error' zIndex={1} color={'black'} w={'50vw'} >
                                    <AlertIcon />
                                    <AlertTitle>请选择地区！</AlertTitle>
                                </Alert>
                            </Flex> : <Box></Box>}
                            {showTimeAlert ? <Flex justify={'center'} position='relative' mt='-450px' fontSize={'26px'}>
                                <Alert status='error' zIndex={1} color={'black'} w={'50vw'}>
                                    <AlertIcon />
                                    <AlertTitle>还未到抽签时间！</AlertTitle>
                                </Alert>
                            </Flex> : <Box></Box>}
                            {afterTime ? <Flex justify={'center'} position='relative' mt='-450px' fontSize={'26px'}>
                                <Alert status='error' zIndex={1} color={'black'} w={'50vw'}>
                                    <AlertIcon />
                                    <AlertTitle>抽签已结束！</AlertTitle>
                                </Alert>
                            </Flex> : <Box></Box>}
                            <Select borderColor={'Black'} w='150px' placeholder='地区' value={area} onChange={handleAreaChange} zIndex={0}>
                                {Starwars.map(country => {
                                    return (
                                        <option key={country.area}>{country.area}</option>
                                    )
                                })}
                            </Select>
                            <Stack align={'center'} gap="15px">
                                <Heading fontFamily={'ZCOOL XiaoWei'} fontSize={'75px'}>{`${selectedArea[0].area}`} </Heading>
                                <Heading fontFamily={'ZCOOL XiaoWei'} mt={'20px'}>{`开始抽签时间：${moment(selectedArea[0].startTime).format("D/M/yyyy hh:mm a")}`} </Heading>
                                <Heading fontFamily={'ZCOOL XiaoWei'} mt={'20px'}>{`结束抽签时间：${moment(selectedArea[0].endTime).format("D/M/yyyy hh:mm a")}`} </Heading>
                                {/* <Heading fontFamily={'ZCOOL XiaoWei'} fontSize={138} mb={10}>{moment(date).format("hh:mm:ss a")}</Heading> */}
                                <Button fontSize={'65px'} p={10} mb={20} onClick={handleSubmit}>提交</Button></Stack> </Stack> : <Stack align='center' mt={'100px'}>
                            <Heading fontFamily={'ZCOOL XiaoWei'} fontSize={'100px'} mb={'50px'}>电子抽签系统</Heading>
                            {/* <Text fontFamily={'Montserrat'} fontWeight={800} fontSize={100} mb={10}><Time value={date} format="hh:mm:ss" /></Text> */}
                            <Select borderColor={'Black'} w='150px' placeholder='地区' onChange={handleAreaChange} zIndex={0}>
                                {Starwars.map(country => {
                                    return (
                                        <option key={country.area}>{country.area}</option>
                                    )
                                })}
                            </Select></Stack>}
                    {/* {submitted ? <Button mt={10}><Link href='/'>查看结果</Link></Button> : <Box></Box>} */}
                </Flex>}
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