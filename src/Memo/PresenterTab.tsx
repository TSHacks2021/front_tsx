import React from "react";
import { TodayPresenter } from "./TodayPresenter";
import Tab from "./Tabs/Tab"
import "./PresenterTab.css"
import ChatArea from "./Tabs/Chat/ChatArea";

type PresenterTabProps = {
    presenter: TodayPresenter;
    onPrivateMemoChange: (id: number, memo: string) => void;

    onSendButtonClick: (presenterName:string, message: string) => void;
};

const PresenterTab = (props:PresenterTabProps) => {
    const {name, memo, chats} = props.presenter;

    const handlePrivateMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        props.onPrivateMemoChange(props.presenter.id, e.target.value);
    };

    const handleSendButtonClick = (message: string) => {
        props.onSendButtonClick(props.presenter.name, message);
    };

    return(
        <div className="presenter-tab">
            <Tab title="a">
                <div className="box">
                <div className="field">
                    <textarea
                        //type="text"
                        className="memo"

                        placeholder="プライベートメモ"
                        value={memo}
                        onChange={handlePrivateMemoChange}
                    />
                </div>
                <div className="field">
                    <ChatArea
                        chats={chats}/*value={chats}*/

                        onSendButtonClick={handleSendButtonClick}
                    />
                </div>
                </div>
            </Tab>
        </div>
    )

}

export default PresenterTab;
