import React from "react";
import "./PopupInquiry.css";
import MyBtn from "../../components/MyBtn";
import '../../index.css'

function PopupInquiry({ message, onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        {/* 상단 검은색 헤더 */}
        <div className="popup-header"></div>
        <br/>
        <p>{message}</p>
        <div className="popup-button-container">
          <MyBtn onClick={onClose} text="확인"
          style={{    
            cursor:"pointer",
            fontSize:"1rem",
            padding : "10px",
            width: "30%",
            margin : "10px"}}>
            확인
          </MyBtn>
        </div>
      </div>
    </div>
  );
}

export default PopupInquiry;
