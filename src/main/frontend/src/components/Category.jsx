import styled from "styled-components";
import { motion } from "framer-motion";
import "../index.css";
import { WhiteBtn } from "./MyBtn";

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3개의 열 */
  gap: 16px; /* 버튼 간 간격 */
  padding: 20px; /* 그리드 여백 */
  justify-items: center; /* 아이템을 수평 가운데 정렬 */
  align-items: center; /* 아이템을 수직 가운데 정렬 */
`;

function Category() {
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

    return (
        <CategoryGrid>
            {categories.map((category, index) => (
                <WhiteBtn 
                key={index} 
                text={category}
                fontSize="1rem"
                height="38px"
                width="100px"
                padding="0px"
                fontFamily="var(--kr-font)"

                 />
            ))}
        </CategoryGrid>
    );
}

export default Category;
