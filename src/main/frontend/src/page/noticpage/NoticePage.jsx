import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Notification from "../../components/Notification"; // 공지사항 표시 컴포넌트
import styles from "./NoticePage.module.css";
import Pagination from "../MyPage/Pagination";


const categories = [
  { name: "전체", content: "전체 페이지" },
  { name: "공지", content: "공지" },
  { name: "이벤트", content: "이벤트 페이지" },
  { name: "자주 묻는 질문", content: "자주 묻는 질문 페이지" },
];

const ITEMS_PER_PAGE = 5; // 한 페이지에 표시할 공지사항 수

const NoticePage = () => {
  const [notificationsData, setNotificationsData] = useState({
    전체: [],
    공지: [],
    이벤트: [],
    "자주 묻는 질문": [],
  });
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [underlineProps, setUnderlineProps] = useState({ width: 0, left: 0 });
  const itemRefs = useRef([]);
  const navigate = useNavigate();

  // JSON 데이터를 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data/notifications.json");
        const allNotifications = response.data;

        // 카테고리별로 데이터 분류
        const categorizedData = {
          전체: allNotifications,
          공지: allNotifications.filter((item) => item.category === "공지"),
          이벤트: allNotifications.filter((item) => item.category === "이벤트"),
          "자주 묻는 질문": allNotifications.filter(
            (item) => item.category === "자주 묻는 질문"
          ),
        };

        setNotificationsData(categorizedData);
      } catch (error) {
        console.error("데이터를 불러오는 중 오류가 발생했습니다.", error);
      }
    };

    fetchData();
  }, []);

  const updateUnderlinePosition = () => {
    const activeIndex = categories.findIndex(
      (cat) => cat.name === activeCategory.name
    );
    const activeItem = itemRefs.current[activeIndex];
    if (activeItem) {
      const { offsetLeft, offsetWidth } = activeItem;
      setUnderlineProps({ left: offsetLeft, width: offsetWidth });
    }
  };

  useLayoutEffect(() => {
    updateUnderlinePosition();
    window.addEventListener("resize", updateUnderlinePosition);
    return () => {
      window.removeEventListener("resize", updateUnderlinePosition);
    };
  }, [activeCategory]);

  // 현재 선택된 카테고리에서 페이지별 데이터를 계산
  const currentNotifications = notificationsData[activeCategory.name]?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(
    notificationsData[activeCategory.name]?.length / ITEMS_PER_PAGE
  );

  return (
    <div className={styles.pageContainer}>
      {/* 제목 */}
      <motion.div
        className={styles.title}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1>공지사항</h1>
      </motion.div>

      {/* 카테고리 선택 */}
      <div className={styles.navbarline}>
        <div className={styles.navbar}>
          {categories.map((category, index) => (
            <button
              key={category.name}
              className={`${styles.navbaritems} ${
                activeCategory.name === category.name ? styles.active : ""
              }`}
              onClick={() => {
                setActiveCategory(category);
                setCurrentPage(1);
              }}
              ref={(el) => (itemRefs.current[index] = el)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <AnimatePresence>
          {underlineProps.width > 0 && (
            <motion.div
              className={styles.underline}
              style={{
                width: underlineProps.width,
                left: underlineProps.left,
              }}
              layoutId="underline"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* 공지사항 목록 */}
      <div className={styles.content}>
        {currentNotifications?.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(`/announcement/${item.id}`)} // 상세 페이지로 이동
          >
            <Notification
              props={{
                category: item.category,
                date_author: `${item.date} | ${item.author}`,
                title: item.title,
              }}
            />
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
};

export default NoticePage;
