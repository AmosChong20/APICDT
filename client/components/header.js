import { Flex } from '@chakra-ui/react'
import '@fontsource/zcool-qingke-huangyou'
import styles from '../styles/header.module.css'
import Image from 'next/image';

function Header({ title }) {
    return (
        // <div className={styles.header}>
        <Flex h={'92vh'} w={'100vw'} align='center' justify='center' letterSpacing="42%" position={'relative'}>
            <Image alt='apicdt-background' src={require('../public/logo/banner.png')} priority fill className={styles.image} />
            <Flex w='100vw' h='15.36vh' align={'center'} justify='center' bgColor="rgba(18, 18, 18, 0.6)" className={styles.header}>
                <Flex fontFamily={'ZCOOL QingKe HuangYou'} fontSize={'4vw'} letterSpacing='0.42em' justify='center' color='#dedede'>{title}</Flex>
            </Flex>
        </Flex >
        // </div>
    );
}

export default Header;