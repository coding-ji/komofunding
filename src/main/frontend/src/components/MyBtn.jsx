import styled from "styled-components";
import { motion } from "framer-motion";
import '../index.css';

const Button = styled(motion.button)`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "100%"};
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.textColor};
  text-align: center;
  border-radius: ${(props) => props.borderRadius || "2px"};
  padding: ${(props) => props.padding || "10px 112px" };
  font-weight: bold; 
  letter-spacing: 0.1rem;
  font-family: ${(props) => props.fontFamily};
  margin: 4px 0;
  font-size: 2rem;
  border: 2px solid ${(props) => props.borderColor}; 

  /* 호버 시 전환될 스타일 */
  transition: all 0.2s ease; /* 부드러운 전환 효과 */
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
    borderColor: "white",
  }

}

// 일반 확인, 마이페이지 수정 삭제 환불, 임시 저장 홈으로, 후원하기 등 일반 통합 버튼
export const Btn = ({text, width, height, onClick}) => (
  <Button
    bgColor="var(--darkblue-color)"
    borderColor="var(--darkblue-color)"
    textColor= "#ffffff"
    fontFamily = "var(--eng-font)"
    whileHover={hoverEffects.Btn}
    onClick={onClick}
    width={width}
    height={height}
  >{text}
  </Button>
);

// 일반 취소, 링크 버튼
export const WhiteBtn = ({text, width, height, onClick}) => (
  <Button
    bgColor="white"
    borderColor="var(--darkblue-color)"
    textColor= "var(--darkblue-color)"
    fontFamily = "var(--kr-font)"
    whileHover={hoverEffects.Cancel}
    borderRadius = "2px"
    onClick={onClick}
    width={width}
    height={height}
  >{text}
  </Button>
  );

// 모달창 확인 버튼
export const CheckBtn = ({text, width, height, onClick}) => (
  <Button
    bgColor="var(--darkblue-color)"
    textColor= "#ffffff"
    fontFamily = "var(--kr-font)"
    whileHover={hoverEffects.Btn}
    borderRadius = "9px"
    onClick={onClick}
    width={width}
    height={height}
  >{text}
  </Button>
);

// 모달창 취소 버튼
export const CancelBtn = ({text, width, height, onClick}) => (
  <Button
    bgColor="white"
    borderColor="var(--darkblue-color)"
    textColor= "var(--darkblue-color)"
    fontFamily = "var(--kr-font)"
    whileHover={hoverEffects.Cancel}
    borderRadius = "9px"
    onClick={onClick}
    width={width}
    height={height}
  >{text}
  </Button>
);



// 수현이 바꿀거 -> 버튼 색상 변경 스위치 케이스