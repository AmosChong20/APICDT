import Topic from "../components/topic";
import Head from 'next/head'

function TopicPage({ topics }) {
    const { data } = topics
    console.log(data)
    return (
        <>
        <Head>
        <title>比赛辩题</title>
        <meta name="description" content="第十一届亚太大专华语辩论公开赛辩题" />
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
                <link rel="icon" href="/favicon.ico" />
                <link rel='canonical' href='https://apicdt2023.com/topic'/>
      </Head>
            <Topic topics={data}></Topic>
            </>
    );
}

export default TopicPage;

export async function getServerSideProps() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}matches`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    })
    const res = await response.json()
    return {
        props: {
            topics: res
        }
    }
}