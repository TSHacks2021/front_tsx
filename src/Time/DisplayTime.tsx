import React, { useState, useEffect } from "react";
import "./DisplayTime.css"
import { useTimer } from "react-timer-hook"; //npm install react-timer-hook が必要
import { TimeInfo } from "../TimeInfo";

type Props = {
  timeInfo: TimeInfo;
}
// type TimeFormat = {
//   seconds: number;
//   minutes: number;
//   hours: number;
// }

// type Props = {
//   endTime: TimeFormat;
// }


/*
 * 引数は上のTimeFormatのように{seconds, minutes, hours}の３つを与える．
 * 現在時刻から引数の時間分足した値をタイマーセット時間としてスタートする．（終了時刻を与えてタイマー動かした方がいい？）
 * 引数propsの内容が変わるか，切り替えボタンが押されたときにタイマーがリスタートされる
 */
function DisplayTime( props: Props, { expiryTimestamp }: { expiryTimestamp: number } ) {

  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  // var presentTime: number;
  // var startDate: Date;
  // var endDate: Date;
  const [presentTime, setPresentTime] = useState(10);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(()=>{
    // タイマーをセットする部分
    setPresentTime(10);
    setStartDate(new Date());
    setEndDate(new Date());
    endDate.setSeconds(startDate.getSeconds() + presentTime);
    restart(endDate as unknown as number);
  }, [])


  const handleClick = () =>{
    pause();
    //今の発表者が発表した時間を計算
    const remain = hours*3600 + minutes*60 + seconds;
    var presentTime_ = presentTime;
    if(remain > 0){
      // 早く終わったとき
      presentTime_ = (presentTime - remain);
    }else{
      // 時間オーバーしたとき
      const now = new Date();
      presentTime_ = ((now.getHours()*3600 + now.getMinutes()*60 + now.getSeconds()) - (startDate.getHours()*3600 + startDate.getMinutes()*60 + startDate.getSeconds()))
    }

    // タイマーをセットする部分
    presentTime_ = (props.timeInfo.toNextPresenter(presentTime_));
    var startDate_ = (new Date());
    var endDate_ = (new Date());
    endDate_.setSeconds(startDate_.getSeconds() + presentTime_);
    restart(endDate_ as unknown as number);

    setPresentTime(presentTime_);
    setStartDate(startDate_);
    setEndDate(endDate_);
  }

  const update = () => {
    const [startDate_, endDate_] = props.timeInfo.getNowPresentDate();

    restart(endDate_ as unknown as number);

    setStartDate(startDate_);
    setEndDate(endDate_);
  }


  return (
    <div /*style={{ textAlign: "center" }}*/ className="flex">
      <div style={{ fontSize: "500%" }}>
        <span>{( '00' + minutes ).slice( -2 )}</span>:<span>{( '00' + seconds ).slice( -2 )}</span>
      </div>
      <button className="button" onClick={handleClick}>  切替  </button>
    </div>
  );  

}

export default DisplayTime;