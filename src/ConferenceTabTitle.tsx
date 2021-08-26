import React, { useCallback } from "react";
import "./ConTabTitle.css"

type ConferenceTabTitleProps = {
    title: string
    index: number
    setSelectedTab: (index: number) => void
    isSelected: boolean
}

const ConferenceTabTitle: React.FC<ConferenceTabTitleProps> = ({title, setSelectedTab, index, isSelected}) => {
    //タブが選択された場合
    /**
     * 選択されたタブに応じて動作するところ
     * 選択されるとタブの色が変わる
     */
    const onClick = useCallback(() => {
        setSelectedTab(index)
    }, [setSelectedTab, index])
    
    return(
        <li>

            {
                (() => {
                    //選択されているかどうかで色を変更する
                    if(isSelected) {
                        return <button className="selected" onClick={onClick}>{title}</button>
                    } else {
                        return <button className="notSelected" onClick={onClick}>{title}</button>
                    }
                })()
            }
        </li>
    )
}

export default ConferenceTabTitle