import React, {ReactElement, useState} from "react";
import ConferenceTabTitle from "./ConferenceTabTitle";

type ConferenceTabsProps = {
    children: ReactElement[]
}

//クリックされたtabの内容を出力するようにする
const ConferenceTabs: React.FC<ConferenceTabsProps> = ({children}) => {
    const[selectedTab, setSelectedTab] = useState(0)
    /**
     * title={index.toString()}のところが，タブに出される文字を変更するところ
     */
    return(
        <div className="tabs">
            <ul className="nav">
                {children.map((item, index) => (
                    <ConferenceTabTitle 
                        key={index}
                        title={index.toString()}
                        index={index}

                        setSelectedTab={setSelectedTab}
                        isSelected={index == selectedTab}/>
                ))}
            </ul>
            {children[selectedTab]}
        </div>
    )
}

export default ConferenceTabs