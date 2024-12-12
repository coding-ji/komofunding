import React from "react";
import "./PopupInquiry.css";
import { Btn } from "../../../components/MyBtn";
import "../../../index.css";
import { useNavigate } from "react-router-dom";

function PopupInquiry({ message, onClose, handleButtonClick, navigateTo }) {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleButtonClickWrapper = () => {
    if (navigateTo) {
      navigate(navigateTo); // 전달된 경로로 이동
    }
    handleButtonClick(); // 전달된 삭제 처리 함수 실행
    onClose(); // 팝업 닫기
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        {/* 상단 검은색 헤더 */}
        <div className="popup-header"></div>
        <br />
        <p>{message}</p>
        <div className="popup-button-container">
          <Btn
            onClick={handleButtonClickWrapper} // 버튼 클릭 이벤트
            text="삭제" // 전달된 텍스트 사용
            width="100px"
            padding="2px 2px"
            fontSize="1rem"
            height="30px"
          />
          <Btn
            onClick={onClose} // 버튼 클릭 이벤트
            text="닫기" // 전달된 텍스트 사용
            width="100px"
            padding="2px 2px"
            fontSize="1rem"
            height="30px"
          />
        </div>
      </div>
    </div>
  );
}

export default PopupInquiry;
