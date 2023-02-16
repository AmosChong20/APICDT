import { Box, Flex, Heading ,Text,Container, Grid, GridItem} from '@chakra-ui/react'
import "@fontsource/ma-shan-zheng"
import Ranking from "./Ranking";
import styles from '../styles/Timelines.module.css'
import group1 from '../public/data/group.json'
import Image from 'next/image';

function Rankings({ ranking }) {
    const { Groups } = group1
    const { data} = ranking

   
    return ( 
        <Flex align={'center'} justify={'center'} w="100vw" flexDir={'column'} position={'relative'}>
            <Image src={require('../public/logo/long-banner.png')} priority fill className={styles.image} />
            <Text align="center" fontSize='6xl' letterSpacing={3} className={styles.body} padding={5} fontFamily= {'Ma Shan Zheng'} color={'white'}>积分榜</Text>
        <Grid templateColumns='repeat(2, 1fr)' w='80vw' className={styles.body} align='center'>
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
