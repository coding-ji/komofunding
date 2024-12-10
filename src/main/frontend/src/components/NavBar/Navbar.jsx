import React, { useState, useRef, useEffect } from "react";
import styles from "./Navbar.module.css";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  { name: "all", content: "All Products" },
  { name: "clothes", content: "Clothes" },
  { name: "pet", content: "Pet Supplies" },
  { name: "accessory", content: "Accessories" },
  { name: "cosmetics", content: "Cosmetics" },
  { name: "homedeco", content: "Home Decoration" },
  { name: "travel", content: "Travel" },
  { name: "food", content: "Food & Beverages" },
  { name: "book", content: "Books" },
  { name: "etc", content: "Others" },
];

const Navbar = ({  setSubCategory, activeCategory }) => {
  
  const navbarRef = useRef(null);
  const itemRefs = useRef([]);
  const [underlineProps, setUnderlineProps] = useState({ width: 0, left: 0 });


  // **카테고리 클릭 핸들러 수정**
  const handleCategoryClick = (category) => {
    setSubCategory(category.name); // 세부 카테고리 업데이트
  };

  
  const updateUnderlinePosition = () => {
    const activeIndex = categories.findIndex(
      (category) => category.name === activeCategory
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
              style={{ width: underlineProps.width, left: underlineProps.left}}
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
