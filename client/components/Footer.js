import {
  ButtonGroup,
  Container,
  Divider,
  IconButton,
  Stack,
  Text,
  Flex,
  Link
} from '@chakra-ui/react'
import * as React from 'react'
import { FaFacebook, FaInstagram, FaYoutube, FaWeibo, FaTwitter } from 'react-icons/fa'
import "@fontsource/zcool-xiaowei"
import { SiWechat } from "react-icons/si"
import styles from '../styles/footer.module.css'
import Image from 'next/image'

export default function Footer() {
  return (
    <Flex bg='black' h={'100%'}>
    <Container bg='black' as="footer" role="contentinfo" maxW="5xl">
    <Stack 
    bg='black'
      spacing="12"
      direction={{ base: 'column', md: 'row' }}
      justify="space-between"
      py={{ base: '12', md: '16' }}
    >
          <Stack direction="row" spacing={'20px'}>

      <Stack spacing={{ base: '6', md: '8' }} align="start">
      <Stack direction="column" spacing="20">
          <Stack spacing="-2" flex="1">
          <Text paddingLeft={7} mb={30} className={styles.header} fontFamily= {"ZCOOL XiaoWei"} textColor="rgba(252, 255, 234,0.918)" letterSpacing={4}>联系方式</Text>
                  <Stack spacing="-1.1" shouldWrapChildren>
                  <Text letterSpacing={4} className={styles.subheader} fontFamily= {"ZCOOL XiaoWei" } color="rgba(252, 255, 234,0.918)"  >官方邮箱：chinesesoc-apdct@e.ntu.edu.sg</Text>
                  <Text letterSpacing={4} className={styles.subheader} fontFamily= {"ZCOOL XiaoWei" } color="rgba(252, 255, 234,0.918)"  >官方微信：APICDT11</Text>
                  <Text letterSpacing={4} className={styles.subheader} fontFamily= {"ZCOOL XiaoWei" } color="rgba(252, 255, 234,0.918)"  >商务合作：cs-apdct-bm@e.ntu.edu.sg</Text>
                  <Text letterSpacing={4} className={styles.subheader} fontFamily= {"ZCOOL XiaoWei" } color="rgba(252, 255, 234,0.918)"  >赛务相关：cs-apdct-adjudicator@e.ntu.edu.sg</Text>
                  <Text letterSpacing={4} className={styles.subheader} fontFamily= {"ZCOOL XiaoWei" } color="rgba(252, 255, 234,0.918)"  >宣传伙伴：cs-apdct-publicity@e.ntu.edu.sg</Text>
            {/* <Text letterSpacing={4} fontSize={20} fontFamily= {"ZCOOL XiaoWei" } as='u' color="rgba(252, 255, 234,0.918)"  >筹长</Text>
            <Text letterSpacing={4} fontSize={20} fontFamily= {"ZCOOL XiaoWei" }  textColor="rgba(252, 255, 234,0.918)">章佳怡：+65 9096 0059</Text>
            <Text letterSpacing={4} fontSize={20} fontFamily= {"ZCOOL XiaoWei"}  textColor="rgba(252, 255, 234,0.918)">JZHANG095@e.ntu.edu.sg</Text>
            <Text  letterSpacing={4} fontSize={20} fontFamily= {"ZCOOL XiaoWei" }  textColor="rgba(252, 255, 234,0.918)" className={styles.text} >副筹长</Text>
            <Text letterSpacing={4} fontSize={20} fontFamily= {"ZCOOL XiaoWei" }  textColor="rgba(252, 255, 234,0.918)">刘懿萱：+65 8718 0203</Text>
            <Text letterSpacing={4} fontSize={20} fontFamily= {"ZCOOL XiaoWei" }  textColor="rgba(252, 255, 234,0.918)"  >C210074@e.ntu.edu.sg</Text> */}
            </Stack>
          </Stack>
          {/* <Stack spacing="2" minW="36" flex="1">
          <Text paddingLeft={7} mb={30} fontSize={40} fontFamily= {"ZCOOL XiaoWei"} textColor="rgba(252, 255, 234,0.918)" letterSpacing={4}>合作伙伴 </Text>
            <Stack spacing="2" shouldWrapChildren>
              <Text mb={30} fontSize={20} fontFamily= {"ZCOOL XiaoWei"} textColor="rgba(252, 255, 234,0.918)">ntu</Text>
            </Stack>
          </Stack>
          <Stack spacing="2" minW="36" flex="1">
          <Text paddingLeft={7} mb={30} fontSize={40} fontFamily= {"ZCOOL XiaoWei"} textColor="rgba(252, 255, 234,0.918)" letterSpacing={4}>宣传伙伴 </Text>
            <Stack spacing="2" shouldWrapChildren>
              <Text mb={30} fontSize={20} fontFamily= {"ZCOOL XiaoWei"} textColor="white">ntu</Text>
            </Stack>
          </Stack> */}
        </Stack>
        </Stack>
        <Stack>
        <Stack spacing="-2" flex="1">
  
        <Text letterSpacing={4}  mb={30} className={styles.header} fontFamily= {"ZCOOL XiaoWei"}  textColor="rgba(252, 255, 234,0.918)">关注我们
                </Text>
                <ButtonGroup variant="ghost" spacing='0'>
                <IconButton color ='white'  target="_blank" size='sm' as="a" href="https://weibo.com/p/1005055398940329?is_all=1" aria-label="Weibo" icon={<FaWeibo />} />
        <IconButton color ='white' target="_blank" as="a" size='sm' href="https://twitter.com/csapdct" aria-label="Twitter" icon={<FaTwitter />} />
                  <IconButton color='white' target="_blank" as="a" size='sm' href="https://www.instagram.com/apchinesedebate/" aria-label="Instagram" icon={<FaInstagram />} />
                  <IconButton color='white' target="_blank" as="a" size='sm' href="https://www.xiaohongshu.com/user/profile/63cd06ac00000000260106cc?xhsshare=CopyLink&appuid=63cd06ac00000000260106cc&apptime=1677688231" aria-label="XiaoHongShu" icon={<Image src={require('../public/logo/XiaoHongShu.svg')} width={20} height={20} />} />
                  <IconButton color='white' target="_blank" as="a" size='sm' href="https://mp.weixin.qq.com/s/2VYK0aMiHbqht_IdMjJXyg" aria-label="XiaoHongShu" icon={<SiWechat />} />
                </ButtonGroup>
        {/* <div>
        <Stack  direction='column' spacing="2.5" >
        <ul >
        <Stack  direction='row' spacing="2.5" shouldWrapChildren>
                        <Link target="_blank" href="https://www.instagram.com/apchinesedebate/" >
                       <IconButton color ='white' as="a" href="#" aria-label="Twitter" icon={<FaInstagram fontSize="1.25rem" />} />
          <Image borderRadius='full' boxSize='50px' src={require('../public/logo/Ins.svg.webp')} alt='Instagram'/> 
        </Link>
        <Link target="_blank"  href = "https://www.instagram.com/apchinesedebate" >
        <Image borderRadius='full' boxSize='50px' src={require('../public/logo/Xiaohongshu.png')} alt='Xiaohongshu'/>
        </Link>
        <Link target="_blank"  href = "https://www.facebook.com/NTUCSapchinesedebate/" >
          <Image borderRadius='full' boxSize='50px' src={require('../public/logo/facebook.svg')} alt='Facebook'/>
        </Link>
        <Link target="_blank"  href = "https://www.facebook.com/NTUCSapchinesedebate/" >
          <Image bg='white' borderRadius='full' boxSize='50px' src={require('../public/logo/sina-weibo.svg')} alt='Weibo'/>
        </Link>
        </Stack>
        </ul> 
        <ul >
        <Stack  direction='row' spacing="2.5" shouldWrapChildren>
          <Link target="_blank"  href = "https://weibo.com/u/5398940329" >
        <Image   borderRadius='full' boxSize='50px' src={require('../public/logo/wechat.png')} alt='Wechat'/>
        </Link>
        <Link target="_blank"  href = "https://weibo.com/u/5398940329" >
        <Image borderRadius='full' boxSize='50px' src={require('../public/logo/bilibili.png')} alt='Xiaohongshu'/>
        </Link>
        <Link target="_blank"  href = "https://www.facebook.com/NTUCSapchinesedebate/" >
        <Image borderRadius='full' boxSize='50px' src={require('../public/logo/facebook.svg')} alt='Facebook'/>
        </Link>
        <Link target="_blank"  href = "https://www.facebook.com/NTUCSapchinesedebate/" >
          <Image bg='white' borderRadius='full' boxSize='50px' src={require('../public/logo/sina-weibo.svg')} alt='Weibo'/>
        </Link>
        </Stack>
        </ul> 
        </Stack>
        </div> */}
        </Stack>

        </Stack>
        </Stack>
        </Stack>
       
        
    <Divider orientation='horizontal'/>
    <Stack
      pt="6"
      pb="10"
      justify="space-between"
      direction={{ base: 'column-reverse', md: 'row' }}
      align="center"
    >
      <Text fontSize="sm" color="rgba(252, 255, 234,0.918)">
      &copy; {new Date().getFullYear()} Nanyang Technological University, Inc. All rights reserved.
      </Text>
      <ButtonGroup variant="ghost">

        <IconButton color ='white' as="a" href="#" aria-label="Facebook" icon={<FaFacebook fontSize="1.25rem" />} />
        <IconButton color ='white'  target="_blank" as="a" href="https://www.instagram.com/apchinesedebate" aria-label="Instagram" icon={<FaInstagram fontSize="1.25rem" />} />
      </ButtonGroup>
    </Stack>
    </Container>
  </Flex>
  )
}