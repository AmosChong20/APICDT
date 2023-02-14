import { Flex } from '@chakra-ui/react'
import '@fontsource/zcool-qingke-huangyou'
import styles from '../styles/header.module.css'

function Header({ title }) {
    return (
        <div className={styles.header}>
        <Flex h={'92vh'} w={'100vw'} align='center' justify='center' letterSpacing="42%">
            <Flex w='100vw' h='15.36vh' align={'center'} justify='center' bgColor="rgba(18, 18, 18, 0.6)">
                <Flex fontFamily={'ZCOOL QingKe HuangYou'} fontSize={'4vw'} letterSpacing='0.42em' justify='center' color='#dedede'>{title}</Flex>
            </Flex>
        </Flex >
        </div>
    );
}

export default Header;