import React, {useState} from "react";
import Tabs from "./Tabs/Tabs"
import Tab from "./Tabs/Tab"
import Memo from "./Memo";
import { TodayPresenter } from "./TodayPresenter";
import PresenterTab from "./PresenterTab"

import {TimeInfo} from "../TimeInfo";
import Socket from '../WebSocket'
import { receiveMessageOnPort } from "worker_threads";

//function SampleMemo() {

const dummyPresenters: TodayPresenter[] = [
    {
        id: 1,
        name: "A",
        memo: "",
        chats: ["こんにちは！a", "aさん", "遊びましょう！", "今度また～"],
    },
    {
        id: 2,
        name: "B",
        memo: "",
        chats: ["こんにちは！b"],
    },
    {
        id: 3,
        name: "C",
        memo: "",
        chats: [""],
    },
    {
        id: 4,
        name: "D",
        memo: "",
        chats: [""],
    },
];

type MemoAreaProps = {
    presenters: string[];
    presenterNum: number;
    socket: Socket;
    timeInfo: TimeInfo;
}
var dummypresenters: TodayPresenter[]
var savedummypresenters: TodayPresenter[] = new Array(0)
var checksetMessage: any = null

const sendMessage = (props: MemoAreaProps, presentername: string, sendmessage: string) => {
    var message = {"messagetype":"memo", "presentername": presentername, "message": sendmessage};
    //var message = {"messagetype":"memo", "message": sendmessage};
    //var message = {"messagetype":"message"};
    var mes_json = JSON.stringify(message);
    console.log(mes_json);
    props.socket.emit(mes_json);
}

const MemoArea = (props: MemoAreaProps) => {
    //const[presenters, setPresenters] = useState(dummyPresenters);
    dummypresenters = savedummypresenters.slice()
    if (savedummypresenters.length == 0) {
        for(var i = 0; i < props.presenterNum;i++) {
            dummypresenters[i] = {id:i,name:props.presenters[i],memo:"",chats:[]}
        }
    }

    const[presenters, setPresenters] = useState(dummypresenters)
    const [newMessage, setNewMessage] = useState(props.timeInfo.getChatMessage())
    /*props.socket.on("message", receiveMessage);

    function receiveMessage(e:any){
        let message = JSON.parse(e.data);
        console.log(message);
        const newPresenters = presenters.map((p) => {
            if (p.id == 0) {
                p.chats.push(message["message"])
                return{...p, chats:p.chats}
            } else {
                return p;
            }
        });
        setPresenters(newPresenters);
    }*/
    if (checksetMessage) clearInterval(checksetMessage);
    checksetMessage = setInterval(function(){setNewMessage(props.timeInfo.getChatMessage())}, 100);

    React.useEffect(() => {
        const newPresenters = presenters.map((p) => {
            /*
            if (p.id == number(newMessage["to"])) {
                p.chats.push(newMessage["sender"]+": "+newMessage["message"])
                return{...p, chats:p.chats}
            } else {
                return p;
            }*/
            
            if (p.id == 0) {
                p.chats.push(newMessage["message"])
                return{...p, chats:p.chats}
            } else {
                return p;
            }
        });
        setPresenters(newPresenters);
        savedummypresenters = newPresenters.slice()
    },[newMessage])

    const handleMemoChange = (id: number, memo: string) => {
        const newPresenters = presenters.map((p) => {
            return p.id === id
                ? {...p, memo:memo}
                :p;
        });
        setPresenters(newPresenters);
        savedummypresenters = newPresenters.slice()
    };

    const handleSendButtonClick = (presentername: string, sendmessage: string) => {
        //送信の処理ができればここでする？
        sendMessage(props, presentername, sendmessage)        
    };
    
    const presenterTabs = presenters.map((p) => {
        return(
            <PresenterTab
                presenter={p}
                key={p.id}
                onMemoChange={(id, memo) => handleMemoChange(id, memo)}
                onSendButtonClick={handleSendButtonClick}
                //onMemoChange={(id, memo) => {}}
            />
        );
    });

    return(
        <div>
            <Tabs>
                {presenterTabs}
            </Tabs>
        </div>
    );
}

export default MemoArea;