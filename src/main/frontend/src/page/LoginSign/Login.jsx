import React from "react";
import { motion } from "framer-motion";
import TitleText from "../../components/TitleText"; // 제목 컴포넌트
import Input from "../../components/Input"; // 입력 필드 컴포넌트
import { Btn } from "../../components/MyBtn"; // 일반 버튼 컴포넌트

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., login logic)
  };

  return (
    <div className="container">
      <style>
        {`
          .container {
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            min-height: 100vh;
          }
          .loginBox {
            background-color: white;
            border-radius: 7px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            padding: 30px;
            width: 100%;
            max-width: 564px;
            margin: 10px;
          }
          .topLinks {
            text-align: right;
            font-size: 0.9rem;
            color: #888;
            margin-bottom: 10px;
          }
          .hr-sect {
            display: flex;
            flex-basis: 100%;
            align-items: center;
            color: rgba(0, 0, 0, 0.35);
            font-size: 12px;
            margin: 20px 0;
          }
          .hr-sect::before,
          .hr-sect::after {
            content: "";
            flex-grow: 1;
            background: rgba(0, 0, 0, 0.35);
            height: 1px;
            font-size: 0px;
            line-height: 0px;
            margin: 0px 16px;
          }
        `}
      </style>

      {/* 제목 */}
      <TitleText title={"KOMO FUNDING"} fontSize={"64px"} />
      <div className="loginBox">
        {/* 오른쪽 상단에 아이디/PW 찾기, 회원가입 링크 */}
        <div className="topLinks">
          <a href="#">아이디/PW 찾기</a> | <a href="#">회원가입</a>
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
          <div className="hr-sect">
            <span>또는</span>
          </div>

          {/* 네이버 로그인 버튼 */}
          <motion.button
            className="naverbtn"
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
            style={{
              backgroundColor: "#4caf50",
              color: "white",
              width: "500px",
              height: "64px",
              fontSize: "24px",
              fontFamily: "'Noto Sans KR', sans-serif",
              fontWeight: "700",
              borderRadius: "7px",
              marginBottom: "15px",
              cursor: "pointer",
              border: "2px solid #4caf50",
            }}
          >
            네이버 로그인
          </motion.button>

          {/* 카카오톡 로그인 버튼 */}
          <motion.button
            className="kakaobtn"
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
            style={{
              backgroundColor: "#ffcc00",
              color: "white",
              padding: "12px",
              width: "500px",
              height: "64px",
              fontSize: "24px",
              fontFamily: "'Noto Sans KR', sans-serif",
              fontWeight: "700",
              borderRadius: "7px",
              marginTop: "15px",
              cursor: "pointer",
              border: "2px solid #ffcc00",
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
