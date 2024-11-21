import styled from "styled-components";
import '../../index.css';


const StyledDescription = styled.div`
  font-size: 1.25rem;
  color: var(--smalltext-graycolor);
  text-align: left;
  line-height: nomal;
  padding: 0 8px; /* 양쪽 여백 */
  font-family : var(--kr-noto);
  font-weight : 500;

`;

function ProductDescription({ description }) {
  return <StyledDescription>{description}</StyledDescription>;
}

export default ProductDescription;
