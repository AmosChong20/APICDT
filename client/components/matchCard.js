import { LinkBox, Card, CardBody, Text, Heading, Box, Flex } from '@chakra-ui/react'
import { Button } from "@chakra-ui/react"
import { EditIcon,DeleteIcon, A } from "@chakra-ui/icons";
import Link from 'next/link'
import styles from '../styles/matchCard.module.css'
import moment from 'moment'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';

function MatchCard({ aTopic, bTopic, id, matchType, teamA, teamB, matchTime }) {
    const { data: session, status } = useSession()
    const [role, setRole] = useState()
    const router = useRouter()

    useEffect(() => {
        if (status != 'loading' && session) {
            setRole(session.user.role)
        }
    }, [session, status])
    return (
    <Box>
            {role === 'Judge' ? <LinkBox align='center' justify='center' w={'75vw'}>
                <Link href={`/gradeTable/${teamA}/${teamB}`}>
                    <Card align='center' w={'75vw'} h={'30vh'} boxShadow='xl' color='#dedede' mt={10} mb={35} className={styles.body} >
                        <CardBody>
                            <Heading mt={5} size='lg' fontFamily={'Ma Shan Zheng'}>{matchType}</Heading>
                            <Text fontSize={36} mb={2}>{teamA} vs {teamB}</Text>
                            <Text fontSize={24}>Date: {moment(matchTime).format("YYYY-MM-DD")}</Text>
                            <Text fontSize={24}>Time: {moment(matchTime).format("hh:mma")}</Text>
                        </CardBody>
                
                    </Card>
                </Link>
            </LinkBox> :
                <Flex justify={'space-between'} align={'center'} w={'80vw'}>
                <Card justify={'center'} align={'center'} w={'75vw'} h={'40vh'} boxShadow='xl' color='#dedede' mt={10} mb={35} className={styles.body} >
                    <CardBody align='center' justify='center'>
                        <Heading mt={5} size='lg' fontFamily={'Ma Shan Zheng'}>{matchType}</Heading>
                        <Text fontSize={36} mb={2}>{teamA} vs {teamB}</Text>
                        <Text fontSize={24}>日期：{moment(matchTime).format("YYYY-MM-DD")}</Text>
                            <Text fontSize={24} mb={'5'}>时间：{moment(matchTime).format("hh:mma")}</Text>
                            <Text fontSize={20}>正方：{aTopic}</Text>
                            <Text fontSize={20}>反方：{bTopic}</Text>
                    </CardBody>
                </Card>
            <Flex flexDir={'column'} h='100' justify={'space-between'}>
            <Button onClick={async () => {
                router.push(`/editMatch/${id}`)
            }}><EditIcon />
            </Button>
            <Button onClick={async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}matches/${id}`, {
            method: 'DELETE'
        })
        router.reload()
            }}><DeleteIcon />
            </Button>
                    </Flex>
                    </Flex>
                    }
                </Box> 
      );
}

export default MatchCard;