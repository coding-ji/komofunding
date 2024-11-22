import styled from "styled-components";
import Img from "./Img";
import Label from "./Label";
import Progress from "./Progress";
import '../index.css'; 
import ProductImg from "./ProductCard/ProductImg";

const StyledProduct = styled.div`
display : flex;
justify-content : center;
align-items : center;
flex-direction : column;
width : 100%;
height: 100%;
`


function InnerProduct() {
    return (
        <StyledProduct>
            <Label text="popular" color='var(--navy-color)' />
            {/* <Img src={"https://via.placeholder.com/450x450"}></Img> */}
            <ProductImg src={"https://via.placeholder.com/450x450"}></ProductImg>
            <Progress value={30} max={100} color='var(--navy-color)'></Progress>
        </StyledProduct>
    )
}

export default InnerProduct;

// 메인페이지 product
// Img src ={데이터} -> 지워~