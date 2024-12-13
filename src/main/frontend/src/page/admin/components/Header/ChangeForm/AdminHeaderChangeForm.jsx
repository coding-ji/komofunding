import React, { useState } from "react";
import "./ChangeForm.css";
import { Btn, WhiteBtn } from "../../../../../components/MyBtn";

function AdminHeaderChangeForm({ onClose, onSave }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSave = () => {
    if (!newPassword || !confirmPassword) {
      alert("모든 필드를 입력해주세요.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    // onSave(newPassword); // 저장 함수 호출
    alert("비밀번호가 변경되었습니다.");
    onClose(); // 팝업 닫기
  };

  return (
    <div className="password-popup-overlay1">
    <div className="password-popup1">
      <div className="popup-header1"/>
      <div className="popup-pwinput-box">
      <div className="password-popup-header1">비밀번호 변경</div>
      <div className="newPw-label-input1">
        <label>이전 비밀번호</label>
        <input
          className="password-popup-input1"
          type="password"
          placeholder="이전 비밀번호 입력"
        />
      </div>
      <div className="newPw-label-input1">
        <label>새 비밀번호</label>
        <input
          className="password-popup-input1"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="새 비밀번호 입력"
        />
      </div>
      <div className="newPw-label-input1">
        <label>새 비밀번호 확인</label>
        <input
          className="password-popup-input1"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="새 비밀번호 확인"
        />
      </div>
      <div className="password-popup-buttons1">
        <Btn
          onClick={handleSave}
          text="확인"
          width="120px"
          padding="8px 16px"
          fontSize="1rem"
          height="40px"
          margin="5px"
        />
        <WhiteBtn
          onClick={onClose}
          text="취소"
          width="120px"
          padding="8px 16px"
          fontSize="1rem"
          height="40px"
          margin="5px"
        />
      </div>
    </div>
    </div>
  </div>
);
}

export default AdminHeaderChangeForm;
