import { useEffect, useRef, useLayoutEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Notification from "../../components/Notification"; // 공지사항 표시 컴포넌트
import styles from "./NoticePage.module.css";
import Pagination from "../MyPage/Pagination";
import { useStore as NoticeStore } from "../../stores/NoticeStore/useStore";
import {fetchAllCommunities} from "../../service/apiService"



const ITEMS_PER_PAGE = 5; // 한 페이지에 표시할 공지사항 수

const categories = [
  { name: "전체", content: "전체" },
  { name: "NOTICE", content: "공지" },
  { name: "EVENT", content: "이벤트" },
  { name: "FAQ", content: "자주 묻는 질문" },
];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`; // YYYY-MM-DD 형식으로 반환
  }

const NoticePage = () => {
  const { state, actions } = NoticeStore(); // useStore에서 상태와 액션 가져오기
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState({ name: "전체" });
  const [currentPage, setCurrentPage] = useState(1);
  const [underlineProps, setUnderlineProps] = useState({ width: 0, left: 0 });
  const itemRefs = useRef([]);

  useEffect(() => {
    const fetchData = async () => { 
      try {
        // 백엔드 API 호출
        const response = await fetchAllCommunities();
        const communities = response.data;
        console.log(communities)

        // 상태 업데이트
        actions.changeCommunities(communities);
      } catch (error) {
        console.error("공지사항 데이터를 불러오지 못했습니다.", error);
      }
    };

    fetchData();
  }, []);

  // 밑줄 위치 업데이트
  const updateUnderlinePosition = () => {
    const activeIndex = categories.findIndex((cat) => cat.name === activeCategory.name);
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


 
  const filteredNotifications =
  activeCategory.name === "전체"
    ? state.communities
    : state.communities?.filter(
        (item) => item.communityCategory === activeCategory.name
      );


  const currentNotifications = filteredNotifications?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );


  const totalPages = Math.ceil(state.communities?.length / ITEMS_PER_PAGE);



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
              {category.content}
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
            onClick={() => 
                navigate(`/home/announcement/${item.communityNumber}`, {
                  state: { announcement: item },
                }
              )} // 상세 페이지로 이동
          >
            <Notification
                category={item.communityCategory}
                date_author={ `${formatDate(item.writeDate)}| ${item.author}`}
                title= {item.communityTitle}
          
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
