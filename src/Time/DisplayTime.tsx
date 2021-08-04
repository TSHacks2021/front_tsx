import React, { useEffect } from "react";
import "./DisplayTime.css"
import { useTimer } from "react-timer-hook"; //npm install react-timer-hook が必要

type TimeFormat = {
  seconds: number;
  minutes: number;
  hours: number;
}

type Props = {
  endTime: TimeFormat;
}

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

  useEffect(()=>{
    // タイマーをセットする部分
    const sec = props.endTime.hours*3600 + props.endTime.minutes*60 + props.endTime.seconds
    const time = new Date();
    time.setSeconds(time.getSeconds() + sec);
    restart(time as unknown as number);
  }, [props.endTime]); //propsが更新されたら新しくタイマーがスタートする

  return (
    <div /*style={{ textAlign: "center" }}*/ className="flex">
      <div style={{ fontSize: "500%" }}>
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <button className="button"
        onClick={()=> {
          // タイマーをセットする部分
          const sec = props.endTime.hours*3600 + props.endTime.minutes*60 + props.endTime.seconds
          const time = new Date();
          time.setSeconds(time.getSeconds() + sec);
          restart(time as unknown as number);
        }}
      >
        切替
      </button>
    </div>
  );  

}

export default DisplayTime;