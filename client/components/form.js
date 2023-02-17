import {
    FormControl,
    FormLabel,
    Input,
    Select,
    Flex,
    Box,
    Heading,
    Button,
    Stack,
    Alert,
    AlertIcon,
    AlertTitle
} from '@chakra-ui/react'
import country from '../public/data/country.json'
import Image from 'next/image';
import AlertDialog from './alert';
import "@fontsource/inder";
import "@fontsource/zcool-xiaowei"
// import Button from './Button';
import { useState } from 'react'
import styles from '../styles/form.module.css'
import { useRouter } from 'next/router';

function Form({ information }) {
    const router = useRouter()

    const { Countries } = country
    const [schoolNameCN, setSchoolNameCN] = useState()
    const [schoolNameEN, setSchoolNameEN] = useState()
    const [leaderNameCN, setLeaderNameCN] = useState()
    const [leaderNameEN, setLeaderNameEN] = useState()
    const [areaCode, setAreaCode] = useState()
    const [topic1, setTopic1] = useState()
    const [topic2, setTopic2] = useState()
    const [leaderEmail, setLeaderEmail] = useState()
    const [leaderPhone, setLeaderPhone] = useState()
    const [submitted, setSubmitted] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [showFailAlert, setShowFailAlert] = useState(false)
    const [showRepeatAlert, setShowRepeatAlert] = useState(false)
    const [showEmailAlert, setShowEmailAlert] = useState(false)
    const [password, setPassword] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!schoolNameCN || !schoolNameEN || !leaderEmail || !leaderNameCN || !leaderNameEN || !leaderPhone || !topic1 || !topic2 || !areaCode) {
            console.log(schoolNameCN, schoolNameEN, leaderEmail, leaderNameCN, leaderPhone, topic1, topic2, areaCode + leaderPhone)
            setShowFailAlert(true)
            setTimeout(() => {
                setShowFailAlert(false)
            }, 2000)
            return null
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}schools?filters[leaderEmail][$eq]=${leaderEmail}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })

        const data = await response.json()

        if (data.data.length > 0) {
            setShowRepeatAlert(true)
            setLeaderEmail("")
            setAreaCode("")
            setLeaderNameCN("")
            setLeaderNameEN("")
            setLeaderPhone("")
            setSchoolNameCN("")
            setSchoolNameEN("")
            setTopic1("")
            setTopic2("")
            setTimeout(() => {
                setShowRepeatAlert(false)
            }, 2000)
            return null
        }

        setSubmitted(true)
    }

    const handleBackSubmit = async (e) => {
        setSubmitted(false)
    }

    const handlePasswordSubmit = async (e) => {
        e.preventDefault()

        if (!password) {
            setShowFailAlert(true)
            setTimeout(() => {
                setShowFailAlert(false)
            }, 2000)
            return null
        }

        const userResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}schools`, {
            method: 'POST',
            body: JSON.stringify({
                data: {
                    schoolNameCN: schoolNameCN,
                    schoolNameEN: schoolNameEN,
                    leaderNameCN: leaderNameCN,
                    leaderNameEN: leaderNameEN,
                    topic1: topic1,
                    topic2: topic2,
                    leaderEmail: leaderEmail,
                    leaderPhone: areaCode + leaderPhone
                }
            }),
            headers: {
                'Content-type': 'application/json'
            },
        })
        const userData = await userResponse.json()
        if (userData.error) {
            setShowEmailAlert(true)
            setTimeout(() => {
                setShowEmailAlert(false)
                setSubmitted(false)
            }, 2000)
            return null
        }
        console.log(`${process.env.NEXT_PUBLIC_SERVER_URL}auth/local/register`)
        console.log(leaderEmail, password)
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}auth/local/register`, {
            method: 'POST',
            body: JSON.stringify({
                email: leaderEmail,
                password: password,
                username: leaderNameEN,
                userRole: 'Participant',
                school: schoolNameCN
            }),
            headers: {
                'Content-type': 'application/json'
            },
        })

        const data = await response.json()
        console.log("Sucessfully registered", data)
        setPassword('')
        setShowAlert(true)
        setTimeout(() => {
            setShowAlert(false)
            router.push('/')
        }, 2000)
    }

    return (
        <Box pt={"50px"} pl={'75px'} fontFamily={"ZCOOL XiaoWei"} color="#fcffea" position={'relative'}>
            {!submitted &&
                <div>
                    <Image alt='apicdt-background' src={require('../public/logo/long-banner.png')} priority fill className={styles.image} />
            <Stack  pb={10}>
            <Heading fontSize='60px' fontFamily={"ZCOOL XiaoWei"} className={styles.body}>Registration / 报名</Heading>
                        {showFailAlert ?
                            <Flex justify={'center'}>
                        <Alert status='error' color={'black'} w={'50vw'} position='absolute'>
                        <AlertIcon />
                        <AlertTitle>信息不完整！</AlertTitle>
                                </Alert>
                                </Flex>: <Box></Box>}
                    {showRepeatAlert ? <Flex justify={'center'}>
                        <Alert status='error' color={'black'} w={'50vw'} position='absolute'>
                        <AlertIcon />
                        <AlertTitle>此邮箱已有账户！</AlertTitle>
                                </Alert>
                                </Flex>: <Box></Box>}
                    <FormControl>
            
                        <Stack mt={10} mb={10}>
                            <FormLabel fontSize={'26px'}>Particulars of School / 学校资料</FormLabel>
                            <Flex flexDirection='row' mt='59px' mb='29px' gap={10} fontWeight={'500px'}>
                                <Input fontSize={'18px'} focusBorderColor='white' borderColor={'white'} w='320px' value={schoolNameCN} onChange={(e) => setSchoolNameCN(e.target.value)} placeholder='学校名称' type='text' isRequired />
                                <Input fontSize={'18px'} focusBorderColor='white' borderColor={'white'} w='320px' value={schoolNameEN} onChange={(e) => setSchoolNameEN(e.target.value)} placeholder='Name of School' type='text' isRequired />
                            </Flex>
                        </Stack>
                        <Stack mb={10} gap={2}>
                            <FormLabel fontSize={'26px'}>Particulars of Team Leader / 队长资料</FormLabel>
                            <Flex flexDirection='row' mt='59px' mb='29px' gap={10} fontWeight={'500px'}>
                                <Input fontSize={'18px'} focusBorderColor='white' borderColor={'white'} w='320px' value={leaderNameCN} onChange={(e) => setLeaderNameCN(e.target.value)} placeholder='队长名称' type='text' isRequired />
                                <Input fontSize={'18px'} focusBorderColor='white' borderColor={'white'} w='320px' value={leaderNameEN} onChange={(e) => setLeaderNameEN(e.target.value)} placeholder='Name of Team Leader' type='text' isRequired />
                            </Flex>
                                <Flex flexDir={'row'}>
                                {/* <select name="areaCode" className={styles.select} id="areaCode" onChange={(e) => setAreaCode(e.target.value)}> */}
                                <Select borderColor={'white'} w='150px' p='0px' placeholder='国际电话区号' onChange={(e) => setAreaCode(e.target.value)}>
                                    {Countries.map(country => {
                                        return (
                                            <option key={country.id} value={country}>{country}</option>
                                        )
                                    })}
                                        </Select>
                                        {/* </select> */}
                                <Input ml={5} value={leaderPhone} focusBorderColor='white' borderColor={'white'} w='320px' placeholder='队长联络电话' onChange={(e) => setLeaderPhone(e.target.value)} type='text' isRequired />
                            </Flex>
                            <Input fontSize={'18px'} focusBorderColor='white' borderColor={'white'} w='320px' value={leaderEmail} onChange={(e) => setLeaderEmail(e.target.value)} placeholder='队长电邮地址' type='email' isRequired />
                        </Stack>
                        <Stack mb={10}>
                            <FormLabel fontSize={'26px'}>Debate Topic / 辩题</FormLabel>
                            <Flex flexDirection='row' mt='59px' mb='29px' gap={10} fontWeight={'500px'}>
                                <Input fontSize={'18px'} errorBorderColor='red' focusBorderColor='white' borderColor={'white'} w='320px' value={topic1} onChange={(e) => setTopic1(e.target.value)} placeholder='辩题一' type='text' isRequired />
                                <Input fontSize={'18px'} focusBorderColor='white' borderColor={'white'} w='320px' value={topic2} onChange={(e) => setTopic2(e.target.value)} placeholder='辩题二' type='text' isRequired />
                            </Flex>
                        </Stack>
                    </FormControl>
                        <Button fontSize={'20'} type='submit' p={6} w={'6.5vw'} colorScheme={'whiteAlpha'} onClick={handleSubmit}>报名</Button>
                        </Stack>
                </div>}
            {submitted &&
                <Box h={'92vh'}>
                    <Image alt='apicdt-background' src={require('../public/logo/long-banner.png')} priority fill className={styles.image} />
                    <Flex pb={10} flexDir={'column'}>
                    <Heading fontSize='60px' fontFamily={"ZCOOL XiaoWei"} className={styles.body}>Account Registration / 注册户口</Heading>
                    {showAlert ? <Flex justify={'center'}>
                        <Alert status='success' color={'black'} w={'50vw'} position='absolute'>
                        <AlertIcon />
                        <AlertTitle>恭喜你！报名成功！</AlertTitle>
                                </Alert>
                        </Flex> : <Box></Box>}
                        {showFailAlert ?
                            <Flex justify={'center'}>
                        <Alert status='error' color={'black'} w={'50vw'} position='absolute'>
                        <AlertIcon />
                        <AlertTitle>信息不完整！</AlertTitle>
                                </Alert>
                                </Flex>: <Box></Box>}
                        {showEmailAlert ? 
                    <Flex justify={'center'}>
                    <Alert status='error' color={'black'} w={'50vw'} position='absolute'>
                    <AlertIcon />
                    <AlertTitle>电邮地址格式不正确！</AlertTitle>
                            </Alert>
                            </Flex> : <Box></Box>}
                        <FormControl mt={"80px"} mb={10}>
                        <FormLabel fontSize={'26px'}>Password / 密码</FormLabel>
                        <Input  fontSize={'18px'}placeholder='密码' value={password} type='password' focusBorderColor='white' borderColor={'white'} w='320px' onChange={(e) => setPassword(e.target.value)} isRequired/>
                        </FormControl>
                        <Flex mt='80px'>
                    <Button p={6} w='6.5vw' fontSize={'20'} colorScheme={'whiteAlpha'} type='submit' onClick={handlePasswordSubmit}>提交</Button>
                    <Button ml={5} p={6} w='6.5vw' fontSize={'20'} colorScheme={'whiteAlpha'} type='submit' onClick={handleBackSubmit}>返回</Button>    
                    </Flex>
                    </Flex>
                </Box>}
                    
        </Box>
    )
}

export default Form;