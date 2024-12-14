import React, { useState, useEffect } from "react";
import styles from "./MainProductContainer.module.css";
import ProductCardImage from "../../components/ProductCard1/ProductCardImage";
import ProductCard from "../../components/ProductCard1/ProductCard";
import ProductMoreBtn from "../../components/ProductMoreBtn";

function MainProductContainer({ products }) {
  const [shuffledProducts, setShuffledProducts] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
 
  // 데이터를 랜덤으로 섞어서 표시
  useEffect(() => {
    if (products && products.length > 0) {
      setShuffledProducts(shuffleArray(products));
      setLoading(false); // 데이터 로딩이 완료되면 false로 설정
    }
  }, [products]);

  const shuffleArray = (array) =>
    array ? [...array].sort(() => Math.random() - 0.5) : [];

  const shuffleProjectsHandler = () => {
    setShuffledProducts(shuffleArray(products));
  };

  // 섹션별로 나누기
  const topSection = shuffledProducts.slice(0, 5); // 상단 섹션
  const middleSection = shuffledProducts[5]; // 중단 섹션
  const bottomSection = shuffledProducts.slice(6, 9); // 하단 섹션

  if (loading) {
    return <div>Loading...</div>; // 데이터 로딩 중 표시
  }

  return (
    <div className={styles.mainGrid}>
      {/* 상단 섹션 */}
      <div className={styles.topSection}>
        <div className={styles.largeItem}>
          {topSection[0] && <ProductCard data={topSection[0]} />}
          <div className={styles.largeBottom}>
            <div className={styles.largeBottomLeft}>
              {topSection[1] && <ProductCardImage data={topSection[1]} />}
            </div>
            <div className={styles.largeBottomRight}>
              {topSection[2] && <ProductCardImage data={topSection[2]} />}
            </div>
          </div>
        </div>
        <div className={styles.rightGrid}>
          {topSection.slice(3).map((item, index) => (
            <ProductCard key={index} data={item} />
          ))}
          <ProductMoreBtn onClick={shuffleProjectsHandler} />
        </div>
      </div>

      {/* 중단 섹션 */}
      <div className={styles.middleSection}>
        {middleSection && <ProductCardImage data={middleSection} />}
      </div>

      {/* 하단 섹션 */}
      <div className={styles.bottomSection}>
        {bottomSection.map((item, index) => (
          <ProductCard key={index} data={item} />
        ))}
      </div>
    </div>
  );
}

export default MainProductContainer;
