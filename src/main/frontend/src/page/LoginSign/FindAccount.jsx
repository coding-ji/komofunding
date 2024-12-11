import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./FindAccount.module.css"; // CSS 모듈
import { findUserId, sendEmailCode, verifyEmailCode } from "../../service/apiService";

const FindAccount = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [verificationCode, setVerificationCode] = useState("");
  const [message, setMessage] = useState("");   // 상태 메시지
  const [foundEmail, setFoundEmail] = useState("");   // 찾은 이메일
  const [temporaryPassword, setTemporaryPassword] = useState(""); // 임시 비밀번호

  // 폼 데이터 변경 핸들러
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // 아이디(이메일) 찾기
  const handleFindId = async () => {
    try {
      const response = await findUserId(formData.name, formData.phone);
      setFoundEmail(response.data.email); // 백엔드에서 반환된 이메일
      setMessage(`아이디(이메일)는 ${response.data.email}입니다.`);
    } catch (error) {
      console.error(error);
      setMessage("입력한 정보와 일치하는 유저가 없습니다.");
    }
  };

  // 인증번호 전송
  const handleSendAuthCode = async () => {
    try {
      await sendEmailCode(formData.email);
      setMessage("인증번호가 이메일로 전송되었습니다.");
    } catch (error) {
      console.error(error);
      setMessage("입력한 이메일과 일치하는 유저가 없습니다.");
    }
  };

  // 인증번호 확인 및 임시 비밀번호 발급
  const handleVerifyAuthCode = async () => {
    try {
      const response = await verifyEmailCode(formData.email, verificationCode);
      setTemporaryPassword(response.data.temporaryPassword); // 백엔드에서 반환된 임시 비밀번호
      setMessage(`임시 비밀번호는 ${response.data.temporaryPassword}입니다.`);
    } catch (error) {
      console.error(error);
      setMessage("인증번호가 일치하지 않습니다.");
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
        {/* 아이디 찾기 섹션 */}
        <motion.div
          className={styles.header}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h2 className={styles.title}>아이디(이메일) 찾기</h2>
          <hr className={styles.hrDarkToLight} />
        </motion.div>
        <section className={styles.section}>
          <form className={styles.gridForm}>
            <label className={styles.label}>이름</label>
            <input
              type="text"
              placeholder="이름을 입력하세요"
              className={styles.input}
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />      <div></div>
            <label className={styles.label}>휴대폰번호</label>

            <input
              type="text"
              placeholder="휴대폰번호를 입력하세요"
              className={styles.input}
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
            />
            <motion.button
              type="button"
              className={styles.button}
              onClick={handleFindId}
              whileHover={{ scale: 1.1, backgroundColor: "#FFF", color: "#000" }}
              whileTap={{ scale: 0.9 }}
            >
              확인
            </motion.button>
          </form>
          {foundEmail && <p className={styles.result}>{message}</p>}
        </section>

        {/* 비밀번호 찾기 섹션 */}
        <motion.div
          className={styles.header}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h2 className={styles.title}>비밀번호 찾기</h2>
          <hr className={styles.hrDarkToLight} />
        </motion.div>
        <section className={styles.section}>
          <form className={styles.gridForm}>
            <label className={styles.label}>아이디(이메일)</label>
            <input
              type="email"
              placeholder="이메일을 입력하세요"
              className={styles.input}
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
            <motion.button
              type="button"
              className={styles.customButtonClass}
              onClick={handleSendAuthCode}
              whileHover={{ scale: 1.1, backgroundColor: "#FFF", color: "#000" }}
              whileTap={{ scale: 0.9 }}
            >
              인증번호
            </motion.button>
            <label className={styles.label}>인증번호</label>
            <input
              type="text"
              placeholder="인증번호를 입력하세요"
              className={styles.input}
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <motion.button
              type="button"
              className={styles.button}
              onClick={handleVerifyAuthCode}
              whileHover={{ scale: 1.1, backgroundColor: "#FFF", color: "#000" }}
              whileTap={{ scale: 0.9 }}
            >
              확인
            </motion.button>
          </form>
          {temporaryPassword && <p className={styles.result}>{message}</p>}
        </section>
      </motion.div>
    </div>
  );
};

export default FindAccount;
