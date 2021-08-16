import React, {useState, Component, useEffect} from "react";

import AlignItemsList from "./AlignItemsList";
import TextInput from "./TextInput";

type ChatAreaProps = {
    chats: string[];
    onSendButtonClick: (name: string, chat: string) => void;
}

const ChatArea = (props:ChatAreaProps) => {
    const[chats, setChats] = useState(props.chats);

    //送信ボタンが押された場合
    const handleButtonClick = (name: string, message: string) => {
        props.onSendButtonClick(name, message);
    }

    return(
        <React.Fragment>
            <div className="Chat">
                <AlignItemsList
                    chats = {chats}
                    />
                <TextInput
                    onSendButtonClick={handleButtonClick}/>
            </div>
        </React.Fragment>
    )
}

export default ChatArea