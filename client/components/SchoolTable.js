import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react'
import group1 from '../public/data/group.json'
import { Select } from '@chakra-ui/react'
import "@fontsource/zcool-xiaowei"

function SchoolTable({leaderEmail,drawn_result,schoolNameEN,leaderNameEN,leaderNameCN,leaderPhone,schoolNameCN,topic1,topic2,group,point}){
    const { Groups } = group1
    return (
        <TableContainer mb={10}>
            <Table variant='striped' colorScheme='gray' layout='2'>
            <Thead>
      <Tr>
        <Th>学校名字（中）</Th>
        <Th>队长名字（中）</Th>
        <Th>队长电话</Th>
        <Th>辩题一</Th>
        <Th>邮箱</Th>
      </Tr>
      </Thead>
      <Tbody>
        <Tr>
        <Td>{schoolNameCN}</Td>
        <Td>{leaderNameCN}</Td>
        <Td>{leaderPhone}</Td>
        <Td>{topic1}</Td>
        <Td>{leaderEmail}</Td>
        </Tr>
        </Tbody>
    </Table>
    <Table variant='striped' colorScheme='gray' layout='2'>
            <Thead>
      <Tr>
        <Th>学校名字（英）</Th>
        <Th>队长名字（英）</Th>
        <Th>小组</Th>
        <Th>辩题二</Th>
        <Th>积分</Th>
      </Tr>
      </Thead>
      <Tbody>
        <Tr>
        <Td>{schoolNameEN}</Td>
        <Td>{leaderNameEN}</Td>
        <Td>
        <Select  placeholder={group}> 
            <option value='无'>无</option>
        {Groups.map((value) => {
            if (value != group){
            return(
              <option key={value.id} value={value}>{value}</option>
            )}})}
        </Select>
        </Td>
        <Td>{topic2}</Td>
        <Th>{point}</Th>
        </Tr>
        </Tbody>
    </Table>
    
    </TableContainer>

    );
}


export default SchoolTable;

