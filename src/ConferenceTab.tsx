import React from "react";
import ConTab from "./ConTab"
import Time from './Time/Time';
import Memo from './Memo/Memo';
import { TimeInfo } from './TimeInfo';
import Socket from './WebSocket';

type ConferenceTabProps = {
    timeInfo: TimeInfo,
    socket: Socket
};

const ConferenceTab = (props:ConferenceTabProps) => {
    // デザインなど，全く拘っていないので調整する際には，似た名前のTabとかTabsとかのcssを参考にすること
    // タブの内容をここに持っておく
    /**
     * 試しに動かしてみる際には，<Time>を一度消す
     * タブのボタンを触れるようにするためには，timebarの位置を調整し直す必要がある
     * このままだと，触れない
     */
    return(
        <div className="presenter-tab">
            <ConTab title="a">
            <Time timeInfo={props.timeInfo}/>

            <Memo timeInfo={props.timeInfo}
                    socket={props.socket}/>

            </ConTab>
        </div>
    )

}

export default ConferenceTab;
