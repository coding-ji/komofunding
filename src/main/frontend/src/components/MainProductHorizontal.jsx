import React, { useState, useEffect } from "react";
import styled from "styled-components";
import InnerProduct from "./InnerProduct";
import { motion } from "framer-motion";
import "../index.css";

const StyledDivHorizontal = styled(motion.div)`
  background-color: ${(props) =>
    props.isNew ? "#fff" : "var(--main-product-color)"};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 10px 50px 10px;
  perspective: 1200px;
  transform-style: preserve-3d;
  height: 485px;
  width: 100%;
  cursor : pointer;
`;

function MainProductHorizontal({
  imgSrc,
  currentAmount,
  totalAmount,
  isNew,
  isPopular,
  onClick
}) {
  const animations = [
    {
      initial: { opacity: 0, rotateX: -90 },
      whileInView: { opacity: 1, rotateX: 0 },
    },
    {
      initial: { opacity: 0, rotateX: 90 },
      whileInView: { opacity: 1, rotateX: 0 },
    },
    {
      initial: { opacity: 0, rotateY: -90 },
      whileInView: { opacity: 1, rotateY: 0 },
    },
    {
      initial: { opacity: 0, rotateY: 90 },
      whileInView: { opacity: 1, rotateY: 0 },
    },
  ];

  // 애니메이션을 한 번만 설정
  const [randomAnimation, setRandomAnimation] = useState(null);

  useEffect(() => {
    const selectedAnimation =
      animations[Math.floor(Math.random() * animations.length)];
    setRandomAnimation(selectedAnimation);
  }, []); // 빈 배열로 useEffect가 컴포넌트 최초 렌더 시에만 실행되도록 설정

  if (!randomAnimation) return null; // 애니메이션이 설정되기 전에는 null 반환

  return (
    <StyledDivHorizontal
      {...randomAnimation}
      whileHover={{
        scale: 1.02,
        boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.5)",
      }}
      transition={{ duration: 0.5 }}
      style={{ transformOrigin: "center" }}
      isNew={isNew} // isNew 전달
      onClick={onClick}
    >
      <InnerProduct
        src={imgSrc}
        currentAmount={currentAmount}
        totalAmount={totalAmount}
        isNew={isNew}
        isPopular={isPopular}
      />
    </StyledDivHorizontal>
  );
}

export default MainProductHorizontal;
