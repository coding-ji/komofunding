import React, { useState } from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const categories = [
    { name: 'clothes', content: '여기에 clothes 페이지' },
    { name: 'pet', content: ' Pet 페이지' },
    { name: 'accessory', content: ' Accessory페이지' },
    { name: 'cosmetics', content: ' Cosmetics 페이지' },
    { name: 'home deco', content: ' Home Deco 페이지.' },
    { name: 'travel', content: ' Travel  페이지' },
    { name: 'food', content: ' Food  페이지' },
    { name: 'book', content: ' Book  페이지' },
    { name: 'etc', content: 'Etc  페이지' },
  ];

  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  return (
    <div>

      <div className={styles.navbarline}>
        <div className={styles.navbar}>
          {categories.map((category) => (
            <span
              key={category.name}
              className={`${styles.navbaritems} ${
                activeCategory.name === category.name ? styles.active : ''
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category.name}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.content}>
        <h2>{activeCategory.name}</h2>
        <p>{activeCategory.content}</p>
      </div>
    </div>
  );
};

export default Navbar;
