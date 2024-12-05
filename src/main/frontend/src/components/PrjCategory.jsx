import styled from "styled-components";
import '../index.css'; 
import { TapBtn } from "./MyBtn";
import React, { useState } from "react";

const TapBtns = styled.div`
  display: flex;
  gap: 10px; /* 버튼 간격 조정 */
`;

function PrjCategory() {
  const [activeIndex, setActiveIndex] = useState(0); // 현재 활성화된 버튼 인덱스 관리

  const handleTapClick = (index) => {
    setActiveIndex(index); // 클릭된 버튼을 활성화
  };

  return (
    <TapBtns>
      {["소개", "일정", "가격", "환불/정책", "문의"].map((text, index) => (
        <TapBtn
        minWidth="95px"
         fontFamily="var(--kr-font)"
         fontSize="1.0625rem"
         padding="0.5rem"
          key={index}
          text={text}
          isActive={activeIndex === index} // 현재 버튼이 활성화된 상태인지 확인
          onTap={() => handleTapClick(index)} // 클릭 이벤트 핸들러 전달
        />
      ))}
    </TapBtns>
  );
}

export default PrjCategory;
