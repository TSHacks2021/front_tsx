import React from "react";
import { TodayPresenter } from "./TodayPresenter";
import Tab from "./Tabs/Tab"
import "./PresenterTab.css"
import ChatArea from "./Tabs/Chat/ChatArea";

type PresenterTabProps = {
    presenter: TodayPresenter;
    onMemoChange: (id: number, memo: string) => void;
};

const PresenterTab = (props:PresenterTabProps) => {
    const {name, memo, chats} = props.presenter;

    const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        props.onMemoChange(props.presenter.id, e.target.value);
    };

    return(
        <div className="presenter-tab">
            <Tab title="a">
                <div className="box">
                <div className="field">
                    <textarea
                        //type="text"
                        className="memo"
                        value={memo}
                        onChange={handleMemoChange}
                    />
                </div>
                <div className="field">
                    <ChatArea
                        chats={chats}/*value={chats}*/
                    />
                </div>
                </div>
            </Tab>
        </div>
    )

}

export default PresenterTab;
