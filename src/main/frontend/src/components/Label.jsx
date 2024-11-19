import styled from "styled-components";

function Label({text, color}) {
    const StyledDiv = styled.div`
        background: ${color};
        color: ${color? "white": "black"};
        padding: 1px 11px;
        width: 105px;
        height: 26.6px;
        text-align: center;
        letter-spacing: 0.60px;
        margin-bottom : 5px;
        border-radius : 5px;

    `;

    return(
        <StyledDiv>{text}</StyledDiv>
    )
} 

export default Label;

// 메인페이지 : popular / new 