import styled from "styled-components";
import { motion } from "framer-motion";
import React, { useState } from "react";
import '../../../index.css';

// 스타일드 컴포넌트 정의
const SelectDiv = styled(motion.div)`
  height: 150px;
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  background-color: ${({ color }) => (color === "gray" ? "#545454" : "#fff")};
  transition: background-color 0.4s cubic-bezier(0.66, 0.19, 0.76, 1.13);
  width: 100%;
  padding: 10px; /* SelectDiv 내부 여백 */
  box-sizing: border-box; /* 패딩 포함 크기 계산 */
`;

const InnerDiv = styled(motion.div)`
  width: 100%;
  max-width: 400px; /* 최대 너비 */
  height: 100%;
  max-height: 130px; /* 최대 높이 */
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  border: 1px solid ${({ color }) => (color === "gray" ? "#fff" : "#216418")};
  box-sizing: border-box;
  margin: 0; /* SelectDiv 안에서 간격 일정 유지 */
`;

const ProjectTitle = styled.p`
  font-family: var(--eng-font);
  font-size: 50px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.1rem;
  color: ${({ color }) => (color === "gray" ? "#fff" : "#216418")};
  text-align: center;
`;
function TopSectionBtnCard({text,color,onClick}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <SelectDiv
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      isHovered={isHovered}
      color={color}
      onClick={onClick} >
        <InnerDiv color={color}>
      <ProjectTitle isHovered={isHovered} color={color}>{text}</ProjectTitle>
      </InnerDiv>
    </SelectDiv>
  );
}

export default TopSectionBtnCard;
