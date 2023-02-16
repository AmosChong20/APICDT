import Login from "../components/login";
import { Flex } from '@chakra-ui/react'
import styles from '../styles/login.module.css'
import Head from 'next/head'
import Image from "next/image";

function LoginPage() {
    return (
        <>
        <Head>
        <title>亚太辩论</title>
        <meta name="description" content="第十一届亚太大专华语辩论公开赛登陆" />
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Flex justify='center' align={'center'} pb={10} position={'relative'} h='92vh'>
          <Image alt='apicdt-background' src={require('../public/logo/long-banner.png')} priority fill className={styles.image} />
            <Login />
            </Flex>
            </>
      );
}

export default LoginPage;