import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./SignupForm.module.css";
import { useStore as UserStore } from "../../stores/UserStore/useStore";
import axios from "axios";

const SignupForm = () => {
  const { state, actions } = UserStore();
  const [authCode, setAuthCode] = useState("");
  const [authMessage, setAuthMessage] = useState("");

  // 이메일 인증 요청
  const handleSendEmail = async () => {
    try {
      const response = await axios.post("/api/auth/emailcheck", { email: userState.email });
      if (response.status === 200) {
        alert("인증코드가 이메일로 전송되었습니다.");
      } else {
        alert("이메일 전송 실패.");
      }
    } catch (error) {
      console.error("이메일 인증 요청 중 오류:", error);
      alert("서버와의 통신 중 문제가 발생했습니다.");
    }
  };

  // 이메일 인증 코드 검증
  const handleVerifyEmail = async () => {
    try {
      const response = await axios.post("/api/auth/emailverification", {
        email: userState.email,
        verificationCode: authCode,
      });
      if (response.status === 200 && response.data.shortDescription.includes("성공")) {
        setAuthMessage("인증 성공!");
      } else {
        setAuthMessage("인증코드가 올바르지 않습니다.");
      }
    } catch (error) {
      console.error("이메일 인증 확인 중 오류:", error);
      setAuthMessage("서버와의 통신 중 오류가 발생했습니다.");
    }
  };

  // 닉네임 중복 확인
  const handleNicknameCheck = async () => {
    try {
      const response = await axios.get(`/api/auth/check-nickname?nickname=${userState.nickname}`);
      if (response.data.available) {
        alert("사용 가능한 닉네임입니다.");
      } else {
        alert("이미 사용 중인 닉네임입니다.");
      }
    } catch (error) {
      console.error("닉네임 확인 중 오류:", error);
      alert("닉네임 중복 확인 요청 실패.");
    }
  };

  // 핸드폰 인증 요청
  const handleSendPhoneAuth = async () => {
    try {
      const response = await axios.post("/api/auth/send-phone-auth", { phone: userState.phone });
      if (response.status === 200) {
        alert("핸드폰 인증코드가 전송되었습니다.");
      } else {
        alert("핸드폰 인증 실패.");
      }
    } catch (error) {
      console.error("핸드폰 인증 요청 중 오류:", error);
      alert("핸드폰 인증 요청 실패.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/register", {
        name: userState.name,
        nickname: userState.nickname,
        email: userState.email,
        password: userState.password,
        phone: userState.phone,
      });

      if (response.status === 201) {
        alert("회원가입이 완료되었습니다!");
        userActions.resetState();
      } else {
        alert("회원가입 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("회원가입 요청 중 오류:", error);
      alert("서버와 통신 중 문제가 발생했습니다.");
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

            {/* 닉네임 */}
            <label className={styles.label} style={{ gridArea: "label7" }}>
              닉네임
            </label>
            <input
              id="nickname"
              type="text"
              placeholder="닉네임을 입력하세요"
              className={styles.input}
              value={userState.nickname}
              onChange={(e) => userActions.changeNickname(e.target.value)}
              style={{ gridArea: "input7" }}
            />
            <div style={{ gridArea: "nickbtn" }}>
              <button
                type="button"
                className={styles.smallButton}
                onClick={handleNicknameCheck}
              >
                중복 확인
              </button>
            </div>

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
              <button
                type="button"
                className={styles.smallButton}
                onClick={handleSendEmail}
              >
                이메일 인증
              </button>
            </div>

            {/* 인증번호 */}
            <label className={styles.label} style={{ gridArea: "label3" }}>
              인증번호
            </label>
            <input
              id="authCode"
              type="text"
              placeholder="인증번호를 입력하세요"
              className={styles.input}
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
              style={{ gridArea: "input3" }}
            />
            <div style={{ gridArea: "authbtn" }}>
              <button
                type="button"
                className={styles.smallButton}
                onClick={handleVerifyEmail}
              >
                인증번호 확인
              </button>
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
              value={userState.confirmPassword}
              onChange={(e) => setAuthCode(e.target.value)}
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
              <button
                type="button"
                className={styles.smallButton}
                onClick={handleSendPhoneAuth}
              >
                핸드폰 인증
              </button>
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