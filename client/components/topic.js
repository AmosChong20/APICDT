import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Box,
    Text,
    Flex,
} from '@chakra-ui/react'
import "@fontsource/zcool-xiaowei"
import styles from '../styles/topic.module.css'
import match from '../public/data/matchType.json'
import Image from 'next/image'

function Topic({ topics }) {
    const { matchTypes } = match
    return ( 
        <Box fontFamily={"ZCOOL XiaoWei"} pt={'50px'} pb={'50px'} pl={'75px'} color="#fcffea" position={'relative'}>
            <Image alt='apicdt-background' src={require('../public/logo/long-banner.png')} priority fill className={styles.image} />
            <Flex flexDir={'column'} className={styles.body}>
            <Text mb={30} fontSize={48} className={styles.body}>辩题列表</Text>
            {topics ? matchTypes.map((matchType) => {
                return (
                    <TableContainer width={'60vw'} borderColor='purple' mb={'10'} key={matchType.id} className={styles.body} >
                        <Table variant='striped' colorScheme='whiteAlpha' borderColor={'black'}>
                            <Thead>
                                <Tr>
                                    <Th fontFamily={"ZCOOL XiaoWei"} fontSize={36} color="#fcffea">{matchType}</Th>
                                </Tr>
                            </Thead>
                            <Tbody borderColor={'purple'}>
                                {topics.map(topicS => {
                                    const { attributes } = topicS
                                    if (attributes.matchType === matchType) {
                                        return (
                                            <Tr key={topicS.id}>
                                                <Td>正方：{attributes.aTopic}</Td>
                                                <Td>反方：{attributes.bTopic}</Td>
                                            </Tr>)
                                    }
                                })}
                            </Tbody>
                        </Table>
                    </TableContainer>
                )
            }) : <Box ></Box>}
                 </Flex>
            </Box>
     );
}

export default Topic;