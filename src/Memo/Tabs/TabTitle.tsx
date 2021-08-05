import React, { useCallback } from "react";
import "./TabTitle.css"

type TabTitleProps = {
    title: string
    index: number
    setSelectedTab: (index: number) => void
    isSelected: boolean
}

const TabTitle: React.FC<TabTitleProps> = ({title, setSelectedTab, index, isSelected}) => {
    const onClick = useCallback(() => {
        setSelectedTab(index)    
    }, [setSelectedTab, index])
    //const isSelected = props.index
    
    return(
        <li>
            {
                (() => {
                    if(isSelected) {
                        return <button className="selected" onClick={onClick}>{title}</button>
                    } else {
                        return <button className="notSelected" onClick={onClick}>{title}</button>
                    }
                })()
            }
            {/*<button onClick={onClick}>{title}</button>*/}
        </li>
    )
}

export default TabTitle