import { useState, useEffect } from "react";
import styled from "styled-components";
import { ClickBtn } from "./MyBtn";

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3개의 열 */
  gap: 16px; /* 버튼 간 간격 */
  padding: 20px; /* 그리드 여백 */
  justify-items: center; /* 아이템을 수평 가운데 정렬 */
  align-items: center; /* 아이템을 수직 가운데 정렬 */
`;

// UI 카테고리 이름과 백엔드 enum 값 매핑 배열
const categories = [
  { label: "의류", value: "CLOTHES" },
  { label: "펫", value: "PET" },
  { label: "악세사리", value: "ACCESSORY" },
  { label: "화장품", value: "COSMETICS" },
  { label: "홈 데코", value: "HOMEDECO" },
  { label: "여행", value: "TRAVEL" },
  { label: "음식", value: "FOOD" },
  { label: "책(미디어)", value: "BOOK" },
  { label: "기타", value: "ETC" },
];

function Category({ categoryState, onCategoryChange }) {
  const handleCategoryClick = (category) => {
    const newValue = categoryState === category.value? null : category.value;
    onCategoryChange(newValue);
  };

  return (
    <CategoryGrid>
      {categories.map((category, index) => (
        <div key={index} >
          <ClickBtn
            text={category.label}
            fontSize="1rem"
            height="38px"
            width="100px"
            padding="0px"
            fontFamily="var(--kr-font)"
            clicked={categoryState === category.value} // 현재 선택된 상태 비교
            handleClick={() => handleCategoryClick(category)} // 클릭 이벤트
          />
        </div>
      ))}
    </CategoryGrid>
  );
}

export default Category;
