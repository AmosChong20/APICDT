import MatchCard from "./matchCard";
import { Box, Flex, Heading } from '@chakra-ui/react'
import "@fontsource/ma-shan-zheng"
import "@fontsource/zcool-xiaowei"

function MatchCards({ matches, schools }) {
    return ( 
        <Box fontFamily={'ZCOOL XiaoWei'}>
            <Heading fontFamily={'ZCOOL XiaoWei'} ml={20} mt={20} mb={20} fontSize={48} minH={'92vh'}>比赛</Heading>
        <Flex align='center' flexDirection='column'>
                {matches.map(match => {
                    const date = new Date().getTime()
                    const date1 = new Date(match.attributes.matchTime).getTime()
                    if (match.attributes.teamA===schools && date1 >=date){
                return (
                    <MatchCard key={match.id} aTopic={match.attributes.aTopic} bTopic={match.attributes.bTopic} id={match.id} matchType={match.attributes.matchType} teamA={match.attributes.teamA} teamB={match.attributes.teamB} matchTime={match.attributes.matchTime} />
                )
}})}
            </Flex>
            </Box>
     );
}

export default MatchCards;