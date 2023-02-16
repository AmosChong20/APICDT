import { Box, Text, Flex, Heading } from "@chakra-ui/react";
import Committees from "../components/committees";
import "@fontsource/ma-shan-zheng"
import styles from '../styles/about.module.css'
import "@fontsource/zcool-xiaowei"
import committee from "../public/data/committees.json"
import Head from 'next/head'
import Image from "next/image";

function About() {
    // const { data } = committees
    const { data } = committee
    return (
        <>
        <Head>
        <title>关于我们</title>
        <meta name="description" content="第十一届亚太大专华语辩论公开赛关于我们" />
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
            <Box fontFamily={"ZCOOL XiaoWei"} p={20} position={'relative'}>
                <Image alt='apicdt-background' src={require('../public/logo/long-banner.png')} priority fill className={styles.image} />
                <Flex className={styles.body} flexDir={'column'}>
            <Heading fontFamily={"ZCOOL XiaoWei"} fontSize={72} color="#fcffea" className={styles.body}>关于我们</Heading>
            <Text pt={10} fontSize={60} color="#fafafa" className={styles.body}>历史</Text>
            <Flex justify={'center'} align='center' className={styles.body}>
                <Text mt={5} pt={'36px'} pb={'33px'} pl={'21px'} pr='21px' fontSize={24} w={1227} bgColor="#000000" color="#fafafa">亚太大专华语辩论公开赛是南洋理工大学中文学会的常年活动之一，曾被评论为全球四大国际华语辩论赛之一。它的前身为“新马大专华语辩论赛”。
2004年，筹委会正式将此赛事拓展至亚太地区。亚太区大专学府的优秀辩论队伍都参与了首届的亚太大专华语辩论公开赛。拥有筹办第一届辩论赛的经验后，第二届亚太大专华语辩论公开赛也成功于2006年在新加坡南洋理工大学举办。这项比赛再次吸引了来自亚太区各个国家的优秀辩论队前来参与，更获得观众的热烈反应。此外，来自台湾的中华辩论人交流协会也于2007年成功在台湾轮办第三届亚太大专辩论赛。
之后五届比赛则再次由南洋理工大学中文学会举办，筹委会更在第七届扩大比赛规模，将参赛队伍名额从原本的16支增至24支，也将整个赛会带向新的层次。在第八届比赛当中，筹委会首次引入电子抽签程序让抽签过程更系统化和透明化。
此外，筹委会也组织了评审顾问团，邀请本地和海外辩手进行审题，提高赛会整体水平。同时，筹委会亦成功邀请到多名来自海外的知名辩手担任评审，当中包括台湾的黄执中、澳门的刘京京、香港的邱晨和中国的陈铭等。
                        </Text></Flex>
                    </Flex>
                    {/* <Text pt={20} fontSize={60} color="#fafafa">筹委团</Text>
                    </Flex>
                    <Committees committees={data} /> */}
            </Box>
            </>
    );
}

export default About;

// export async function getStaticProps() {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}committees?populate[0]=picture`, {
//         method: 'GET',
//         headers: {
//             'Content-type': 'application/json'
//         }
//     })
//     const data = await response.json()
//     return {
//         props: {
//             committees: data
//         }
//     }
// }