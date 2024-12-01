import styled from "styled-components";
import '../index.css'; 
import { motion } from "framer-motion";

const Title = styled.p`
    color : black;
    font-family : var(--kr-font);
    font-weight : bold;
    letter-spacing: 0.15px;
    font-size: 1.2rem;
    padding : 5px 5px;

    `;

function TitleProduct({text}) {
    return(
        <Title>{text}</Title>
    )
}

export default TitleProduct;