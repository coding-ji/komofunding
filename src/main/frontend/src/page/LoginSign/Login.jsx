import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import TitleText from "../../components/TitleText";
import { Btn } from "../../components/MyBtn";
import Input from "../../components/input";
import { loginUser } from "../../service/apiService";
import styles from "./Login.module.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // 성공 메시지 상태
  const [error, setError] = useState(""); // 에러 메시지 상태fFff

  const handleSubmit = async (e) => {
    e.preventDefault();
      // 로그인 성공 시
      await loginUser(email, password)
      .then(response => {
        setMessage("로그인 성공!");
        const userInfo = response.data; // 백엔드에서 반환된 사용자 정보
        console.log(userInfo);
        localStorage.setItem("user", JSON.stringify(userInfo));
        window.location.href = "/"; // 메인 페이지로 리디렉션
      })
      .catch(error => {
        console.error("로그인 실패", error);
        setError("로그인 실패");
      });
  }

  return (
    <div className={styles.container}>
      {/* 제목 */}
      <TitleText title={"KOMO FUNDING"} fontSize={"64px"} />
      <div className={styles.loginBox}>
        {/* 오른쪽 상단에 아이디/PW 찾기, 회원가입 링크 */}
        <div className={styles.topLinks}>
          <Link to="/home/FindAccount">아이디/PW 찾기</Link> | <Link to="/home/SignupForm">회원가입</Link>
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
    {/* 오류 및 성공 메시지 */}
    {error && <p className={styles.errorMessage}>{error}</p>}
          {message && <p className={styles.successMessage}>{message}</p>}
          {/* 로그인 버튼 */}
          <Btn text={"로그인"} width={"500px"} type="submit" />

      

    

        </form>
      </div>
    </div>
  );
};

export default Login;
