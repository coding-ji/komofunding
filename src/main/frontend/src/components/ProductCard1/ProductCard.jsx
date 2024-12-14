import styled from "styled-components";
import ProductImg from "./ProductImg";
import ProductTitle from "./ProductTitle";
import ProductDescription from "./ProductDescription";
import { motion } from "framer-motion";
import "../../index.css";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const CardContainer = styled(motion.div)`
  display: grid; /* 그리드 레이아웃 설정 */
  grid-template-rows: 4fr 0.5fr 1fr; /* 비율: 이미지 3, 제목 1, 설명 1 */
  grid-template-areas:
    "image"
    "title"
    "description"; /* 각 영역 이름 설정 */
  width: 100%; /* 부모 컨테이너 크기에 맞게 자동으로 설정 */
  border-radius: 2px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 500px;
  overflow: hidden;
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
  font-family: ${(props) => props.fontFamily || "var(--Titletext-blackcolor)"};
`;

// 설명 영역
const StyledProductDescription = styled(ProductDescription)`
  grid-area: description; /* 그리드 영역 이름과 연결 */
  padding: 0 10px; /* 양옆 여백 추가 */
  text-align: center;
  font-size: 0.9rem;
  color: #666;
  /* 추가된 속성 */
  overflow: hidden; /* 넘치는 텍스트 숨김 */
  text-overflow: ellipsis; /* 넘친 텍스트를 ...으로 표시 */
`;

function ProductCard({ data, fontFamily }) {
  const navigate = useNavigate();

  if (!data) {
    console.error("ProductCard: data is undefined");
    return null; // 데이터가 없으면 아무것도 렌더링하지 않음
  }

  const {
    thumbnailImgs = [],
    title = "Untitled",
    projectShortDescription = "No description available",
  } = data;

  // 이미지 URL 처리: imgs[0]이 없으면 기본 이미지 사용
  //   const imageUrl = imgs[0]?.trim() || "https://fakeimg.pl/600x600/?text=KOMO";
  const imageUrl = thumbnailImgs[0]?.trim()
    ? thumbnailImgs[0]?.trim()
    : "https://fakeimg.pl/600x600/?text=KOMO";

  const animations = [
    {
      initial: { opacity: 0, y: -100 },
      whileInView: { opacity: 1, y: 0 },
    },
    {
      initial: { opacity: 0, x: 100 },
      whileInView: { opacity: 1, x: 0 },
    },
    {
      initial: { opacity: 0, y: -100 },
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
      whileHover={{ scale: 1.02, boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.5)" }}
      transition={{ duration: 0.5 }}
      style={{ transformOrigin: "center" }}
      onClick={() =>
        navigate(
          `/home/product-details/${data.projectNum}`
        )
      }
    >
      <StyledProductImg src={imageUrl} />
      <StyledProductTitle title={title} fontFamily={fontFamily} />
      <StyledProductDescription description={projectShortDescription} />
    </CardContainer>
  );
}

export default ProductCard;
