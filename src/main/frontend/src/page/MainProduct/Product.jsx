import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PopularProducts from "../../components/PopularProducts/PopularProducts";
import MainProductContainer from "../../container/MainProductCard/MainProductContainer";
import Navbar from "../../components/NavBar/Navbar";
import { useStore as ProjectStore } from "../../stores/ProjectStore/useStore";
import { useState, useMemo } from "react";

function Product() {
  const location = useLocation(); // 현재 경로 정보를 가져옴
  const pathname = location.pathname; // 경로에 따라 카테고리 및 상태 설정

  const { state, actions } = ProjectStore(); // useStore 훅을 통해 상태와 액션 가져오기

  const [subCategory, setSubCategory] = useState("all"); // 세부 카테고리;
  const [fundingStatus, setFundingStatus] = useState(pathname.split("/")[2]);
  const [popularProducts, setPopularProducts] = useState([]); // 인기 상품 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    if (pathname.includes("upcoming")) {
      setFundingStatus("UPCOMING");
      setSubCategory("all");
    } else if (pathname.includes("ongoing")) {
      setFundingStatus("ONGOING");
      setSubCategory("all");
    } else if (pathname.includes("home")) {
      setFundingStatus("HOME");
      setSubCategory("all");
    }
  }, [pathname]);

  // 프로젝트 데이터 불러오기
  const fetchData = async () => {
    try {
      // 프로젝트 데이터 불러오기
      await actions.readProjectsByCategoryAndStatus(subCategory, fundingStatus);

      // 인기 상품 로직: progressRate를 기준으로 인기 상품 순으로 정렬
      const topProducts = state.project
        .filter((item) => item.totalAmount > 0)
        .sort((a, b) => b.progressRate - a.progressRate)
        .slice(0, 5);

      // 인기 상품 상태 업데이트
      setPopularProducts(topProducts);
    } catch (error) {
      setError(error.message || "데이터 로드 실패");
    } finally {
      setLoading(false);
    }
  };

  // 처음 로딩 시 데이터 불러오기
  useEffect(() => {
    fetchData();
    console.log(state.project)
  }, []); // 빈 배열로 처음 한번만 실행

  // 카테고리 변경 시 데이터 불러오기
  useEffect(() => {
    if (subCategory !== "all" || fundingStatus !== "all") {
      fetchData();
    }
  }, [subCategory, fundingStatus]); // 카테고리나 상태가 바뀔 때마다 실행

  // // 필터링된 데이터 (fundingStatus가 "all"일 경우)
  const filteredProducts = useMemo(() => {
    if (fundingStatus === "all" && state.length > 0) {
      return state.filter(
        (item) =>
          item.projectCategory.toLowerCase() === subCategory.toLowerCase() ||
          subCategory === "all"
      );
    }
    return state;
  }, [state, subCategory, fundingStatus]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
