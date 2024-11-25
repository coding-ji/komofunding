import styled from "styled-components";
import { motion } from "framer-motion";
import '../index.css';
import MyContainer from "./MyContainer";

// 그리드 레이아웃을 위한 스타일링
const StyledContainers = styled(motion.div)`

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px; /* 요소 간 간격 */
  margin: 0 auto; /* 컨테이너 가운데 정렬 */
  max-width: 100%; /* 부모의 여백을 고려하여 최대 너비를 100%로 설정 */
  box-sizing: border-box; /* padding을 포함한 크기를 계산하도록 */


  @media (max-width: 920px) {
    grid-template-columns: repeat(2, 1fr); /* 열 개수 자동 조정 */
  }

  @media (max-width: 700px) {
    grid-template-columns: repeat(1, 1fr); /* 1열 유지 */
    padding: 0 10px; /* 여백 최소화 */
  }
`;


// 그리드의 부모 컨테이너 애니메이션 설정
const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      delayChildren: 0.2, // 자식 요소가 등장하기 전 대기 시간
      staggerChildren: 0.2, // 자식 요소들 간의 등장 간격 
    },
  },
};

// 자식 요소에 대한 애니메이션 설정
const itemVariants = {
  initial: { opacity: 0, y: -100 }, // 시작 시 opacity 0, 아래에서 올라옴
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

function MyContainers() {
  return (
    <StyledContainers
      variants={containerVariants}  // 부모 요소에 애니메이션 variants 추가
      initial="initial"
      animate="animate"
    >
      <motion.div variants={itemVariants}>
        <MyContainer title="안뇽" description="얄루얄루" text="DELETE" />
      </motion.div>
      <motion.div variants={itemVariants}>
        <MyContainer title="방가방가 햄토리" description="얄루얄루" text="DELETE" />
      </motion.div>
      <motion.div variants={itemVariants}>
        <MyContainer title="포실포실하덕" description="얄루얄루" text="DELETE" />
      </motion.div>
      <motion.div variants={itemVariants}>
        <MyContainer title="포실포실하덕" description="얄루얄루" text="DELETE" />
      </motion.div>
      <motion.div variants={itemVariants}>
        <MyContainer title="포실포실하덕" description="얄루얄루" text="DELETE" />
      </motion.div>
      <motion.div variants={itemVariants}>
        <MyContainer title="포실포실하덕" description="얄루얄루" text="DELETE" />
      </motion.div>
      <motion.div variants={itemVariants}>
        <MyContainer title="포실포실하덕" description="얄루얄루" text="DELETE" />
      </motion.div>
      <motion.div variants={itemVariants}>
        <MyContainer title="포실포실하덕" description="얄루얄루" text="DELETE" />
      </motion.div>
      <motion.div variants={itemVariants}>
        <MyContainer title="포실포실하덕" description="얄루얄루" text="DELETE" />
      </motion.div>
    </StyledContainers>
  );
}

export default MyContainers;
