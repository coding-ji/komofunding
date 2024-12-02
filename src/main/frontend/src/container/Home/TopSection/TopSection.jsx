import React, { useState, useEffect } from "react";
import styles from "./TopSection.module.css"; // CSS 모듈 파일 임포트
import MainProductHorizontal from "../../../components/MainProductHorizontal";
import "../../../index.css";
import TopSectionBtnCard from "./TopSectionBtnCard";
import styled, { keyframes } from "styled-components";
import cloud1 from "./img/cloud1.png";
import cloud2 from "./img/cloud2.png";
import cloud3 from "./img/cloud3.png";
import cloud4 from "./img/cloud4.png";
import cloud5 from "./img/cloud5.png";
import MainMenu from "../../../components/MainMenu/MainMenu";
import { motion } from "framer-motion";



const animate = keyframes`
  0% {
    opacity: 0;
    transform: scale(1);
  }
  25%, 75% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: scale(3);
  }
`;

// 스타일드 컴포넌트 정의
const CloudsWrapper = styled.div`
  position: relative;
  bottom: 0;
  height: 100%;
  width: 100%;
  pointer-events: none;
  grid-area : cloud;
  z-index : 10;

`;

const CloudImage = styled.img`
  position: absolute;
  bottom: 0;
  right : 50%;
  width: 100%;
  animation: ${animate} calc(2s * var(--i)) linear infinite;
`;

const cloudImages = [
  { src: cloud1, index: 1 },
  { src: cloud2, index: 2 },
  { src: cloud3, index: 3 },
  { src: cloud4, index: 4 },
  { src: cloud5, index: 5 },
  { src: cloud1, index: 6 },
  { src: cloud2, index: 7 },
  { src: cloud3, index: 8 },
  { src: cloud4, index: 9 },
  { src: cloud5, index: 10 },
];


const TopSection = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1200);
  const [menuOpen, setMenuOpen] = useState(false); // 메뉴 상태 관리

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 1200);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={styles.gridWrapper}>
      <div className={styles.topGroup}>
        <h1 className={styles.komoFunding}>
          KOMO <br /> FUNDING
        </h1>
        <div
          className={styles.menu}
          onClick={toggleMenu} // 클릭 시 메뉴 토글
        >
          Menu
        </div>
      </div>
      <h1 className={styles.title}>PROJECT PORTFOLIO CROWD FUNDING</h1>
      <div className={styles.overlayCircle} />
      <div className={styles.cardsContainer}>
        <div className={styles.cardGroup}>
          <MainProductHorizontal title="KOMO" />
          <MainProductHorizontal title="HOME" />
          <TopSectionBtnCard text="HOME" color="white" />
          <MainProductHorizontal title="UPCOMING" />
          <MainProductHorizontal title="UPCOMING" />
          {isSmallScreen && <TopSectionBtnCard text="ACTIVE" color="white" />}
        </div>
        <div className={styles.cardGroup}>
          <TopSectionBtnCard text="KOMO" color="gray" />
          <MainProductHorizontal title="ACTIVE" />
          <MainProductHorizontal title="KOMO" />
          <TopSectionBtnCard text="UPCOMING" color="gray" />
          <MainProductHorizontal title="HOME" />
          <MainProductHorizontal title="UPCOMING" />
        </div>
        <div className={styles.cardGroup}>
          {!isSmallScreen && (
            <>
              <MainProductHorizontal title="HOME" />
              <MainProductHorizontal title="UPCOMING" />
              <TopSectionBtnCard text="ACTIVE" color="white" />
              <MainProductHorizontal title="ACTIVE" />
              <MainProductHorizontal title="ACTIVE" />
            </>
          )}
        </div>
      </div>

 
      {/* 오버레이 메뉴로 MainMenu 렌더링 */}
      <div
        className={`${styles.overlayMenu} ${
          menuOpen ? styles.slideIn : styles.slideOut
        }`}
      >
         {/* CLOSE 버튼에 whileHover 적용 */}
         <motion.button
          className={styles.closeButton}
          onClick={toggleMenu}
          whileHover={{ scale: 1.04 }}  // hover 시 확대
          transition={{ duration: 0.3 }}
        >
          CLOSE
        </motion.button>
        <MainMenu /> {/* MainMenu 컴포넌트 불러오기 */}
      </div>

      <CloudsWrapper>
  {cloudImages.map((cloud, i) => (
    <CloudImage
      key={i}
      src={cloud.src}
      style={{
        left: `${i * 10}%`, // 가로로 이어지도록 위치 설정
        "--i": i + 1, // 애니메이션 속도 변수
      }}
      alt={`Cloud ${i}`}
    />
  ))}
</CloudsWrapper>

    </div>
  );
};

export default TopSection;
