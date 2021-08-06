import React, {useState, Component, useEffect} from "react";
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
    //boolean型のstateを作成
    const [update,setUpdata]=useState<boolean>(false)
    let newchat: string;
    const handleChatChange = (chat: string) => {
        newchat = chat
        //console.log(newchat)
    }

    const handleButtonClick = () => {
        const newChats = chats
        newChats.push(newchat)
        setChats(newChats)

        //レンダリングしたい場所でこれを差し込むだけ
        setUpdata(update?false:true)
        console.log(props.chats)
        props.onSendButtonClick(newchat);
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