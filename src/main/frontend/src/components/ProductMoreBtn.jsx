import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";
import '../index.css';

// 스타일드 컴포넌트 정의
const MoreText = styled(motion.p)`
  font-family: var(--eng-font);
  font-size: 75px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 1.92px;
  color: ${({ isHovered }) => (isHovered ? "#FFFFFF" : "#000")}; /* 상태에 따라 색상 변경 */
`;

const MoreDiv = styled(motion.div)`
  letter-spacing: 9.6px;
  padding: 24px 25px;
  border-radius: 2px;
  border: 2px solid #000;
  cursor: pointer;
  background: ${({ isHovered }) => (isHovered ? "var(--user-mainHome)" : "#FFF")}; /* 상태에 따라 배경색 변경 */

  /* Flexbox를 이용해 텍스트를 중앙 정렬 */
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.4s cubic-bezier(0.66, 0.19, 0.76, 1.13);
 
`;

function ProductMoreBtn() {
    const [isHovered, setIsHovered] = useState(false);
  return (
    <MoreDiv
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    isHovered={isHovered}
    transition={{duration:3}}
    >
      <MoreText isHovered={isHovered}
          whileTap={{scale : 1.02,  transition :{duration:0.1}}}>
        MORE +
      </MoreText>
    </MoreDiv>
  );
}

export default ProductMoreBtn;
 