import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import HoverRectangle from "./HoverRectangle"; // HoverRectangle 컴포넌트 import
import NavFont from "./NavFont"; // NavFont 컴포넌트 import

const StyledNav = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 7.3rem;
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

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const navVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

function MyNav({ navItems, basePath }) {
  const [hoveredIndex, setHoveredIndex] = useState(null); // hover 상태를 관리
  const [clickedIndex, setClickedIndex] = useState(null); // 클릭된 항목을 관리

  const handleItemClick = (index) => {
    setClickedIndex(index); // 클릭된 항목의 index를 상태로 저장
  };

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
          onMouseEnter={() => setHoveredIndex(index)} // 마우스 오버 상태 업데이트
          onMouseLeave={() => setHoveredIndex(null)} // 마우스 아웃 상태 초기화
          onClick={() => handleItemClick(index)} // 클릭 시 상태 업데이트
        >
          {/* Link를 NavItem으로 감싸서 네비게이션 연결 */}
          <NavFont nav={item.label} to={`${basePath}/${item.path}`} /> {/* basePath 추가 */}
          <HoverRectangle isHovered={hoveredIndex === index || clickedIndex === index} />
        </NavItem>
      ))}
    </StyledNav>
  );
}

export default MyNav;
