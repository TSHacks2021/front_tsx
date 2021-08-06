import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Time from './Time/Time';
import Memo from './Memo/Memo';
import { TimeInfo } from './TimeInfo';
import Socket from './WebSocket';
import reportWebVitals from './reportWebVitals';
import MemoArea from './Memo/MemoArea';

const timeInfo = new TimeInfo();

let ws = new WebSocket("ws://localhost:1323/ws");
let socket = new Socket(ws);
socket.on("message", receiveMessage);
function receiveMessage(e:any){
  let message = JSON.parse(e.data);
  console.log(message);
  if(message["messagetype"] == "memo") {
    timeInfo.setChatMessage(message);
  }

}

ReactDOM.render(
  <React.StrictMode>
    <Time timeInfo={timeInfo}/>
    <Memo timeInfo={timeInfo}
      socket={socket}/>
    <button onClick={()=>{
      // var message = "React!";
      var message = {messagetype:"memo", message:"React!"};
      var mes_json = JSON.stringify(message);
      console.log(mes_json);
      socket.emit(mes_json);
    }}>
      送信
    </button>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
