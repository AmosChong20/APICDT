import MatchCards from "../components/matchCards";
import Loading from './loading'
import { useSession } from "next-auth/react";
import Head from 'next/head'

function Matches({ matches }) {
    const {data:session}  = useSession({ required: true })
    const { data } = matches 
    if (!session) 
        return (
            <Loading/>
        )
    const school = session.user.school
    return ( 
        <>
            <Head>
        <title>比赛</title>
        <meta name="description" content="第十一届亚太大专华语辩论公开赛赛程" />
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
            <MatchCards matches={data} schools={school} />
            </>
     );
}

export default Matches;

export async function getServerSideProps(context) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}matches`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    })
    const data = await response.json()
    return {
        props: {
            matches: data
        }
    }
}