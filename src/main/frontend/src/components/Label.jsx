import styled from "styled-components";

function Label({text, color}) {
    const StyledDiv = styled.div`
        background: ${color};
        color: ${color? "white": "black"};
        padding: 2px 1px;
        width: 30%;
        height: 20PX;
        text-align: center;
        letter-spacing: 0.60px;
        margin-bottom : 5px;
        border-radius : 5px;
        font-size : 10px;

    `;

    return(
        <StyledDiv>{text}</StyledDiv>
    )
} 

export default Label;

// 메인페이지 : popular / new 