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
        privateMemo: "",
        chats: ["こんにちは！a", "aさん", "遊びましょう！", "今度また～"],
    },
    {
        id: 2,
        name: "B",
        privateMemo: "",
        chats: ["こんにちは！b"],
    },
    {
        id: 3,
        name: "C",
        privateMemo: "",
        chats: [""],
    },
    {
        id: 4,
        name: "D",
        privateMemo: "",
        chats: [""],
    },
];

type MemoAreaProps = {
    presenters: TodayPresenter[];
    presenterNum: number;

    socket: Socket;
    timeInfo: TimeInfo;
}

var dummypresenters: TodayPresenter[];
var savedummypresenters: TodayPresenter[] = new Array(0);
var checksetMessage: any = null;

const sendMessage = (props: MemoAreaProps, presenter: number, sender: string, sendmessage: string) => {
    var message = {"messagetype":"memo", "presenter": presenter, "sender": sender, "message": sendmessage};
    //var message = {"messagetype":"memo", "message": sendmessage};
    //var message = {"messagetype":"message"};
    var mes_json = JSON.stringify(message);
    console.log(mes_json);
    props.socket.emit(mes_json);

}

const MemoArea = (props: MemoAreaProps) => {
    //const[presenters, setPresenters] = useState(dummyPresenters);

    //発表者リストの作成
    dummypresenters = savedummypresenters.slice()
    if (savedummypresenters.length == 0) {
        for(var i = 0; i < props.presenterNum;i++) {
            dummypresenters[i] = {id:i,name:props.presenters[i].name,privateMemo:"",chats:[]}
        }
    }
    var savedummypresenters2: TodayPresenter[];
    const[presenters, setPresenters] = useState(props.presenters)
    const [newMessage, setNewMessage] = useState(props.timeInfo.getChatMessage());

    //　100msごとにメッセージが来ていないか確認する
    if (checksetMessage) clearInterval(checksetMessage);
    checksetMessage = setInterval(function(){
        console.log("b");
        setNewMessage(props.timeInfo.getChatMessage())}, 100);

    React.useEffect(() => {
        const newPresenters = presenters.map((p) => {
            //json内容によって変える．送信者をつけてよければ，こちらのモードで
            if (p.id == Number(newMessage["presenter"])) {
                p.chats.push(newMessage["sender"]+": "+newMessage["message"])
                return{...p, chats:p.chats}
            } else {
                return p;
            }
            /*
            //送信者をつけないバージョン
            if (p.id == 0) {
                p.chats.push(newMessage["message"])
                return{...p, chats:p.chats}
            } else {
                return p;
            }*/
        });
        setPresenters(newPresenters);
        //save用の個所に保存しておく
        savedummypresenters = newPresenters.slice()
        savedummypresenters2 = newPresenters.slice()
    },[newMessage])

    //プライベートメモが変更された場合
    const handlePrivateMemoChange = (id: number, memo: string) => {
        //取得された文字列を保存
        const newPresenters = presenters.map((p) => {
            return p.id === id
                ? {...p, memo:memo}
                :p;
        });
        setPresenters(newPresenters);
        //save用の個所に保存しておく
        savedummypresenters = newPresenters.slice()
    };

    //送信ボタンが押された場合
    const handleSendButtonClick = (presenter: number, sender: string, sendmessage: string) => {
        //送信の処理ができればここでする？
        sendMessage(props, presenter, sender, sendmessage)        
    };

    //PresenterTab.tsxへ
    const presenterTabs = presenters.map((p) => {
        return(
            <PresenterTab
                presenter={p}
                key={p.id}
                onPrivateMemoChange={(id, memo) => handlePrivateMemoChange(id, memo)}

                onSendButtonClick={handleSendButtonClick}
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