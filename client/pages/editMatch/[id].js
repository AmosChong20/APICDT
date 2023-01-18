import { Flex, FormControl, Box, Heading, FormLabel, Input, Textarea, Button, Select } from "@chakra-ui/react";
import { useState } from "react";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { useRouter } from "next/router";
import { DatePicker } from 'antd';
import matchS from '../../public/matchType.json'
import moment from "moment";

function EditNews({ match, schoolS }) {
    const { data } = match
    const schools = schoolS.data
    const { matchTypes } = matchS
    const [teamA, setTeamA] = useState(data.attributes.teamA)
    const [teamB, setTeamB] = useState(data.attributes.teamB)
    const [matchType, setMatchType] = useState(data.attributes.matchType)
    const [datetime, setDatetime] = useState(data.attributes.matchTime)
    const [aTopic, setATopic] = useState(data.attributes.aTopic)
    const [bTopic, setBTopic] = useState(data.attributes.bTopic)
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:1337/api/matches/${data.id}`, {
            method: 'PUT',
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
        console.log(res)
        router.push('/adminMatch')
    }

    const onOk = (value) => {
        setDatetime(moment(value.$d).format())
    };

    return (
        <Box h='92vh' pt={100} pl={100} fontFamily={"ZCOOL XiaoWei"} >
            <Heading fontSize='60px' fontFamily={"ZCOOL XiaoWei"}>更改比赛</Heading>
            <FormControl>
            <Flex flexDir={'row'} mt='59px' mb='10px' fontWeight={'500px'}>
                    <Flex flexDirection='column' mb='15px'>
                    <FormLabel>正方</FormLabel>
                    <Select borderColor={'black'} w='280px' mr='10' placeholder="学校" value={teamA} onChange={(e) => setTeamA(e.target.value)}>
                            {schools.map((school) => {
                                return (
                                    <option key={school.id}>{school.attributes.schoolNameCN}</option>
                            )
                        })}
                    </Select>
                    </Flex>
                    <Flex flexDirection='column'>
                    <FormLabel>反方</FormLabel>
                    <Select borderColor={'black'} w='280px' mr='10'placeholder="学校" value={teamB} onChange={(e) => setTeamB(e.target.value)}>
                            {schools.map((school) => {
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
                    <Input w={'280px'} borderColor="black" placeholder="正方辩题" value={aTopic} onChange={(e) => setATopic(e.target.value)} required type='text'/>
                    </Flex>
                    <Flex flexDirection='column'>
                    <FormLabel>反方辩题</FormLabel>
                        <Input w={'280px'} borderColor="black" placeholder="反方辩题" value={bTopic} onChange={(e) => setBTopic(e.target.value)} required type='text'/>
                    </Flex>
                </Flex>
                <Flex flexDir={'row'} mt='30px' mb='29px' fontWeight={'500px'}>
                <Flex flexDir={'column'} w={'280px'}>
                    <FormLabel>时间</FormLabel>
                    <DatePicker showTime onOk={onOk} onChange={onOk} size={'large'} width={'100'} placeholder="比赛时间" />
                    </Flex>
                    <Flex flexDir={'column'} w={'280px'} ml='10'>
                    <FormLabel>比赛项目</FormLabel>
                    <Select borderColor={'black'} w='280px' placeholder="比赛项目" value={matchType} onChange={(e) => setMatchType(e.target.value)}>
                            {matchTypes.map((matchType) => {
                                return (
                                    <option key={matchType.id}>{matchType}</option>
                            )
                        })}
                        </Select>
                    </Flex>
                    </Flex>
            </FormControl>
            <Button fontSize={'20'} type='submit' p={6} colorScheme={'blackAlpha'} onClick={handleSubmit}>发布</Button>
            </Box>
      );
}

export default EditNews;

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

    const { id } = context.params

    const response = await fetch(`http://localhost:1337/api/matches/${id}`)
    const res = await response.json()

    const schoolResponse = await fetch(`http://localhost:1337/api/schools`)
    const schoolRes = await schoolResponse.json()

    return {
        props: {
            match: res,
            schoolS: schoolRes
        }
    }
}