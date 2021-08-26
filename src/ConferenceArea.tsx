import React, {useEffect, useState} from "react";
import { isPropertySignature } from "typescript";
import ConferenceTabs from "./ConferenceTabs"
//import { TodayPresenter } from "./TodayPresenter";
import ConferenceTab from "./ConferenceTab"

import {TimeInfo} from "./TimeInfo";

import Socket from './WebSocket'

type ConferenceAreaProps = {
    socket: Socket;
    timeInfo: TimeInfo;
}

const ConferenceArea = (props: ConferenceAreaProps) => {
    const conferenceList = [0, 0, 0] //とりあえず3つ用意
    const conferenceTabs = conferenceList.map((c) => {
        return(
            <ConferenceTab
                timeInfo={props.timeInfo}
                key={c}
                socket={props.socket} 
            />
        );
    });

    return(
        <div>
            <ConferenceTabs>
                {conferenceTabs}
            </ConferenceTabs>
        </div>
    );
}

export default ConferenceArea;