import Form from '../components/form'
import Head from 'next/head'

function Registration() {
  return (
    <>
      <Head>
        <title>选手报名系统</title>
        <meta name="description" content="第十一届亚太大专华语辩论公开赛报名" />
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <link rel="icon" href="/favicon.ico" />
        <link rel='canonical' href='https://apicdt2023.com/registration'/>
      </Head>
      <Form information={['Name', 'Email Address', 'School', 'Country', 'Topic']} />
      </>
      );
}

export default Registration;