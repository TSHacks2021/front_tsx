import React from "react";

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
