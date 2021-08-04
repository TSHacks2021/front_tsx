import React, {ReactElement, useState} from "react";
//import Tab from "./Tab";
import TabTitle from "./TabTitle";
import "./Tabs.css"

type TabsProps = {
    children: ReactElement[]
}

const Tabs: React.FC<TabsProps> = ({children}) => {
    const[selectedTab, setSelectedTab] = useState(0)

    return(
        <div>
            <ul className="nav">
                {children.map((item, index) => (
                    <TabTitle 
                        key={index}
                        title={item.props.presenter.name}
                        index={index}
                        setSelectedTab={setSelectedTab}/>
                ))}
            </ul>
            {children[selectedTab]}
        </div>
    )
}

export default Tabs