import React, {useEffect, useState} from "react";
import ConferenceTabs from "./ConferenceTabs"
//import { TodayPresenter } from "./TodayPresenter";
import ConferenceTab from "./ConferenceTab"

import {TimeInfo} from "./TimeInfo";

import Socket from './WebSocket';

import axios from 'axios';

type ConferenceAreaProps = {
    socket: Socket;
    timeInfo: TimeInfo;
}

const ConferenceArea = (props: ConferenceAreaProps) => {
    //全てのタブの内容を管理するところ
    /**
     * やろうとしたこと
     * conferenceListで会議の情報を持つ
     * 今，numberのリストになっているが，会議の情報をまとめたもの(例えば，setting/idで受け取った内容を保持しておくのか)などは未定
     * 現在のところでは会議idだけリストにしておいて，必要になったら，設定を要求するでもいいかなぁとか思ったので，numberのリストになっている
     */

    const conferenceList = [0, 0, 0] //とりあえず3つ用意
    // herokuから会議の設定を受け取る
    /**
     * fetchで受け取ろうとしたが，
     * Access to fetch at 'https://warm-gorge-29708.herokuapp.com/conferences' 
     * from origin 'http://localhost:3000' has been blocked by CORS policy: 
     * Response to preflight request doesn't pass access control check: 
     * No 'Access-Control-Allow-Origin' header is present on the requested resource. 
     * If an opaque response serves your needs, set the request's mode to 'no-cors' 
     * to fetch the resource with CORS disabled.
     * のエラーにより断念中
     * 下のheadersは解決のためにトライしたこと，ここで与えるheaderを間違ったのか，サーバー側で直す方法があるのか不明
     */
    const [post, setPosts] = useState([])
    useEffect(() => {
        fetch("https://warm-gorge-29708.herokuapp.com/conferences", {
            headers: {'Access-Control-Allow-Origin': '*'}
        })
        .then((res) => console.log(res))
        //.then((res) => res.json())
        //.then((data) => setPosts(data));
        console.log(post)
    }, [])
    
    // 会議リストに基づき，タブボタンの生成，内容の生成を行う
    // mapで一つ一つの内容を獲得できるのだが，ここで重要なのが"key"を設定することらしい
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