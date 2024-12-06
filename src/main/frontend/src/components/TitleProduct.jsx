import styled from "styled-components";
import '../index.css'; 
import { motion } from "framer-motion";
import React from "react"; // React import 추가


const Title = styled.p`
    color : black;
    font-family : var(--kr-font);
    font-weight : bold;
    letter-spacing: 0.15px;
    font-size: ${({ fontSize }) => fontSize || "1.2rem"};
    padding : 5px 5px;
`;


const TitleProduct = React.forwardRef(({ text, fontSize }, ref) => {
    return <Title ref={ref} fontSize={fontSize}>{text}</Title>;
  });

export default TitleProduct;
