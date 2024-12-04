import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// 메뉴 스타일
const MenuItem = styled(motion.div)`
  text-decoration: none;
  color: #fff;
  font-size: 1.2rem;
  font-family: var(--eng-bold);
  cursor: pointer;
`;

// HeaderMenu 컴포넌트
const HeaderMenu = ({ name, onClick }) => {
  return (
    <MenuItem
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {name}
    </MenuItem>
  );
};

export default HeaderMenu;
