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

    onButtonClick: (e: any) => void;
};

const TextInput = (props:TextInputProps) => {  
    const handleSendButtonClick = (e: any) => {
        var chatfield =document.getElementById('standard-text') as HTMLInputElement;
        var namefield =document.getElementById('name-text') as HTMLInputElement;
        props.onButtonClick(namefield.value+' '+chatfield.value)
        //console.log(chatfield)
        if (chatfield != null) {
            chatfield.value="";
        }
    }

    //enterを押したときに勝手にリフレッシュされるのを防止
    const handleSubmit = (e: any) => {
        e.preventDefault();

    }

    return(
        <React.Fragment>

            <form className="wrap" noValidate autoComplete="off" onSubmit={e => handleSubmit(e)}>
                <TextField
                    id = "name-text"
                    label="名前"
                    className="text-name"
                    margin="normal"
                />
                <TextField
                    id = "standard-text"
                    label="メッセージを入力"
                    className="text"
                    margin="normal"

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