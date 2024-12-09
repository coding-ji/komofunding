import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PopularProducts from "../../components/PopularProducts/PopularProducts";
import MainProductContainer from "../../container/MainProductCard/MainProductContainer";
import Navbar from "../../components/NavBar/Navbar";
import { fetchProjects, fetchProjectsByCategoryAndStatus } from "../../service/apiService";

function Product() {
  const location = useLocation(); // 현재 경로 정보를 가져옴
  const [subCategory, setSubCategory] = useState("clothes"); // 세부 카테고리;
  const [fundingStatus, setFundingStatus] = useState("all"); 

  const [products, setProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]); // 인기 상품 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const today = new Date().toISOString().split("T")[0];

  // 경로에 따라 카테고리 및 상태 설정
  useEffect(() => {
    const pathname = location.pathname;
    if (pathname.includes("home")) {
      setFundingStatus("ONGOING");
    } else if (pathname.includes("upcoming")) {
      setFundingStatus("UPCOMING");
    } else if (pathname.includes("ongoing")) {
      setFundingStatus("ONGOING");
    } else {
      setFundingStatus("ONGOING");
    }
  }, [location]);

  // 프로젝트 데이터 불러오기
  useEffect(() => {
    const fetchData = async() => {
      try{
        let response; 
        if(fundingStatus == "ONGOING" || fundingStatus == "UPCOMING"){
          // 'onging'과 'upcoming'일 경우에는 fetchProjectsByCategoryAndStatus로
          response = await fetchProjectsByCategoryAndStatus(subCategory, fundingStatus);
        } else{
          response = await fetchProjects();
        }
        const projectDatas = response.data;

        // 인기 상품 로직
        const topProducts = projectDatas
          .filter((item) => item.totalAmount > 0)
          .sort((a, b) => b.progressRate - a.progressRate)
          .slice(0, 20);

        setPopularProducts(topProducts);
        setProducts(projectDatas); // 모든 프로젝트 데이터를 저장

      }catch(error){
        console.error("데이터 로드 실패 :" + error);
        setError(err.message || "데이터 로드 실패");
      }finally{
        setLoading(false);
      }
    };

    fetchData();
  },[subCategory, fundingStatus])


  // 필터링된 데이터 (fundingStatus가 "all"일 경우)
  const filteredProducts = useMemo(() => {
    if (fundingStatus === "all" && products.length > 0) {
      return products.filter(
        (item) =>
          item.projectCategory.toLowerCase() === subCategory.toLowerCase()
      );
    }
    return products;
  }, [products, subCategory, fundingStatus]);



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
