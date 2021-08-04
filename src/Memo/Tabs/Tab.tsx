import React from "react";
import "./Tab.css"

type TabProps = {
    title: string
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
