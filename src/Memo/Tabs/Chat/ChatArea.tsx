import React, {useState, Component} from "react";
import { isPropertySignature } from "typescript";

//import {connect} from 'react-redux'

import AlignItemsList from "./AlignItemsList";
import TextInput from "./TextInput";

/*class ChatArea extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="Chat">
                    <AlignItemsList/>
                    <TextInput/>
                </div>
            </React.Fragment>
        );
    }
}*/
type ChatAreaProps = {
    chats: string[];
}

const ChatArea = (props:ChatAreaProps) => {
    //const chats = props.chats
    const[chats, setChats] = useState(props.chats);
    let newchat: string;
    const handleChatChange = (chat: string) => {
        newchat = chat
        //console.log(newchat)
    }

    const handleButtonClick = () => {
        const newChats = chats
        newChats.push(newchat)
        setChats(newChats)
        console.log(props.chats)
    }

    return(
        <React.Fragment>
            <div className="Chat">
                <AlignItemsList
                    chats = {chats}
                    />
                <TextInput
                    onChatChange={handleChatChange}
                    onButtonClick={handleButtonClick}/>
            </div>
        </React.Fragment>
    )
}

export default ChatArea