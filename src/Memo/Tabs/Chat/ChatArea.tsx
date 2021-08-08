import React, {useState, Component, useEffect} from "react";

import AlignItemsList from "./AlignItemsList";
import TextInput from "./TextInput";

type ChatAreaProps = {
    chats: string[];
    onSendButtonClick: (chat: string) => void;
}

const ChatArea = (props:ChatAreaProps) => {
    const[chats, setChats] = useState(props.chats);

    //送信ボタンが押された場合
    const handleButtonClick = (message: string) => {
        props.onSendButtonClick(message);
    }

    return(
        <React.Fragment>
            <div className="Chat">
                <AlignItemsList
                    chats = {chats}
                    />
                <TextInput
                    onButtonClick={handleButtonClick}/>
            </div>
        </React.Fragment>
    )
}

export default ChatArea