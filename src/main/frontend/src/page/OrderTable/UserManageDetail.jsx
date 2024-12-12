import React, { useState } from "react";
import "../MyPage/writeQnA/PopupInquiry.css";
import { Btn } from "../../components/MyBtn";
import '../../index.css';
import { useNavigate } from "react-router-dom";


function UserManageDetail({ message, onClose, handleButtonClick, navigateTo, text = "취소" }) { // text 기본값 설정

  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleButtonClickWrapper = () => {
    if (navigateTo) {
      navigate(navigateTo); // 전달된 경로로 이동
    }
    handleButtonClick(); // 전달된 삭제 처리 함수 실행
    onClose(); // 팝업 닫기
  };

  // 제작자, 후원자 둘중 하나 택일 상태값
  const [selectedOption, setSelectedOption] = useState("");

   // 제작자, 후원자 둘중 하나 선택
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="usermanage_detail_con">
      <div className="usermanage_detail_content">
        {/* 상단 검은색 헤더 */}
        <div className="popup-header"></div>
        <br />
        <h2 style={{fontSize:"1.8rem"}}>상세회원정보</h2>
        <br/>
        <div>
            <label>
                제작자
            <input
                type="radio"
                value="option1"
                checked={selectedOption === "option1"}
                onChange={handleChange}
                />
            </label>
             <label>
                후원자
            <input
                type="radio"
                value="option2"
                checked={selectedOption === "option2"}
                onChange={handleChange}
                />
            </label>
        </div>  
        <br />
        <div className= "usermanage_detail_inf">              
            <div className="usermanage_detail_inf_inf1 ">
                <p className="usermanage_detail_inf_p1">회원코드</p>
                <p className="usermanage_detail_inf_input1" />
            </div>
            <div className="usermanage_detail_inf_inf2">
                <p className="usermanage_detail_inf_p2">이메일</p>
                <p type="text" className="usermanage_detail_inf_input2" />
            </div>
            <div className="usermanage_detail_inf_inf3">
                <p className="usermanage_detail_inf_p3">이름</p>
                <p type="text" className="usermanage_detail_inf_input3" />
            </div>
            <div className="usermanage_detail_inf_inf4">
                <p className="usermanage_detail_inf_p4">닉네임</p>
                <p type="text" className="usermanage_detail_inf_input4"/>
            </div>
            <div className="usermanage_detail_inf_inf5">
                <p className="usermanage_detail_inf_p5">휴대폰</p>
                <p type="text" className="usermanage_detail_inf_input5"/>
            </div>
            <div className="usermanage_detail_inf_inf6">
                <p className="usermanage_detail_inf_p6">가입날짜</p>
                <p type="text" className="usermanage_detail_inf_input6"/>
            </div>
            <div className="usermanage_detail_inf_inf7">
                <p className="usermanage_detail_inf_p7" >배송지</p>
                <p type="text" className="usermanage_detail_inf_input7" />
            </div>
            <div className="usermanage_detail_inf_inf8">
                <p className="usermanage_detail_inf_p8">계좌번호</p>
                <p type="text"  className="usermanage_detail_inf_input8"/>
            </div>
        </div>
        <div className="popup-button-container">
          <Btn 
            onClick={handleButtonClickWrapper} // 버튼 클릭 이벤트
            text={text} // 전달된 텍스트 사용
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

export default UserManageDetail;
