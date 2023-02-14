import styles from "../../styles/matchCard.module.css"
import { Box, Heading, Flex, Card, LinkBox, Text } from "@chakra-ui/react"
import Link from "next/link"
import "@fontsource/ma-shan-zheng"
import Head from 'next/head'

function Matches({ matches }) {
    const { data } = matches 
    return (
        <>
        <Head>
        <title>比赛结果主页</title>
        <meta name="description" content="第十一届亚太大专华语辩论公开赛比赛成绩" />
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Box fontFamily={'Ma Shan Zheng'}>
            <Heading fontFamily={'Ma Shan Zheng'} ml={20} mt={20} mb={20} fontSize={48}>比赛结果</Heading>
        <Flex align='center' flexDirection='column'>
                {data.map(match => {
                return (
                    <LinkBox align='center' justify='center' w={'75vw'} key={match.id}>
            <Link href={`/results/${match.attributes.teamA}/${match.attributes.teamB}`}>
        <Card  w={'75vw'} h={'30vh'} boxShadow='xl' color='#dedede' mt={10} mb={35} className={styles.body} >
                                
                                    <Flex h={'100%'} flexDir={'column'} align={'center'} justify={'center'}>
            <Heading size='lg' fontFamily={'Ma Shan Zheng'}>{match.attributes.matchType}</Heading>
                        <Text fontSize={36}>{match.attributes.teamA} vs {match.attributes.teamB}</Text>
                        </Flex>
                           
                
                </Card>
                </Link>
            </LinkBox>
                )
            })}
            </Flex>
            </Box>
            </>
      );
}

export default Matches;

export async function getServerSideProps(context) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}matches`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    })
    const data = await response.json()
    return {
        props: {
            matches: data
        }
    }
}