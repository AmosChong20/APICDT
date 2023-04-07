import {
  Flex,
  Heading,
  Box,
  Button,
  Stack,
  Select,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import "@fontsource/ma-shan-zheng";
import "@fontsource/montserrat";
import "@fontsource/zcool-xiaowei";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import AlertDialog from "../components/alert";
import { useSession } from "next-auth/react";
import countries from "../public/data/participatingCountry.json";
import moment from "moment";
import starTime from '../public/data/starwars.json'
import Loading from "./loading";
import Head from "next/head";
import Config from "../public/data/starwars.json";
import styles from "../styles/starwars.module.css";

const ROOT_URL = process.env.NEXT_PUBLIC_STARWARS_URL;

const fetchAreaConfig = async (area) => {
  try {
    const r = await (
      await fetch(`${ROOT_URL}get-area-config?area=${area}`)
    ).json();
    if (r.error) {
      throw r.error;
    }

    return r.areaConfig;
  } catch (e) {
    throw e;
  }
};

const registerTime = async (area, schoolName) => {
  const r = await (
    await fetch(`${ROOT_URL}register-time`, {
      method: "POST",
      body: JSON.stringify({
        area,
        schoolName,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
  ).json();
  if (r.error) {
    throw r.error;
  }
  return r;
};

function Starwars({ initialTime }) {
  const { data: session } = useSession();

  const router = useRouter();

  const { Starwars } = starTime
    const [selectedArea, setSelectedArea] = useState();
    const [selectedArea2, setSelectedArea2] = useState();
  const [selectedAreaConfig, setSelectedAreaConfig] = useState();
  const [isWaitingForDebounce, setIsWaitingForDebounce] = useState(false);
  const [schoolName, setSchoolName] = useState();
  const [notice, setNotice] = useState("");

  const setNoticeInner = useCallback(
    (msg) => {
      setNotice(msg);
      setTimeout(() => {
        if (notice === msg) setNotice("");
      }, 3000);
    },
    [notice]
  );

  const email = session && session.user && session.user.email;

  useEffect(() => {
    if (!session) return;
    const inner = async () => {
      const userResponse = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}schools?filters[accountEmail][$eq]=${email}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const userRes = await userResponse.json();
      const schoolName = userRes.data[0].attributes.schoolNameCN;

      setSchoolName(schoolName);
    };

    inner();
  }, [email, session]);

  const handleAreaChange = useCallback(async (e) => {
    const area = e.target.value;

    if (!e.target.value) {
        setSelectedArea(null);
      return null;
    }
      setSelectedArea(area);
    // Fetch the area config
    fetchAreaConfig(area).then((res) => {
      console.log(res);
      setSelectedAreaConfig(res);
    });
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (isWaitingForDebounce) {
        return;
      }

      setIsWaitingForDebounce(true);
      setTimeout(() => {
        setIsWaitingForDebounce(false);
      }, 1500);

      try {
        const res = await registerTime(selectedArea, schoolName);
        const { timeUsed } = res;
        setNoticeInner(
          `成功提交！您的用时是${timeUsed / 1000}秒！页面将在两秒后跳转`
        );
        console.log(timeUsed);
        setTimeout(() => {
          router.push("/drawnResults/" + selectedArea);
        }, 2000);
      } catch (e) {
        setNoticeInner(e);
      }
      const res = await fetch(`/api/current-time`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            startTime: selectedAreaConfig.startTime,
            endTime: selectedAreaConfig.endTime
        })
      })
    
    const { totalDuration, checkPast } = await res.json()

    if (totalDuration < 0) {
        return null
    }

    if (checkPast > 0) {
        return null
    }
          const duration = totalDuration
    try {
        const userResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}schools?filters[accountEmail][$eq]=${email}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
        const userRes = await userResponse.json()
        const schoolName = userRes.data[0].attributes.schoolNameCN
        const schoolResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}drawn-results?filters[schoolName][$eq]=${schoolName}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
        const schoolRes = await schoolResponse.json()

        if (schoolRes.data.length > 0) {
            return null
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}drawn-results`, {
            method: 'POST',
            body: JSON.stringify({
                data: {
                    area: selectedArea,
                    schoolName: schoolName,
                    timeUsed: duration
                }
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const res = await response.json()
        console.log(res)
        const { data } = res
    }
    catch (e) {
        console.log(e)
    }
    },
      [isWaitingForDebounce, router, schoolName, selectedArea, setNoticeInner]
    

    

  );

  if (!session) return <Loading />;

  if (session === null) {
    router.push("/login");
  }

  return (
    <>
      <Head>
        <title>电子抽签系统</title>
        <meta name="description" content="第十一届亚太大专华语辩论公开赛抽签" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* {submitted && <Loading/> } */}
      {notice && (
        <Flex
          justify={"center"}
          mt={"70px"}
          ml={"-15px"}
          fontFamily={"ZCOOL XiaoWei"}
          fontSize={"26px"}
          color="black"
        >
          {notice}
        </Flex>
      )}
      {/* {!notTimeYet && ( */}
      <Flex
        fontFamily={"ZCOOL XiaoWei"}
        align="center"
        justify={"center"}
        flexDirection={"column"}
        minH={"92vh"}
        mb={"100px"}
      >
        {/* {selectedArea ? ( */}
        <Stack align="center" justify={"center"}>
          <Select
            borderColor={"Black"}
            w="150px"
            placeholder="地区"
            value={selectedArea}
            onChange={handleAreaChange}
            zIndex={0}
          >
            {Config.Starwars.map((country) => {
              return <option key={country.area}>{country.area}</option>;
            })}
          </Select>

          {selectedAreaConfig && schoolName ? (
            <>
              <Stack align={"center"} gap="15px">
                <div className={styles.countryName}>
                  {`${selectedAreaConfig.area}`}{" "}
                </div>
                <div>您代表：{schoolName}</div>
                <div className={styles.time}>
                  {`开始抽签时间：${moment(selectedAreaConfig.startTime)
                    .utcOffset(8)
                    .format("D/M/yyyy (UTC+8) hh:mm a")}`}{" "}
                </div>
                <div className={styles.time}>
                  {`结束抽签时间：${moment(selectedAreaConfig.endTime)
                    .utcOffset(8)
                    .format("D/M/yyyy (UTC+8) hh:mm a")}`}{" "}
                </div>

                <button
                  className={styles.submit}
                  // colorScheme={"whiteAlpha"}
                  style={
                    isWaitingForDebounce
                      ? {
                          backgroundColor: "gray",
                        }
                      : {}
                  }
                  type="submit"
                  onClick={handleSubmit}
                >
                  提交
                </button>
              </Stack>
            </>
          ) : selectedArea ? (
            <>
              <div>加载信息中...</div>
            </>
          ) : (
            <div>请选择地区</div>
          )}
        </Stack>
        {/* ) : ( */}

        {/* )} */}
        {/* {submitted ? <Button mt={10}><Link href='/'>查看结果</Link></Button> : <Box></Box>} */}
      </Flex>
      {/* )} */}
    </>
  );
}

Starwars.auth = true;
export default Starwars;

Starwars.getInitialProps = async () => {
  const time = moment().format("hh:mm:ss a");

  return {
    props: {
      initialTime: time,
    },
  };
};
