import React, { useState, useEffect } from "react";
import "./DisplayTime.css"
import { useTimer } from "react-timer-hook"; //npm install react-timer-hook が必要
import { TimeInfo } from "../TimeInfo";

type Props = {
  timeInfo: TimeInfo;
}

var presentersIntervalId: any = null;

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

  const [presentTime, setPresentTime] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [presenters, setPresenters] = useState(props.timeInfo.getPresenters());
  if(presentersIntervalId) clearInterval(presentersIntervalId);
  presentersIntervalId = setInterval(function(){setPresenters(props.timeInfo.getPresenters())}, 100)

  useEffect(()=>{
    // タイマーをセットする部分
    // endDate.setSeconds(startDate.getSeconds() + presentTime);
    // restart(endDate as unknown as number);
    if(props.timeInfo.getNowPresenterIndex() >= 0){
      update();
    }
    console.log("Display|useEffect");
  }, [presenters])


  const handleClick = () =>{
    if(props.timeInfo.getNowPresenterIndex() < props.timeInfo.getNumPresenters()-1){
      // 次の発表者がいる場合
      changePresenter();
    }

    props.timeInfo.sendChangePresenter();
  }

  const changePresenter = () =>{
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
      presentTime_ = Math.floor((now.getTime() - startDate.getTime()) /1000);
    }


    // タイマーをリスタート
    // const [startDate_, endDate_] = 
    props.timeInfo.toNextPresenter(presentTime_); // インデックスを進める
    // presentTime_ = Math.floor((endDate_.getTime() - startDate_.getTime()) /1000);
    // restart(endDate_ as unknown as number);

    // setPresentTime(presentTime_);
    // setStartDate(startDate_);
    // setEndDate(endDate_);
  }

  const update = () => {
    // 現在の発表者の開始時刻，終了時刻を受け取り，タイマーをリスタートする
    const [startDate_, endDate_] = props.timeInfo.getNowPresentDate();
    const presentTime_ = Math.floor((endDate_.getTime() - startDate_.getTime()) /1000);

    restart(endDate_ as unknown as number);
    console.log(startDate_);
    console.log(endDate_);

    setPresentTime(presentTime_);
    setStartDate(startDate_);
    setEndDate(endDate_);
  }


  return (
    <div /*style={{ textAlign: "center" }}*/ className="flex">
      <div style={{ fontSize: "500%" }}>
        <span>{( '00' + minutes ).slice( -2 )}</span>:<span>{( '00' + seconds ).slice( -2 )}</span>
      </div>
      <button className="button" onClick={handleClick}>  切替  </button>
      {/* <button className="button" onClick={update}>  更新  </button> */}
    </div>
  );  

}

export default DisplayTime;