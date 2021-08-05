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
  

  // useEffect(()=>{
  //   setStartHour(props.timeInfo.getStartTime().getHours());
  //   setStartMin(props.timeInfo.getStartTime().getMinutes());
  //   setEndHour(props.timeInfo.getEndTime().getHours());
  //   setEndMin(props.timeInfo.getEndTime().getMinutes());
  //   setNumPresenters(props.timeInfo.getNumPresenters());
  //   console.log('useEffect')
  // }, [numPresenters])

  const handleStartTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    var [h, min] = e.target.value.split(':').map(Number);

    //propsの更新
    var startTime = new Date();
    startTime.setHours(h);
    startTime.setMinutes(min);
    props.timeInfo.setStartTime(startTime); 

    setStartHour(h);
    setStartMin(min);
  }

  const handleEndTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    var [h, min] = e.target.value.split(':').map(Number);

    //propsの更新
    var endTime = new Date();
    endTime.setHours(h);
    endTime.setMinutes(min);
    props.timeInfo.setEndTime(endTime); 

    setEndHour(h);
    setEndMin(min);
  }

  const handleNumPresenters = (e: React.ChangeEvent<HTMLInputElement>) => {
    var n = Number(e.target.value);
    props.timeInfo.setNumPresenters(n);

    setNumPresenters(n);
  }

  // handlePresenterInfo(){
  //   return (
  //     <input></input>
  //   );
  // }

  return(
    <div>
      <p>設定項目</p>
      <p>開始時間</p>
      <input type="time" name="startTime" value={startHour+':'+startMin} onChange={handleStartTime}></input>
      <p>終了時間</p>
      <input type="time" name="endTime" value={endHour+':'+endMin} onChange={handleEndTime}></input>
      <p>発表人数{numPresenters}人</p>
      <input type="number" name="numPresenters" value={numPresenters} min="1" onChange={handleNumPresenters}></input>
      <button onClick={()=>{
        props.timeInfo.addNumPresenters(1);
        console.log(props.timeInfo.numPresenters)
        setNumPresenters(props.timeInfo.getNumPresenters());
      }}>人数+</button>
      {/* <p>{}</p> */}
    </div>
  );
}

export default SettingContents;