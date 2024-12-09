import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCardImage from "../ProductCard1/ProductCardImage";
import ProductTitle from "../ProductCard1/ProductTitle";
import styled from "styled-components";
import "./PopularProducts.css";

const Wrapper = styled.div`
  display: inline-block;
  overflow: hidden; /* 텍스트가 컨테이너 밖으로 넘치지 않도록 설정 */
`;

function PopularProducts({ products }) {
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 슬라이드 인덱스
  const [popularProducts, setPopularProducts] = useState([]);

  // 데이터 정렬 후 상위 5개 추출
  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      const sortedProducts = [...products].sort(
        (a, b) => b.progressRate - a.progressRate
      ); // progressRate로 내림차순 정렬
      setPopularProducts(sortedProducts.slice(0, 5)); // 상위 5개 저장
    }
  }, [products]);

  // 슬라이드 자동 이동
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % popularProducts.length);
    }, 5000); // 5초 간격으로 슬라이드 전환
    return () => clearInterval(interval);
  }, [popularProducts]);

  if (popularProducts.length === 0) {
    return <div>No products available</div>; // 데이터가 없을 경우
  }

  // 타이틀 애니메이션 설정
  const titleAnimation = {
    initial: { y: "100%" },
    animate: { y: "0%" },
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  };

  // 이미지 애니메이션 설정
  const imageAnimation = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1 },
  };

  return (
    <div className="popular-products-container">
      <Wrapper>
        <ProductTitle
          title="This Month's Popular Products"
          fontFamily="var(--eng-bold)"
          size="3rem"
          textAlign="center"
          animation={titleAnimation} // 애니메이션 프롭 전달
        />
      </Wrapper>

      {/* AnimatePresence로 슬라이드 감싸기 */}
      <div
        style={{ position: "relative", height: "300px", overflow: "hidden" }}
      >
        <AnimatePresence>
          {popularProducts[currentIndex] && (
            <motion.div
              key={popularProducts[currentIndex].projectNum}
              className="slide"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
              }}
            >
              <ProductCardImage
                data={popularProducts[currentIndex]}
                className="product-image"
                animation={imageAnimation}
              />
              <div className="product-description">
                {popularProducts[currentIndex].title}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default PopularProducts;
