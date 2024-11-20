import React, { useState, useRef, useEffect } from 'react';
import styles from './Navbar.module.css';
import { motion, AnimatePresence } from 'framer-motion';


const categories = [
  { name: 'clothes', content: '여기에 clothes 페이지' },
  { name: 'pet', content: 'Pet 페이지' },
  { name: 'accessory', content: 'Accessory 페이지' },
  { name: 'cosmetics', content: 'Cosmetics 페이지' },
  { name: 'home deco', content: 'Home Deco 페이지.' },
  { name: 'travel', content: 'Travel 페이지' },
  { name: 'food', content: 'Food 페이지' },
  { name: 'book', content: 'Book 페이지' },
  { name: 'etc', content: 'Etc 페이지' },
];

const Navbar = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [underlineProps, setUnderlineProps] = useState({ width: 0, left: 0 });
  const navbarRef = useRef(null);
  const itemRefs = useRef([]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  useEffect(() => {
    const activeIndex = categories.findIndex(
      (category) => category.name === activeCategory.name
    );
    const activeItem = itemRefs.current[activeIndex];
    if (activeItem) {
      const { offsetLeft, offsetWidth } = activeItem;
      setUnderlineProps({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeCategory]);

  return (
    <div>
      <div className={styles.navbarline} ref={navbarRef}>
        <div className={styles.navbar}>
          {categories.map((category, index) => (
            <span
              key={category.name}
              className={`${styles.navbaritems} ${
                activeCategory.name === category.name ? styles.active : ''
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
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
        </AnimatePresence>
      </div>

      <div className={styles.content}>
        <h2>{activeCategory.name}</h2>
        <p>{activeCategory.content}</p>
      </div>
    </div>
  );
};

export default Navbar;
