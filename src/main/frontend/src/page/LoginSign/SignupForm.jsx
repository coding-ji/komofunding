import React, { useState } from "react";
import { motion } from "framer-motion";
import Alert from "../../components/Alert/Alert";
import styles from './SignupForm.module.css';
import { useStore as UserStore } from "../../stores/UserStore/useStore";
import { namePattern, emailPattern, phonePattern, pwPattern } from "./regExp";

const SignupForm = () => {
  const { state: userState, actions: userActions } = UserStore();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [authMessage, setAuthMessage] = useState(""); // 인증 상태 메시지
  const [showAuthAlert, setShowAuthAlert] = useState(false); // 인증 Alert 표시 여부

  const validateForm = () => {
    if (!namePattern.test(userState.name)) {
      alert("이름은 한글 또는 영문으로 1~20자 이내여야 합니다.");
      return false;
    }
    if (!emailPattern.test(userState.email)) {
      alert("올바른 이메일 형식으로 입력해주세요.");
      return false;
    }
    if (!phonePattern.test(userState.phone)) {
      alert("전화번호는 '010-0000-0000' 형식으로 입력해주세요.");
      return false;
    }
    if (!pwPattern.test(userState.password)) {
      alert("비밀번호는 영문, 숫자 조합으로 8~16자 이내여야 합니다.");
      return false;
    }
    if (userState.password !== confirmPassword) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return false;
    }
    if (!authCode || authCode.length !== 6) {
      alert("6자리 인증번호를 입력해주세요.");
      return false;
    }
    return true;
  };

  const handleAuthCheck = () => {
    // 여기에 인증번호 확인을 위한 백엔드 요청을 추가
    const isAuthValid = authCode === "123456"; // 예제: 인증번호가 "123456"일 경우만 유효

    if (isAuthValid) {
      setAuthMessage("인증번호가 올바릅니다.");
    } else {
      setAuthMessage("인증번호가 맞지 않습니다.");
    }

    setShowAuthAlert(true); // Alert 표시
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("회원가입이 완료되었습니다!");
    }
  };

  return (
    <div className={styles.pageContainer}>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className={styles.header}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h2 className={styles.title}>회원 가입</h2>
          <hr className={styles.hrDarkToLight} />
        </motion.div>

        <section className={styles.section}>
          <div className={styles.description}>
            개인정보보호법에 따라 회원가입 신청자는 고지 및 동의를 거친 후 회원가입이 가능합니다.
            아래 정보를 입력 후 가입 절차를 진행해 주세요.
          </div>
          <form className={styles.gridForm} onSubmit={handleSubmit}>
            {/* 이름 */}
            <label className={styles.label} style={{ gridArea: "label1" }}>
              이름
            </label>
            <input
              id="name"
              type="text"
              placeholder="이름을 입력하세요"
              className={styles.input}
              value={userState.name}
              onChange={(e) => userActions.changeName(e.target.value)}
              style={{ gridArea: "input1" }}
            />

            {/* 이메일 */}
            <label className={styles.label} style={{ gridArea: "label2" }}>
              이메일
            </label>
            <input
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
              className={styles.input}
              value={userState.email}
              onChange={(e) => userActions.changeEmail(e.target.value)}
              style={{ gridArea: "input2" }}
            />
            <div style={{ gridArea: "mailbtn" }}>
              <Alert
                message="이메일을 전송하시겠습니까?"
                confirmText="확인"
                cancelText="취소"
                alertButtonText={"이메일 인증"}
              />
            </div>

            {/* 인증번호 */}
            <label className={styles.label} style={{ gridArea: "label3" }}>
              인증번호
            </label>
            <input
              id="id"
              type="text"
              placeholder="인증번호를 입력하세요"
              className={styles.input}
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
              style={{ gridArea: "input3" }}
            />
            <div style={{ gridArea: "authbtn" }}>
              <Alert
                message={authMessage || "인증번호를 확인하시겠습니까?"}
                confirmText="확인"
                cancelText="취소"
                alertButtonText={"인증번호 확인"}
                onClick={handleAuthCheck}
              />
            </div>

            {/* 비밀번호 */}
            <label className={styles.label} style={{ gridArea: "label4" }}>
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              className={styles.input}
              value={userState.password}
              onChange={(e) => userActions.changePassword(e.target.value)}
              style={{ gridArea: "input4" }}
            />

            {/* 비밀번호 확인 */}
            <label className={styles.label} style={{ gridArea: "label5" }}>
              비밀번호 확인
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              className={styles.input}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ gridArea: "input5" }}
            />

            {/* 휴대폰 번호 */}
            <label className={styles.label} style={{ gridArea: "label6" }}>
              휴대폰 번호
            </label>
            <input
              id="phone"
              type="text"
              placeholder="010-0000-0000"
              className={styles.input}
              value={userState.phone}
              onChange={(e) => userActions.changePhone(e.target.value)}
              style={{ gridArea: "input6" }}
            />
            <div style={{ gridArea: "phonebtn" }}>
              <Alert
                message="핸드폰 인증하러가기."
                confirmText="확인"
                cancelText="취소"
                alertButtonText={"핸드폰 인증"}
              />
            </div>

            {/* 회원가입 버튼 */}
            <motion.button
              type="submit"
              className={styles.submitButton}
              style={{ gridArea: "btn" }}
              whileHover={{
                scale: 1.1,
                backgroundColor: "#FFF",
                color: "#000",
              }}
              whileTap={{ scale: 0.9 }}
            >
              약관 동의 후 회원가입
            </motion.button>
          </form>
        </section>
      </motion.div>
    </div>
  );
};

export default SignupForm;
