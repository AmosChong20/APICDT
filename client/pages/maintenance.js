import { Flex } from "@chakra-ui/react";
import "@fontsource/zcool-xiaowei"
import Head from "next/head";
import logo from '../public/logo/Logo.png'
import Image from "next/image";

function Maintenance() {
    return ( 
        <>
        <Head>
            <title>网站维护中</title>
        </Head>
        <Flex align={'center'} mt={'200px'} justify={'center'} fontSize={'50px'} fontFamily={'ZCOOL XiaoWei'} direction={'column'}>
            <Image src="/logo/Logo.png" alt="logo" width={300} height={300} />
            网站正在维修中, 请稍后再来。
            </Flex>
        </>

     );
}

export default Maintenance;