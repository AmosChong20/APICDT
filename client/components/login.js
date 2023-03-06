import { FormLabel, FormControl, CardBody, Heading, Alert, AlertIcon, AlertTitle, Stack, Card, Avatar, Input, Button, Box, Flex } from "@chakra-ui/react";
import '@fontsource/ma-shan-zheng'
import { signIn } from "next-auth/react";
import { useState } from 'react'
import { useRouter } from 'next/router'
import "@fontsource/zcool-xiaowei"
import AlertDialog from "./alert";
import styles from '../styles/login.module.css'

function Login() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showFailAlert, setShowFailAlert] = useState(false)

    const handleSubmit = async (e) => {
        // e.preventDefault()
        const res = await signIn('credentials', {
            redirect: false,
            email: email,
            password: password,
            callbackUrl: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}`
        })

        if (res?.error) {
            console.log(res?.error)
            setShowFailAlert(true)
            setTimeout(() => {
                setShowFailAlert(false)
            }, 5000)
            setEmail("")
            setPassword("")
            return null
        }

        if (res.url) {
            router.replace(res.url)
        }
    }

    return (
        <Stack align={'center'} mt={10}>
            {showFailAlert ?
                            <Flex justify={'center'}>
                        <Alert status='error' zIndex='1' opacity='100%' color={'black'} w={'50vw'} position='absolute'>
                        <AlertIcon />
                        <AlertTitle>登录失败！</AlertTitle>
                                </Alert>
                </Flex> : <Box></Box>}
        <Card fontFamily={"ZCOOL XiaoWei"} className={styles.card} zIndex='0' bgColor="whiteAlpha.800" boxShadow={'lg'} maxW='md' align='center' justifyContent='center'>
            <CardBody>
                <Flex justify={'center'}>
                    <Avatar bg='#2f0101'/>
                    </Flex>
            <Stack mt='6' spacing='6' align={'center'}>
                    <Heading fontFamily={"ZCOOL XiaoWei"} fontSize='36' size='md' mb={10}>登录</Heading>
                    <FormControl>
                        <FormLabel fontSize={20}>电子邮件</FormLabel>
                        <Input placeholder="电子邮件" w={80} focusBorderColor="black" borderColor='black' value={email} onChange={e => setEmail(e.target.value)} />
                        <FormLabel fontSize={20} mt={5}>密码</FormLabel>
                        <Input placeholder="密码" w={80} focusBorderColor="black" borderColor='black' value={password} onChange={e => setPassword(e.target.value)} type="password"/>
                        </FormControl>
                        <Button type='submit' h={'40px'} w={'120px'} colorScheme={'blackAlpha'} onClick={handleSubmit}>Login</Button>
            </Stack>
        </CardBody>
                </Card>
            </Stack>
      );
}

export default Login;