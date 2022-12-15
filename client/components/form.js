import {
    FormControl,
    FormLabel,
    Input,
    Select,
    Flex,
    Button,
    Box,
    Heading
} from '@chakra-ui/react'
import country from '../public/country.json'
import "@fontsource/inder";
import "@fontsource/ma-shan-zheng"


function Form({ information }) {
    const { Countries } = country
    return (
        <Box bgColor='#e4c5ed' h='92vh' pt={100} pl={100} fontFamily={"Ma Shan Zheng"}>
            <Heading fontSize='48px' fontFamily={"Ma Shan Zheng"}>报名</Heading>
            <FormControl>
                <Flex flexDirection='row' mt='59px' mb='29px' fontWeight={'500px'}>
                    <Flex flexDirection='column' mr='54px'>
                    <FormLabel>学校资料</FormLabel>
                    <Input focusBorderColor='Purple' borderColor={'Black'} w='320px'  placeholder='学校名称' type='text' required/>
                    </Flex>
                    <Flex flexDirection='column'>
                    <FormLabel>队长资料</FormLabel>
                    <Input focusBorderColor='Purple' borderColor={'Black'} w='320px' placeholder='队长名称' type='text' required/>
                    </Flex>
                </Flex>
                <Flex flexDirection='row' mt='10px' mb='29px' fontWeight={'500px'}>
                    <Flex flexDirection='column' mr='54px'>
                        <Input focusBorderColor='Purple' borderColor={'Black'} w='320px' placeholder='队长电子邮件' type='email' required />
                    </Flex>
                    <Flex mr='54px'>
                    <Select borderColor={'Black'} w='150px' placeholder='国际电话区号'>
                        {Countries.map(country => {
                            return (
                                <option key={country.id}>{country}</option>
                                )
                            })}
                        </Select>
                        <Input ml={5} focusBorderColor='Purple' borderColor={'Black'} w='320px' placeholder='队长联络电话' type='text' required />
                    </Flex>
                </Flex>
            </FormControl>
            <Button type='submit' mt={'29'} h={'40px'} w={'120px'} colorScheme={'purple'}><Box fontWeight={'600px'}>Submit</Box> </Button>
        </Box>
    );
}

export default Form;