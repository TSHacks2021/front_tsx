import React, {ReactElement, useState} from "react";
import TabTitle from "./TabTitle";
import "./Tabs.css"

type TabsProps = {
    children: ReactElement[]
}

//クリックされたtabの内容を出力するようにする
const Tabs: React.FC<TabsProps> = ({children}) => {
    const[selectedTab, setSelectedTab] = useState(0)

    return(
        <div className="tabs">
            <ul className="nav">
                {children.map((item, index) => (
                    <TabTitle 
                        key={index}
                        title={item.props.presenter.name}
                        index={index}

                        setSelectedTab={setSelectedTab}
                        isSelected={index == selectedTab}/>
                ))}
            </ul>
            {children[selectedTab]}
        </div>
    )
}

export default Tabs