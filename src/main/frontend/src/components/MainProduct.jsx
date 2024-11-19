import styled from "styled-components";
import InnerProduct from "./InnerProduct";
import { motion } from "framer-motion";

const StyledDiv = styled(motion.div)`
  width: 326px;
  height: 485px;
  background-color: rgba(84, 84, 84, 1);
  display: flex;
  justify-content: center;
  align-items:center;
  padding : 32px 16px;
  

`;

function MainProduct() {
    return (
        <StyledDiv
        initial={{ opacity: 0, rotateX: -90 }} // 초기 상태: 카드를 눕힌 상태
        whileInView={{ opacity: 1, rotateX: 0 }} // 화면에 보일 때: 카드를 정상 위치로
        whileHover={{scale: 1.02,  boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.5)'}}
        transition={{ duration: 0.5 }} // 자연스러운 회전 애니메이션
        style={{perspective: '1200px'}} // 3D 효과를 주기 위해 perspective 적용
        >
            <InnerProduct />
        </StyledDiv>
    );
}

export default MainProduct;
