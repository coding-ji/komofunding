import React, { useState, useEffect } from "react";
import "./PopularProducts.css";
import productsData from "../../container/MainProductCard/ProductData.json"; // JSON 데이터 가져오기
import ProductTitle from "../ProductCard1/ProductTitle";
import '../../index.css'
import ProductCardImage from '../ProductCard1/ProductCardImage'
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

function PopularProducts() {
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 슬라이드 인덱스
  const popularProducts = productsData.products.slice(0, 5); // 상위 5개 상품 추출

  // 슬라이드 자동 이동
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % popularProducts.length);
    }, 5000); // 3초 간격으로 슬라이드 전환
    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 클리어
  }, [popularProducts.length]);

  const titleAnimation = {
    // initial: { opacity: 0, y: -30 }, 
    // animate: { opacity: 1, y: 0 }, 
    // transition: { duration: 1 }, 

    initial: { y: "100%" },// 텍스트가 아래쪽에 숨겨진 상태로 시작
    animate: { y: "0%" }, // 텍스트가 위로 올라오면서 완전히 보임
    transition: {
      duration: 1, // 애니메이션 지속 시간
      ease: "easeOut", // 부드러운 종료 효과
    }
  }


  const imageAnimation = {
    initial: { opacity: 0, y: 30 }, // 아래에서 시작
    animate: { opacity: 1, y: 0 }, // 위로 올라오며 나타남
    transition: { duration: 1 }, // 애니메이션 지속 시간
  };
  const Wrapper = styled.div`
  display: inline-block;
  overflow: hidden; /* 텍스트가 컨테이너 밖으로 넘치지 않도록 설정 */
`;



  return (
    <div className="popular-products-container">
      <Wrapper>
        <ProductTitle title="This Month's Popular Products"
          fontFamily='var(--eng-bold)'
          size="3rem"
          textAlign="center"
          animation={titleAnimation} // 애니메이션 프롭 전달
        />
      </Wrapper>

      {/* AnimatePresence로 슬라이드 감싸기 */}
      <div style={{ position: "relative", height: "300px", overflow: "hidden" }}>
        <AnimatePresence>
          <motion.div
            key={currentIndex} // 인덱스를 key로 설정
            className="slide"
            initial={{ x: "100%", opacity: 0 }} // 화면 오른쪽에서 시작
            animate={{ x: "0%", opacity: 1 }} // 화면 중앙으로 이동
            exit={{ x: "-100%", opacity: 0 }} // 화면 왼쪽으로 나감
            transition={{ duration: 1, ease: "easeInOut" }} // 부드러운 애니메이션
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
            }}
          >
            <ProductCardImage
              src={popularProducts[currentIndex].src}
              alt={`Product ${currentIndex + 1}`}
              className="product-image"
              animation={imageAnimation}

            />
            <div className="product-description">
              {popularProducts[currentIndex].description}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default PopularProducts;


