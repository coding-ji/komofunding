import './PasswordPopup.css'
import { Btn, WhiteBtn } from "../../components/MyBtn";
import "../../index.css";


function PasswordPopup({
  newPassword,
  setNewPassword,
  newPasswordCheck,
  setNewPasswordCheck,
  handlePasswordSave,
  onClose }) {

  const handleSave = () => {
    if (!newPassword || !newPasswordCheck) {
      alert("모든 필드를 입력해주세요.");
      return;
    }
    if (newPassword !== newPasswordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    handlePasswordSave();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        {/* 상단 검은색 헤더 */}
        <div className="popup-header"></div>
        <br />
        <div className="newPw-label-input">
          <label>새 비밀번호</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="새 비밀번호 입력"
          />
        </div>
        <br />
        <div className="newPw-label-input">
          <label>새 비밀번호 확인</label>
          <input
            type="password"
            value={newPasswordCheck}
            onChange={(e) => setNewPasswordCheck(e.target.value)}
            placeholder="새 비밀번호 확인"
          />
        </div>
        <br />
        <div className="popup-button-container">
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

export default PasswordPopup;
