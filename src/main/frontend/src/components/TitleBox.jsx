import styled from "styled-components";
import '../index.css'; 
import { motion } from "framer-motion";
import React from "react"; // React import 추가


const BoxContainer = styled.div`
    width : 100%;
    background-color : var(--darkblue-color);
    color : white;
    height : auto;
    font-family : var(--kr-font);
    font-weight : 600;
    font-size: 1.2rem;
    text-align : center;
    padding : 7px 0px;
    letter-spacing : 1.5px;
    `;

    const TitleBox = React.forwardRef(({ text }, ref) => {
        return <BoxContainer ref={ref}>{text}</BoxContainer>;
      });

export default TitleBox;