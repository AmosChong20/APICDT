import { Card, CardHeader, CardBody, CardFooter, Stack, Heading, Text, Divider, ButtonGroup, Button } from '@chakra-ui/react'
import Image from 'next/image'
import "@fontsource/zcool-xiaowei"
import committee from "../public/data/committees.json"

function CommitteeCard({ index, name, position }) {
    const { data } = committee
    return ( 
        <Card maxW='sm' fontFamily={"ZCOOL XiaoWei"} bgColor='#2f0101' boxShadow='lg' mt={10} color="#fafafa">
        <CardBody>
                <Image
            alt={name}
            src={require(`../public/assets/${data[index].image}.jpeg`)}
                    borderRadius='lg'
                    width={400}
                    height={514}
            />
            <Stack mt='6' spacing='3'>
            <Heading size='lg' fontFamily={"ZCOOL XiaoWei"}>{name}</Heading>
            <Text fontSize={20}>
                {position}
            </Text>
            </Stack>
        </CardBody>
        </Card>
     );
}

export default CommitteeCard;