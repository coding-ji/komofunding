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
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

const CloudsWrapper = styled.div`
  position: relative;
  bottom: 0;
  height: 100%;
  width: 100%;
  pointer-events: none;
  grid-area: cloud;
  z-index: 10;
`;

const CloudImage = styled.img`
  position: absolute;
  bottom: 0;
  right: 50%;
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
  const navigate = useNavigate();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1200);
  const [menuOpen, setMenuOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);


// 필터링: 30일 이내 시작한 프로젝트
const filteredProjects = projects.filter((project) => {
  const startDate = new Date(project.startDate);
  return startDate >= thirtyDaysAgo && startDate <= today;
});


// 제한: 최대 6개만 가져오기
const limitedProjects = filteredProjects.slice(0, 6);

console.log(limitedProjects);


useEffect(() => {
  axios
    .get("/data/projectData.json")
    .then((response) => {
      setProjects(response.data);
    })
    .catch((error) => {
      console.error("데이터를 가져오는데 실패했습니다.", error);
    });
}, []);

useEffect(() => {
  const handleResize = () => setIsSmallScreen(window.innerWidth <= 1200);
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);


  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // 현재 진행 중인 프로젝트 필터링
  const activeProjects = projects.filter(
    (item) =>
      new Date(item.startDate) <= today && new Date(item.endDate) >= today
  );

  // 1. `isNew` 플래그 추가
  const projectsWithFlags = activeProjects.map((item) => ({
    ...item,
    isNew: new Date(item.startDate) >= thirtyDaysAgo,
  }));

  // 2. `new`와 `popular` 프로젝트 고정 개수로 추출
  const selectedNewProjects = projectsWithFlags
  .filter((item) => item.isNew) // `new` 조건
  .slice(0, 6); // 최대 6개 고정

  const selectedPopularProjects = [...projectsWithFlags]
    .sort(
      (a, b) =>
        b.currentAmount / b.totalAmount - a.currentAmount / a.totalAmount
    ) // 인기 순 정렬
    .filter((item) => !selectedNewProjects.includes(item)) // `new` 제외
    .slice(0, 6); // 최대 6개 고정

  // 3. `displayedProjects` 생성 (new + popular)
  const combinedProjects  = [
    ...selectedNewProjects.map((item) => ({ ...item, isNew: true, isPopular: false })),
    ...selectedPopularProjects.map((item) => ({ ...item, isNew: false, isPopular: true })),
  ];
  
  // 5. 섞기 함수
  const shuffleArray = (array) => {
    return array
      .map((item) => ({ ...item, sort: Math.random() })) // 랜덤한 값 부여
      .sort((a, b) => a.sort - b.sort) // 랜덤 값 기준으로 정렬
      .map(({ sort, ...rest }) => rest); // 정렬 후 불필요한 필드 제거
  };

  // 6. 카드 섞기
  const displayedProjects = shuffleArray(combinedProjects);


  return (
    <div className={styles.gridWrapper}>
      <div className={styles.topGroup}>
        <h1 className={styles.komoFunding}>
          KOMO <br /> FUNDING
        </h1>
        <div className={styles.menu} onClick={toggleMenu}>
          Menu
        </div>
      </div>
      <h1 className={styles.title}>PROJECT PORTFOLIO CROWD FUNDING</h1>
      <div className={styles.overlayCircle} />
      <div className={styles.cardsContainer}>
        <div className={styles.cardGroup}>
          {displayedProjects.slice(0, 2).map((project) => (
            <MainProductHorizontal
              key={project.projectNum}
              imgSrc={project.imgs[0]}
              currentAmount={parseInt(project.currentAmount, 10)}
              totalAmount={parseInt(project.totalAmount, 10)}
              onClick={() => navigate(`/project/${project.projectNum}`)}
              isNew={project.isNew}
              isPopular={project.isPopular}
            />
          ))}
          <TopSectionBtnCard
            text="HOME"
            color="white"
            onClick={() => navigate("/")}
          />
          {displayedProjects.slice(2, 4).map((project) => (
            <MainProductHorizontal
              key={project.projectNum}
              imgSrc={project.imgs[0]}
              currentAmount={parseInt(project.currentAmount, 10)}
              totalAmount={parseInt(project.totalAmount, 10)}
              onClick={() => navigate(`/project/${project.projectNum}`)}
              isNew={project.isNew}
              isPopular={project.isPopular}
            />
          ))}
          {isSmallScreen && <TopSectionBtnCard text="ACTIVE" color="white" />}
        </div>
        <div className={styles.cardGroup}>
          <TopSectionBtnCard text="KOMO" color="gray" />
          {displayedProjects.slice(4, 6).map((project) => (
            <MainProductHorizontal
              key={project.projectNum}
              imgSrc={project.imgs[0]}
              currentAmount={parseInt(project.currentAmount, 10)}
              totalAmount={parseInt(project.totalAmount, 10)}
              onClick={() => navigate(`/project/${project.projectNum}`)}
              isNew={project.isNew}
              isPopular={project.isPopular}
            />
          ))}
          <TopSectionBtnCard
            text="UPCOMING"
            color="gray"
            onClick={() => navigate("/upcoming")}
          />
          {displayedProjects.slice(6, 8).map((project) => (
            <MainProductHorizontal
              key={project.projectNum}
              imgSrc={project.imgs[0]}
              currentAmount={parseInt(project.currentAmount, 10)}
              totalAmount={parseInt(project.totalAmount, 10)}
              onClick={() => navigate(`/project/${project.projectNum}`)}
              isNew={project.isNew}
              isPopular={project.isPopular}
            />
          ))}
        </div>
        <div className={styles.cardGroup}>
          {!isSmallScreen && (
            <>
              {displayedProjects.slice(8, 10).map((project) => (
                <MainProductHorizontal
                  key={project.projectNum}
                  imgSrc={project.imgs[0]}
                  currentAmount={parseInt(project.currentAmount, 10)}
                  totalAmount={parseInt(project.totalAmount, 10)}
                  onClick={() => navigate(`/project/${project.projectNum}`)}
                  isNew={project.isNew}
                  isPopular={project.isPopular}
                />
              ))}
              <TopSectionBtnCard
                text="ACTIVE"
                color="white"
                onClick={() => navigate("/active")}
              />
              {displayedProjects.slice(10, 12).map((project) => (
                <MainProductHorizontal
                  key={project.projectNum}
                  imgSrc={project.imgs[0]}
                  currentAmount={parseInt(project.currentAmount, 10)}
                  totalAmount={parseInt(project.totalAmount, 10)}
                  onClick={() => navigate(`/project/${project.projectNum}`)}
                  isNew={project.isNew}
                  isPopular={project.isPopular}
                />
              ))}
            </>
          )}
        </div>
      </div>
      <div
        className={`${styles.overlayMenu} ${
          menuOpen ? styles.slideIn : styles.slideOut
        }`}
      >
        <motion.button
          className={styles.closeButton}
          onClick={toggleMenu}
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.3 }}
        >
          CLOSE
        </motion.button>
        <MainMenu />
      </div>
      <CloudsWrapper>
        {cloudImages.map((cloud, i) => (
          <CloudImage
            key={i}
            src={cloud.src}
            style={{
              left: `${i * 10}%`,
              "--i": i + 1,
            }}

    />
  ))}
</CloudsWrapper>

    </div>
  );
};

export default TopSection;
