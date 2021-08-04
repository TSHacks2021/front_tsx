import React, { useEffect } from "react";
import Modal from "react-modal"; //npm install --save react-modal @types/react-modal でインストール

Modal.setAppElement("#root");

function SettingTime(){
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
      </Modal>
    </div>
  );
}

export default SettingTime;