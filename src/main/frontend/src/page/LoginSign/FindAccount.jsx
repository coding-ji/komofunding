import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./FindAccount.module.css"; // CSS 모듈
import { useStore } from "../../stores/UserStore/useStore";
import { formatPhoneNumber } from "../../utils/formattedData";

const FindAccount = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [verificationCode, setVerificationCode] = useState("");
  const [message, setMessage] = useState(""); // 상태 메시지 (이메일)
  const [pwmessage, setPwMessage] = useState(""); //상태 메시지(비밀번호)
  const [emailmessage, setEmailMessage] = useState(""); // 상태메시지(이메일보냄)

  const { state, actions } = useStore();
  const [isChecked, setIsChecked] = useState(false); // 이름, 휴대폰 번호 확인
  const [isPwChecked, setIsPwChecked] = useState(false); // 아이디, 인증번호 확인

  // 폼 데이터 변경 핸들러
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // 아이디(이메일) 찾기
  const handleFindId = async () => {
    // 전화번호 포맷이 맞지 않으면 하이픈을 추가
    if (formData.phone && !formData.phone.includes("-")) {
      formData.phone = formatPhoneNumber(formData.phone);
    }

    try {
      // 이메일 찾기 시도
      await actions.findEmail(formData.name, formData.phone);
      setIsChecked(true); // 유저가 존재하면 성공 처리
    } catch (error) {
      console.error(error);
      setMessage("입력한 정보와 일치하는 유저가 없습니다."); // 실패 처리
    }
  };

  useEffect(() => {
    if (isChecked) {
      setMessage(`아이디 ${state.message} 입니다.`);
    }
    setIsChecked(false);
  }, [isChecked]);

  // 인증번호 전송
  const handleSendAuthCode = async () => {
    try {
      await actions.sendEmailForRegister(formData.email);
      setEmailMessage("인증번호가 이메일로 전송되었습니다.");
    } catch (error) {
      console.error(error);
      setEmailMessage("입력한 이메일과 일치하는 유저가 없습니다.");
    }
  };

  // 인증번호 확인 및 임시 비밀번호 발급
  const handleVerifyAuthCode = async () => {
    try {
      await actions.temporalUserPassword(formData.email, verificationCode);
      setIsPwChecked(true);
    } catch (error) {
      console.error(error);
      setMessage("인증번호가 일치하지 않습니다.");
    }
  };

  useEffect(() => {
    if (isPwChecked) {
      console.log(state)
      setPwMessage(`임시 비밀번호는 ${state.message.tempPassword}입니다.`);
    }
  }, [isPwChecked]);

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
            />{" "}
            <div></div>
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
              whileHover={{
                scale: 1.1,
                backgroundColor: "#FFF",
                color: "#000",
              }}
              whileTap={{ scale: 0.9 }}
            >
              확인
            </motion.button>
          </form>
          {message && <p className={styles.result}>{message}</p>}
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
              whileHover={{
                scale: 1.1,
                backgroundColor: "#FFF",
                color: "#000",
              }}
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
              whileHover={{
                scale: 1.1,
                backgroundColor: "#FFF",
                color: "#000",
              }}
              whileTap={{ scale: 0.9 }}
            >
              확인
            </motion.button>
          </form>
          {emailmessage && <p className={styles.result}>{emailmessage}</p>}
          {pwmessage && <p className={styles.result}>{pwmessage}</p>}
        </section>
      </motion.div>
    </div>
  );
};

export default FindAccount;
