import styled from "styled-components";
import '../index.css'; 
import { motion } from "framer-motion";

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

function TitleBox({text}) {
    return(
        <BoxContainer> {text}
        </BoxContainer>
    )
}

export default TitleBox;