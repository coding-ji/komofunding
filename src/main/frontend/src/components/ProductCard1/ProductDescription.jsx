import styled from "styled-components";
import '../../index.css';


const StyledDescription = styled.div`
  font-size: 1rem;
  color: var(--smalltext-graycolor);
  text-align: left;
  line-height: nomal;
  padding: 0 8px; /* 양쪽 여백 */
  font-family : var(--kr-noto);
  font-weight : 500;

    /* 추가된 속성 */
  overflow: hidden;         /* 넘치는 텍스트 숨김 */
  text-overflow: ellipsis;  /* 넘친 텍스트를 ...으로 표시 */

`;

function ProductDescription({ description }) {
  return <StyledDescription>{description}</StyledDescription>;
}

export default ProductDescription;
