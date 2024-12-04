import React from "react";
import styles from "../components/Header/Header.module.css"; // 모듈 CSS 가져오기
import HeaderMenu from "../components/Header/HeaderMenu"; // 메뉴 컴포넌트
import SearchInput from "../components/Header/SearchInput";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


const MainHeader = () => {
  const navigate = useNavigate(); // useNavigate 훅 선언

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

        {/* 버튼 섹션 */}
        <div className={styles.buttonContainer}>
          <motion.button
            className={styles.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/login")} // /login으로 이동

          >
            Log In
          </motion.button>
          <motion.button
            className={styles.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/SignupForm")} // /SignupForm으로 이동
          >
            Sign Up
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
