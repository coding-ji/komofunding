import styled from "styled-components";
import { motion } from "framer-motion";
import "../index.css";
import MyContainer from "./MyContainer";

// 그리드 레이아웃을 위한 스타일링
const StyledContainers = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 30px; /* 요소 간 간격 */
  margin: 0 auto; /* 컨테이너 가운데 정렬 */

  @media (max-width: 920px) {
    grid-template-columns: repeat(2, auto); /* 열 개수 자동 조정 */
  }

  @media (max-width: 700px) {
    grid-template-columns: repeat(1, auto); /* 1열 유지 */
    padding: 0 10px; /* 여백 최소화 */
  }
`;

// 그리드의 부모 컨테이너 애니메이션 설정
const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      delayChildren: 0.3, // 자식 요소가 등장하기 전 대기 시간
      staggerChildren: 0.2, // 자식 요소들 간의 등장 간격
    },
  },
};

// 자식 요소에 대한 애니메이션 설정
const itemVariants = {
  initial: { opacity: 0, y: -100 }, // 시작 시 opacity 0, 아래에서 올라옴
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

function MyContainers({ text, products, onDelete, onEdit }) {
    // 클릭 이벤트 처리
    const handleButtonClick = (product) => {
      if (onDelete) {
        onDelete(product); // 삭제 핸들러 실행
      } else if (onEdit) {
        onEdit(product.projectNum); // 수정 핸들러 실행
      }
    };

    
  return (
    <StyledContainers
      variants={containerVariants} // 부모 요소에 애니메이션 variants 추가
      initial="initial"
      animate="animate"
    >
      {Array.isArray(products) &&
        products.map((product, index) => (
          <motion.div key={index} variants={itemVariants}>
            <MyContainer
              text={text}
              product={product}
              onClick={() => handleButtonClick(product)}
            />
          </motion.div>
        ))}
    </StyledContainers>
  );
}

export default MyContainers;
