import styled from "styled-components";
import '../../index.css';

const StyledTitle = styled.div`
  font-size: 2rem;
  font-weight : bold;
  margin: 4px 0;

  text-align: center;
  
  font-family : var(--eng-bold);
  

`;

function ProductTitle({ title }) {  
  return <StyledTitle>{title}</StyledTitle>;
}

export default ProductTitle;
