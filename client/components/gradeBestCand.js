import { Button, Flex, Heading, Select } from "@chakra-ui/react";
import contestant from '../public/data/debate.json'
import "@fontsource/zcool-xiaowei"
import { useRouter } from "next/router";
import { useState } from "react";

function GradeBestCand({ resultsID }) {
    const { Contestants } = contestant
    const [bestCand, setBestCand] = useState("")
    const router = useRouter()

    const handleSubmit = async(e) => {
        e.preventDefault()
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}results/${resultsID}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                data: {
                    bestCand: bestCand
                }
            })
        })
        router.replace(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/gradeSummary/${resultsID}`)
    }

    return ( 
        <Flex mt={20} align='center' flexDir={'column'} fontFamily={'ZCOOL XiaoWei'}>
            <Heading fontFamily={'ZCOOL XiaoWei'} fontSize='70' mb={20}>最佳辩手</Heading>
            <Select borderColor={'Black'} w='200px' fontSize={24} placeholder='最佳辩手' onChange={(e) => setBestCand(e.target.value)}>
                        {Contestants.map(contestant => {
                            return (
                                <option key={contestant.id}>{contestant}</option>
                                )
                            })}
            </Select>
            <Button mt={20} colorScheme={'blackAlpha'} fontSize={24} size='lg' onClick={handleSubmit}>提交</Button>
        </Flex>
     );
}

export default GradeBestCand;