import styled from "styled-components";
import InnerProduct from "./InnerProduct";
import { motion } from "framer-motion";
import '../index.css'; 

const StyledDiv = styled(motion.div)`
  background-color: var(--main-product-color);
  display: flex;
  justify-content: center;
  align-items:center;
  padding : 16px 32px;
  perspective: 1200px;
    transform-style: preserve-3d;

`;

function MainProductVertical() {
    return (
        <StyledDiv
        initial={{ opacity: 0, rotateX: -90 }} // 초기 상태: 카드 눕힘
        whileInView={{ opacity: 1, rotateX: 0 }} // 카드 정상 위치
        whileHover={{scale: 1.02,  boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.5)'}}
        transition={{ duration: .7 }}
        style={{ transformOrigin: 'center' }}
        // style={{ perspective: '1200px' }}
        >
            <InnerProduct />
        </StyledDiv>
    );
}

export default MainProductVertical;
