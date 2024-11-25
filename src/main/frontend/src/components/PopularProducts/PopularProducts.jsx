import React, { useState, useEffect } from "react";
import "./PopularProducts.css";
import productsData from "../../container/MainProductCard/ProductData.json"; // JSON 데이터 가져오기
import ProductTitle from "../ProductCard1/ProductTitle";
import '../../index.css'
import ProductCardImage from '../ProductCard1/ProductCardImage'

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

  return (
    <div className="popular-products-container">
        <ProductTitle title="This Month's Popular Products" fontFamily='var(--eng-bold)' size="2.5rem"/>
      <div className="slide">
        <ProductCardImage
          src={popularProducts[currentIndex].src}
          alt={`Product ${currentIndex + 1}`}
          className="product-image"
        />
        <div className="product-description">
          {popularProducts[currentIndex].description}
        </div>
      </div>
    </div>
  );
}

export default PopularProducts;
