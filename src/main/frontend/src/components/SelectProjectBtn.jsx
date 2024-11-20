import styled from "styled-components";
import { motion } from "framer-motion";
import React, { useState } from "react";
import '../index.css';

// 스타일드 컴포넌트 정의
const ProjectTitle = styled.p`
  font-family: var(--eng-font);
  font-size: 80px;
  font-style: normal;
  font-weight: bold;
  line-height: 80px;
  letter-spacing: 9.6px;
  color: ${({ isHovered }) => (isHovered ? "rgba(255, 255, 255, 0.95)" : "#323232")};
  grid-area: title;
`;

const ProjectAdd = styled.p`
  font-family: var(--eng-font);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 40px;
  letter-spacing: 1.92px;
  color: ${({ isHovered }) => (isHovered ? "rgba(255, 255, 255, 0.95)" : "#323232")};
  grid-area: subtitle;
`;

const BtnBox = styled(motion.div)`
  border-radius: 2px;
  padding: 10px 34px;
  background: ${({ isHovered }) => (isHovered ? "rgba(255, 255, 255, 0.95)" : "#323232")};
  grid-area: button;
  cursor: pointer;
`;

const BtnText = styled.p`
  font-family: var(--eng-font);
  font-size: 40px;
  font-style: normal;
  font-weight: ${({ isHovered }) => (isHovered ? "bold" : "700")};
  letter-spacing: 4.8px;
  color: ${({ isHovered }) => (isHovered ? "var(--user-mainHome)" : "#FFF")};
  text-decoration-line: underline;
  text-align: center;
  grid-area: button;
  line-height: 60px;
`;

const SelectDiv = styled(motion.div)`
  padding: 30px 27px;
  display: grid;
  grid-template:
    "title title title ..." 150px
    "subtitle ... ... ..." 30px
    "... .... button ..."; 65px / 110px 226px 1fr 226px;
  background-color: ${({ isHovered }) => (isHovered ? "var(--user-mainHome)" : "#FFF")};
  transition: background-color 0.4s cubic-bezier(0.66, 0.19, 0.76, 1.13);
`;

function SelectProjectBtn() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <SelectDiv
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      isHovered={isHovered}

    >
      <ProjectTitle isHovered={isHovered}>PROJECT SELECT</ProjectTitle>
      <ProjectAdd isHovered={isHovered}>프로젝트 등록</ProjectAdd>
      <BtnBox isHovered={isHovered}
            whileTap={{scale : 1.02,  transition :{duration:0.1}}}
        >
        <BtnText isHovered={isHovered}>CLICK</BtnText>
      </BtnBox>
    </SelectDiv>
  );
}

export default SelectProjectBtn;
