import styled from "styled-components";
import '../../index.css';

const StyledTitle = styled.div`
  font-size: 2rem;
  font-weight : bold;
  margin: 4px 0;
  padding: 0 8px; /* 양쪽 여백 */
  text-align: left;
  
  font-family : var(--eng-bold);
  

`;

function ProductTitle({ title }) {  
  return <StyledTitle>{title}</StyledTitle>;
}

export default ProductTitle;
