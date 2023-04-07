import { Flex, Heading, ListItem, OrderedList } from '@chakra-ui/react'
import '@fontsource/ma-shan-zheng'
import '@fontsource/zcool-xiaowei'
import styles from "../styles/drawnResultsArea.module.css"

function DrawnResultsArea({ data, area }) {
    const areaFilter = data.filter(result => result.area == area)
    const areaSort = areaFilter.sort((a, b) => a.timeUsed - b.timeUsed)
    // const schoolFilter = areaSort.filter((school, index) => areaSort.findIndex(school2 => school.attributes.schoolName == school2.attributes.schoolName ) == index)
    return ( 
        <Flex fontFamily={'ZCOOL XiaoWei'} mt={'20px'} ml={'20px'} minH='92vh' fontSize={'45px'} flexDirection={'column'}>
            <div className={styles.title}>{`抽签结果（地区：${area}）`}</div>
            <ol className={styles.wholeList}>{areaSort.map((result) => {
                const secondUsed = result.timeUsed / 1000
                const showTime = secondUsed.toFixed(3)
                return (
                    <li className={styles.list} key={result.id}>
                        {`${result.schoolName} :   ${showTime}秒`}
                    </li>
                )
            })}</ol>
        </Flex>
     );
}

export default DrawnResultsArea