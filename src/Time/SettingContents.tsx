import React, { useEffect, useState } from "react";
import { TimeInfo } from "../TimeInfo";
import "./SettingContents.css";

type Props = {
  timeInfo: TimeInfo;
}


function SettingContents(props: Props) {

  const [startHour, setStartHour] = useState(props.timeInfo.getStartTime().getHours());
  const [startMin, setStartMin] = useState(props.timeInfo.getStartTime().getMinutes());
  const [endHour, setEndHour] = useState(props.timeInfo.getEndTime().getHours());
  const [endMin, setEndMin] = useState(props.timeInfo.getEndTime().getMinutes());
  const [numPresenters, setNumPresenters] = useState(props.timeInfo.getNumPresenters());
  const [presenters, setPresenters] = useState(props.timeInfo.getPresenters());
  const [presentTime, setPresentTime] = useState(props.timeInfo.getPresentTime());
  const [breakTime, setBreakTime] = useState(props.timeInfo.getBreakTime());

  // useEffect(()=>{
  //   setStartHour(props.timeInfo.getStartTime().getHours());
  //   setStartMin(props.timeInfo.getStartTime().getMinutes());
  //   setEndHour(props.timeInfo.getEndTime().getHours());
  //   setEndMin(props.timeInfo.getEndTime().getMinutes());
  //   setNumPresenters(props.timeInfo.getNumPresenters());
  //   console.log('useEffect')
  // }, [])

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

    setNumPresenters(props.timeInfo.getNumPresenters());
    setPresenters(props.timeInfo.getPresenters());
  }


  const hundleDeletePresenter = (idx:number) => {
    if(numPresenters > 1){
      props.timeInfo.deletePresenter(idx);

      setPresenters(props.timeInfo.getPresenters());
      setNumPresenters(props.timeInfo.getNumPresenters());
    }
  }

  const hundleAddPresenter = (idx: number, break_: boolean) => {
    if(!break_){
      props.timeInfo.addPresenter(idx+1, "", 20*60);
    }else{
      props.timeInfo.addPresenter(idx+1, "break", 10*60);
    }

    setPresenters(props.timeInfo.getPresenters());
    setNumPresenters(props.timeInfo.getNumPresenters());
  }

  const handlePresenterName = (e: React.ChangeEvent<HTMLInputElement>) => {
    var name = e.target.value;
    var idx = Number(e.target.name.split('_')[1]);
    var presenters_copy = presenters.slice();
    presenters_copy[idx]['name'] = name;
    props.timeInfo.setPresenters(presenters_copy);

    setPresenters(props.timeInfo.getPresenters());
  }

  const handlePresentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    var time = Number(e.target.value);
    props.timeInfo.setPresentTime(time);

    setPresenters(props.timeInfo.getPresenters());
    setPresentTime(props.timeInfo.getPresentTime());
  }

  const handleBreakTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    var time = Number(e.target.value);
    props.timeInfo.setBreakTime(time);

    setPresenters(props.timeInfo.getPresenters());
    setBreakTime(props.timeInfo.getBreakTime());
  }


  return(
    <div>
      <p>設定項目</p>
      <p>開始時間</p>
      <input type="time" name="startTime" value={( '00' + startHour ).slice( -2 )+':'+( '00' + startMin ).slice( -2 )} onChange={handleStartTime}></input>
      <p>終了時間</p>
      <input type="time" name="endTime" value={( '00' + endHour ).slice( -2 )+':'+( '00' + endMin ).slice( -2 )} onChange={handleEndTime}></input>
      <p>発表人数{numPresenters}人</p>
      <input type="number" name="numPresenters" value={numPresenters} min="1" max="20" onChange={handleNumPresenters}></input>
      {/* <button onClick={()=>{
        props.timeInfo.addNumPresenters(1);
        setNumPresenters(props.timeInfo.getNumPresenters());
        setPresenters(props.timeInfo.getPresenters());
      }}>人数+</button> */}
      <p>発表者</p>
      <div className="presenter"> 
        {
          presenters.map((presenter, idx) => {
            if (presenter['name'] === 'break'){ //休憩部分は名前を変えられないように
              return (
                <div className="flex">
                  <button className="namebutton" onClick={() => hundleDeletePresenter(idx)}>x</button>
                  <input type="text" name={"presenter_"+(idx)} value={presenter['name']} onChange={handlePresenterName} disabled></input>
                  <button className="namebutton" onClick={() => hundleAddPresenter(idx, false)}>+発表者</button>
                </div>
              )
            }else{
              return (
                <div className="flex">
                  <button className="namebutton" onClick={() => hundleDeletePresenter(idx)}>x</button>
                  <input type="text" name={"presenter_"+(idx)} value={presenter['name']} onChange={handlePresenterName}></input>
                  <button className="namebutton" onClick={() => hundleAddPresenter(idx, false)}>+発表者</button>
                  <button className="namebutton" onClick={() => hundleAddPresenter(idx, true)}>+休憩</button>
                </div>
              )
            }
            
          })
        }
        
      </div>
      {/* <button onClick={()=>{
        console.log('CLONE')
        var node = document.getElementsByClassName("input")[0];
        node?.after(node.cloneNode());
      }}>CLONE</button>
      <button onClick={()=>{
        console.log('DELETE')
        var nodes = document.getElementsByClassName("input");
        var node = nodes[nodes.length-1]
        node.remove();
      }}>DELETE</button> */}
      <div>
        <p>各発表時間</p>
        <input type="number" value={presentTime} onChange={handlePresentTime}></input>
      </div>
      <div>
        <p>休憩時間</p>
        <input type="number" value={breakTime} onChange={handleBreakTime}></input>
      </div>
      {/* <button>決定</button> */}
      
    </div>
  );
}

export default SettingContents;