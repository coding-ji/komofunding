import styled from "styled-components";
import { motion } from "framer-motion";
import React, { useState } from "react";
import '../index.css';

// 스타일드 컴포넌트 정의
const ProjectTitle = styled.p`
  font-family: var(--eng-font);
  // font-size: 80px;
  font-size: clamp(50px, 6vw, 70px); 
  /* 최소 24px, 기본 10vw, 최대 70px */
  font-style: normal;
  font-weight: bold;
  line-height: clamp(40px, 6vw, 80px); 

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
  padding: clamp(0.2rem, 1vw, 0.5rem) clamp(0.8rem, 2vw, 2rem);
  // padding : 0.8rem 2rem;

  background: ${({ isHovered }) => (isHovered ? "rgba(255, 255, 255, 0.95)" : "#323232")};
  grid-area: button;
  cursor: pointer;
`;

const BtnText = styled.p`
  font-family: var(--eng-font);
  font-size: clamp(20px, 4vw, 40px); 
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
    "title title title ..." clamp(80px, 11vw, 290px)
    "subtitle subtitle subtitle ..." 30px
    "... .... button ..."; 65px / 1fr 2fr 1fr 2fr;
    // 110px 226px 1fr 226px;
  background-color: ${({ isHovered }) => (isHovered ? "var(--user-mainHome)" : "#FFF")};
  transition: background-color 0.4s cubic-bezier(0.66, 0.19, 0.76, 1.13);
`;

function SelectProjectBtn({title,subtitle,onClick}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <SelectDiv
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      isHovered={isHovered}

    >
      <ProjectTitle isHovered={isHovered}>{title}</ProjectTitle>
    <ProjectAdd isHovered={isHovered}>{subtitle}</ProjectAdd>
      <BtnBox isHovered={isHovered} onClick={onClick}
            whileTap={{scale : 1.02,  transition :{duration:0.1}}}
        >
        <BtnText isHovered={isHovered}>CLICK</BtnText>
      </BtnBox>
    </SelectDiv>
  );
}

export default SelectProjectBtn;
