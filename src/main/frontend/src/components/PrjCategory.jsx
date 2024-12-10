import styled from "styled-components";
import "../index.css";
import { TapBtn } from "./MyBtn";
import React, { useState } from "react";

const TapBtns = styled.div`
  display: flex;
  gap: 10px; /* 버튼 간격 조정 */
  width: 100%;
  height : 40px;
`;

function PrjCategory({ sectionRefs }) {
  const [activeIndex, setActiveIndex] = useState(0); 

  const handleTapClick = (index) => {
    setActiveIndex(index); // 클릭된 버튼을 활성화

    const targetRef = sectionRefs[index];
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <TapBtns>
      {["소개", "일정", "상품 정보", "환불/정책", "상품 문의"].map((text, index) => (
        <TapBtn
        minWidth="95px"
        fontFamily="var(--kr-font)"
        fontSize= "1em"
        padding="0.5rem"
          key={index}
          text={text}
          isActive={activeIndex === index} // 활성화 상태 확인
          onTap={() => handleTapClick(index)} // 클릭 이벤트 핸들러 전달
        />
      ))}
    </TapBtns>
  );
}

export default PrjCategory;
