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

function Category({ categoryState, onCategoryChange }) {
  const [selectedCategory, setSelectedCategory] = useState(categoryState || null); // 선택된 카테고리 상태 관리

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

  // selectedCategory가 변경될 때마다 log 출력 및 부모 컴포넌트로 값 전달
  useEffect(() => {
    if (selectedCategory) {
      // 선택된 카테고리와 비교하여 부모 컴포넌트로 값 전달
      const selectedCategoryObj = categories.find(
        (cat) => cat.label === selectedCategory
      );

      onCategoryChange(selectedCategoryObj.value);
    } else {
      onCategoryChange(null); // 선택 안된 상태일 때 부모에게 null 전달
    }
  }, [selectedCategory]); // selectedCategory 변경될 때마다 실행

  const handleCategoryClick = (category) => {
    // 클릭한 카테고리가 현재 선택된 카테고리와 같으면 초기화하고, 다르면 새로 선택
    if (selectedCategory === category.label) {
      setSelectedCategory(null); // 선택 해제
    } else {
      setSelectedCategory(category.label); // 새로운 카테고리 선택
    }
  };

  return (
    <CategoryGrid>
      {categories.map((category, index) => (
        <div key={index} onClick={() => handleCategoryClick(category)}>
          <ClickBtn
            text={category.label}
            fontSize="1rem"
            height="38px"
            width="100px"
            padding="0px"
            fontFamily="var(--kr-font)"
            style={{
              backgroundColor:
                category.label === selectedCategory ? "#f0f0f0" : "white",
              border:
                category.label === selectedCategory
                  ? "2px solid #ccc"
                  : "1px solid var(--darkblue-color)",
              color:
                category.label === selectedCategory
                  ? "#333"
                  : "var(--darkblue-color)",
            }}
          />
        </div>
      ))}
    </CategoryGrid>
  );
}

export default Category;