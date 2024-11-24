import styled from "styled-components";
import "../index.css";

// 스타일 정의
const StyledTitleText = styled.p`
  color: black;
  text-align: center;
  font-family: var(--kr-noto);
  font-size: 64px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.32px;
`;

// 컴포넌트 정의
function TitleText({ title }) {
  return <StyledTitleText>{title}</StyledTitleText>;
}

export default TitleText;
