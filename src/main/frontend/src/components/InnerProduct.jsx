import styled from "styled-components";
import Img from "./Img";
import Label from "./Label";
import Progress from "./Progress";
import '../index.css'; 
import ProductImg from "./ProductCard1/ProductImg";

const StyledProduct = styled.div`
display : flex;
justify-content : center;
align-items : center;
flex-direction : column;
width : 100%;
height: 100%;

`


function InnerProduct({src, currentAmount, totalAmount, isNew, isPopular }) {

    const progressValue = totalAmount
    ? (currentAmount / totalAmount) * 100
    : 0; // 달성률 계산

    const labelProps = isNew
    ? { text: "new", color: "#436446" }
    : isPopular
    ? { text: "popular", color: "var(--navy-color)" }
    : null;


    return (
        <StyledProduct>
                {labelProps && <Label text={labelProps.text} color={labelProps.color} />}
            <Img src={src || "https://via.placeholder.com/450x450"} /> {/* 기본 이미지 처리 */}
            {/* <ProductImg src={"https://via.placeholder.com/450x450"}></ProductImg> */}
            <Progress value={progressValue} max={100} color='var(--navy-color)'></Progress>
        </StyledProduct>
    )
}

export default InnerProduct;

