import React, { useState, useRef, useEffect } from "react";
import styles from "./Navbar.module.css";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  { name: "all", content: "All Products" },
  { name: "clothes", content: "Clothes" },
  { name: "pet", content: "Pet Supplies" },
  { name: "accessory", content: "Accessories" },
  { name: "cosmetics", content: "Cosmetics" },
  { name: "home deco", content: "Home Decoration" },
  { name: "travel", content: "Travel" },
  { name: "food", content: "Food & Beverages" },
  { name: "book", content: "Books" },
  { name: "etc", content: "Others" },
];

const Navbar = ({ setActiveCategory }) => {
  const [activeCategory, setLocalActiveCategory] = useState(categories[0]); // 초기값 설정
  const [underlineProps, setUnderlineProps] = useState({ width: 0, left: 0 });
  const navbarRef = useRef(null);
  const itemRefs = useRef([]);

  const handleCategoryClick = (category) => {
    setLocalActiveCategory(category); // 로컬 상태 업데이트
    setActiveCategory(category.name); // 부모 컴포넌트에 선택된 카테고리 전달
  };

  const updateUnderlinePosition = () => {
    const activeIndex = categories.findIndex(
      (category) => category.name === activeCategory.name
    );
    const activeItem = itemRefs.current[activeIndex];
    if (activeItem) {
      const { offsetLeft, offsetWidth } = activeItem;
      setUnderlineProps({ left: offsetLeft, width: offsetWidth });
    }
  };

  useEffect(() => {
    updateUnderlinePosition();
  }, [activeCategory]);

  useEffect(() => {
    const handleResize = () => {
      updateUnderlinePosition();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      {/* 네비게이션 바 */}
      <div className={styles.navbarline} ref={navbarRef}>
        <div className={styles.navbar}>
          {categories.map((category, index) => (
            <span
              key={category.name}
              className={`${styles.navbaritems} ${
                activeCategory.name === category.name ? styles.active : ""
              }`}
              onClick={() => handleCategoryClick(category)}
              ref={(el) => (itemRefs.current[index] = el)}
            >
              {category.name}
            </span>
          ))}
        </div>
        <AnimatePresence>
          {underlineProps.width > 0 && (
            <motion.div
              key={activeCategory.name}
              className={styles.underline}
              style={{ width: underlineProps.width, left: underlineProps.left }}
              layoutId="underline"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* 선택된 카테고리 내용 */}
      <div className={styles.content}>
        <h2>{activeCategory.content}</h2> {/* 선택된 카테고리 제목 */}
        <p>
          {activeCategory.name}
        </p>
      </div>
    </div>
  );
};

export default Navbar;
