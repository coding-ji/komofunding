import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./SignupForm.module.css";
import { useStore } from "../../stores/UserStore/useStore"; // useStore를 불러옵니다.
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const { state, actions } = useStore(); // actions와 state를 불러옵니다.
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    nickName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [authCode, setAuthCode] = useState(""); // 이메일 인증 코드 입력값
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isNickNameAvailable, setIsNickNameAvailable] = useState(false); // 닉네임 사용 가능 여부 상태
  const [emailSent, setEmailSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  // 폼 데이터 업데이트
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // 이메일 인증 코드 발송
  const handleSendEmail = async () => {
    if (!formData.email) {
      alert("이메일을 입력하세요.");
      return;
    }

    try {
      await actions.sendEmailForRegister(formData.email); // 액션으로 이메일 전송
      setEmailSent(true);
      alert("인증코드가 이메일로 전송되었습니다.");
    } catch (error) {
      setEmailSent(false);
      alert("이메일 전송 중 오류가 발생했습니다.");
    }
  };


  const handleVerifyEmail = async () => {
    const trimmedAuthCode = authCode.trim();
    try {
      await actions.verifyEmail(formData.email, trimmedAuthCode); // 액션으로 인증 코드 검증
    } catch (error) {
      alert("인증 코드 검증 시 오류가 발생했습니다.");
    }
  }

  useEffect(() => {
    // 상태에 따라 인증 결과 처리
    if (state.errorMessage) {
      setEmailVerified(false); // 오류 발생 시 인증 실패
      alert(state.errorMessage); // 오류 메시지 표시
    } else if (state.successMessage) {
      setEmailVerified(true); // 인증 성공
      alert(state.successMessage); // 성공 메시지 표시
    }

    console.log("state after dispatch:", state); 
    
  }, [state.successMessage, state.errorMessage])


  // 닉네임 중복확인
  const handleCheckNickName = async () => {
    if (!formData.nickName) {
      alert("닉네임을 입력하세요.");
      return;
    }

    try {
      await actions.checkNick(formData.nickName); // 중복 확인 API 호출
      setIsNickNameAvailable(true);
    } catch (error) {
      setIsNickNameAvailable(null); // 오류 상태
      console.error("닉네임 확인 중 오류 발생:", error);
      alert("서버와의 통신에 문제가 발생했습니다.");
    }
  };

  useEffect(() => {
    if (isNickNameAvailable) {
      // 상태에 isAvailable 값이 있을 경우 확인
      if (state.user.isAvailable === true) {
        alert("닉네임 사용이 가능합니다.");
      } else if (state.user.isAvailable === false) {
        setIsNickNameAvailable(false); // 닉네임 중복
        alert("중복된 닉네임입니다.");
      } else {
        setIsNickNameAvailable(null); // 알 수 없는 오류 상태
        alert("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
    setIsNickNameAvailable(false)
  }, [isNickNameAvailable])

  // 회원가입 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== confirmPassword) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    if (!emailVerified) {
      alert("이메일 인증을 완료해주세요.");
      return;
    }

    try {
      await actions.register(formData); // 액션을 통해 회원가입
      alert("회원가입이 완료되었습니다!");
      // 폼 초기화
      setFormData({ name: "", nickName: "", email: "", password: "", phoneNumber: "" });
      setAuthCode("");
      setConfirmPassword("");
      setEmailSent(false);
      setEmailVerified(false);
      navigate("/");
    } catch (error) {
      alert("회원가입 중 오류가 발생했습니다.");
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
              value={formData.name}
              onChange={handleInputChange}
              style={{ gridArea: "input1" }}
            />

            {/* 닉네임 */}
            <label className={styles.label} style={{ gridArea: "label7" }}>
              닉네임
            </label>
            <input
              id="nickName"
              type="text"
              placeholder="닉네임을 입력하세요"
              className={styles.input}
              value={formData.nickName}
              onChange={(e) => setFormData({ ...formData, nickName: e.target.value })}
              style={{ gridArea: "input7" }}
            />
            <div style={{ gridArea: "nickbtn" }}>
              <button
                type="button"
                className={styles.smallButton}
                onClick={handleCheckNickName}
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
              value={formData.email}
              onChange={handleInputChange}
              style={{ gridArea: "input2" }}
            />
            <div style={{ gridArea: "mailbtn" }}>
              <button
                type="button"
                className={styles.smallButton}
                onClick={handleSendEmail}
                disabled={emailSent}
              >
                이메일 인증
              </button>
            </div>

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
              value={formData.password}
              onChange={handleInputChange}
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
              id="phoneNumber"
              type="text"
              placeholder="010-0000-0000"
              className={styles.input}
              value={formData.phoneNumber}
              onChange={handleInputChange}
              style={{ gridArea: "input6" }}
            />

            {/* 회원가입 버튼 */}
            <motion.button
              type="submit"
              className={styles.submitButton}
              style={{ gridArea: "btn" }}
              whileHover={{
                scale: 1.1,
                backgroundColor: "#FFF",
                color: "#256E91",
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
}

export default SignupForm;
