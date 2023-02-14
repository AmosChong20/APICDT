import School from "../components/SchoolTables";
import Head from 'next/head'

function SchoolCheck({schools}) {
    const res = schools 
    return (
        <>
            <Head>
        <title>参赛队伍</title>
        <meta name="description" content="第十一届亚太大专华语辩论公开赛参赛队伍" />
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
            <School schools={res} />
            </>
    );
}

export default SchoolCheck;

export async function getServerSideProps(context) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}schools`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    })

    const data = await response.json()
    return {
        props: {
            schools: data
        }
    }
}