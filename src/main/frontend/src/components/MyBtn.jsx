import styled from "styled-components";
import { motion } from "framer-motion";
import '../index.css';
import React, { useState } from "react";


const Button = styled(motion.button)`
  display: flex; /* 플렉스 박스 사용 */
  justify-content: center; /* 수평 중앙 정렬 */
    justify-self: ${(props) => props.justifySelf || "auto"}; /* justify-self 추가 */

  align-items: center; /* 수직 중앙 정렬 */
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "100%"};
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.textColor};
  text-align: center;
  border-radius: ${(props) => props.borderRadius || "2px"};
  padding: ${(props) => props.padding || "10px 112px" };
  font-weight: bold; 
  letter-spacing: 0.1rem;
  font-family: ${(props) => props.fontFamily || "var(--kr-font)"};
  margin: ${(props) =>props.margin ||" 4px 0"};
  font-size:  ${(props) => props.fontSize || "2rem"};
  border: 2px solid ${(props) => props.borderColor}; 
  min-width: ${(props) => props.minWidth || "auto"};  /* minWidth가 없으면 auto */


  /* 호버 시 전환될 스타일 */
  transition: all 0.13s ease; /* 부드러운 전환 효과 */
`;


const hoverEffects = {
  Btn : {
    backgroundColor: "white",  
    color: "var(--darkblue-color)", 
    borderColor: "var(--darkblue-color)",
  },

  Cancel : {
    backgroundColor: "var(--darkblue-color)",  
    color: "white", 
    borderColor: "var(--darkblue-color)",

  },

  White : {
    backgroundColor: "white",  
    color: "black", 
    borderColor: "black",
  },

  Black : {
    backgroundColor: "Black",  
    color: "white", 
    borderColor: "black",
  }

}
// 딜리드 사이즈 2rem
// 일반 확인, 마이페이지 수정 삭제 환불, 임시 저장 홈으로, 후원하기 등 일반 통합 버튼
export const Btn = ({text, width, height, onClick, fontSize, padding, fontFamily,margin}) => (
  <Button
    bgColor="var(--darkblue-color)"
    borderColor="var(--darkblue-color)"
    textColor= "#ffffff"
    whileHover={hoverEffects.Btn}
    onClick={onClick}
    width={width}
    height={height}
    fontSize={fontSize} /* 폰트 크기 프롭 전달 */
    padding={padding}
    fontFamily={fontFamily}
  >{text}
  </Button>
);

// 일반 취소, 링크 버튼
export const WhiteBtn = ({text,textAlign,width, height, onClick,fontSize,padding,fontFamily,margin}) => (
  <Button
    bgColor="white"
    borderColor="var(--darkblue-color)"
    textColor= "var(--darkblue-color)"
    whileHover={hoverEffects.Cancel}
    borderRadius = "2px"
    onClick={onClick}
    width={width}
    height={height}
    fontSize={fontSize} /* 폰트 크기 프롭 전달 */
    padding={padding}
    fontFamily={fontFamily}
    margin={margin}
  >{text}
  </Button>
  );

// 모달창 확인 버튼
export const CheckBtn = ({text, width, height, onClick,fontSize,padding,fontFamily}) => (
  <Button
    bgColor="var(--darkblue-color)"
    textColor= "#ffffff"
    whileHover={hoverEffects.Btn}
    borderRadius = "9px"
    onClick={onClick}
    width={width}
    height={height}
    fontSize={fontSize} /* 폰트 크기 프롭 전달 */
    padding={padding}
    fontFamily={fontFamily}
  >{text}
  </Button>
);

// 모달창 취소 버튼
export const CancelBtn = ({text, width, height, onClick,fontSize,padding,fontFamily}) => (
  <Button
    bgColor="white"
    borderColor="var(--darkblue-color)"
    textColor= "var(--darkblue-color)"
    whileHover={hoverEffects.Cancel}
    borderRadius = "9px"
    onClick={onClick}
    width={width}
    height={height}
    fontSize={fontSize} /* 폰트 크기 프롭 전달 */
    padding={padding}
    fontFamily={fontFamily}
  >{text}
  </Button>
);


// 상품 페이지 수정 / 문의하기 => 블랙
export const ProductBtn1 = ({text, width, height, onClick,fontSize,padding,fontFamily, justifySelf}) => (
  <Button
  bgColor="black"
  borderColor="black"
  textColor= "white"
  whileHover={hoverEffects.White}
  borderRadius = "2px"
  onClick={onClick}
  width={width}
  height={height}
  fontSize={fontSize} /* 폰트 크기 프롭 전달 */
  padding={padding}
  fontFamily={fontFamily}
  justifySelf={justifySelf}
  >
    {text}
  </Button>
);

// 상품 페이지 삭제 / 답변 달기 버튼 => 화이트
export const ProductBtn2 = ({text, width, height, onClick,fontSize,padding,fontFamily}) => (
  <Button
  bgColor="white"
  borderColor="black"
  textColor= "black"
  whileHover={hoverEffects.Black}
  borderRadius = "2px"
  onClick={onClick}
  width={width}
  height={height}
  fontSize={fontSize} /* 폰트 크기 프롭 전달 */
  padding={padding}
  fontFamily={fontFamily}
  >
    {text}
  </Button>
);

// 카테고리 클릭 <- 프로젝트 작성 페이지 사용
export const ClickBtn = ({
  text,
  textAlign,
  width,
  height,
  fontSize,
  padding,
  fontFamily,
  active,
}) => {
  const [clicked, setClicked] = useState(false); // 클릭 상태 관리

  const handleClick = () => {
    setClicked(!clicked); // 클릭 시 상태 토글
  };

  const currentStyles = clicked
    ? hoverEffects.Cancel // 클릭된 경우 스타일
    : {
        backgroundColor: "white",
        color: "var(--darkblue-color)",
        borderColor: "var(--darkblue-color)",
      }; // 기본 스타일

  return (
    <Button
      style={{
        backgroundColor: currentStyles.backgroundColor,
        color: currentStyles.color,
        borderColor: currentStyles.borderColor,
      }}
      borderRadius="2px"
      width={width}
      height={height}
      fontSize={fontSize} // 폰트 크기 프롭 전달
      padding={padding}
      fontFamily={fontFamily}
      onClick={handleClick}
    >
      {text}
    </Button>
  );
};

// 상품 페이지 탭 버튼
export const TapBtn = ({
  text,
  textAlign,
  width,
  height,
  fontSize,
  padding,
  fontFamily,
  isActive, // 활성화 상태를 나타내는 프롭
  onTap,
  minWidth

}) => {
  // const [tapped, setTapped] = useState(false);

  // const handleTap = () => {
  //   setTapped(!tapped); // 클릭 시 상태 토글
  // };

  const normal = isActive
    ? hoverEffects.Black // 클릭된 경우 스타일
    : {
        backgroundColor: "white",
        color: "black",
        borderColor: "black",
      }; // 기본 스타일

      return(
        <Button
        style={{
          backgroundColor: normal.backgroundColor,
          color: normal.color,
          borderColor: normal.borderColor,
        }}
        minWidth={minWidth}
        borderRadius="2px"
        width={width}
        height={height}
        fontSize={fontSize} // 폰트 크기 프롭 전달
        padding={padding}
        fontFamily={fontFamily}
        onClick={onTap}>{text}</Button>
      )
}

