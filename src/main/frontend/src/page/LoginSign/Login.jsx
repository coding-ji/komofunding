import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // React Router의 Link 컴포넌트
import TitleText from "../../components/TitleText"; // 제목 컴포넌트
import { Btn } from "../../components/MyBtn"; // 일반 버튼 컴포넌트
import Input from "../../components/input";
import styles from "./Login.module.css"; // CSS 모듈

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., login logic)
  };

  return (
    <div className={styles.container}>
      {/* 제목 */}
      <TitleText title={"KOMO FUNDING"} fontSize={"64px"} />
      <div className={styles.loginBox}>
        {/* 오른쪽 상단에 아이디/PW 찾기, 회원가입 링크 */}
        <div className={styles.topLinks}>
          <Link to="/FindAccount">아이디/PW 찾기</Link> | <Link to="/SignupForm">회원가입</Link>
        </div>

        {/* 로그인 폼 */}
        <form onSubmit={handleSubmit}>
          {/* 이메일 입력 */}
          <Input width={"475px"} placeholder={"이메일"} />

          {/* 비밀번호 입력 */}
          <Input
            width={"475px"}
            placeholder={"비밀번호"}
            margin={"5px 0 30px 0"}
          />

          {/* 로그인 버튼 */}
          <Btn text={"로그인"} width={"500px"} type="submit" />

          {/* 구분선 */}
          <div className={styles.hrSect}>
            <span>또는</span>
          </div>

          {/* 네이버 로그인 버튼 */}
          <motion.button
            className={styles.naverbtn}
            type="button"
            whileHover={{
              backgroundColor: "white",
              color: "#4caf50",
              borderColor: "#4caf50",
            }}
            transition={{
              type: "spring",
              stiffness: 300,
            }}
          >
            네이버 로그인
          </motion.button>

          {/* 카카오톡 로그인 버튼 */}
          <motion.button
            className={styles.kakaobtn}
            type="button"
            whileHover={{
              backgroundColor: "white",
              color: "#ffcc00",
              borderColor: "#ffcc00",
            }}
            transition={{
              type: "spring",
              stiffness: 300,
            }}
          >
            카카오톡 로그인
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default Login;
