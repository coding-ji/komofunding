import React, { useState, useEffect } from "react";
import styles from "../components/Header/Header.module.css"; // 모듈 CSS 가져오기
import HeaderMenu from "../components/Header/HeaderMenu"; // 메뉴 컴포넌트
import SearchInput from "../components/Header/SearchInput";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";



const MainHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  const navigate = useNavigate(); // useNavigate 훅 선언
  const [userNum, setUserNum] = useState(null); // 로그인한 유저의 userNum 관리

     // 컴포넌트가 렌더링될 때 로그인 상태 확인
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); // localStorage에서 사용자 정보 가져오기
    if (user) {
      setIsLoggedIn(true);
      setUserNum(user.userNum); // userNum 저장
    }
  }, []);


     // 로그아웃 핸들러
  const handleLogout = () => {
    localStorage.removeItem("user"); // 사용자 정보 삭제
    setIsLoggedIn(false); // 상태 갱신
    navigate("/"); // 홈으로 이동
  };
  
  // 현재 날짜를 ISO 형식으로 가져오기
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className={styles.headerContainer}>
      {/* 로고 및 메뉴 섹션 */}
      <div className={styles.logoAndMenu}>
        <motion.div whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/")} // 홈으로 이동
        >
          <div
            className={styles.logoImage}
            alt="로고이미지"
            style={{
              width: "120px", // 원하는 크기
              height: "50px",
            }}
          />
        </motion.div>
        <div className={styles.menuList}>
          <HeaderMenu name="HOME" 
           onClick={() => navigate("/home")}/>
          <HeaderMenu
            name="UPCOMING"
            onClick={() => navigate("/upcoming")} // Upcoming 경로로 이동
          />
          <HeaderMenu
            name="ACTIVE"
            onClick={() => navigate("/active")} // Active 경로로 이동
          />

          <HeaderMenu name="MORE" 
              onClick={() => navigate("/notice")}/>
        </div>
      </div>

      {/* 검색 및 버튼 섹션 */}
      <div className={styles.searchAndButtons}>
        {/* 검색창 */}
        <SearchInput className={styles.searchInput} placeholder={"Search"} />
      {/* 로그인 여부에 따라 버튼 변경 */}
      <div className={styles.buttonContainer}>
          {isLoggedIn ? (
            <>
              {/* 로그아웃 버튼 */}
              <motion.button
                className={styles.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout} // 로그아웃 동작
              >
                Log Out
              </motion.button>

              {/* 마이페이지 버튼 */}
              <motion.button
                className={styles.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/profile/${userNum}`)} // userNum으로 마이페이지로 이동
              >
                My Page
              </motion.button>
            </>
          ) : (
            <>
              {/* 로그인 버튼 */}
              <motion.button
                className={styles.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/login")} // 로그인 페이지로 이동
              >
                Log In
              </motion.button>

              {/* 회원가입 버튼 */}
              <motion.button
                className={styles.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/SignupForm")} // 회원가입 페이지로 이동
              >
                Sign Up
              </motion.button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
