import styled from "styled-components";
import '../../index.css';


const StyledDescription = styled.div`
  font-size: 1rem;
  color: var(--smalltext-graycolor);
  text-align: left;
  line-height: nomal;
  padding: 0 3px; /* 양쪽 여백 */
  font-family : var(--kr-noto);
  font-weight : 500;

    /* 추가된 속성 */
  overflow: hidden; /* 넘치는 텍스트 숨김 */
  text-overflow: ellipsis; /* 넘친 텍스트는 ... 처리 */
  max-height: 3em; /* 설명 텍스트의 최대 높이 제한 */
  line-height: 1.5; /* 텍스트 줄 간격 */


`;

function ProductDescription({ description }) {
  return <StyledDescription>{description}</StyledDescription>;
}

export default ProductDescription;
