import Login from "../components/login";
import { Flex } from '@chakra-ui/react'
import styles from '../styles/login.module.css'
import Head from 'next/head'

function LoginPage() {
    return (
        <>
        <Head>
        <title>亚太辩论</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Flex justify='center' align={'center'} className={styles.body} pb={10}>
            <Login />
            </Flex>
            </>
      );
}

export default LoginPage;