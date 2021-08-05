import React, { useEffect } from "react";
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

  var presentTime: number;
  var startDate: Date;
  var endDate: Date;

  useEffect(()=>{
    // タイマーをセットする部分
    presentTime = 10;
    startDate = new Date();
    endDate = new Date();
    endDate.setSeconds(startDate.getSeconds() + presentTime);
    restart(endDate as unknown as number);
  }, [])


  const handleClick = () =>{
    pause();
    //今の発表者が発表した時間を計算
    const remain = hours*3600 + minutes*60 + seconds;
    if(remain > 0){
      // 早く終わったとき
      presentTime = presentTime - remain;
    }else{
      // 時間オーバーしたとき
      const now = new Date();
      presentTime = (now.getHours()*3600 + now.getMinutes()*60 + now.getSeconds()) - (startDate.getHours()*3600 + startDate.getMinutes()*60 + startDate.getSeconds())
    }

    // タイマーをセットする部分
    presentTime = props.timeInfo.toNextPresenter(presentTime);
    startDate = new Date();
    endDate = new Date();
    endDate.setSeconds(startDate.getSeconds() + presentTime);
    restart(endDate as unknown as number);
  }


  return (
    <div /*style={{ textAlign: "center" }}*/ className="flex">
      <div style={{ fontSize: "500%" }}>
        <span>{( '00' + minutes ).slice( -2 )}</span>:<span>{( '00' + seconds ).slice( -2 )}</span>
      </div>
      <button className="button" onClick={()=>handleClick}>  切替  </button>
    </div>
  );  

}

export default DisplayTime;