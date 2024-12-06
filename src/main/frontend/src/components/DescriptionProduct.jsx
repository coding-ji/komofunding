import styled from "styled-components";
import '../index.css'; 
import { motion } from "framer-motion";

const Description = styled.p`
    color: ${(props) => props.color || 'var(--smalltext-graycolor)'}; /* 기본값 */
    font-family: var(--kr-font);
    letter-spacing: ${(props) => props.letterSpacing || '0.1px'}; /* 기본값 '0.1px' */
    font-size: ${(props) => props.fontSize || '0.9rem'}; /* 기본값 '0.9rem' */
    padding: 0px 5px;
    white-space: pre-line; /* 줄바꿈 문자 처리 */
    font-weight: ${(props) => props.fontWeight || 'normal'};
    text-align: ${(props) => props.textAlign || 'left'}; /* 기본값 'left' */
    line-height: ${(props) => props.lineHeight || '1.5'}; /* 기본값 '1.5' */
    min-width: ${(props) => props.minWidth || '0'}; /* min-width를 props로 추가, 기본값은 '0' */
    display: ${(props) => props.display || 'block'}; /* display를 props로 추가, 기본값은 'block' */
    justify-content: ${(props) => props.justifyContent || 'flex-start'}; /* justify-content를 props로 추가, 기본값은 'flex-start' */
    flex-direction: ${(props) => props.flexDirection || 'row'}; /* flex-direction을 props로 추가, 기본값은 'row' */
`;

function DescriptionProduct({ text, fontSize, color, fontWeight, textAlign, lineHeight, letterSpacing, minWidth, display, justifyContent, flexDirection }) {
    return (
        <Description 
            fontSize={fontSize} 
            color={color} 
            fontWeight={fontWeight} 
            textAlign={textAlign} 
            lineHeight={lineHeight} 
            letterSpacing={letterSpacing}
            minWidth={minWidth}  // minWidth props 전달
            display={display}  // display props 전달
            justifyContent={justifyContent}  // justifyContent props 전달
            flexDirection={flexDirection}  // flexDirection props 전달
        >
            {text}
        </Description>
    );
}

export default DescriptionProduct;
