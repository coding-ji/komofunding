import styled from "styled-components";
import '../../index.css';
import {motion} from 'framer-motion'

const StyledTitle = styled(motion.div)`
 font-size: ${(props) => props.size || '2.2rem'}; /* 기본값 2.2rem 설정 */
  font-weight : bold;
  margin: 4px 0;
  padding: 0 3px; /* 양쪽 여백 */
  text-align: ${(props)=>props.textAlign || "left"};  
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

function ProductTitle({ title, fontFamily,size,animation,textAlign }) {  
  return <StyledTitle 
  fontFamily={fontFamily} 
  size={size}
  textAlign={textAlign}
  {...animation}
  >
    {title}
    </StyledTitle>;
}

export default ProductTitle;
