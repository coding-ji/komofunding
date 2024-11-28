import React from "react";
import { motion } from "framer-motion";
import Alert from "../../assets/pgw/Alert";



const SignupForm = () => {
  return (
    <div style={styles.pageContainer}>

      <motion.div
        style={styles.container}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          style={styles.header}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h2 style={styles.title}>회원 가입</h2>
          <hr style={styles.hrDarkToLight} />
        </motion.div>

        <section style={styles.section}>
          <div style={styles.description}>
            개인정보보호법에 따라 회원가입 신청자는 고지 및 동의를 거친 후 회원가입이 가능합니다.
            아래 정보를 입력 후 가입 절차를 진행해 주세요.
          </div>
          <form style={styles.gridForm}>
            {/* 이름 */}
            <label style={styles.label} htmlFor="name">
              이름
            </label>
            <input
              id="name"
              type="text"
              placeholder="이름을 입력하세요"
              style={styles.input}
            />
            <div></div>
            <div></div>

            {/* 이메일 */}
            <label style={styles.label} htmlFor="email">
              이메일
            </label>
            <input
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
              style={styles.input}
            />
            <div></div>
            <Alert
              message="이메일을 전송하시겠습니까?"
              confirmText="확인"
              cancelText="취소"
              alertButtonText="이메일 전송"
              alertButtonClass="custombuttonclass" // custom class name 전달
            />

            {/* 아이디 */}
            <label style={styles.label} htmlFor="id">
              아이디(이메일)
            </label>
            <input
              id="id"
              type="text"
              placeholder="아이디를 입력하세요"
              style={styles.input}
            />
            <div></div>
            <div></div>

            {/* 비밀번호 */}
            <label style={styles.label} htmlFor="password">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              style={styles.input}
            />
            <div></div>
            <div></div>

            {/* 휴대폰 번호 */}
            <label style={styles.label} htmlFor="phone">
              휴대폰 번호
            </label>
            <div style={styles.phoneGroup}>
              <input
                id="phone1"
                type="text"
                placeholder="010"
                maxLength="3"
                style={styles.phoneInput1}
              />
              <input
                id="phone2"
                type="text"
                placeholder="12345678"
                style={styles.phoneInput2}
              />
            </div>
            <div></div>
            <Alert
              message="핸드폰으로 코드를 발송하였습니다."
              confirmText="확인"
              cancelText="취소"
              alertButtonText="핸드폰인증"
              alertButtonClass="custombuttonclass" // custom class name 전달
            />

            {/* 코드번호 */}
            <label style={styles.label} htmlFor="code">
              코드번호
            </label>
            <input
              id="code"
              type="text"
              placeholder="코드번호를 입력하세요"
              style={styles.input}
            />
            <div></div>
            <div></div>

            {/* 회원가입 버튼 */}
            <motion.button
              type="button"
              style={styles.submitButton}
              whileHover={{
                scale: 1.1,
                backgroundColor: "#256E91",
                color: "#FFF",
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

const styles = {
  pageContainer: {
    marginTop: "5%",
    marginBottom: "5%",
    display: "flex",
    flexDirection: "column",
    alignItems:"center",
    justifyContent: "center",
  },
  container: {
    margin:"10%",
    width: "100%",
    maxWidth: "700px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",

  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "start",
  },
  hrDarkToLight: {
    width: "100%",
    height: "2px",
    background: "linear-gradient(to right, #333 20%, #ccc 20%)",
    border: "none",
  },
  description: {
    fontSize: "14px",
    marginBottom: "20px",
    padding: "15px",
    background: "var(--, #ECECEC)",
    borderRadius: "4px",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  gridForm: {
    display: "grid",
    gridTemplateColumns: "auto auto auto auto", // 4열 구조
    gridAutoRows: "auto",
    gap: "10px 20px",
    alignItems: "center",
    padding: "20px",
  },
  label: {
    textAlign: "start",
    fontWeight: "bold",
    fontSize: "14px",
    fontFamily: "Noto Sans KR",
    color: "#000",
    whiteSpace: "nowrap", // 한 줄로 강제 표시
    overflow: "hidden",
    textOverflow: "ellipsis", // 내용이 길 경우 말줄임 표시
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  phoneGroup: {
    display: "flex",
    gap: "10px",
  },
  phoneInput1: {
    flex: 1,
    width:"30%",
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  phoneInput2: {
     width:"70%",
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    padding: "10px",
    fontSize: "14px",
    backgroundColor: "#256E91",
    color: "#FFF",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  submitButton: {
    gridColumn: "2 / span 1", // 버튼 전체 폭 차지
    textAlign: "center",

    height: "40px",
    padding: "8px 31px",
    gap: "10px",
    borderRadius: "2px",
    border: "2px solid #256E91",
    background: "#FFF",
  },
};
