import styled from "styled-components";
import '../../index.css';

const StyledTitle = styled.div`
 font-size: ${(props) => props.size || '2.2rem'}; /* 기본값 2.2rem 설정 */
  font-weight : bold;
  margin: 4px 0;
  padding: 0 8px; /* 양쪽 여백 */
  text-align: left;  
  font-family: ${(props) => props.fontFamily};
  color: ${(props) => {
    if (props.fontFamily === "var(--eng-font)") {
      return "var(--Titletext-blackcolor)";
    } else if (props.fontFamily === "var(--kr-font)") {
      return "var(--darkgreen-color)";
    }
    return "var(--Titletext-blackcolor)";

  }};


`;

function ProductTitle({ title, fontFamily,size }) {  
  return <StyledTitle fontFamily={fontFamily} size={size}>{title}</StyledTitle>;
}

export default ProductTitle;
