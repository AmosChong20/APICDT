import { useSession } from "next-auth/react";
import { unstable_getServerSession } from "next-auth";
import Announcement from "../components/announcement";
import { useRouter } from "next/router";
import { authOptions } from "./api/auth/[...nextauth]";
import { Box, Flex, Heading, Button } from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons";
import MatchCard from "../components/matchCard";

function AdminMatch({matches}) {
    const { data } = matches
    console.log(data)
    const router = useRouter()
    return ( 
        <Box fontFamily={'Ma Shan Zheng'}>
            <Heading fontFamily={'Ma Shan Zheng'} ml={20} mt={20} fontSize={48}>比赛</Heading>
            <Flex align='center' flexDirection='column'>
            <Button onClick={() => router.push('/addMatch')}><Flex flexDir={'row'} align='center' justify={'center'}><AddIcon/><Flex fontSize={'20'} ml={3}>添加比赛</Flex></Flex></Button>
                {data.map(match => {
                    return (
                        
                    <MatchCard key={match.id} aTopic={match.attributes.aTopic} bTopic={match.attributes.bTopic} id={match.id} matchType={match.attributes.matchType} teamA={match.attributes.teamA} teamB={match.attributes.teamB} matchTime={match.attributes.matchTime} />
                            )
            })}
            </Flex>
            </Box>
     );
}

export default AdminMatch;

export async function getServerSideProps(context) {
    const session = await unstable_getServerSession(context.req, context.res, authOptions)

    if (session === null) {
        return {
            redirect: {
                destination: '/login',
                permanent: true
            }
        }
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}matches`, {
        method: 'GET',
        headers: {
            'Content-headers': 'application/json'
        }
    })

    const res = await response.json()

    return {
        props: {
            matches: res
        }
    }
}