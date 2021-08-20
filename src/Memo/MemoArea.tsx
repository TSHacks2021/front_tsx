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

/*ダミーデータ
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
*/
type MemoAreaProps = {
    //tPresenters: TodayPresenter[];
    //presenterNum: number;
    socket: Socket;
    timeInfo: TimeInfo;
}

var savepresenterNmaeList: string[] = new Array(0); //保存用の発表者の名前リスト
var saveTPresentersList: TodayPresenter[] = new Array(0); //保存用の発表者リスト
var checksetMessage: any = null;
var checksetPresenters:any = null;

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
    /*
    dummypresenters = savedummypresenters.slice()
    if (savedummypresenters.length == 0) {
        for(var i = 0; i < props.presenterNum;i++) {
            dummypresenters[i] = {id:i,name:props.tPresenters[i].name,privateMemo:"",chats:[]}
        }
    }*/
    var savedummypresenters2: TodayPresenter[];
    //const[tpresenters, settPresenters] = useState<TodayPresenter[]>(props.tPresenters)
    //const[tpresenters, settPresenters] = useState([] as TodayPresenter[])
    const [newMessage, setNewMessage] = useState(props.timeInfo.getChatMessage());
    const [presenterNameList, setPresenterNameList] = React.useState(props.timeInfo.getPresenterList());
    const [tPresenterList, setTPresenterList] = React.useState([] as TodayPresenter[]);
    //　100msごとにメッセージが来ていないか確認する
    if (checksetPresenters) clearInterval(checksetPresenters);
    checksetPresenters = setInterval(function(){/*console.log('memo');*/ setPresenterNameList(props.timeInfo.getPresenterList())}, 100);
    if (checksetMessage) clearInterval(checksetMessage);
    checksetMessage = setInterval(function(){
        //console.log("b");
        setNewMessage(props.timeInfo.getChatMessage())}, 100);

    React.useEffect(() => {
        console.log(newMessage)
        const newtPresenters = tPresenterList.map((p) => {
            //json内容によって変える．送信者をつけてよければ，こちらのモードで
            console.log(newMessage)
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
        setTPresenterList(newtPresenters);
        //save用の個所に保存しておく
        savedummypresenters = newtPresenters.slice()
        savedummypresenters2 = newtPresenters.slice()
    },[newMessage])
    /*
    React.useEffect(() => {
        //const newPresenterList = presenterList
        //const newPresenterNameList: string[] = new Array(0)
        console.log(presenterNameList)
        const newTPresenterList: TodayPresenter[] = new Array(0)
        var count = 0
        for(var i = 0; i < presenterNameList.length; i++) {
          var temp_name = presenterNameList[i]
          
          if(temp_name !== 'break') {
            //presenters[i] = presenter[i].name
            count += 1
            const tempTodayPresenter = {
              id: count,
              name: temp_name,
              privateMemo: "",
              chats: [""],
          }
            newTPresenterList.push(tempTodayPresenter)
            //newPresenterNameList.push(temp_name)
          }
        }
        setTPresenterList(newTPresenterList)
      },[presenterNameList])
      */
    //プライベートメモが変更された場合
    const handlePrivateMemoChange = (id: number, memo: string) => {
        //取得された文字列を保存
        const newPresenters = tPresenterList.map((p) => {
            return p.id === id
                ? {...p, memo:memo}
                :p;
        });
        setTPresenterList(newPresenters);
        //save用の個所に保存しておく
        savedummypresenters = newPresenters.slice()
    };

    //送信ボタンが押された場合
    const handleSendButtonClick = (presenter: number, sender: string, sendmessage: string) => {
        //送信の処理ができればここでする？
        sendMessage(props, presenter, sender, sendmessage)        
    };

    //PresenterTab.tsxへ
    const presenterTabs = tPresenterList.map((p) => {
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