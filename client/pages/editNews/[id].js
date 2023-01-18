import { Flex, FormControl, Box, Heading, FormLabel, Input, Textarea, Button } from "@chakra-ui/react";
import { useState } from "react";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { useRouter } from "next/router";

function EditNews({ announcement }) {
    const { data } = announcement
    console.log(data)
    const [title, setTitle] = useState(data.attributes.title)
    const [description, setDescription] = useState(data.attributes.description)
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:1337/api/announcements/${data.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                data: {
                    title: title,
                    description: description
                }
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const res = await response.json()
        console.log(res)
        router.push('/userHome')
    }

    return (
        <Box h='92vh' pt={100} pl={100} fontFamily={"ZCOOL XiaoWei"} >
            <Heading fontSize='60px' fontFamily={"ZCOOL XiaoWei"}>更改消息</Heading>
            <FormControl>
                <Flex flexDir={'column'} mt='59px' mb='29px' fontWeight={'500px'}>
                    <Flex flexDirection='column' mb='30px'>
                    <FormLabel>标题</FormLabel>
                    <Input focusBorderColor='Black' borderColor={'Black'} w='320px' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='标题' type='text' required/>
                    </Flex>
                    <Flex flexDirection='column'>
                    <FormLabel>叙述</FormLabel>
                    <Textarea focusBorderColor='Black' borderColor={'Black'} w='600px' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='叙述' type='text' required/>
                    </Flex>
                </Flex>
            </FormControl>
            <Button fontSize={'20'} type='submit' p={6} colorScheme={'blackAlpha'} onClick={handleSubmit}>发布</Button>
            </Box>
      );
}

export default EditNews;

export async function getServerSideProps(context) {
    const session = await unstable_getServerSession(context.req, context.res, authOptions)

    if (!session || session.user.role != 'Committee') {
        return {
            redirect: {
                destination: '/login',
                permanent: true
            }
        }
    }

    const { id } = context.params

    const response = await fetch(`http://localhost:1337/api/announcements/${id}`)
    const res = await response.json()

    return {
        props: {
            announcement: res
        }
    }
}