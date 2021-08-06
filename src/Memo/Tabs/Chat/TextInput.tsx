import React, {Component} from "react";

import TextField from "@material-ui/core/TextField";
import "./TextInput.css"
import SendButton from './SendButton';
import { isPropertySignature } from "typescript";
/*
class TextInput extends Component {
    render() {
        return (
            <React.Fragment>
                <form className="wrap" noValidate autoComplete="off">
                    <TextField
                        id = "standard-text"
                        label="メッセージを入力"
                        className="text"
                        margin="normal"
                    />
                    <SendButtons />
                </form>
            </React.Fragment>
        );
    }
}
*/

type TextInputProps = {
    //chat: string;
    onChatChange: (chat: string) => void;
    onButtonClick: (e: any) => void;
};

const TextInput = (props:TextInputProps) => {  
    const handleSendButtonClick = (e: any) => {
        var chatfield =document.getElementById('standard-text') as HTMLInputElement;
        props.onButtonClick(e)
        console.log(chatfield)
        if (chatfield != null) {
            chatfield.value="";
        }
    }

    const handleChatChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        props.onChatChange(e.target.value);
        //console.log(e.target.value)
    }

    //enterを押したときに勝手にリフレッシュされるのを防止
    const handleSubmit = (e: any) => {
        e.preventDefault();
    }

    return(
        <React.Fragment>
            <form className="wrap" noValidate autoComplete="off" onSubmit={e => handleSubmit(e)}>
                <TextField
                    id = "standard-text"
                    label="メッセージを入力"
                    className="text"
                    margin="normal"
                    onChange={handleChatChange}
                    onKeyPress={e => {
                        if (e.key == 'Enter') {
                            handleSendButtonClick(e);
                        }}}
                />
                <SendButton 
                    onSendButtonClick={(e) => handleSendButtonClick(e)}/>
            </form>
        </React.Fragment>
    )
}

export default TextInput;