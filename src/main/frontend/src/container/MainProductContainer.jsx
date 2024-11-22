import React from "react";
import styles from "./MainProductContainer.module.css";
import ProductCardImage from "../components/ProductCard1/ProductCardImage";
import ProductCard from "../components/ProductCard1/ProductCard";
import ProductMoreBtn from "../components/ProductMoreBtn";
import cardsData from './ProductData.json'
import '../index.css'; 

function MainProductContainer() {



  const { topSection, middleSection, bottomSection } = cardsData;

  return (
    <div className={styles.mainGrid}>
      {/* 상단 섹션 */}
      <div className={styles.topSection}>
        <div className={styles.largeItem}>
          <ProductCard {...topSection.largeTop} fontFamily='var(--eng-font)' />
          <div className={styles.largeBottom}>
            
            <div className={styles.largeBottomLeft}>
              <ProductCardImage {...topSection.largeBottomLeft} />
            </div>
            <div className={styles.largeBottomRight}>
              <ProductCardImage {...topSection.largeBottomRight} />
            </div>
          </div>

        </div>

        <div className={styles.rightGrid}>
          {topSection.rightGrid.map((item, index) => (
            <ProductCard key={index} {...item} />
          ))}
          <ProductMoreBtn />
        </div>
      </div>

      {/* 중단 섹션 */}
      <div className={styles.middleSection}>
  <div className={styles.fullWidthItem}>
    <ProductCardImage {...cardsData.middleSection} />
  </div>
</div>

      {/* 하단 섹션 */}
      <div className={styles.bottomSection}>
        {bottomSection.map((item, index) => (
          <ProductCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
}

export default MainProductContainer;
