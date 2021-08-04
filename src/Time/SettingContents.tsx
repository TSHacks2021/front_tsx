import React, { useEffect, useState } from "react";
import { TimeInfo } from "../TimeInfo";

type Props = {
  timeInfo: TimeInfo;
}


function SettingContents(props: Props) {


    const [startHour, setStartHour] = useState(props.timeInfo.getStartTime().getHours());
    const [startMin, setStartMin] = useState(props.timeInfo.getStartTime().getMinutes());
    const [endHour, setEndHour] = useState(props.timeInfo.getEndTime().getHours());
    const [endMin, setEndMin] = useState(props.timeInfo.getEndTime().getMinutes());
    const [numPresenters, setNumPresenters] = useState(props.timeInfo.getNumPresenters());

    useEffect(()=>{
      setStartHour(props.timeInfo.getStartTime().getHours());
      setStartMin(props.timeInfo.getStartTime().getMinutes());
      setEndHour(props.timeInfo.getEndTime().getHours());
      setEndMin(props.timeInfo.getEndTime().getMinutes());
      setNumPresenters(props.timeInfo.getNumPresenters());
    }, [props.timeInfo])

  return(
    <div>
      <p>設定項目</p>
      <p>開始時間 {startHour}:{startMin} 終了時間 {endHour}:{endMin}</p>
      <p>発表人数{numPresenters}人</p>
      <button onClick={()=>{
        props.timeInfo.addNumPresenters(2);
        setNumPresenters(props.timeInfo.getNumPresenters());
      }}>人数+</button>
    </div>
  );
}

export default SettingContents;