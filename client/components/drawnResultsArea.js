import { Flex, Heading, ListItem, OrderedList } from '@chakra-ui/react'
import '@fontsource/ma-shan-zheng'
import '@fontsource/zcool-xiaowei'
import styles from "../styles/drawnResultsArea.module.css"

function DrawnResultsArea({ data, area }) {
    const areaFilter = data.filter(result => result.attributes.area == area)
    const areaSort = areaFilter.sort((a, b) => a.attributes.timeUsed - b.attributes.timeUsed)
    const schoolFilter = areaSort.filter((school, index) => areaSort.findIndex(school2 => school.attributes.schoolName == school2.attributes.schoolName ) == index)
    
    return ( 
        <Flex fontFamily={'ZCOOL XiaoWei'} mt={'20px'} ml={'20px'} h='92vh' fontSize={'45px'} flexDirection={'column'}>
            <div className={styles.title}>{`抽签结果（地区：${area}）`}</div>
            <ol className={styles.wholeList}>{schoolFilter.map((result) => {
                const { attributes } = result
                return (
                    <li className={styles.list} key={result.id}>
                        {`${attributes.schoolName} :   ${attributes.timeUsed}秒`}
                    </li>
                )
            })}</ol>
        </Flex>
     );
}

export default DrawnResultsArea