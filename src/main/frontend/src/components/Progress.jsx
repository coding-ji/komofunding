import styled from "styled-components";
import { motion } from "framer-motion";

const ProgressWrapper = styled.div`
  width: 100%;
  background-color: #F2F2F2; /* 바탕색 */
  overflow: hidden;
`;

const ProgressBar = styled(motion.div)`  /* motion.div로 변경 */
  background-color: ${(props) => props.color || "var(--navy-color)"}; /* 진행 색상 */
  height: 20px;
`;

function Progress({ color, value, max }) {
  return (
    <ProgressWrapper>
      <ProgressBar
        color={color}
        initial={{ width: 0 }}   
        animate={{ width: (value / max) * 100 + "%" }} /* width를 value에 맞게 변경 */
        transition={{ duration: .5 }} 
      />
    </ProgressWrapper>
  );
}

export default Progress;
