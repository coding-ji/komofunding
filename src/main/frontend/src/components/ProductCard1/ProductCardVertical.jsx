import styled from "styled-components";
import ProductImg from "./ProductImg";
import ProductTitle from "./ProductTitle";
import ProductDescription from "./ProductDescription";
import {motion} from 'framer-motion'

const CardContainer = styled(motion.div)`
  display: grid; /* 그리드 레이아웃 설정 */
  grid-template-rows: 4fr 0.5fr 1fr; /* 비율: 이미지 3, 제목 1, 설명 1 */
  grid-template-areas:
    "image"
    "title"
    "description"; /* 각 영역 이름 설정 */
  width: 100%; /* 부모 컨테이너 크기에 맞게 자동으로 설정 */
  height: 100%; /* 부모 컨테이너 크기에 맞게 자동으로 설정 */
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

`;

// 이미지 영역
const StyledProductImg = styled(ProductImg)`
  grid-area: image; /* 그리드 영역 이름과 연결 */
  width: 100%;
  height: 100%;
  background-position: center;
`;

// 타이틀 영역
const StyledProductTitle = styled(ProductTitle)`
  grid-area: title; /* 그리드 영역 이름과 연결 */
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
   width: 100%; /* 부모 컨테이너에 맞게 너비 설정 */
  padding: 0 10px; 
   font-family: ${(props) => props.fontFamily || 'var(--Titletext-blackcolor)'};
`;

// 설명 영역
const StyledProductDescription = styled(ProductDescription)`
  grid-area: description; /* 그리드 영역 이름과 연결 */
  padding: 0 10px; /* 양옆 여백 추가 */
    text-align: center;
  

  font-size: 0.9rem;
  color: #666;
`;

function ProductCardVertical({ src, title, description, fontFamily }) {
  return (
    <CardContainer
    initial={{ opacity: 0, rotateX: -90 }} // 초기 상태: 카드 눕힘
    whileInView={{ opacity: 1, rotateX: 0 }} // 카드 정상 위치
    whileHover={{scale: 1.02,  boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.5)'}}
    transition={{ duration: .7 }}
    style={{ transformOrigin: 'center' }}
    
    >
      <StyledProductImg src={src} />
      <StyledProductTitle title={title} fontFamily={fontFamily} />
      <StyledProductDescription description={description} />
    </CardContainer>
  );
}

export default ProductCardVertical;


{/* <ProductCard 
src={"./src/components/ProductCard/images.jpg"} 
title={"Light Pad Drawing Bard"}
description={"어라랄.."}
/> */}
