import React, { useState } from "react";
import { motion } from "framer-motion";
import Alert from "../../components/Alert/Alert";
import styles from "./FindAccount.module.css"; // CSS 모듈

const FindAccount = () => {
 

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
              />
              <span></span>
              <label className={styles.label}>휴대폰번호</label>
              <input
                type="text"
                placeholder="휴대폰번호를 입력하세요"
                className={styles.input}
              />
              <span></span>
              <span></span>
              <span></span>
              <motion.button
                type="submit"
                className={styles.button}
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
              />
              <Alert
                message="이메일을 전송하시겠습니까?"
                confirmText="확인"
                cancelText="취소"
                alertButtonText="이메일 전송"
                alertButtonClass={styles.customButtonClass}  // custom class name 전달
              />
              <label className={styles.label}>인증번호</label>
              <input
                type="text"
                placeholder="인증번호를 입력하세요"
                className={styles.input}
              />
              <span></span>
              <span></span>
              <span></span>
              <motion.button
                type="submit"
                className={styles.button}
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
