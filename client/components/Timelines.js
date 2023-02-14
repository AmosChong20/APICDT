import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import React from "react";

import event from '../public/data/events.json'
import {
  Flex,
  Text,
  Container
} from '@chakra-ui/react'
import "@fontsource/zcool-xiaowei"
import styles from '../styles/Timelines.module.css'
export default function Timelines(){
  const { events } = event
  return (
    <div className={styles.body} >
      < Container maxW='100vw' centerContent >
            <Flex >
                <Text className={styles.text}  fontFamily= {"ZCOOL XiaoWei"} align='center'>
                    辩处事之道，论经世之心；探人间至理，寻生活本真<br/>
                    人文荟萃，尽显大家风采；舌灿莲花，不负才俊风流<br/>
                    癸卯盛夏，惊才绝艳，再聚狮城<br/>
            第十一届亚太大专华语辩论赛，静候君来。
                </Text >
            </Flex>
            </Container>
            <Text className={styles.header} fontFamily= {"ZCOOL XiaoWei"} fontWeight={'50'} color='#dedede'>
                    比赛行程<br/>
            </Text >
      
      <VerticalTimeline lineColor={'rgba(26, 26, 26, 0.6)' } className={styles.bottom}> 
      {events.map(event => {
          return (
              <VerticalTimelineElement
              className="vertical-timeline-element--work" 
              contentStyle={{ background: 'rgba(18, 18, 18, 0.6)' ,borderBottomColor:" Black", boxShadow:"none"}}
              contentArrowStyle={{ borderRight: '10px solid  rgba(18, 18, 18, 0.6)' }}
              date= {event.date}
              dateClassName={styles.date}
              iconStyle = {{background: 'rgba(18, 18, 18, 0.85)', boxShadow:"none"}}
              key={event.id}>
              <Flex fontFamily={"ZCOOL XiaoWei"}  fontSize={'24px'} letterSpacing='0.37em' justify='center' color='#dedede'>{event.event}</Flex>
              </VerticalTimelineElement>
)} )}
    </VerticalTimeline>
    </div>
  );
}

