import styled from "styled-components";
import { motion } from "framer-motion";
import React from "react";
// import { useNavigate } from "react-router-dom";

// 동적 배경 이미지 설정
const StyledImg = styled(motion.div)`
  background-image: url(${(props) =>
    props.src ? props.src : "https://via.placeholder.com/450x450"});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const Overlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 9%,
    rgba(61, 61, 61, 0.3) 70%
  );
  opacity: 0;
  transition: opacity 0.5s ease-in-out;

  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 10px;
`;

const FavoriteIcon = styled(motion.svg)`
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
  outline: none;
  border: none;
  background: none;

  position : relative;
  bottom : 1rem;
  right : 1rem;

  & path {
    fill: none; /* 기본 상태에서 내부는 투명 */
    stroke: white; /* 테두리는 항상 흰색 */
    stroke-width: 2.8; /* 테두리 두께 */
    transition: fill 0.3s ease-in-out, transform 0.2s ease-in-out;
  }

  &:hover path {
    fill: lightpink; /* 호버 시 내부는 핑크색으로 변경 */
  }

  &:hover {
    transform: scale(1.1); /* 호버 시 확대 */
  }
`;

const ImgBox = styled(motion.div)`
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.height ? props.height : "100%")};
`;

function ProductImg({ src, width, height, productId}) {
  // const navigate = useNavigate(); // React Router의 useNavigate 사용

  // const handleClick = () => {
  //   navigate(`/product/${productId}`); 
  // };
  

  return (
    <ImgBox width={width} height={height}>
      <StyledImg src={src}>
        <Overlay
          whileHover={{
            opacity: 1,
          }}
        >
          <FavoriteIcon
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            // onClick={handleClick} 
            // SVG 클릭 시 상세 페이지로 이동
          >
            <path d="M12 21.35C10.6 20.03 5 15.1 3.5 12.5 2.04 10 2.04 7.7 3.8 6.2 5.2 4.9 7.2 5 8.6 6.2L12 9.5l3.4-3.3c1.4-1.3 3.4-1.3 5 0 1.8 1.5 1.8 3.8 0.2 6.3-1.5 2.6-7.1 7.5-8.6 8.7z" />
          </FavoriteIcon>
        </Overlay>
      </StyledImg>
    </ImgBox>
  );
}

export default ProductImg;
