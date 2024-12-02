import React from "react";
import "./PopupInquiry.css";
import {Btn} from "../../../components/MyBtn";
import '../../../index.css'
import { useNavigate } from "react-router-dom";

function PopupInquiry({ message, onClose,navigateTo}) {

  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleButtonClick = () => {
    if (navigateTo) {
      navigate(navigateTo); // 전달된 경로로 이동
    }
    onClose(); // 팝업 닫기
  };


  return (
    <div className="popup-overlay">
      <div className="popup-content">
        {/* 상단 검은색 헤더 */}
        <div className="popup-header"></div>
        <br/>
        <p>{message}</p>
        <div className="popup-button-container">
          <Btn 
         onClick={handleButtonClick} // 버튼 클릭 이벤트
          text="확인"
          width = "100px"
          padding="2px 2px"
          fontSize = "1rem"
          height = "30px"
            >
         
          </Btn>
        </div>
      </div>
    </div>
  );
}

export default PopupInquiry;
