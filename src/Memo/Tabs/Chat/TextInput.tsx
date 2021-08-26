import React, {Component} from "react";

import TextField from "@material-ui/core/TextField";
import "./TextInput.css"
import SendButton from './SendButton';

type TextInputProps = {
    onSendButtonClick: (name: string, message: string) => void;
};

const TextInput = (props:TextInputProps) => {  
    //送信ボタンが押された場合
    const handleSendButtonClick = (e: any) => {

        //送信者の名前と書き込まれた内容を取り出す
        var chatfield =document.getElementById('standard-text') as HTMLInputElement;
        var namefield =document.getElementById('name-text') as HTMLInputElement;

        props.onSendButtonClick(namefield.value, chatfield.value)
        //書き込み欄の内容はクリアする，送信者の名前は変えない
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
                    //enterが押されたら送信する
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