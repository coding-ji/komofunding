import styled from "styled-components";
import Img from "./Img";
import Label from "./Label";
import Progress from "./Progress";

const StyledProduct = styled.div`
display : flex;
justify-content : center;
align-items : center;
flex-direction : column;
width: 293px;
height: 358px;
`


function InnerProduct() {
    return (
        <StyledProduct>
            <Label text="popular" color='var(--navy-color)' />
            <Img></Img>
            <Progress value={10} max={100} color='var(--navy-color)'></Progress>
        </StyledProduct>
    )
}

export default InnerProduct;