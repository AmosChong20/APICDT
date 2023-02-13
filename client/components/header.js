import Image from 'next/image'
import { Flex, Heading } from '@chakra-ui/react'
import '@fontsource/zcool-qingke-huangyou'
import banner from '../public/banner.png'
import styles from '../styles/header.module.css'

function Header({ image, title }) {
    return (
        <div className={styles.header}>
        <Flex h={'92vh'} w={'100vw'} align='center' justify='center' bgImage={{url: '../public/banner.png'}} letterSpacing="42%">
            <Flex w='100vw' h='15.36vh' align={'center'} justify='center' bgColor="rgba(18, 18, 18, 0.6)">
                <Flex fontFamily={'ZCOOL QingKe HuangYou'} fontSize={'4vw'} letterSpacing='0.42em' justify='center' color='#dedede'>{title}</Flex>
            </Flex>
        </Flex >
        </div>
    );
}

export default Header;