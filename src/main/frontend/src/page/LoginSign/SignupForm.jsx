import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./SignupForm.module.css";
import { registerUser, sendRegisterEmailCode, verifyEmailCode } from "../../service/apiService";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    nickName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [authCode, setAuthCode] = useState(""); // 이메일 인증 코드 입력값
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailSent, setEmailSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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
      await sendRegisterEmailCode(formData.email);
      setEmailSent(true);
      setSuccessMessage("인증코드가 이메일로 전송되었습니다.");
    } catch (error) {
      alert("이메일 전송 중 오류가 발생했습니다.");
    }
  };

  // 이메일 인증 코드 검증
  const handleVerifyEmail = async () => {
    const trimmedAuthCode = authCode.trim();

    try {
      await verifyEmailCode(formData.email, trimmedAuthCode);
      setEmailVerified(true);
      setSuccessMessage("이메일 인증 성공!");
    } catch (error) {
      alert("인증코드가 일치하지 않습니다.");
    }
  };

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
      await registerUser(formData);
      setSuccessMessage("회원가입이 완료되었습니다!");
      setFormData({ name: "", nickName: "", email: "", password: "", phoneNumber: "" });
      setAuthCode("");
      setConfirmPassword("");
      setEmailSent(false);
      setEmailVerified(false);
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
              onChange={handleInputChange}
              style={{ gridArea: "input7" }}
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
};

export default SignupForm;
