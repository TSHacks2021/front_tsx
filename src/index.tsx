import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Time from './Time/Time';
import Memo from './Memo/Memo';
import { TimeInfo } from './TimeInfo';
import Socket from './WebSocket';
import reportWebVitals from './reportWebVitals';
import MemoArea from './Memo/MemoArea';
//import ConferenceArea from './ConferenceArea';


let ws = new WebSocket("ws://localhost:8080/ws");
//let ws = new WebSocket("wss://warm-gorge-29708.herokuapp.com/ws");
let socket = new Socket(ws);

const timeInfo = new TimeInfo(socket);

socket.on("message", receiveMessage);
function receiveMessage(e:any){
  let message = JSON.parse(e.data);
  console.log(message);
  if(message["messagetype"] == "memo") {
    timeInfo.setChatMessage(message);
  }

  if (message.messagetype == "setting") timeInfo.receiveTimeInfo(message);
  if (message.messagetype == "change") timeInfo.receiveChangePresenter(message);
}


ReactDOM.render(
  <React.StrictMode>
    {/*<ConferenceArea 
      timeInfo={timeInfo}
    socket={socket}/>*/}
    <Time timeInfo={timeInfo}/>

    <Memo timeInfo={timeInfo}
    socket={socket}/>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
