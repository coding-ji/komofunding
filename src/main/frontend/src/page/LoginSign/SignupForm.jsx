import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./SignupForm.module.css";
import { useStore as UserStore } from "../../stores/UserStore/useStore";

// 로컬에 가상의 유저 닉네임 목록(이미 가입된 닉네임들) 저장 예시
if (!localStorage.getItem("existingNicknames")) {
  localStorage.setItem("existingNicknames", JSON.stringify(["testuser", "john", "jane"]));
}

const SignupForm = () => {
  const { state, actions } = UserStore();
  const [authCode, setAuthCode] = useState(""); // 이메일 인증 코드 입력값
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailSent, setEmailSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const [phoneSent, setPhoneSent] = useState(false);
  // const [phoneVerified, setPhoneVerified] = useState(false); 
  // 실제로 핸드폰 인증 검증 로직을 추가하려면 별도 상태 관리 필요

  // 닉네임 중복 확인 (로컬 스토리지의 existingNicknames를 사용)
  const handleNicknameCheck = () => {
    const existingNicknames = JSON.parse(localStorage.getItem("existingNicknames") || "[]");
    if (existingNicknames.includes(state.nickname)) {
      alert("이미 사용 중인 닉네임입니다.");
    } else {
      alert("사용 가능한 닉네임입니다.");
    }
  };

  // 이메일 인증 요청: 로컬에서 인증코드 생성 후 저장
  const handleSendEmail = () => {
    if (!state.email) {
      alert("이메일을 입력하세요.");
      return;
    }
    const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6자리 인증번호
    localStorage.setItem("emailAuthCode", code);
    setEmailSent(true);
    alert("인증코드가 이메일(가상)로 전송되었습니다. 로컬 스토리지에서 확인하세요.");
  };

  // 이메일 인증 코드 검증
  const handleVerifyEmail = () => {
    const storedCode = localStorage.getItem("emailAuthCode");
    if (authCode === storedCode) {
      setEmailVerified(true);
      alert("이메일 인증 성공!");
    } else {
      alert("인증코드가 일치하지 않습니다.");
    }
  };

  // 핸드폰 인증 요청: 로컬에서 인증코드 생성 후 저장
  const handleSendPhoneAuth = () => {
    if (!state.phone) {
      alert("핸드폰 번호를 입력하세요.");
      return;
    }
    const code = Math.floor(100000 + Math.random() * 900000).toString(); 
    localStorage.setItem("phoneAuthCode", code);
    setPhoneSent(true);
    alert("핸드폰 인증코드(가상)가 전송되었습니다. 로컬 스토리지에서 확인하세요.");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 비밀번호 확인
    if (state.password !== confirmPassword) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    // 이메일 인증 확인
    if (!emailVerified) {
      alert("이메일 인증을 완료해주세요.");
      return;
    }

    // 핸드폰 인증 확인 로직은 실제 구현 필요. 여기서는 생략.
    // 필요하다면 별도 인증번호 입력 필드를 만들어 검증하고 state를 업데이트한 뒤 조건 검사.

    // 모든 조건 충족 시 가입 정보 로컬 스토리지 저장
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    const newUser = {
      name: state.name,
      nickname: state.nickname,
      email: state.email,
      password: state.password,
      phone: state.phone,
    };
    registeredUsers.push(newUser);
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));

    alert("회원가입이 완료되었습니다! 로컬 스토리지에 저장되었습니다.");

    actions.resetState();
    setAuthCode("");
    setConfirmPassword("");
    setEmailSent(false);
    setEmailVerified(false);
    setPhoneSent(false);
    localStorage.removeItem("emailAuthCode");
    localStorage.removeItem("phoneAuthCode");
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
          <h2 className={styles.title}>회원 가입 </h2>
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
              value={state.name}
              onChange={(e) => actions.changeName(e.target.value)}
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
              value={state.nickname}
              onChange={(e) => actions.changeNickname(e.target.value)}
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
              value={state.email}
              onChange={(e) => actions.changeEmail(e.target.value)}
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
              disabled={!emailSent}
            />
            <div style={{ gridArea: "authbtn" }}>
              <button
                type="button"
                className={styles.smallButton}
                onClick={handleVerifyEmail}
                disabled={!emailSent}
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
              value={state.password}
              onChange={(e) => actions.changePassword(e.target.value)}
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
              value={state.phone}
              onChange={(e) => actions.changePhone(e.target.value)}
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
