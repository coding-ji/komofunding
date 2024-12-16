import { useEffect, useRef, useLayoutEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import Notification from "../../components/Notification"; // 공지사항 표시 컴포넌트
import styles from "./NoticePage.module.css";
import Pagination from "../MyPage/Pagination";
import { formattedDate } from "../../utils/formattedData";

import { useStore as NoticeStore } from "../../stores/NoticeStore/useStore";
import { useStore as QnaStore } from "../../stores/QnaStore/useStore";



const ITEMS_PER_PAGE = 5; // 한 페이지에 표시할 공지사항 수

const categories = [
  { name: "전체", content: "전체" },
  { name: "NOTICE", content: "공지" },
  { name: "EVENT", content: "이벤트" },
  { name: "FAQ", content: "자주 묻는 질문" },
];

const NoticePage = () => {
  const { state: qnaState, actions: qnaActions } = QnaStore();
  const { state: noticeState, actions: noticeActions } = NoticeStore();
  const location = useLocation();
  const navigate = useNavigate();

  // notice 일때 혹은 유저 문의 일때
  useEffect(() => {
    const path = location.pathname; 

    if (path.includes("notice")) {
      noticeActions.readAllCommunities();
    }

    if (path.includes("inquiry")) {
      qnaActions.readAllQnas();
    }

    console.log("notice", noticeState);
    console.log("inquiry", qnaState);
  }, [location]);

  // 공지사항 관련 내용
  const [activeCategory, setActiveCategory] = useState({ name: "전체" });
  const [currentPage, setCurrentPage] = useState(1);
  const [underlineProps, setUnderlineProps] = useState({ width: 0, left: 0 });
  const itemRefs = useRef([]);

  // 밑줄 위치 업데이트
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

  const filteredNotifications =
    activeCategory.name === "전체"
      ? noticeState.communities
      : noticeState.communities?.filter(
          (item) => item.communityCategory === activeCategory.name
        );

  const currentNotifications = filteredNotifications?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(
    noticeState.communities?.length / ITEMS_PER_PAGE
  );

  return (
    <>
      {location.pathname.includes("notice") &&
        noticeState &&
        Array.isArray(noticeState.communities) && (
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

            <div className={styles.content}>
              {currentNotifications?.map((item, index) => (
                <div
                  key={index}
                  onClick={() =>
                    navigate(`/home/announcement/${item.communityNumber}`, {
                      noticeState: { announcement: item },
                    })
                  } // 상세 페이지로 이동
                >
                  <Notification
                    category={item.communityCategory}
                    date_author={`${formattedDate(item.writeDate)}| ${
                      item.author
                    }`}
                    title={item.communityTitle}
                  />
                </div>
              ))}
            </div>
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            )}
          </div>
        )}
        {
         location.pathname.includes("inquiry") && qnaState && Array.isArray(qnaState)&& console.log("유저유저")
        }
    </>
  );
};

export default NoticePage;
