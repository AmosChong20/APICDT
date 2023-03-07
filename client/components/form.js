import {
    FormControl,
    Input,
    Select,
    Flex,
    Box,
    Heading,
    Button,
    Stack,
    Alert,
    AlertIcon,
    AlertTitle,
    FormHelperText
} from '@chakra-ui/react'
import country from '../public/data/country.json'
import Image from 'next/image';
import AlertDialog from './alert';
import "@fontsource/inder";
import "@fontsource/zcool-xiaowei"
// import Button from './Button';
import { useEffect, useState } from 'react'
import styles from '../styles/form.module.css'
import { useRouter } from 'next/router';

function Form({ information }) {
    const router = useRouter()

    useEffect(() => {
        if (new Date() < new Date('2023-03-10T00:00:00')) {
            setNotTimeYet(true)
        }
        else {
            setNotTimeYet(false)
        }
    }, [])

    const { Countries } = country
    const [notTimeYet, setNotTimeYet] = useState()
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
    const [firstPassword, setFirstPassword] = useState()
    const [secondPassword, setSecondPassword] = useState()
    const [showLessCharacter1, setShowLessCharacter1] = useState(false)
    const [showLessCharacter2, setShowLessCharacter2] = useState(false)
    const [identifier, setIdentifier] = useState()

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

        if (schoolNameEN.length < 3) {
            setShowLessCharacter1(true)
            setTimeout(() => {
                setShowLessCharacter1(false)
            }, 2000)
            return null
        }

        if (leaderNameEN.length < 3) {
            setShowLessCharacter2(true)
            setTimeout(() => {
                setShowLessCharacter2(false)
            }, 2000)
            return null
        }

        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!leaderEmail.match(validRegex)) {
            setShowEmailAlert(true)
            setTimeout(() => {
                setShowEmailAlert(false)
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

        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!identifier.match(validRegex)) {
            setShowEmailAlert(true)
            setTimeout(() => {
                setShowEmailAlert(false)
            }, 2000)
            return null
        }

        if (!firstPassword || !secondPassword) {
            setShowFailAlert(true)
            setTimeout(() => {
                setShowFailAlert(false)
            }, 2000)
            return null
        }

        if (firstPassword != secondPassword) {
            setShowRepeatAlert(true)
            setTimeout(() => {
                setShowRepeatAlert(false)
            }, 2000)
            return null
        }

        if (firstPassword.length < 6 || secondPassword.length < 6) {
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

        console.log(`${process.env.NEXT_PUBLIC_SERVER_URL}auth/local/register`)
        console.log(identifier, firstPassword)
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}auth/local/register`, {
            method: 'POST',
            body: JSON.stringify({
                email: identifier,
                password: firstPassword,
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
        setFirstPassword('')
        setShowAlert(true)
        setTimeout(() => {
            setShowAlert(false)
            router.push('/')
        }, 2000)
    }

    return (
        <Box className={styles.box} fontFamily={"ZCOOL XiaoWei"} color="#fcffea" position={'relative'}>
            {notTimeYet && <Flex justify={'center'} mt={'70px'} ml={'-15px'} fontSize={'26px'} h={'92vh'} color='black'>本届比赛暂未开放报名！</Flex>}
            {!notTimeYet && !submitted &&
                <div>
                    <Image alt='apicdt-background' src={require('../public/logo/long-banner.png')} priority fill className={styles.image} />
            <Stack  pb={10}>
            <div className={styles.header}>Registration / 报名</div>
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
                        </Flex> : <Box></Box>}
                        {showEmailAlert ? 
                    <Flex justify={'center'}>
                    <Alert status='error' color={'black'} w={'50vw'} position='absolute'>
                    <AlertIcon />
                    <AlertTitle>电邮地址格式不正确！</AlertTitle>
                            </Alert>
                            </Flex> : <Box></Box>}
                        {showLessCharacter1 ?
                            <Flex justify={'center'}>
                        <Alert status='error' color={'black'} w={'50vw'} position='absolute'>
                        <AlertIcon />
                        <AlertTitle>学校英文名称不能少于3个字母！</AlertTitle>
                                </Alert>
                            </Flex> : <Box></Box>}
                            {showLessCharacter2 ?
                            <Flex justify={'center'}>
                        <Alert status='error' color={'black'} w={'50vw'} position='absolute'>
                        <AlertIcon />
                        <AlertTitle>队长英文名称不能少于3个字母！</AlertTitle>
                                </Alert>
                                </Flex>: <Box></Box>}
                    <FormControl>
            
                        <Stack mb={10}>
                            <label className={styles.subheader}>Particulars of School / 学校资料</label>
                            <div className={styles.formarea}>
                                <input className={styles.input} focusBorderColor='white' borderColor={'white'} w='320px' value={schoolNameCN} onChange={(e) => setSchoolNameCN(e.target.value)} placeholder='学校名称' type='text' isRequired />
                                <input className={styles.input} focusBorderColor='white' borderColor={'white'} w='320px' value={schoolNameEN} onChange={(e) => setSchoolNameEN(e.target.value)} placeholder='Name of School' type='text' isRequired />
                            </div>
                        </Stack>
                        <Stack mb={10} gap={2}>
                            <label className={styles.subheader}>Particulars of Team Leader / 队长资料</label>
                            <div className={styles.formarea}>
                                <input className={styles.input} focusBorderColor='white' borderColor={'white'} w='320px' value={leaderNameCN} onChange={(e) => setLeaderNameCN(e.target.value)} placeholder='队长名称' type='text' isRequired />
                                <input className={styles.input} focusBorderColor='white' borderColor={'white'} w='320px' value={leaderNameEN} onChange={(e) => setLeaderNameEN(e.target.value)} placeholder='Name of Team Leader' type='text' isRequired />
                            </div>
                                <Flex flexDir={'row'}>
                                {/* <select name="areaCode" className={styles.select} id="areaCode" onChange={(e) => setAreaCode(e.target.value)}> */}
                                <select className={styles.select} borderColor={'white'} w='200px' p='0px' placeholder='国际电话区号' color={'white'} onChange={(e) => setAreaCode(e.target.value)}>
                                    {Countries.map(country => {
                                        return (
                                            <option key={country.id} value={areaCode}>{country}</option>
                                        )
                                    })}
                                        </select>
                                        {/* </select> */}
                                <input value={leaderPhone} className={styles.input} focusBorderColor='white' borderColor={'white'} w='320px' placeholder='队长联络电话' onChange={(e) => setLeaderPhone(e.target.value)} type='text' isRequired />
                            </Flex>
                            <input className={styles.input} focusBorderColor='white' borderColor={'white'} w='320px' value={leaderEmail} onChange={(e) => setLeaderEmail(e.target.value)} placeholder='队长电邮地址' type='email' isRequired />
                        </Stack>
                        <Stack mb={10}>
                            <label className={styles.subheader}>Debate Topic / 辩题</label>
                            <div className={styles.formarea}>
                                <input className={styles.input} errorBorderColor='red' focusBorderColor='white' borderColor={'white'} w='320px' value={topic1} onChange={(e) => setTopic1(e.target.value)} placeholder='辩题一' type='text' isRequired />
                                <input className={styles.input} focusBorderColor='white' borderColor={'white'} w='320px' value={topic2} onChange={(e) => setTopic2(e.target.value)} placeholder='辩题二' type='text' isRequired />
                            </div>
                        </Stack>
                    </FormControl>
                        <button className={styles.submit} type='submit' p={6} w={'3vw'} colorScheme={'whiteAlpha'} onClick={handleSubmit}>继续</button>
                        </Stack>
                </div>}
            {submitted &&
                <Box h={'92vh'}>
                    <Image alt='apicdt-background' src={require('../public/logo/long-banner.png')} priority fill className={styles.image} />
                    <Flex pb={10} flexDir={'column'}>
                    <div fontSize='60px' fontFamily={"ZCOOL XiaoWei"} className={styles.header}>Create Account / 创建账户</div>
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
                            </Flex> : <Box></Box>}
                            {showFailAlert ?
                            <Flex justify={'center'}>
                        <Alert status='error' color={'black'} w={'50vw'} position='absolute'>
                        <AlertIcon />
                        <AlertTitle>密码需有至少6个字符！</AlertTitle>
                                </Alert>
                            </Flex> : <Box></Box>}
                            {showRepeatAlert ?
                            <Flex justify={'center'}>
                        <Alert status='error' color={'black'} w={'50vw'} position='absolute'>
                        <AlertIcon />
                        <AlertTitle>密码不一致！</AlertTitle>
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
                        <label className={styles.subheader}>Enter email / 输入电邮地址</label>
                        <input  className={styles.input} placeholder='电邮地址' value={identifier} type='email' focusBorderColor='white' borderColor={'white'} w='320px' onChange={(e) => setIdentifier(e.target.value)} isRequired/>
                        <label className={styles.subheader} mt={'20px'}>Enter new password / 输入新密码</label>
                        <input  className={styles.input} placeholder='新密码' value={firstPassword} type='password' focusBorderColor='white' borderColor={'white'} w='320px' onChange={(e) => setFirstPassword(e.target.value)} isRequired/>
                        <label className={styles.subheader} mt={'20px'}>Verify new password / 验证新密码</label>
                        <input  className={styles.input} placeholder='重复密码' value={secondPassword} type='password' focusBorderColor='white' borderColor={'white'} w='320px' onChange={(e) => setSecondPassword(e.target.value)} isRequired/>                
                            <div color={'white'} className={styles.hint} mt='20px'>*此电邮地址与密码用于选手登录</div>
                        </FormControl>
                        <Flex mt='60px' gap='15px'>
                    <button className={styles.submit} colorScheme={'whiteAlpha'} type='submit' onClick={handlePasswordSubmit}>提交</button>
                    <button className={styles.submit} colorScheme={'whiteAlpha'} type='submit' onClick={handleBackSubmit}>返回</button>    
                    </Flex>
                    </Flex>
                </Box>}
                    
        </Box>
    )
}

export default Form;