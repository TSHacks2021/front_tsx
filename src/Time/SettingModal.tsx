import React, { useEffect } from "react";
import SettingContents from "./SettingContents";
import { TimeInfo } from "../TimeInfo";
import Modal from "react-modal"; //npm install --save react-modal @types/react-modal でインストール

Modal.setAppElement("#root");

type Props = {
  timeInfo: TimeInfo;
}

function SettingModal(props: Props){
  const [modalIsOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <button
        onClick={()=>{
          setIsOpen(true)
        }}  
      >
        設定
      </button>
      <Modal isOpen={modalIsOpen}>
        <button
          onClick={()=>{
            setIsOpen(false)
          }}  
        >
          閉じる
        </button>
        <SettingContents 
          timeInfo={props.timeInfo}
        />
      </Modal>
    </div>
  );
}

export default SettingModal;