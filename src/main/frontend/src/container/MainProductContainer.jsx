import React from "react";
import styles from "./MainProductContainer.module.css";
import ProductCardImage from "../components/ProductCard1/ProductCardImage";
import ProductCard from "../components/ProductCard1/ProductCard";
import ProductMoreBtn from "../components/ProductMoreBtn";
import cardsData from './ProductData.json';
import { useState } from "react";
import '../index.css';

function MainProductContainer() {
  // 데이터 섞기
  const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

  // 초기 데이터 상태 설정
  const [shuffledProducts, setShuffledProducts] = useState(shuffleArray(cardsData.products));

// 데이터 다시 섞기 함수
const shuffleProductsHandler = () => {
  setShuffledProducts(shuffleArray(cardsData.products));
};

  // 섹션별로 나누기
  const topSection = shuffledProducts.slice(0, 5); // 상단 섹션 (5개)
  const middleSection = shuffledProducts[5]; // 중단 섹션 (1개)
  const bottomSection = shuffledProducts.slice(6,9); // 하단 섹션 (나머지)

  return (
    <div className={styles.mainGrid}>
      {/* 상단 섹션 */}
      <div className={styles.topSection}>
        <div className={styles.largeItem}>
          <ProductCard {...topSection[0]} />
          <div className={styles.largeBottom}>
            <div className={styles.largeBottomLeft}>
              <ProductCardImage {...topSection[1]} />
            </div>
            <div className={styles.largeBottomRight}>
              <ProductCardImage {...topSection[2]} />
            </div>
          </div>
        </div>
        <div className={styles.rightGrid}>
          {topSection.slice(3).map((item, index) => (
            <ProductCard key={index} {...item} />
          ))}
              <ProductMoreBtn onClick={shuffleProductsHandler} />
        </div>
      </div>

      {/* 중단 섹션 */}
      <div className={styles.middleSection}>
        {middleSection && (
          <div className={styles.fullWidthItem}>
            <ProductCardImage {...middleSection} />
          </div>
        )}
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
