import { Flex } from '@chakra-ui/react'
import '@fontsource/zcool-xiaowei'
import styles from '../styles/header.module.css'
import Image from 'next/image';

function Header({ title }) {
    return (
        // <div className={styles.header}>
        <Flex h={'92vh'} w={'100vw'} align='center' justify='center' letterSpacing="42%" position={'relative'}>
            <Image alt='apicdt-background' src={require('../public/logo/newBanner.png')} priority fill className={styles.image} />
            <Flex w='100vw' h='15.36vh' align={'center'} justify='center' flexDir={'column'} className={styles.header}>
                <Flex fontFamily={'ZCOOL XiaoWei'} fontSize={'50px'} letterSpacing={'0.04em'} justify='center' color='#FFDCB0'>{title}</Flex>
                <Flex fontFamily={'ZCOOL XiaoWei'} fontSize={'25px'} letterSpacing={'0.04em'} justify='center' color='#FFBD68'>11th Asia-Pacific Intensity Chinese Debate Tournament</Flex>
            </Flex>
        </Flex >
        // </div>
    );
}

export default Header;