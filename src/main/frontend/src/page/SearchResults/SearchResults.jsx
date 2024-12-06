import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation,useNavigate } from "react-router-dom";


const SearchResults = () => {
  const location = useLocation(); // URL에서 쿼리 파라미터를 가져옴
  const [products, setProducts] = useState([]); // 전체 상품 데이터
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 상태
  const query = new URLSearchParams(location.search).get("query"); // 쿼리 추출
  const navigate = useNavigate(); // 페이지 이동을 위한 훅
 
  useEffect(() => {
    // 데이터 가져오기
    axios
      .get("/data/projectData.json") // 데이터를 가져오는 API 경로
      .then((response) => {
        const data = response.data;
        setProducts(data); // 전체 상품 데이터를 상태에 저장
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, []);


  useEffect(() => {
    if (query) {
      // 검색어에 따라 필터링
      const filteredResults = products.filter(
        (item) =>
          item.projectTitle.toLowerCase().includes(query.toLowerCase()) ||
          item.shortDescription.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredResults); // 검색 결과 업데이트
    }
  }, [query, products]);

  const handleItemClick = (projectNum) => {
    // 클릭한 항목의 projectNum을 기반으로 페이지 이동
    navigate(`/project/${projectNum}`);
  };


  
  return (
    <div style={{ padding: "20px" }}>
      <h1>Search Results</h1>
      <p>
        Showing results for: <strong>{query}</strong>
      </p>

      <div>
        {searchResults.length > 0 ? (
          searchResults.map((result) => (
            <div
              key={result.projectNum}
              onClick={() => handleItemClick(result.projectNum)} // 클릭 이벤트 추가
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
              }}
            >
              <h3>{result.projectTitle}</h3>
              <p>{result.shortDescription}</p>
            </div>
          ))
        ) : (
          <p>No results found for "{query}"</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
