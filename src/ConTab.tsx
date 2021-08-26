import React from "react";
//import "./Tab.css"

type ConTabProps = {
    title: string;
}

const Tab: React.FC<ConTabProps> = ({children}) => {

    return (
        <div className="box">
            <div className="Conference">{children}</div>
        </div>

    );
}

export default Tab
