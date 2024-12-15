import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";  // React Router의 Link 임포트
import "../index.css";

const StyledLink = styled(motion(Link))`
  font-family: var(--kr-font);
  font-weight: bold;
  font-size: ${({fontSize}) => fontSize || "1.05rem" };
  letter-spacing: 0.3px;
  color: ${({ color }) => color || "var(--main-color)"};  // color 프롭스로 색상 적용
  text-decoration: none;
  -webkit-font-smoothing: antialiased;
  min-width: 8.4rem;
  text-align: center;
`;

const NavFont = ({ nav, to, color, fontSize }) => {
  return (
    <StyledLink
      to={to}
      color={color}  // color 프롭스 전달
      whileHover={{ color: "var(--darkblue-color)" }}  // 호버 시 텍스트 색상 변경
      transition={{ duration: 0.3, ease: "easeInOut" }} // 색상 변경에 부드러운 애니메이션 추가
      fontSize={fontSize}
    >
      {nav}
    </StyledLink>
  );
};

export default NavFont;
