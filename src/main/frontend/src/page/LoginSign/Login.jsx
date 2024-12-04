import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import TitleText from "../../components/TitleText";
import { Btn } from "../../components/MyBtn";
import Input from "../../components/input";
import axios from "axios";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // 메시지 상태
  const [error, setError] = useState(""); // 에러 상태

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      const response = await axios.get("/data/userData.json"); // JSON 데이터 API 호출
      const users = response.data;

      // 입력한 이메일과 비밀번호가 일치하는 사용자 찾기
      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        // 로그인 성공
        setMessage("로그인 성공!");
        localStorage.setItem("user", JSON.stringify(user)); // 사용자 정보 저장
        window.location.href = "/"; // 메인 페이지로 리디렉션
      } else {
        // 로그인 실패
        setError("이메일 또는 비밀번호가 일치하지 않습니다.");
      }
    } catch (err) {
      console.error(err);
      setError("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
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
          <Input
            width={"475px"}
            placeholder={"이메일"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* 비밀번호 입력 */}
          <Input
            width={"475px"}
            placeholder={"비밀번호"}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin={"5px 0 30px 0"}
          />

          {/* 로그인 버튼 */}
          <Btn text={"로그인"} width={"500px"} type="submit" />

          {/* 오류 메시지 */}
          {error && <p className={styles.errorMessage}>{error}</p>}
          {message && <p className={styles.successMessage}>{message}</p>}

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
