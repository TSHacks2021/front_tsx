import React, {useEffect, useState} from "react";
import Tabs from "./Tabs/Tabs"
import { TodayPresenter } from "./TodayPresenter";
import PresenterTab from "./PresenterTab"

import {TimeInfo} from "../TimeInfo";

import Socket from '../WebSocket'


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
    socket: Socket;
    timeInfo: TimeInfo;
}

var savepresenterNmaeList: string[] = new Array(0); //保存用の発表者の名前リスト
var saveTPresentersList: TodayPresenter[] = new Array(0); //保存用の発表者リスト
var checksetMessage: any = null;
var checksetPresenters:any = null;

const sendMessage = (props: MemoAreaProps, presenter: number, sender: string, sendmessage: string) => {
    var message = {"messagetype":"memo", "presenter": presenter, "sender": sender, "message": sendmessage};
    var mes_json = JSON.stringify(message);
    console.log(mes_json);
    props.socket.emit(mes_json);
}

const MemoArea = (props: MemoAreaProps) => {
    //新しいメッセージの受取用
    const [newMessage, setNewMessage] = useState(props.timeInfo.getChatMessage());
    const [tPresenterList, setTPresenterList] = React.useState([] as TodayPresenter[]);//発表者リスト
    const [isNameListChange, setIsNameListChange] = useState(false) //名前リストの内容が変更されたかどうか
    const [update, setUpdate] = useState<boolean>(false)//再レンダリング用
    // console.log("再レンダリング")

    //　100msごとに発表者に変更がないか確認する
    //　変更が合った場合には，書き換えを行う(useEffect)
    if (checksetPresenters) clearInterval(checksetPresenters);
    checksetPresenters = setInterval(function(){
        //内容が変更されたときのみuseEffectが呼び出されるようにする
        const gotPresenterNameList = props.timeInfo.getPresenterList()
        const presenterLength = gotPresenterNameList.length
        if (presenterLength != savepresenterNmaeList.length) {
            //長さが等しくないならば
            setIsNameListChange(true);
        } else {
            //長さは等しいならば内容を調べる
            for(var i=0; i < gotPresenterNameList.length; i++) {
                if (gotPresenterNameList[i] !== savepresenterNmaeList[i]) {
                    //内容が異なるならば
                    setIsNameListChange(true);
                    break
                }
            }
        }
    })
        //setPresenterNameList(props.timeInfo.getPresenterList())}, 100);
    //メッセージが来ていないか確認する
    if (checksetMessage) clearInterval(checksetMessage);
    checksetMessage = setInterval(function(){
        //console.log("b");
        setNewMessage(props.timeInfo.getChatMessage())}, 100);

    //発表者が変更された時
    React.useEffect(() => {
        console.log(newMessage)
        const newtPresenters = tPresenterList.map((p) => {
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
        saveTPresentersList = newtPresenters.slice()
        setUpdate(update?false:true)
    },[newMessage])
    
    React.useEffect(() => {
        //新しいリストを取得
        if(isNameListChange) {
            setIsNameListChange(false)
            const newPresenterNameList = props.timeInfo.getPresenterList()
            //保存用
            savepresenterNmaeList = newPresenterNameList
            console.log(newPresenterNameList)
            const newTPresenterList: TodayPresenter[] = new Array(0)
            var count = 0
            for(var i = 0; i < newPresenterNameList.length; i++) {
                var temp_name = newPresenterNameList[i]
                if(temp_name !== 'break') {
                    var f = false
                    for(var j=0; j < saveTPresentersList.length; j++) {
                        //発表者のidと名前が変更されていなかったら，その記録は残しておく
                        if((saveTPresentersList[j].id === count) && (saveTPresentersList[j].name === temp_name)) {
                            f = true
                            break
                        }
                    }
                    var tempTodayPresenter: TodayPresenter;
                    if(f) {
                        tempTodayPresenter = {
                            id: count,
                            name: temp_name,
                            privateMemo: saveTPresentersList[j].privateMemo,
                            chats: saveTPresentersList[j].chats,
                        }
                    } else {
                        tempTodayPresenter = {
                            id: count,
                            name: temp_name,
                            privateMemo: "",
                            chats: [] as string[],
                        }
                    }
                    count += 1;
                    newTPresenterList.push(tempTodayPresenter);
                }
            }
            setTPresenterList(newTPresenterList)
            saveTPresentersList = newTPresenterList;
        }
    },[isNameListChange])
      
    //プライベートメモが変更された場合
    const handlePrivateMemoChange = (id: number, memo: string) => {
        //取得された文字列を保存
        const newPresenters = tPresenterList.map((p) => {
            return p.id === id
                ? {...p, privateMemo:memo}
                :p;
        });
        setTPresenterList(newPresenters);
        //save用の個所に保存しておく
        saveTPresentersList = newPresenters.slice()
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