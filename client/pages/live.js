import { Box, Heading } from '@chakra-ui/react'
import '@fontsource/ma-shan-zheng'
import Head from 'next/head'

function Live() {
    return ( 
        <>
            <Head>
        <title>直播</title>
        <meta name="description" content="第十一届亚太大专华语辩论公开赛直播" />
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Box ml={10} mt={10} h={'92vh'}>
            <Heading fontFamily={'Ma Shan Zheng'}>直播</Heading>
            </Box>
            </>
     );
}

export default Live;