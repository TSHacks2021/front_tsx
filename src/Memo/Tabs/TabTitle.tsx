import React, { useCallback } from "react";
import "./TabTitle.css"

type TabTitleProps = {
    title: string
    index: number
    setSelectedTab: (index: number) => void
}

const TabTitle: React.FC<TabTitleProps> = ({title, setSelectedTab, index}) => {
    const onClick = useCallback(() => {
        setSelectedTab(index)
    }, [setSelectedTab, index])
    
    return(
        <li>
            <button onClick={onClick}>{title}</button>
        </li>
    )
}

export default TabTitle