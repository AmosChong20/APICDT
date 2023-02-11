import { Flex, FormControl, Box, Heading, FormLabel, Input, Textarea, Button, Select } from "@chakra-ui/react";
import { useState } from "react";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { useRouter } from "next/router";
import { DatePicker } from 'antd';
import AlertDialog from "../components/alert";
import match from '../public/matchType.json'
import "@fontsource/ma-shan-zheng"
import moment from "moment";

function AddNews({ schools }) {
    const { matchTypes } = match
    const { data } = schools
    const [teamA, setTeamA] = useState("")
    const [teamB, setTeamB] = useState("")
    const [matchType, setMatchType] = useState("")
    const [datetime, setDatetime] = useState("")
    const [aTopic, setATopic] = useState("")
    const [bTopic, setBTopic] = useState("")
    const [showAlert, setShowAlert] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (datetime === "") {
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false)
            }, 5000)
            return null
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}matches`, {
            method: 'POST',
            body: JSON.stringify({
                data: {
                    teamA: teamA,
                    teamB: teamB,
                    matchType: matchType,
                    matchTime: datetime,
                    aTopic: aTopic,
                    bTopic: bTopic
                }
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const res = await response.json()
        router.push('adminMatch')
    }

    
    const onOk = (value) => {
        setDatetime(moment(value.$d).format())
    };

    return (
        <Box h='92vh' pt={100} pl={100} fontFamily={"Ma Shan Zheng"} >
            {showAlert ? <AlertDialog status={'error'} description={`请选择比赛时间！`} /> : <Box></Box>}
            <Heading fontSize='60px' fontFamily={"Ma Shan Zheng"}>添加比赛</Heading>
            <FormControl>
                <Flex flexDir={'row'} mt='59px' mb='10px' fontWeight={'500px'}>
                    <Flex flexDirection='column' mb='15px'>
                    <FormLabel>正方</FormLabel>
                    <Select borderColor={'black'} w='280px' mr='10'placeholder="学校" onChange={(e) => setTeamA(e.target.value)}>
                            {data.map((school) => {
                                return (
                                    <option key={school.id}>{school.attributes.schoolNameCN}</option>
                            )
                        })}
                    </Select>
                    </Flex>
                    <Flex flexDirection='column'>
                    <FormLabel>反方</FormLabel>
                    <Select borderColor={'black'} w='280px' mr='10'placeholder="学校" onChange={(e) => setTeamB(e.target.value)}>
                            {data.map((school) => {
                                return (
                                    <option key={school.id}>{school.attributes.schoolNameCN}</option>
                            )
                        })}
                        </Select>
                    </Flex>
                </Flex>
                <Flex flexDir={'row'} mt='59px' mb='10px' fontWeight={'500px'}>
                    <Flex flexDirection='column' mb='15px' mr={'10'}>
                    <FormLabel>正方辩题</FormLabel>
                    <Input w={'280px'} borderColor="black" placeholder="正方辩题" onChange={(e) => setATopic(e.target.value)} required type='text'/>
                    </Flex>
                    <Flex flexDirection='column'>
                    <FormLabel>反方辩题</FormLabel>
                    <Input w={'280px'} borderColor="black" placeholder="反方辩题" onChange={(e) => setBTopic(e.target.value)} required type='text'/>
                    </Flex>
                </Flex>
                <Flex flexDir={'row'} mt='30px' mb='29px' fontWeight={'500px'}>
                <Flex flexDir={'column'} w={'280px'}>
                    <FormLabel>时间</FormLabel>
                    <DatePicker showTime onOk={onOk} onChange={onOk} size={'large'} width={'100'} placeholder="比赛时间" />
                    </Flex>
                    <Flex flexDir={'column'} w={'280px'} ml='10'>
                    <FormLabel>比赛项目</FormLabel>
                    <Select borderColor={'black'} w='280px' placeholder="比赛项目" onChange={(e) => setMatchType(e.target.value)}>
                            {matchTypes.map((matchType) => {
                                return (
                                    <option key={matchType.id}>{matchType}</option>
                            )
                        })}
                        </Select>
                    </Flex>
                    </Flex>
            </FormControl>
            <Button fontSize={'20'} type='submit' p={6} colorScheme={'blackAlpha'} onClick={handleSubmit}>添加</Button>
            </Box>
      );
}

export default AddNews;

export async function getServerSideProps(context) {
    const session = await unstable_getServerSession(context.req, context.res, authOptions)

    if (!session || session.user.role != 'Committee') {
        return {
            redirect: {
                destination: '/login',
                permanent: true
            }
        }
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}schools`)
    const res = await response.json()

    return {
        props: {
            schools: res
        }
    }
}