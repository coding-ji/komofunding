import React from "react";
import "./UserInfoModal.css";
import { AdminBtn1, AdminBtn2 } from "../../../../components/MyBtn";
import { formattedDate } from "../../../../utils/formattedData";


function UserInfoModal({ userData, onClose, onForceDelete }) {
  return (
    <div className="user-modal-overlay">
      <div className="user-modal-content">
        {/* 상단 검은색 헤더 */}
        <div className="user-modal-header"></div>
        <h2 className="user-modal-title">상세 회원 정보</h2>

        {/* 유저 정보 입력 필드 */}
        <div className="user-info-section">
          <div className="user-role-checkbox">
            <label>
              <input type="checkbox" checked={userData.role === "CREATOR"} readOnly />
              제작자
            </label>
            <label>
              <input type="checkbox" checked={userData.role === "DONOR"} readOnly />
              후원자
            </label>
          </div>

          <div className="user-info-fields">
            <label>회원코드</label>
            <input type="text" value={userData.userCode} readOnly />

            <label>이메일</label>
            <input type="text" value={userData.email} readOnly />

            <label>이름</label>
            <input type="text" value={userData.name} readOnly />

            <label>닉네임</label>
            <input type="text" value={userData.nickName} readOnly />

            <label>휴대폰</label>
            <input type="text" value={userData.phoneNumber} readOnly />

            <label>가입날짜</label>
            <input type="text" value={formattedDate(userData.joinDate)} readOnly />

            <label>배송지</label>
            <input type="text" value={userData.address} readOnly />

            <label>계좌번호</label>
            <input type="text" value={userData.accountNumber} readOnly />
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="user-modal-buttons">
          <AdminBtn1
            onClick={onForceDelete}
            text="강제 탈퇴"
            width="100px"
            fontSize="1rem"
            height="30px"
            padding="5px"
          />
          <AdminBtn2
            onClick={onClose}
            text="취소"
            width="100px"
            fontSize="1rem"
            height="30px"
             padding="5px"
          />
        </div>
      </div>
    </div>
  );
}

export default UserInfoModal;
