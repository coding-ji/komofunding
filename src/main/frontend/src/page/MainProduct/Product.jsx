import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import PopularProducts from "../../components/PopularProducts/PopularProducts";
import MainProductContainer from "../../container/MainProductCard/MainProductContainer";
import Navbar from "../../components/NavBar/Navbar";

function Product() {
  const location = useLocation(); // 현재 경로 정보를 가져옴
  const [mainCategory, setMainCategory] = useState("all"); // 메인 카테고리
  const [subCategory, setSubCategory] = useState("all"); // 세부 카테고리;
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

 // **메인 카테고리 설정 (경로 기반)**
 useEffect(() => {
  const pathname = location.pathname;
  if (pathname.includes("upcoming")) {
    setMainCategory("upcoming");
  } else if (pathname.includes("active")) {
    setMainCategory("active");
  } else {
    setMainCategory("all");
  }
  setSubCategory("all"); // 경로 변경 시 세부 카테고리 초기화
}, [location]);

 // **필터링 로직 수정**
 const filteredProducts = useMemo(() => {
  let filtered = [...products];

  // 메인 카테고리 필터링
  if (mainCategory === "upcoming") {
    filtered = filtered.filter(
      (item) => new Date(item.startDate) > new Date(today)
    );
  } else if (mainCategory === "active") {
    filtered = filtered.filter(
      (item) =>
        new Date(item.startDate) <= new Date(today) &&
        new Date(item.endDate) >= new Date(today)
    );
  }

  // **세부 카테고리 필터링**
  if (subCategory !== "all") {
    filtered = filtered.filter(
      (item) =>
        item.projectCategory.toLowerCase() === subCategory.toLowerCase()
    );
  }

  return filtered;
}, [mainCategory, subCategory, products, today]);

  return (
    <div>
      {/* 인기 상품은 항상 동일 */}
      <PopularProducts products={popularProducts} />
      {/* 카테고리 변경을 Navbar로 전달 */}
      <Navbar 
         setSubCategory={setSubCategory} // 세부 카테고리 업데이트
         activeCategory={subCategory} // 현재 세부 카테고리 전달
      
       />
      {/* 필터링된 상품 */}
      <MainProductContainer products={filteredProducts} />
    </div>
  );
}

export default Product;
