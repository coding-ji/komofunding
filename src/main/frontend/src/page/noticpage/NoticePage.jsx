import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Notification from "../../components/Notification"; // 기존 Notification 컴포넌트
import styles from "./NoticePage.module.css";

const categories = [
  { name: "전체", content: "전체 페이지" },
  { name: "공지", content: "공지" },
  { name: "이벤트", content: "이벤트 페이지" },
  { name: "자주 묻는 질문", content: "자주 묻는 질문 페이지" },
];

const NoticePage = () => {
  const [notificationsData, setNotificationsData] = useState({
    전체: [],
    공지: [],
    이벤트: [],
    "자주 묻는 질문": [],
  });
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [underlineProps, setUnderlineProps] = useState({ width: 0, left: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 페이지당 표시할 항목 수
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

  const handleCategoryClick = (index) => {
    const activeItem = itemRefs.current[index];
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const currentNotifications =
    notificationsData[activeCategory.name]?.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ) || [];

  const totalPages = Math.ceil(
    (notificationsData[activeCategory.name]?.length || 0) / itemsPerPage
  );

  return (
    <div className={styles.pageContainer}>
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
                handleCategoryClick(index);
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

      <div className={styles.content}>
        {currentNotifications.map((item, index) => (
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

      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? styles.activePage : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NoticePage;
