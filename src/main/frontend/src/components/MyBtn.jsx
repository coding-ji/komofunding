import styled from "styled-components";
import { motion } from "framer-motion";
import '../index.css';

const StyledBtn = styled(motion.button)`
  width: 100%;
  height: 100%;
  background-color: var(--darkblue-color);
  color: white;
  text-align: center;
  border-radius: 2px;
  padding: 10px 112px;
  font-weight: bold;
  letter-spacing: 0.1rem;
  font-family: var(--eng-bold);
  margin: 4px 0;
  font-size: 2rem;
  border: 2px solid var(--darkblue-color); /* 기본 보더라인 설정 */
  border-radius : 2px;
  


  /* 호버 시 전환될 스타일 */
  transition: all 0.2s ease; /* 부드러운 전환 효과 */
`;

function MyBtn({ text }) {
  return (
    <StyledBtn
      whileHover={{
        backgroundColor: "rgb(255, 255, 255)",  // 호버 시 배경색을 흰색으로 변경
        color: "var(--darkblue-color)",  // 호버 시 글자색을 다크블루로 변경
        border: "2px solid var(--darkblue-color)", // 호버 시 보더라인 색을 다크블루로 변경
      }}
    >
      {text}
    </StyledBtn>
  );
}

export default MyBtn;
