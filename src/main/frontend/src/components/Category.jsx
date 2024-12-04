import { useState } from "react";
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

const SelectedCategoryBtn = styled(ClickBtn)`
  background-color: #f0f0f0;
  border: 2px solid #ccc;
  color: #333;
  &:hover {
    background-color: #e0e0e0;
  }
`;

function Category({ category, onCategoryChange }) {
  const [selectedCategory, setSelectedCategory] = useState(category || null); // 선택된 카테고리 상태 관리

  // 버튼 텍스트 배열
  const categories = [
    "의류",
    "펫",
    "악세사리",
    "화장품",
    "홈 데코",
    "여행",
    "음식",
    "책(미디어)",
    "기타",
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category); // 클릭된 카테고리 상태로 설정
    onCategoryChange(category); // 부모 컴포넌트로 상태 전달
    localStorage.setItem("selectedCategory", category); // localStorage에 저장
  };

  return (
    <CategoryGrid>
      {categories.map((category, index) => (
        <div key={index} onClick={() => handleCategoryClick(category)}>
          {category === selectedCategory ? (
            <SelectedCategoryBtn
              text={category}
              fontSize="1rem"
              height="38px"
              width="100px"
              padding="0px"
              fontFamily="var(--kr-font)"
            />
          ) : (
            <ClickBtn
              text={category}
              fontSize="1rem"
              height="38px"
              width="100px"
              padding="0px"
              fontFamily="var(--kr-font)"
            />
          )}
        </div>
      ))}
    </CategoryGrid>
  );
}

export default Category;
