import React from "react";
//import { TodayPresenter } from "./TodayPresenter";
import ConTab from "./ConTab"
//import "./PresenterTab.css"
//import ChatArea from "./Tabs/Chat/ChatArea";
import Time from './Time/Time';
import Memo from './Memo/Memo';
import { TimeInfo } from './TimeInfo';
import Socket from './WebSocket';

type ConferenceTabProps = {
    timeInfo: TimeInfo,
    socket: Socket
};

const ConferenceTab = (props:ConferenceTabProps) => {
    //const {name, privateMemo, chats} = props.presenter;

    //PrivateMemoが変更されたら
    /*
    const handlePrivateMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        props.onPrivateMemoChange(props.presenter.id, e.target.value);
    };*/

    //PublicMemoの送信ボタンが押されたら
    /*
    const handleSendButtonClick = (name: string, message: string) => {
        props.onSendButtonClick(props.presenter.id, name, message);
    };*/

    //Tab.tsx, ChatArea.tsxへ
    return(
        <div className="presenter-tab">
            <ConTab title="a">
            <Time timeInfo={props.timeInfo}/>

            <Memo timeInfo={props.timeInfo}
            socket={props.socket}/>

            </ConTab>
        </div>
    )

}

export default ConferenceTab;
