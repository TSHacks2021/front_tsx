import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Time from './Time/Time';
import Memo from './Memo/Memo';
import { TimeInfo } from './TimeInfo';
import Socket from './WebSocket';
import reportWebVitals from './reportWebVitals';
import MemoArea from './Memo/MemoArea';


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
  if (message.messagetype == "changepresenter") timeInfo.receiveChangePresenter(message);
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
