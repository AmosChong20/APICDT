import { Flex, Heading, ListItem, OrderedList } from '@chakra-ui/react'
import '@fontsource/ma-shan-zheng'
import '@fontsource/zcool-xiaowei'

function DrawnResultsArea({ data, area }) {
    const areaFilter = data.filter(result => result.attributes.area == area)
    const areaSort = areaFilter.sort((a, b) => a.attributes.timeUsed - b.attributes.timeUsed)
    const schoolFilter = areaSort.filter((school, index) => areaSort.findIndex(school2 => school.attributes.schoolName == school2.attributes.schoolName ) == index)
    
    return ( 
        <Flex fontFamily={'ZCOOL XiaoWei'} mt={10} ml={10} h='92vh' fontSize={'45px'} flexDirection={'column'}>
            <Heading fontSize={'55px'} fontFamily={'ZCOOL XiaoWei'} mb={5}>{`抽签结果（地区：${area}）`}</Heading>
            <OrderedList>{schoolFilter.map((result) => {
                const { attributes } = result
                return (
                    <ListItem fontSize={'35px'} key={result.id}>
                        {`${attributes.schoolName} :   ${attributes.timeUsed}秒`}
                    </ListItem>
                )
            })}</OrderedList>
        </Flex>
     );
}

export default DrawnResultsArea