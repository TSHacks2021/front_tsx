import React, {useState} from "react";
import Tabs from "./Tabs/Tabs"
import Tab from "./Tabs/Tab"
import Memo from "./Memo";
import { TodayPresenter } from "./TodayPresenter";
import PresenterTab from "./PresenterTab"

import {TimeInfo} from "../TimeInfo";
//function SampleMemo() {

const dummyPresenters: TodayPresenter[] = [
    {
        id: 1,
        name: "A",
        memo: "",
        chats: ["こんにちは！a", "aさん", "遊びましょう！", "今度また～"],
    },
    {
        id: 2,
        name: "B",
        memo: "",
        chats: ["こんにちは！b"],
    },
    {
        id: 3,
        name: "C",
        memo: "",
        chats: [""],
    },
    {
        id: 4,
        name: "D",
        memo: "",
        chats: [""],
    },
];

type MemoAreaProps = {
    presenters: string[];
    presenterNum: number;
}

const MemoArea = (props: MemoAreaProps) => {
    //const[presenters, setPresenters] = useState(dummyPresenters);
    var dummypresenters: TodayPresenter[] = new Array(props.presenterNum)
    for(var i = 0; i < props.presenterNum;i++) {
        dummypresenters[i] = {id:i,name:props.presenters[i],memo:"",chats:[""]}
    }
    const[presenters, setPresenters] = useState(dummypresenters)
    
    const handleMemoChange = (id: number, memo: string) => {
        const newPresenters = presenters.map((p) => {
            return p.id === id
                ? {...p, memo:memo}
                :p;
        });
        setPresenters(newPresenters);
    };

    const presenterTabs = presenters.map((p) => {
        return(
            <PresenterTab
                presenter={p}
                key={p.id}
                onMemoChange={(id, memo) => handleMemoChange(id, memo)}
                //onMemoChange={(id, memo) => {}}
            />
        );
    });

    return(
        <div>
            <Tabs>
                {presenterTabs}
            </Tabs>
        </div>
    );
}

export default MemoArea;