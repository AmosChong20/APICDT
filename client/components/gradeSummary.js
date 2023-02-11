import { Box, Button, Card, CardBody, Flex, Heading } from "@chakra-ui/react";
import Buttons from "./Button";
import AlertDialog from "./alert";
import "@fontsource/zcool-xiaowei"
import { useRouter } from "next/router";
import { useState } from "react";


function GradeSummary({ resultsID }) {
    const [ teamWon, setTeamWon ] = useState("")
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const router = useRouter()

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
        setShowSuccessAlert(true)
        const response = await fetch(`${NEXT_PUBLIC_SERVER_URL}results/${resultsID}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                data: {
                    bestSummary: teamWon
                }
            })
        })
        setTimeout(() => {
            setShowSuccessAlert(false)
            router.push(`/matches`)
        }, 3000)
    }

    const [isAClicked, setIsAClicked] = useState(false)
    const [isBClicked, setIsBClicked] = useState(false)

    return (
        <Flex mt={20} fontFamily={'ZCOOL XiaoWei'} align={'center'} flexDir={'column'}>
            {showSuccessAlert ? <AlertDialog status={'success'} description={"评分完毕！"} /> : <Box></Box>}
            <Heading fontFamily={'ZCOOL XiaoWei'} fontSize={70} mb={20}>总结票</Heading>
            <Flex flexDir={'row'} justify={'space-between'} w='25vw'>
                <Button size={'lg'} p='5vh' variant={isAClicked ? 'solid' : 'outline'}  fontSize={'36'} colorScheme={'blue'} onClick={handleClickA}>正方</Button>
                <Button size={'lg'} p='5vh' variant={isBClicked ? 'solid' : 'outline'} fontSize={'36'} colorScheme={'red'} onClick={handleClickB}>反方</Button>
            </Flex>
            <Button mt={20} colorScheme={'blackAlpha'} fontSize={24} size='lg' onClick={handleSubmit}>提交</Button>
        </Flex>
      );
}

export default GradeSummary;