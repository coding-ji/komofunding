import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import PopularProducts from "../../components/PopularProducts/PopularProducts";
import MainProductContainer from "../../container/MainProductCard/MainProductContainer";
import Navbar from "../../components/NavBar/Navbar";

function Product() {
  const location = useLocation(); // 현재 경로 정보를 가져옴
  const [activeCategory, setActiveCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]); // 인기 상품 상태
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    // 데이터 가져오기
    axios.get("/data/projectData.json").then((response) => {
      const data = response.data;

      // 전체 데이터 설정
      setProducts(data);

      // 인기 상품 설정 (달성률 상위 5개)
      const topProducts = [...data]
        .sort(
          (a, b) =>
            b.currentAmount / b.totalAmount - a.currentAmount / a.totalAmount
        )
        .slice(0, 5);
      setPopularProducts(topProducts); // 인기 상품 상태 업데이트
    });
  }, []);

  // 경로 상태에 따라 카테고리 설정
  useEffect(() => {
    const pathname = location.pathname;
    if (pathname.includes("upcoming")) {
      setActiveCategory("upcoming");
    } else if (pathname.includes("active")) {
      setActiveCategory("active");
    } else {
      setActiveCategory("all");
    }
  }, [location]);

  // 필터링된 상품 리스트
  const filteredProducts = useMemo(() => {
    if (activeCategory === "upcoming") {
      return products.filter((item) => new Date(item.startDate) > new Date(today));
    }
    if (activeCategory === "active") {
      return products.filter(
        (item) =>
          new Date(item.startDate) <= new Date(today) &&
          new Date(item.endDate) >= new Date(today)
      );
    }
    if (activeCategory === "all") {
      return products; // 전체 상품
    }
    // 카테고리별 상품
    return products.filter(
      (item) =>
        item.projectCategory.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [activeCategory, products, today]);

  return (
    <div>
      {/* 인기 상품은 항상 동일 */}
      <PopularProducts products={popularProducts} />
      {/* 카테고리 변경을 Navbar로 전달 */}
      <Navbar setActiveCategory={setActiveCategory} />
      {/* 필터링된 상품 */}
      <MainProductContainer products={filteredProducts} />
    </div>
  );
}

export default Product;
