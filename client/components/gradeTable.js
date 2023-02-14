import { Button, Flex, Heading } from "@chakra-ui/react";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
  } from '@chakra-ui/react'
// import Buttons from "./Button";
import "@fontsource/zcool-xiaowei"
import { useRouter } from "next/router";
import { useState } from "react";


function GradeTable({ teamA, teamB, judgeName }) {
  const router = useRouter()
    const [pointA, setPointA] = useState(0)
    const [pointB, setPointB] = useState(0)
    const [pointC, setPointC] = useState(0)
    const [pointD, setPointD] = useState(0)
    const [pointE, setPointE] = useState(0)
    const [pointF, setPointF] = useState(0)
    const [pointG, setPointG] = useState(0)
    const [pointH, setPointH] = useState(0)
    const [pointI, setPointI] = useState(0)
    const [pointJ, setPointJ] = useState(0)
    const [pointK, setPointK] = useState(0)
    const [pointL, setPointL] = useState(0)
    const firstPoint = pointA + pointE + pointH + pointI
    const secondPoint = pointB + pointF + pointJ
    const thirdPoint = pointC + pointG + pointK
    const fourthPoint = pointD + pointL

    const [pointA2, setPointA2] = useState(0)
    const [pointB2, setPointB2] = useState(0)
    const [pointC2, setPointC2] = useState(0)
    const [pointD2, setPointD2] = useState(0)
    const [pointE2, setPointE2] = useState(0)
    const [pointF2, setPointF2] = useState(0)
    const [pointG2, setPointG2] = useState(0)
    const [pointH2, setPointH2] = useState(0)
    const [pointI2, setPointI2] = useState(0)
    const [pointJ2, setPointJ2] = useState(0)
    const [pointK2, setPointK2] = useState(0)
    const [pointL2, setPointL2] = useState(0)
    const fifthPoint = pointA2 + pointE2 + pointH2 + pointI2
    const sixthPoint = pointB2 + pointF2 + pointJ2
    const seventhPoint = pointC2 + pointG2 + pointK2
    const eighthPoint = pointD2 + pointL2
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`${NEXT_PUBLIC_SERVER_URL}results`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                data: {
                    teamA: teamA,
                    teamB: teamB,
                    teamA1Point: firstPoint,
                    teamA2Point: secondPoint,
                    teamA3Point: thirdPoint,
                    teamA4Point: fourthPoint,
                    teamB1Point: fifthPoint,
                    teamB2Point: sixthPoint,
                    teamB3Point: seventhPoint,
                    teamB4Point: eighthPoint,
                    teamA1LiLun: pointA,
                    teamA1ZhiXun: pointE,
                    teamA1DaBian: pointH,
                    teamA1YuYanFengDu: pointI,
                    teamA2BoLun: pointB,
                    teamA2ZhiXun: pointF,
                    teamA2YuYanFengDu: pointJ,
                    teamA3ChenCi: pointC,
                    teamA3GongBian: pointG,
                    teamA3YuYanFengDu: pointK,
                    teamA4ZongJie: pointD,
                    teamA4YuYanFengDu: pointL,
                    teamB1LiLun: pointA2,
                    teamB1ZhiXun: pointE2,
                    teamB1DaBian: pointH2,
                    teamB1YuYanFengDu: pointI2,
                    teamB2BoLun: pointB2,
                    teamB2ZhiXun: pointF2,
                    teamB2YuYanFengDu: pointJ2,
                    teamB3ChenCi: pointC2,
                    teamB3GongBian: pointG2,
                    teamB3YuYanFengDu: pointK2,
                    teamB4ZongJie: pointD2,
                    teamB4YuYanFengDu: pointL2,
                    teamATotalPoint: firstPoint + secondPoint + thirdPoint + fourthPoint,
                    teamBTotalPoint: fifthPoint + sixthPoint + seventhPoint + eighthPoint,
                    judge: judgeName
                }
            })
        })
        const responseID = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}results?filters[teamA][$eq]=${teamA}&filters[teamB][$eq]=${teamB}&filters[judge][$eq]=${judgeName}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
        const res = await responseID.json()
        const { data } = res
        const id = data[0].id
        router.replace(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/gradeImpression/${id}`)
    }
    return (
        < Flex mt = { 20} fontFamily = { 'ZCOOL XiaoWei'} align = { 'center'} flexDir = { 'column'} >
            <Heading fontFamily={'ZCOOL XiaoWei'} fontSize={70} mb={20}>分数票</Heading>
            <Heading fontFamily={'ZCOOL XiaoWei'} fontSize={70} mb={10}>正方</Heading>
            <TableContainer mb={10}>
  <Table variant='striped' colorScheme='gray'>
    <TableCaption>正方</TableCaption>
    <Thead>
      <Tr>
        <Th>一辩</Th>
        <Th>二辩</Th>
        <Th>三辩</Th>
        <Th>四辩</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>立论（30分）
            <NumberInput defaultValue={0} min={0} max={30} onChange={(valueString) => setPointA(parseInt(valueString,10))}>
            <NumberInputField />
            <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
            </NumberInputStepper>
            </NumberInput>
        </Td>
        <Td>驳论（30分）
            <NumberInput defaultValue={0} min={0} max={30} onChange={(valueString) => setPointB(parseInt(valueString,10))}>
            <NumberInputField />
            <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
            </NumberInputStepper>
            </NumberInput>
        </Td>
        <Td>陈词（30分）
            <NumberInput defaultValue={0} min={0} max={30} onChange={(valueString) => setPointC(parseInt(valueString,10))}>
            <NumberInputField />
            <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
            </NumberInputStepper>
            </NumberInput>
        </Td>
        <Td>总结（60分）
            <NumberInput defaultValue={0} min={0} max={60} onChange={(valueString) => setPointD(parseInt(valueString,10))}>
            <NumberInputField />
            <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
            </NumberInputStepper>
            </NumberInput>
        </Td>
      </Tr>
      <Tr>
        <Td>质询（20分）
            <NumberInput defaultValue={0} min={0} max={20} onChange={(valueString) => setPointE(parseInt(valueString,10))}>
            <NumberInputField />
            <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
            </NumberInputStepper>
            </NumberInput>
        </Td>
        <Td>质询（30分）
            <NumberInput defaultValue={0} min={0} max={30} onChange={(valueString) => setPointF(parseInt(valueString,10))}>
            <NumberInputField />
            <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
            </NumberInputStepper>
            </NumberInput>
        </Td>
        <Td>攻辩（30分）
            <NumberInput defaultValue={0} min={0} max={30} onChange={(valueString) => setPointG(parseInt(valueString,10))}>
            <NumberInputField />
            <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
            </NumberInputStepper>
            </NumberInput>
        </Td>
        <Td>-</Td>
      </Tr>
      <Tr>
        <Td>答辩（10分）
            <NumberInput defaultValue={0} min={0} max={10} onChange={(valueString) => setPointH(parseInt(valueString,10))}>
            <NumberInputField />
            <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
            </NumberInputStepper>
            </NumberInput>
        </Td>
        <Td>-</Td>
        <Td>-</Td>
        <Td>-</Td>
      </Tr>
      <Tr>
        <Td>语言风度（10分）
            <NumberInput defaultValue={0} min={0} max={10} onChange={(valueString) => setPointI(parseInt(valueString,10))}>
            <NumberInputField />
            <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
            </NumberInputStepper>
            </NumberInput></Td>
        <Td>语言风度（10分）
            <NumberInput defaultValue={0} min={0} max={10} onChange={(valueString) => setPointJ(parseInt(valueString,10))}>
            <NumberInputField />
            <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
            </NumberInputStepper>
            </NumberInput>
        </Td>
        <Td>语言风度（10分）
            <NumberInput defaultValue={0} min={0} max={10} onChange={(valueString) => setPointK(parseInt(valueString,10))}>
            <NumberInputField />
            <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
            </NumberInputStepper>
            </NumberInput>
        </Td>
        <Td>语言风度（10分）
            <NumberInput defaultValue={0} min={0} max={10} onChange={(valueString) => setPointL(parseInt(valueString,10))}>
            <NumberInputField />
            <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
            </NumberInputStepper>
            </NumberInput>
        </Td>
    </Tr>
    <Tr>
        <Td fontWeight={800} fontSize={24}>得分 {firstPoint}</Td>
        <Td fontWeight={800} fontSize={24}>得分 {secondPoint}</Td>
        <Td fontWeight={800} fontSize={24}>得分 {thirdPoint}</Td>
        <Td fontWeight={800} fontSize={24}>得分 {fourthPoint}</Td>
      </Tr>
    </Tbody>
  </Table>
            </TableContainer>
            
            <Heading fontFamily={'ZCOOL XiaoWei'} fontSize={70} mb={10}>反方</Heading>
            <TableContainer mb={10}>
  <Table variant='striped' colorScheme='gray'>
    <TableCaption>反方</TableCaption>
    <Thead>
      <Tr>
        <Th>一辩</Th>
        <Th>二辩</Th>
        <Th>三辩</Th>
        <Th>四辩</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>立论（30分）
            <NumberInput defaultValue={0} min={0} max={30} onChange={(valueString) => setPointA2(parseInt(valueString,10))}>
            <NumberInputField />
            <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
            </NumberInputStepper>
            </NumberInput>
        </Td>
        <Td>驳论（30分）
            <NumberInput defaultValue={0} min={0} max={30} onChange={(valueString) => setPointB2(parseInt(valueString,10))}>
            <NumberInputField />
            <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
            </NumberInputStepper>
            </NumberInput>
        </Td>
        <Td>陈词（30分）
            <NumberInput defaultValue={0} min={0} max={30} onChange={(valueString) => setPointC2(parseInt(valueString,10))}>
            <NumberInputField />
            <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
            </NumberInputStepper>
            </NumberInput>
        </Td>
        <Td>总结（60分）
            <NumberInput defaultValue={0} min={0} max={60} onChange={(valueString) => setPointD2(parseInt(valueString,10))}>
            <NumberInputField />
            <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
            </NumberInputStepper>
            </NumberInput>
        </Td>
      </Tr>
      <Tr>
        <Td>质询（20分）
            <NumberInput defaultValue={0} min={0} max={20} onChange={(valueString) => setPointE2(parseInt(valueString,10))}>
            <NumberInputField />
            <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
            </NumberInputStepper>
            </NumberInput>
        </Td>
        <Td>质询（30分）
            <NumberInput defaultValue={0} min={0} max={30} onChange={(valueString) => setPointF2(parseInt(valueString,10))}>
            <NumberInputField />
            <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
            </NumberInputStepper>
            </NumberInput>
        </Td>
        <Td>攻辩（30分）
            <NumberInput defaultValue={0} min={0} max={30} onChange={(valueString) => setPointG2(parseInt(valueString,10))}>
            <NumberInputField />
            <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
            </NumberInputStepper>
            </NumberInput>
        </Td>
        <Td>-</Td>
      </Tr>
      <Tr>
        <Td>答辩（10分）
            <NumberInput defaultValue={0} min={0} max={10} onChange={(valueString) => setPointH2(parseInt(valueString,10))}>
            <NumberInputField />
            <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
            </NumberInputStepper>
            </NumberInput>
        </Td>
        <Td>-</Td>
        <Td>-</Td>
        <Td>-</Td>
      </Tr>
      <Tr>
        <Td>语言风度（10分）
            <NumberInput defaultValue={0} min={0} max={10} onChange={(valueString) => setPointI2(parseInt(valueString,10))}>
            <NumberInputField />
            <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
            </NumberInputStepper>
            </NumberInput></Td>
        <Td>语言风度（10分）
            <NumberInput defaultValue={0} min={0} max={10} onChange={(valueString) => setPointJ2(parseInt(valueString,10))}>
            <NumberInputField />
            <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
            </NumberInputStepper>
            </NumberInput>
        </Td>
        <Td>语言风度（10分）
            <NumberInput defaultValue={0} min={0} max={10} onChange={(valueString) => setPointK2(parseInt(valueString,10))}>
            <NumberInputField />
            <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
            </NumberInputStepper>
            </NumberInput>
        </Td>
        <Td>语言风度（10分）
            <NumberInput defaultValue={0} min={0} max={10} onChange={(valueString) => setPointL2(parseInt(valueString,10))}>
            <NumberInputField />
            <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
            </NumberInputStepper>
            </NumberInput>
        </Td>
    </Tr>
    <Tr>
        <Td fontWeight={800} fontSize={24}>得分 {fifthPoint}</Td>
        <Td fontWeight={800} fontSize={24}>得分 {sixthPoint}</Td>
        <Td fontWeight={800} fontSize={24}>得分 {seventhPoint}</Td>
        <Td fontWeight={800} fontSize={24}>得分 {eighthPoint}</Td>
      </Tr>
    </Tbody>
  </Table>
            </TableContainer>
            <Button mt={20} mb={20} pt={5} pb={5} colorScheme={'blackAlpha'} fontSize={24} size='lg' onClick={handleSubmit}>提交</Button>
        </Flex >
    );
}

export default GradeTable;