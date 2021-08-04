import React from "react";
import "./Tab.css"
import {TodayPresenter} from "../TodayPresenter"

type TabProps = {
    title: string;
}

const Tab: React.FC<TabProps> = ({children}) => {
    return (
        <div className="box">
            <div className="Memo">{children}</div>
            <div className="Memo">{children}</div>
        </div>

    );
}

export default Tab
