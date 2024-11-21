import React from "react";
import styles from "../components/Header/Header.module.css"; // 모듈 CSS 가져오기
import HeaderMenu from "../components/Header/HeaderMenu"; // 메뉴 컴포넌트
import SearchInput from "../components/Header/SearchInput";
import { motion } from "framer-motion";

const MainHeader = () => {
  return (
    <div className={styles.headerContainer}>
      {/* 로고 및 메뉴 섹션 */}
      <div className={styles.logoAndMenu}>
        <motion.div whileHover={{ scale: 1.05 }}>
          <div
            className={styles.logoImage}
            alt="로고이미지"
            style={{
              width: "154px", // 원하는 크기
              height: "81px",
            }}
          />
        </motion.div>
        <div className={styles.menuList}>
          <HeaderMenu name="HOME" href="#home" />
          <HeaderMenu name="UPCOMING" href="#upcoming" />
          <HeaderMenu name="ACTIVE" href="#active" />
          <HeaderMenu name="MORE" href="#more" />
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
          >
            Log In
          </motion.button>
          <motion.button
            className={styles.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Sign Up
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
