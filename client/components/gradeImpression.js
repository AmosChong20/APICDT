import { Button, Flex, Heading } from "@chakra-ui/react";
// import Buttons from "./Button";
import "@fontsource/zcool-xiaowei"
import { useRouter } from "next/router";
import { useState } from "react";


function GradeImpression({ resultsID }) {
    const router = useRouter()
    const [isAClicked, setIsAClicked] = useState(false)
    const [isBClicked, setIsBClicked] = useState(false)
    const [ teamWon, setTeamWon ] = useState("")

    const handleClickA = async (e) => {
        e.preventDefault()
        if (isAClicked) {
            setIsAClicked(false)
            setTeamWon("")
        }
        else {
            setIsAClicked(true)
            setIsBClicked(false)
            setTeamWon("正方")
        }
    }

    const handleClickB = async (e) => {
        e.preventDefault()
        if (isBClicked) {
            setIsBClicked(false)
            setTeamWon("")
        }
        else {
            setIsAClicked(false)
            setIsBClicked(true)
            setTeamWon("反方")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        router.replace(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/gradeBestCand/${resultsID}`)
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}results/${resultsID}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                data: {
                    bestImpression: teamWon
                }
            })
        })
        const data = await response.json()
    }
    return (
        <Flex mt={20} fontFamily={'ZCOOL XiaoWei'} align={'center'} flexDir={'column'}>
            <Heading fontFamily={'ZCOOL XiaoWei'} fontSize={70} mb={20}>印象票</Heading>
            <Flex flexDir={'row'} justify={'space-between'} w='25vw'>
            <Button size={'lg'} p='5vh' variant={isAClicked ? 'solid' : 'outline'}  fontSize={'36'} colorScheme={'blue'} onClick={handleClickA}>正方</Button>
                <Button size={'lg'} p='5vh' variant={isBClicked ? 'solid' : 'outline'} fontSize={'36'} colorScheme={'red'} onClick={handleClickB}>反方</Button>
            </Flex>
            <Button mt={20} colorScheme={'blackAlpha'} fontSize={24} size='lg' onClick={handleSubmit}>提交</Button>
        </Flex>
      );
}

export default GradeImpression;