import { useRouter } from "next/router";
import GradeBestCand from "../../components/gradeBestCand";
import { Flex, Heading } from "@chakra-ui/react";
import "@fontsource/zcool-xiaowei"
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

function Team({ resultsID }) {
    if (resultsID) {
        // const teamA = teamName[0]
        // const teamB = teamName[1]
        return ( 
            <Flex flexDir={'column'} align={'center'} mt={20} h='92vh'>
                {/* <Heading fontFamily={'ZCOOL XiaoWei'}>{`正方：${teamA} 反方：${teamB}`}</Heading> */}
                <GradeBestCand resultsID={resultsID} />
            </Flex>
        );
    }
}

export default Team;

export async function getServerSideProps(context) {
    const session = await unstable_getServerSession(context.req, context.res, authOptions)
    
    if (!session || session.user.role != 'Judge') {
        return {
            redirect: {
                destination: '/login',
                permanent: true,
            }
        }
    }
    const { id } = context.params
    return {
        props: {
            resultsID: id
        }
    }
}