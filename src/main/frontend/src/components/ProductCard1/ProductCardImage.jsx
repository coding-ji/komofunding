import styled from "styled-components";
import ProductImg from "./ProductImg";
import {motion} from 'framer-motion'
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../stores/ProjectStore/useStore";
import axios from "axios";




const CardContainer = styled(motion.div)`
  display: grid; /* 그리드 레이아웃 설정 */
  display: grid;
  grid-template-areas: "image";
  // width: 100vw; /* 뷰포트 너비 전체 */
  // height: 100vh; /* 뷰포트 높이 전체 */

    // 그리드 잡히면 아래 활성화하세요 
   width: 100%; 
  // /* 부모 컨테이너 크기에 맞게 자동으로 설정 */
  height: 100%; 
  // /* 부모 컨테이너 크기에 맞게 자동으로 설정 */
  
  border-radius: 2px;
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


function ProductCardImage({ data,animation }) {

   // 데이터 유효성 검사
   if (!data) {
    console.error("ProductCardImage: data is undefined");
    return null;
  }

  


  const { imgs = [] } = data;


  const animations = [
    {
      initial: { opacity: 0, y: -100 },
      whileInView: { opacity: 1, y: 0 },
    },
    {
      initial: { opacity: 0, x:100 },
      whileInView: { opacity: 1, x: 0 },
    },
    {
      initial: { opacity: 0, y: 100 },
      whileInView: { opacity: 1, y: 0 },
    },
    {
      initial: { opacity: 0, x: 100 },
      whileInView: { opacity: 1, x: 0 },
    },
  ];

  const appliedAnimation = useMemo(
    () => animations[Math.floor(Math.random() * animations.length)],
    [] // 컴포넌트가 마운트될 때 한 번만 실행
  );
  
  return (
    <CardContainer
    {...appliedAnimation}

    whileHover={{ scale: 1.02, boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.5)' }}
    transition={{ duration: 0.5 }}
    
    
    >
      <StyledProductImg src={imgs[0] || "https://fakeimg.pl/600x600/?text=KOMO"} />
      </CardContainer>
  );
}

export default ProductCardImage;
