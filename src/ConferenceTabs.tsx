import React, {ReactElement, useState} from "react";
import ConferenceTabTitle from "./ConferenceTabTitle";
//import "./Tabs.css"

type ConferenceTabsProps = {
    children: ReactElement[]
}

//クリックされたtabの内容を出力するようにする
const ConferenceTabs: React.FC<ConferenceTabsProps> = ({children}) => {
    const[selectedTab, setSelectedTab] = useState(0)

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