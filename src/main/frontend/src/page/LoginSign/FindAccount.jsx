import React, { useState } from "react";
import { motion } from "framer-motion";
import Alert from "../../assets/pgw/Alert";



const FindAccount = () => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleAlertOpen = () => {
    setIsAlertOpen(true);
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
  };

  return (
    <>
    
      <div style={styles.pageContainer}>
        <motion.div
          style={styles.container}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* 아이디 찾기 섹션 */}
          <motion.div
            style={styles.header}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h2 style={styles.title}>아이디 찾기</h2>
            <hr style={styles.hrDarkToLight} />
          </motion.div>
          <section style={styles.section}>
            <form style={styles.gridForm}>
              <label style={styles.label}>이름</label>
              <input
                type="text"
                placeholder="이름을 입력하세요"
                style={styles.input}
              />
              <span></span>
              <label style={styles.label}>휴대폰번호</label>
              <input
                type="text"
                placeholder="휴대폰번호를 입력하세요"
                style={styles.input}
              />
              <span></span>
              <span></span>
              <span></span>
              <motion.button
                type="submit"
                style={styles.button}
                whileHover={{ scale: 1.1, backgroundColor: "#256E91", color: "#FFF" }}
                whileTap={{ scale: 0.9 }}
              >
                확인
              </motion.button>
            </form>
          </section>

          {/* 비밀번호 찾기 섹션 */}
          <motion.div
            style={styles.header}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h2 style={styles.title}>비밀번호 찾기</h2>
            <hr style={styles.hrDarkToLight} />
          </motion.div>
          <section style={styles.section}>
            <form style={styles.gridForm}>
              <label style={styles.label}>아이디 (이메일)</label>
              <input
                type="email"
                placeholder="이메일을 입력하세요"
                style={styles.input}
              />
              <Alert
                message="이메일을 전송하시겠습니까?"
                confirmText="확인"
                cancelText="취소"
                alertButtonText="이메일 전송"
                alertButtonClass="custombuttonclass"  // custom class name 전달
              />
              <label style={styles.label}>인증번호</label>
              <input
                type="text"
                placeholder="인증번호를 입력하세요"
                style={styles.input}
              />
              <span></span>
              <span></span>
              <span></span>
              <motion.button
                type="submit"
                style={styles.button}
                whileHover={{ scale: 1.1, backgroundColor: "#256E91", color: "#FFF" }}
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

const styles = {
  pageContainer: {
    marginTop: "10%",
    marginBottom: "10%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    gap: "40px",
  },
  header: {
    width: "100%",
    maxWidth: "600px",
    textAlign: "start",
    marginBottom: "5px",
  },
  title: {
    color: "var(--smallText, #6B6B6B)",
    textAlign: "start",
    fontFamily: "Noto Sans KR",
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "normal",
    marginBottom: "5px",
  },
  hrDarkToLight: {
    width: "100%",
    height: "2px",
    background: "linear-gradient(to right, #333 25%, #ccc 25%)",
    border: "none",
    marginBottom: "10px",
  },
  section: {
    width: "100%",
    maxWidth: "600px",
    border: "1px solid #C9C9C9",
    padding: "20px",
  },
  gridForm: {
    display: "grid",
    gridTemplateColumns: "150px 1fr 100px",
    gap: "15px",
    alignItems: "center",
  },
  label: {
    color: "#000",
    textAlign: "center",
    fontFamily: "Noto Sans KR",
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "normal",
  },
  input: {
    padding: "10px",
    fontSize: "14px",
    border: "1px solid var(--lineColor, #C9C9C9)",
    borderRadius: "4px",
    width: "90%",
  },
  button: {
    borderRadius: "2px",
    border: "2px solid #256E91",
    backgroundColor: "#FFF",
    padding: "10px",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer",
    color: "#256E91",
  },
  custombuttonclass: {
    borderRadius: "2px",
    backgroundColor: "var(--user-mainHome, #282828)",
    color: "#fff",
    padding: "10px",
    fontSize: "12px",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
  }
};