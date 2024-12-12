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
    <div className="password-popup-overlay">
      <div className="password-popup">
        <div className="password-popup-header">비밀번호 변경</div>
        <div className="newPw-label-input">
          <label>이전 비밀번호</label>
          <input
            className="password-popup-input"
            type="password"
            placeholder="이전 비밀번호 입력"
          />
        </div>
        <div className="newPw-label-input">
          <label>새 비밀번호</label>
          <input
            className="password-popup-input"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="새 비밀번호 입력"
          />
        </div>
        <div className="newPw-label-input">
          <label>새 비밀번호 확인</label>
          <input
            className="password-popup-input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="새 비밀번호 확인"
          />
        </div>
        <div className="password-popup-buttons">
          <Btn
            onClick={handleSave}
            text="확인"
            width="100px"
            padding="2px 2px"
            fontSize="1rem"
            height="30px"
            margin="5px"
          />
          <WhiteBtn
            onClick={onClose}
            text="취소"
            width="100px"
            padding="2px 2px"
            fontSize="1rem"
            height="30px"
            margin="5px"
          />
        </div>
      </div>
    </div>
  );
}

export default AdminHeaderChangeForm;
