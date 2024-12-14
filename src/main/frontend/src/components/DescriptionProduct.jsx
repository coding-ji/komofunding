import styled from "styled-components";
import "../index.css";
import { motion } from "framer-motion";

const Description = styled.p`
  color: ${(props) => props.color || "var(--smalltext-graycolor)"};
  font-family: var(--kr-font);
  letter-spacing: ${(props) => props.letterSpacing || "0.1px"};
  font-size: ${(props) => props.fontSize || "0.9rem"};
  padding: ${(props) => props.padding || "0px 5px"}; /* 기본값 '0px 5px' */
  white-space: pre-line;
  font-weight: ${(props) => props.fontWeight || "normal"};
  text-align: ${(props) => props.textAlign || "left"};
  line-height: ${(props) => props.lineHeight || "1.5"};
  min-width: ${(props) => props.minWidth || "0"};
  display: ${(props) => props.display || "block"};
  justify-content: ${(props) => props.justifyContent || "flex-start"};
  flex-direction: ${(props) => props.flexDirection || "row"};
`;

function DescriptionProduct({
  text,
  fontSize,
  color,
  fontWeight,
  textAlign,
  lineHeight,
  letterSpacing,
  minWidth,
  display,
  justifyContent,
  flexDirection,
  padding, // padding props 추가
}) {
  return (
    <Description
      fontSize={fontSize}
      color={color}
      fontWeight={fontWeight}
      textAlign={textAlign}
      lineHeight={lineHeight}
      letterSpacing={letterSpacing}
      minWidth={minWidth}
      display={display}
      justifyContent={justifyContent}
      flexDirection={flexDirection}
      padding={padding} // padding props 전달
    >
      {text && 
        <div
          style={{ fontSize: "1rem", color: "rgb(0,0,0)" }}
          dangerouslySetInnerHTML={{
            __html: text || "소개 내용이 없습니다.",
          }}
        />
      }
    </Description>
  );
}

export default DescriptionProduct;
