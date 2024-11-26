import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
// import Notification from './Notification';  // Notification 컴포넌트 불러오기
import styles from './Notice.module.css';

const categories = [
  { name: '전체', content: '전체 페이지' },
  { name: '공지', content: '공지' },
  { name: '이벤트', content: '이벤트 페이지' },
  { name: '자주 묻는 질문', content: '자주 묻는 질문 페이지' },
];



const CategoryContent = ({ categoryName }) => (
  <div className={styles.content}>
    <h2>{categoryName}</h2>
    {/* 각 카테고리에 맞는 Notification 컴포넌트들 렌더링 */}
    {[categoryName].map((item, index) => (
      <content key={index} props={item} />
    ))}
  </div> 
);

const Notice = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [underlineProps, setUnderlineProps] = useState({ width: 0, left: 0 });
  const itemRefs = useRef([]);

  // 밑줄의 위치를 재계산하는 함수
  const updateUnderlinePosition = () => {
    const activeIndex = categories.findIndex((cat) => cat.name === activeCategory.name);
    const activeItem = itemRefs.current[activeIndex];
    if (activeItem) {
      const { offsetLeft, offsetWidth } = activeItem;
      setUnderlineProps({ left: offsetLeft, width: offsetWidth });
    }
  };

  // 카테고리 클릭 시 밑줄 위치 업데이트
  const handleCategoryClick = (index) => {
    const activeItem = itemRefs.current[index];
    if (activeItem) {
      const { offsetLeft, offsetWidth } = activeItem;
      setUnderlineProps({ left: offsetLeft, width: offsetWidth });
    }
  };

  // 초기 렌더링과 리사이즈시 밑줄 위치 업데이트
  useLayoutEffect(() => {
    updateUnderlinePosition();
    window.addEventListener('resize', updateUnderlinePosition); // 리사이즈 시 밑줄 위치 갱신
    return () => {
      window.removeEventListener('resize', updateUnderlinePosition); // 클린업
    };
  }, [activeCategory]);

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Router>
      <div className={styles.container}>
        {/* 공지사항 제목 */}
        <motion.div
          className={styles.title}
          initial="hidden"
          animate="visible"
          variants={titleVariants}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1>공지사항</h1>
        </motion.div>

        {/* 네비게이션 바 */}
        <div className={styles.navbarline}>
          <div className={styles.navbar}>
            {categories.map((category, index) => (
              <Link
                key={category.name}
                to={`/${category.name}`}
                className={`${styles.navbaritems} ${
                  activeCategory.name === category.name ? styles.active : ''
                }`}
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

          {/* 밑줄 애니메이션 */}
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

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Navigate to="/전체" />} />
          {categories.map((category) => (
            <Route
              key={category.name}
              path={`/${category.name}`}
              element={<CategoryContent categoryName={category.name} />}
            />
          ))}
        </Routes>
      </div>
    </Router>
  );
};

export default Notice;
