import styled from "styled-components";
import '../index.css'; 
import { motion } from "framer-motion";

const Description = styled.p`
    color : var(--smalltext-graycolor);
    font-family : var(--kr-font);
    letter-spacing: 0.1px;
    font-size: 0.9rem;
    padding : 0px 5px;


    `;

function DescriptionProduct({text}) {
    return(
        <Description>{text}</Description>
    )
}

export default DescriptionProduct;