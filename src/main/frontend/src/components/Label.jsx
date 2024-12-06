import styled from "styled-components";

function Label({text, color}) {
    const StyledDiv = styled.div`
    background: ${color};
    color: white;
    display: flex; /* Flexbox 사용 */
    justify-content: center; /* 가로 중앙 정렬 */
    align-items: center; /* 세로 중앙 정렬 */
    padding: 2px 1px;
    width: 40%;
    height: 30px;
    letter-spacing: 0.60px;
    margin-bottom: 10px;
    border-radius: 5px;
    font-size: 10px;
    text-align: center; /* 추가적인 텍스트 정렬 */
  `;
    return(
        <StyledDiv>{text}</StyledDiv>
    )
} 

export default Label;

// 메인페이지 : popular / new 