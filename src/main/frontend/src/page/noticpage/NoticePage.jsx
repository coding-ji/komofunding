import React, { useState, useRef, useLayoutEffect } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Notification from '../pgw/Notification'; // Notification 컴포넌트 불러오기
import styles from './NoticePage.module.css';
import Note from './PageInPage/Note';
import Create from './PageInPage/Create';
import Donate from './PageInPage/Donate';
import Userterms from './PageInPage/Userterms';
import Privacypolicy from './PageInPage/Privacypolicy';
import Charge from './PageInPage/Charge';
import Question from './PageInPage/Question';
import Footer from './Footer';
import MainHeader from './MainHeader';


const categories = [
  { name: '전체', content: '전체 페이지' },
  { name: '공지', content: '공지' },
  { name: '이벤트', content: '이벤트 페이지' },
  { name: '자주 묻는 질문', content: '자주 묻는 질문 페이지' },
];

const notificationsData = {
  전체: [
    { category: "전체", date_author: "2024-11-21 | 관리자", title: "전체 공지사항 1" },
    { category: "전체", date_author: "2024-11-20 | 관리자", title: "전체 공지사항 2" },
    { category: "전체", date_author: "2024-11-21 | 관리자", title: "전체 공지사항 1" },
    { category: "전체", date_author: "2024-11-20 | 관리자", title: "전체 공지사항 2" },
    { category: "전체", date_author: "2024-11-21 | 관리자", title: "전체 공지사항 1" },
    { category: "전체", date_author: "2024-11-20 | 관리자", title: "전체 공지사항 2" },
    { category: "전체", date_author: "2024-11-21 | 관리자", title: "전체 공지사항 1" },
    { category: "전체", date_author: "2024-11-20 | 관리자", title: "전체 공지사항 2" },
  ],
  공지: [
    { category: "공지", date_author: "2024-11-19 | 관리자", title: "공지사항 1" },
    { category: "공지", date_author: "2024-11-18 | 관리자", title: "공지사항 2" },
    { category: "공지", date_author: "2024-11-19 | 관리자", title: "공지사항 1" },
    { category: "공지", date_author: "2024-11-18 | 관리자", title: "공지사항 2" },
    { category: "공지", date_author: "2024-11-19 | 관리자", title: "공지사항 1" },
    { category: "공지", date_author: "2024-11-18 | 관리자", title: "공지사항 2" },

  ],
  이벤트: [
    { category: "이벤트", date_author: "2024-11-17 | 관리자", title: "이벤트 1" },
    { category: "이벤트", date_author: "2024-11-16 | 관리자", title: "이벤트 2" },
    { category: "이벤트", date_author: "2024-11-17 | 관리자", title: "이벤트 1" },
    { category: "이벤트", date_author: "2024-11-16 | 관리자", title: "이벤트 2" },
    { category: "이벤트", date_author: "2024-11-17 | 관리자", title: "이벤트 1" },
    { category: "이벤트", date_author: "2024-11-16 | 관리자", title: "이벤트 2" },
  ],
  "자주 묻는 질문": [
    { category: "자주 묻는 질문", date_author: "2024-11-15 | 관리자", title: "질문 1" },
    { category: "자주 묻는 질문", date_author: "2024-11-14 | 관리자", title: "질문 2" },
    { category: "자주 묻는 질문", date_author: "2024-11-15 | 관리자", title: "질문 1" },
    { category: "자주 묻는 질문", date_author: "2024-11-14 | 관리자", title: "질문 2" },
    { category: "자주 묻는 질문", date_author: "2024-11-15 | 관리자", title: "질문 1" },
    { category: "자주 묻는 질문", date_author: "2024-11-14 | 관리자", title: "질문 2" },
  ],
};

const CategoryContent = ({ categoryName }) => (
  <div className={styles.content}>
    <h2>{categoryName}</h2>
    {notificationsData[categoryName].map((item, index) => (
      <Notification key={index} props={item} />
    ))}
  </div>
);

const NoticePage = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [underlineProps, setUnderlineProps] = useState({ width: 0, left: 0 });
  const itemRefs = useRef([]);

  const updateUnderlinePosition = () => {
    const activeIndex = categories.findIndex((cat) => cat.name === activeCategory.name);
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
    window.addEventListener('resize', updateUnderlinePosition);
    return () => {
      window.removeEventListener('resize', updateUnderlinePosition);
    };
  }, [activeCategory]);

  return (
    <div className={styles.pageContainer}>
     <MainHeader />

      <motion.div className={styles.title} initial="hidden" animate="visible" variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.8, ease: 'easeOut' }}>
        <h1>공지사항</h1>
      </motion.div>

      <div className={styles.navbarline}>
        <div className={styles.navbar}>
          {categories.map((category, index) => (
            <Link
              key={category.name}
              to={`/${category.name}`}
              className={`${styles.navbaritems} ${activeCategory.name === category.name ? styles.active : ''}`}
              onClick={() => {
                setActiveCategory(category);
                handleCategoryClick(index);
              }}
              ref={(el) => (itemRefs.current[index] = el)}
            >
              {category.name}
            </Link>
          ))}
        </div>

        <AnimatePresence>
          {underlineProps.width > 0 && (
            <motion.div
              className={styles.underline}
              style={{ width: underlineProps.width, left: underlineProps.left }}
              layoutId="underline"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
        </AnimatePresence>
      </div>

      <Routes>
        <Route path="/" element={<Navigate to="/전체" />} />
        {categories.map((category) => (
          <Route key={category.name} path={`/${category.name}`} element={<CategoryContent categoryName={category.name} />} />
        ))}
        <Route path="/note" element={<Note />} />
        <Route path="/question" element={<Question />} />
        <Route path="/create" element={<Create />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/useterms" element={<Userterms />} />
        <Route path="/privacypolicy" element={<Privacypolicy />} />
        <Route path="/charge" element={<Charge />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default NoticePage;


//페이지 작동시키려면 푸터에서 이밑의 페이지 작성과,페이지를 만들어야 사용가능하고
//헤더는 위치 잘찾아서 임포트 시키면 작동합니다.
//리스트를 추가하거나 애니메이션을 바꾸려면 Notification에서 수정 바랍니다..
//  const notificationsData = {전체: [{ category: "전체", date_author: "2024-11-21 | 관리자", title: "전체 공지사항 1" }
// 안쪽의 위치와 정보를 수정하려면 위의 이 로직을 찾아서 바꾸시길 바랍니다


// page에 들어갈 router 문구
// function App() {
//     return (
//       <>
//         <Routes>
//           <Route path="/note" element={<Note />} />     {/* 공지사항 페이지 */}
//           <Route path="/question" element={<Question />} /> {/* 문의등록 페이지 */}
//           <Route path="/create" element={<Create />} />     {/* 창작 가이드 페이지 */}
//           <Route path="/donate" element={<Donate />} />     {/* 후원 가이드 페이지 */}
//           <Route path="/useterms" element={<Userterms />} /> {/* 이용약관 페이지 */}
//           <Route path="/privacypolicy" element={<Privacypolicy />} /> {/* 개인정보 처리방침 페이지 */}
//           <Route path="/charge" element={<Charge />} />     {/* 수수료 안내 페이지 */}
//         </Routes>
//         <Footer />
//       </>
//     )
//   }