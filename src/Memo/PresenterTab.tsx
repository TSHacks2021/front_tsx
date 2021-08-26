import React from "react";
import { TodayPresenter } from "./TodayPresenter";
import Tab from "./Tabs/Tab"
import "./PresenterTab.css"
import ChatArea from "./Tabs/Chat/ChatArea";

type PresenterTabProps = {
    presenter: TodayPresenter;
    onPrivateMemoChange: (id: number, memo: string) => void;
    onSendButtonClick: (presenter:number, name:string, message: string) => void;
};

const PresenterTab = (props:PresenterTabProps) => {
    const {name, privateMemo, chats} = props.presenter;

    //PrivateMemoが変更されたら
    const handlePrivateMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        props.onPrivateMemoChange(props.presenter.id, e.target.value);
    };

    //PublicMemoの送信ボタンが押されたら
    const handleSendButtonClick = (name: string, message: string) => {
        props.onSendButtonClick(props.presenter.id, name, message);
    };

    //Tab.tsx, ChatArea.tsxへ
    return(
        <div className="presenter-tab">
            <Tab title="a">
                <div className="box">
                <div className="field">
                    <textarea
                        className="memo"
                        placeholder="プライベートメモ"
                        value={privateMemo}
                        onChange={handlePrivateMemoChange}
                    />
                </div>
                <div className="field">
                    <ChatArea
                        chats={chats}
                        onSendButtonClick={handleSendButtonClick}
                    />
                </div>
                </div>
            </Tab>
        </div>
    )

}

export default PresenterTab;
