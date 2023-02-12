import { useSession } from "next-auth/react";
import { unstable_getServerSession } from "next-auth";
import Announcement from "../components/announcement";
import { useRouter } from "next/router";
import announcement from "../public/announcement.json"
import { authOptions } from "./api/auth/[...nextauth]";
import Head from 'next/head'

function UserHome({announcement}) {
    const { data } = announcement
    return (
        <>
        <Head>
        <title>选手主页</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
            <Announcement announcement={data}></Announcement>
            </>
     );
}

export default UserHome;

export async function getServerSideProps(context) {
    const session = await unstable_getServerSession(context.req, context.res, authOptions)

    if (session === null) {
        return {
            redirect: {
                destination: '/login',
                permanent: true
            }
        }
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}announcements`, {
        method: 'GET',
        headers: {
            'Content-headers': 'application/json'
        }
    })

    const res = await response.json()

    return {
        props: {
            announcement: res
        }
    }
}