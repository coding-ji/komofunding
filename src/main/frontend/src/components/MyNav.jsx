import styled from "styled-components";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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


function MyNav({ navItems, basePath}) {
  const location = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(0);

  // 데이터 검증
  useEffect(() => {
    if (!Array.isArray(navItems)) {
      console.error("navItems가 배열이 아닙니다:", navItems);
      return;
    }

    const currentPath = location.pathname.replace(basePath, "");
    const matchedIndex = navItems.findIndex(
      (item) => `/${item.path}` === currentPath
    );

    if (matchedIndex !== -1) {
      setClickedIndex(matchedIndex);
    } else {
      setClickedIndex(0); // 기본값
    }
  }, [location.pathname, basePath, navItems]);

  return (
    <StyledNav initial="hidden" animate="visible" variants={navVariants}>
      {Array.isArray(navItems) &&
        navItems.map((item, index) => (
          <NavItem
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => setClickedIndex(index)}
          >
            <NavFont nav={item.label} to={`${basePath}/${item.path}`} />
            <HoverRectangle
              isHovered={hoveredIndex === index || clickedIndex === index}
            />
          </NavItem>
        ))}
    </StyledNav>
  );
}



export default MyNav;
