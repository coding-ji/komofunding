import styled from "styled-components";
import InnerProduct from "./InnerProduct";
import { motion } from "framer-motion";
import '../index.css'; 

const StyledDiv = styled(motion.div)`
  width: var(--main-product-width);
  height: var(--main-product-heigth);
  background-color: var(--main-product-color);
  display: flex;
  justify-content: center;
  align-items:center;
  padding : 32px 16px;
  

`;

function MainProductVertical() {
    return (
        <StyledDiv
        initial={{ opacity: 0, rotateX: -90 }} // 초기 상태: 카드 눕힘
        whileInView={{ opacity: 1, rotateX: 0 }} // 카드 정상 위치
        whileHover={{scale: 1.02,  boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.5)'}}
        transition={{ duration: 0.5 }}
        style={{perspective: '1200px'}}
        >
            <InnerProduct />
        </StyledDiv>
    );
}

export default MainProductVertical;
