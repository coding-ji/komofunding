import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import TitleText from "../../components/TitleText";
import { Btn } from "../../components/MyBtn";
import Input from "../../components/input";
import { loginUser } from "../../service/apiService";
import styles from "./Login.module.css";
import axios from "axios";


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // 성공 메시지 상태
  const [error, setError] = useState(""); // 에러 메시지 상태fFff

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // 기존 에러 메시지 초기화
    setMessage(""); // 기존 성공 메시지 초기화
  
    try {
      const response = await loginUser(email, password);
      const userInfo = response.data; // 서버에서 반환된 데이터 (role, sessionId 등)
      
      // 성공 메시지 출력
      setMessage("로그인 성공!");
  
      // 로컬 스토리지에 사용자 정보 저장
      localStorage.setItem("user", JSON.stringify(userInfo));
  
      // 역할에 따라 리디렉션
      if (userInfo.role === "admin") {
        navigate("/admin"); // 관리자 페이지
      } else if (userInfo.role === "user") {
        navigate("/");
      } else {
        throw new Error("알 수 없는 역할");
      }
    } catch (error) {
      alert("로그인에 실패하셨습니다. ")
      console.error("로그인 실패:", error);
      setError("로그인 실패: " + (error.response?.data?.error || "서버와 통신할 수 없습니다."));
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
