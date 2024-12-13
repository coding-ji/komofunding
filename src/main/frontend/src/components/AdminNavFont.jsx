import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";  // React Router의 Link 임포트
import "../index.css";

const StyledLink = styled(motion(Link))`
  font-family: var(--kr-font);
  font-weight: bold;
  font-size: ${({ fontSize }) => fontSize || "1.05rem"};
  letter-spacing: 0.3px;
  color: ${({ color }) => color || "var(--main-color)"};
  text-decoration: none;
  -webkit-font-smoothing: antialiased;
  min-width: 8.4rem;
  text-align: center;
`;

const AdminNavFont = ({ nav, to, color, fontSize }) => {
  return (
    <StyledLink
      to={to}
      color={color}  // color 프롭스 전달
      whileHover={{ scale: 1.1 }}  // 호버 시 텍스트 색상 및 스케일 변경
      whileTap={{ scale: 0.9 }}  // 클릭 시 스케일 축소
      transition={{ duration: 0.2, ease: "easeInOut" }} // 부드러운 애니메이션
      fontSize={fontSize}
    >
      {nav}
    </StyledLink>
  );
};

export default AdminNavFont;
