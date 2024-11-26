import styled from "styled-components";
import { motion } from "framer-motion";
import "../index.css";

const StyledNavLine = styled(motion.div)`
  height: 1px;
  width: 100%;
  background-color: var(--line-color); 
`;

const lineVariants = {
  hidden: { scaleX: 0, originX: 0.5 }, // 초기 상태: 가로 크기 0, 중심 기준
  visible: { scaleX: 1 }, // 최종 상태: 가로 크기 100%
};

function MyNavLine() {
  return (
    <StyledNavLine
      initial="hidden" 
      animate="visible" 
      variants={lineVariants} // 설정한 애니메이션 variants 사용
      transition={{ duration: 0.5, delay: 0.1, ease: "easeInOut" }} // 2초 딜레이 및 애니메이션 시간 설정
    />
  );
}

export default MyNavLine;
