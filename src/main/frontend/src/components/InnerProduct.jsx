import styled from "styled-components";
import Img from "./Img";
import Label from "./Label";
import Progress from "./Progress";
import '../index.css'; 

const StyledProduct = styled.div`
display : flex;
justify-content : center;
align-items : center;
flex-direction : column;
`


function InnerProduct() {
    return (
        <StyledProduct>
            <Label text="popular" color='var(--navy-color)' />
            <Img></Img>
            <Progress value={30} max={100} color='var(--navy-color)'></Progress>
        </StyledProduct>
    )
}

export default InnerProduct;

// 메인페이지 product
// Img src ={데이터}