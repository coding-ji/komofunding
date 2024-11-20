import styled from "styled-components";
import InnerProduct from "./InnerProduct";
import { motion } from "framer-motion";
import '../index.css';

const StyledDivHorizontal = styled(motion.div)`
  background-color: var(--main-product-color);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 32px;
   perspective: 1200px;
`;

function MainProductHorizontal() {
    return (
        <StyledDivHorizontal
        initial={{ opacity: 0, rotateY: -90 }} // 초기 상태: 카드 옆으로 눕힘
        whileInView={{ opacity: 1, rotateY: 0 }} // 카드 정상 위치
        whileHover={{ scale: 1.02, boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.5)' }}
        transition={{ duration: .7 }}
        style={{ transformOrigin: 'center' }} 
        // style={{ perspective: '1200px' }}
        >
            <InnerProduct />
        </StyledDivHorizontal>
    );
}

export default MainProductHorizontal;
