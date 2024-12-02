import styled from 'styled-components';
import '../index.css';
import { motion } from 'framer-motion';
import React, { useState } from 'react'; // useState를 import 해야 합니다

// 기존의 StyledInput을 motion.input으로 스타일링하여 애니메이션 추가
const StyledInput = styled(motion.input)`
    padding: 5px ;
    margin: ${(props) => props.margin || "5px 0 0 0"};
    width: ${(props) => props.width || '97%'}; /* props로 width를 받을 수 있도록 설정 */
    font-family : var(--kr-font);
    border-radius : 2px;
    border: 1px solid var(--smalltext-graycolor); /* 테두리 색상 */
  

    font-size: ${(props) => {
    switch (props.size) {
      case 'small':
        return '0.8rem';
      case 'medium':
        return '1rem';
      case 'large':
        return '1.875rem';
      default:
        return '1.5rem';  // 기본값 설정
    }
  }}
`;

function Input({ type, placeholder, onChange, margin, value, gridArea, size, width, onClick }) {
  const [isClicked, setIsClicked] = useState(false); // 클릭 여부를 추적하는 상태 변수

  const handleClick = () => {
      setIsClicked(true); // 클릭 시 true로 설정
  };

  const handleBlur = () => {
      setIsClicked(false); // 포커스 아웃 시 false로 설정
  };

  return (
      <StyledInput
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        
        size={size}
        margin={margin}
        style={{ gridArea: gridArea }}
        width={width} // width를 props로 전달

        onClick={onClick ? onClick : handleClick} // 클릭 시 상태 변경
        onBlur={handleBlur} // 포커스 아웃 시 상태 변경
        animate={{
            scale: isClicked ? 1.02 : 1, // 클릭 상태에 따라 확대/축소 효과
        }}
        transition={{
            ease: "easeOut",
        }}
      />
  );
}

export default Input;
