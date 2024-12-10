import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PopularProducts from "../../components/PopularProducts/PopularProducts";
import MainProductContainer from "../../container/MainProductCard/MainProductContainer";
import Navbar from "../../components/NavBar/Navbar";
import { useStore as ProjectStore } from "../../stores/ProjectStore/useStore";

function Product() {
  const location = useLocation(); // 현재 경로 정보를 가져옴
  const pathname = location.pathname; // 경로에 따라 카테고리 및 상태 설정

  const { state, actions } = ProjectStore(); // useStore 훅을 통해 상태와 액션 가져오기

  const [subCategory, setSubCategory] = useState("all"); // 세부 카테고리
  const [fundingStatus, setFundingStatus] = useState(null); // 상태 초기값 빈 문자열로 설정
  const [popularProducts, setPopularProducts] = useState(null); // 인기 상품 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  // pathname에 따라 상태 업데이트
  useEffect(() => {
if (pathname.includes("/upcoming")) {
      setFundingStatus("UPCOMING");
      setSubCategory("all");
    } else if (pathname.includes("/active")) {
      setFundingStatus("ONGOING");
      setSubCategory("all");
    } else{
      setFundingStatus("HOME");
      setSubCategory("all");
    }

    actions.resetState();
  }, [pathname]); // pathname이 변경될 때마다 실행

  // fundingStatus 또는 subCategory가 변경될 때마다 데이터 fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!fundingStatus || !subCategory) return; // 유효하지 않으면 중단
        setLoading(true);

        // API 호출
        await actions.readProjectsByCategoryAndStatus(
          subCategory,
          fundingStatus
        );
      } catch (error) {
        setError(error.message || "데이터 로드 실패");
      } finally {
        setLoading(false);
      }
    };

    if (fundingStatus && subCategory) {
      fetchData(); // 상태가 설정되면 데이터 fetch
    }
  }, [fundingStatus, subCategory]);

  // state.project가 업데이트될 때마다 인기 상품 계산
  useEffect(() => {
    if (state.project && state.project.length > 0) {
      // 인기 상품 로직: progressRate를 기준으로 인기 상품 순으로 정렬
      const topProducts = state.project
        .filter((item) => item.totalAmount > 0) // 금액이 0보다 큰 상품만
        .sort((a, b) => b.progressRate - a.progressRate) // progressRate 내림차순 정렬
        .slice(0, 5); // 상위 5개만 선택
      setPopularProducts(topProducts); // 인기 상품 상태 업데이트
    } else {
      setPopularProducts([]); // 데이터가 없을 경우 빈 배열로 초기화
    }
  }, [state.project]); // state.project가 변경될 때마다 실행

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
      <MainProductContainer products={state.project} />
    </div>
  );
}

export default Product;
