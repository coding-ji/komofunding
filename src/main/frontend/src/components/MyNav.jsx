// MyNav.jsx
import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";
import "../index.css";
import NavFont from "./NavFont";
import HoverRectangle from "./HoverRectangle";  // HoverRectangle 컴포넌트 import

const StyledNav = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 117px;
  height: 50px;
  justify-content: center;
`;

const NavItem = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const navVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0 },
};

function MyNav() {
  const [hoveredIndex, setHoveredIndex] = useState(null);  // hover 상태를 관리합니다
  const navItems = [
    { label: "진행 예정 프로젝트", path: "/upcoming" },
    { label: "진행 중 프로젝트", path: "/ongoing" },
    { label: "진행 마감 프로젝트", path: "/completed" },
  ];

  return (
    <StyledNav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {navItems.map((item, index) => (
        <NavItem
          key={index}
          initial="hidden"
          animate="visible"
          onMouseEnter={() => setHoveredIndex(index)}  // 마우스 들어갈 때 상태 업데이트
          onMouseLeave={() => setHoveredIndex(null)}  // 마우스 나갈 때 상태 초기화
        >
          <NavFont nav={item.label} to={item.path} />
          <HoverRectangle isHovered={hoveredIndex === index} />  {/* HoverRectangle 컴포넌트로 상태 전달 */}
        </NavItem>
      ))}
    </StyledNav>
  );
}

export default MyNav;
