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
  const [error, setError] = useState(""); // 에러 메시지 상태

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("이메일과 비밀번호를 입력해주세요.");
      return;
    }


    try {
      // loginUser API 호출
      // const response = await loginUser(email, password);

      // 로그인 성공 시
      setMessage("로그인 성공!");
      // localStorage.setItem("user", JSON.stringify(response.data)); // 사용자 정보 저장
      axios.get("/data/userData.json").then(
        response => {
          const datas = response.data;
          const selectdUser = datas.find(data => data.email == email);
          localStorage.setItem("userNum", JSON.stringify(selectdUser.userNum))
        }
      )

      window.location.href = "/"; // 메인 페이지로 리디렉션
    } catch (err) {
      console.error(err);
      // 에러 처리
      if (err.response && err.response.status === 401) {
        setError("이메일 또는 비밀번호가 일치하지 않습니다.");
      } else {
        setError("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

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
