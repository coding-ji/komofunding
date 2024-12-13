import React from "react";
import "./Popup.css";
import {Btn, WhiteBtn} from "../MyBtn";
import '../../index.css'
import { useNavigate } from "react-router-dom";

function Popup({ message, onClose,navigateTo,onConfirm }) {

  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleButtonClick = () => {
    if (navigateTo) {
      navigate(navigateTo); // 전달된 경로로 이동
    }
    if (onConfirm) {
      onConfirm(); // "확인" 클릭 시 onConfirm 실행
    }
  };


  return (
    <div className="popup-overlay-comp">
      <div className="popup-content-comp">
        {/* 상단 검은색 헤더 */}
        <div className="popup-header-comp"></div>
        <br/>
        <p>{message}</p>
        <div className="popup-button-container-comp">
          <Btn 
         onClick={handleButtonClick} // 버튼 클릭 이벤트
          text="확인"
          width = "100px"
          padding="2px 2px"
          fontSize = "1rem"
          height = "30px"
          margin="5px"
            />
             <WhiteBtn 
         onClick={()=> onClose()} // 버튼 클릭 이벤트
          text="취소"
          width = "100px"
          padding="2px 2px"
          fontSize = "1rem"
          height = "30px"
          margin="5px"
            />
        </div>
      </div>
    </div>
  );
}

export default Popup;
