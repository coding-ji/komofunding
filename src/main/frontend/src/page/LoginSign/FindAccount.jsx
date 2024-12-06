import { motion } from "framer-motion";
import Alert from "../../components/Alert/Alert";
import styles from "./FindAccount.module.css"; // CSS 모듈
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStore } from "../../stores/UserStore/useStore";

const FindAccount = () => {
  const { state: formData, actions } = useStore();
  const { changeName, changePhone, changeEmail } = actions;

  // 로컬 상태로 인증번호 관리
  const [verificationCode, setVerificationCode] = useState("");

  const [authCode, setAuthCode] = useState(""); // 생성된 인증번호
  const [message, setMessage] = useState("");   // 상태 메시지
  const [userData, setUserData] = useState([]); // JSON 데이터
  const [foundId, setFoundId] = useState("");   // 찾은 아이디
  const [temporaryPassword, setTemporaryPassword] = useState(""); // 임시 비밀번호

  // JSON 데이터 로드
  useEffect(() => {
    axios
      .get("/data/userData.json") // 로컬 JSON 데이터 경로
      .then((response) => setUserData(response.data))
      .catch(() => setMessage("데이터 로드 중 오류가 발생했습니다."));
  }, []);

  const handleInputChange = (field, value) => {
    switch (field) {
      case "name":
        changeName(value);
        break;
      case "phone":
        changePhone(value);
        break;
      case "email":
        changeEmail(value);
        break;
      default:
        break;
    }
  };

  // 아이디 찾기
  const findId = () => {
    const user = userData.find(
      (user) =>
        user.name === formData.name && user.phone === formData.phone
    );
    if (user) {
      setFoundId(user.email); // 아이디(이메일)를 저장
      alert(`아이디는 ${user.email}입니다.`);
      setMessage(`아이디는 ${user.email}입니다.`);
    } else {
      alert("입력한 정보와 일치하는 유저가 없습니다.");
      setMessage("입력한 정보와 일치하는 유저가 없습니다.");
    }
  };

  // 인증번호 전송 및 로컬 스토리지 저장
  const sendAuthCode = () => {
    const user = userData.find((user) => user.email === formData.email);
    if (user) {
      const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6자리 인증번호 생성
      setAuthCode(code);
      localStorage.setItem("authCode", code); // 로컬 스토리지에 인증번호 저장
      console.log(`인증번호: ${code}`);
      setMessage("인증번호가 전송되었습니다. 로컬 스토리지에서 확인하세요.");
    } else {
      setMessage("입력한 이메일과 일치하는 유저가 없습니다.");
    }
  };

  // 인증번호 확인 및 임시 비밀번호 발급
  const verifyAuthCode = () => {
    const storedAuthCode = localStorage.getItem("authCode"); // 로컬 스토리지에서 인증번호 가져오기
    if (verificationCode === storedAuthCode) {
      const tempPassword = Math.random().toString(36).slice(-8); // 8자리 임시 비밀번호 생성
      setTemporaryPassword(tempPassword);
      alert(`임시 비밀번호는 ${tempPassword}입니다.`);
      setMessage(`인증번호가 확인되었습니다. 임시 비밀번호는 ${tempPassword}입니다.`);

      // 로컬 스토리지에 임시 비밀번호 저장 (백엔드 대체)
      localStorage.setItem("temporaryPassword", tempPassword);
    } else {
      setMessage("인증번호가 일치하지 않습니다.");
    }
  };

  return (
    <>
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
            <h2 className={styles.title}>아이디 찾기</h2>
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
              />
              <span></span>
              <label className={styles.label}>휴대폰번호</label>
              <input
                type="text"
                placeholder="휴대폰번호를 입력하세요"
                className={styles.input}
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
              <span></span>
              <span></span>
              <span></span>
              <motion.button
                type="button"
                className={styles.button}
                onClick={findId}
                whileHover={{ scale: 1.1, backgroundColor: "#FFF", color: "#000" }}
                whileTap={{ scale: 0.9 }}
              >
                확인
              </motion.button>
            </form>
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
              <label className={styles.label}>아이디 (이메일)</label>
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
                onClick={sendAuthCode}
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
              <span></span>
              <span></span>
              <span></span>
              <motion.button
                type="button"
                className={styles.button}
                onClick={verifyAuthCode}
                whileHover={{ scale: 1.1, backgroundColor: "#FFF", color: "#000" }}
                whileTap={{ scale: 0.9 }}
              >
                확인
              </motion.button>
            </form>
          </section>
        </motion.div>
      </div>
    </>
  );
};

export default FindAccount;
