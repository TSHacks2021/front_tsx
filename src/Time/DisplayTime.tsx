import React, { useEffect } from "react";
import { useTimer } from "react-timer-hook";

type TimeFormat = {
  seconds: number;
  minutes: number;
  hours: number;
}

type Props = {
  endTime: TimeFormat;
}

function DisplayTime( props: Props, { expiryTimestamp }: { expiryTimestamp: number } ) {

  // const { seconds, minutes, hours, ampm } = useTime({ /*format: "12-hour"*/ });
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
    const sec = props.endTime.hours*3600 + props.endTime.minutes*60 + props.endTime.seconds
    const time = new Date();
    time.setSeconds(time.getSeconds() + sec);
    restart(time as unknown as number);
  }, [props]);

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "500%" }}>
        {/* <p>{props.text}</p> */}
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
        {/* <span>{ampm}</span> */}
      </div>
      
    </div>
  );  

}

export default DisplayTime;