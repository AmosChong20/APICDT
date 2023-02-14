import { Box, Flex, Heading ,Text,Container, Grid, GridItem} from '@chakra-ui/react'
import "@fontsource/ma-shan-zheng"
import Ranking from "./Ranking";
import styles from '../styles/Timelines.module.css'
import group1 from '../public/data/group.json'

function Rankings({ ranking }) {
    const { Groups } = group1
    const { data} = ranking

   
    return ( 
        <Flex align={'center'} justify={'center'} w="100vw" className={styles.body} flexDir={'column'}>
            <Text align="center" fontSize='6xl' letterSpacing={3} padding={5} fontFamily= {'Ma Shan Zheng'} color={'white'}>积分榜</Text>
        <Grid templateColumns='repeat(2, 1fr)' w='80vw' align='center'>
            {Groups.map((group) => {
                    {
                    return (
                        <GridItem>
                            <Ranking data={data} group={group} />
                            </GridItem>
                        )
                }
            })}
            </Grid>
            </Flex>
     );
}

export default Rankings;
