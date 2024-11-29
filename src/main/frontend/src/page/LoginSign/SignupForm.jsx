import React from "react";
import { motion } from "framer-motion";
import Alert from "../../components/Alert/Alert";
import styles from './SignupForm.module.css'; // import external CSS

const SignupForm = () => {
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
          <form className={styles.gridForm}>
            {/* 이름 */}
            <label className={styles.label} htmlFor="name">
              이름
            </label>
            <input
              id="name"
              type="text"
              placeholder="이름을 입력하세요"
              className={styles.input}
            />
            <div></div>
            <div></div>

            {/* 이메일 */}
            <label className={styles.label} htmlFor="email">
              이메일
            </label>
            <input
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
              className={styles.input}
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
            <label className={styles.label} htmlFor="id">
              아이디(이메일)
            </label>
            <input
              id="id"
              type="text"
              placeholder="아이디를 입력하세요"
              className={styles.input}
            />
            <div></div>
            <div></div>

            {/* 비밀번호 */}
            <label className={styles.label} htmlFor="password">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              className={styles.input}
            />
            <div></div>
            <div></div>

            {/* 휴대폰 번호 */}
            <label className={styles.label} htmlFor="phone">
              휴대폰 번호
            </label>
            <div className={styles.phoneGroup}>
              <input
                id="phone1"
                type="text"
                placeholder="010"
                maxLength="3"
                className={styles.phoneInput1}
              />
              <input
                id="phone2"
                type="text"
                placeholder="12345678"
                className={styles.phoneInput2}
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
            <label className={styles.label} htmlFor="code">
              코드번호
            </label>
            <input
              id="code"
              type="text"
              placeholder="코드번호를 입력하세요"
              className={styles.input}
            />
            <div></div>
            <div></div>

            {/* 회원가입 버튼 */}
            <motion.button
              type="button"
              className={styles.submitButton}
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
