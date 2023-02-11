import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
  Heading,
  Flex,
  Box
} from '@chakra-ui/react'
import "@fontsource/ma-shan-zheng"
import { useEffect, useState } from 'react';

function Ranking({ data, group }) {
  var ranks = 0
  if (data) {
    data.sort((t1, t2) => t2.attributes.point - t1.attributes.point)
  }
  return (
    <Flex flexDir={'column'} color={'white'} >
      {data ? 
        ( 
    <Flex><Heading fontFamily={'Ma Shan Zheng'} color={'white'}>{group}组</Heading>
      <TableContainer paddingBottom={10} w='30vw'>
<Table variant="simple">
  <Thead>
      <Tr>
    <Th fontFamily= {'Ma Shan Zheng'} fontSize='3xl'padding={5} isNumeric color='white'>排名</Th>
    <Th  fontFamily= {'Ma Shan Zheng'} fontSize='3xl' padding={5} color='white'>学校</Th>
    <Th fontFamily= {'Ma Shan Zheng'} fontSize='3xl'padding={5} isNumeric color='white'>积分</Th>
  </Tr>
</Thead>
      <Tbody>
        {data.map((rank) => {
          if (rank.attributes.group === group) {
            ranks = ranks + 1
            return (
              <Tr key={rank.id}>
                <Td  color='white' isNumeric >{ranks}</Td>
                <Td  color='white' >{rank.attributes.schoolNameCN}</Td>
                <Td color='white' isNumeric>{rank.attributes.point}</Td>
                </Tr>
              )
            }
        })}
</Tbody>
</Table>
  </TableContainer ></Flex>) : <Box></Box>}
      </Flex>

    );
}

export default Ranking;