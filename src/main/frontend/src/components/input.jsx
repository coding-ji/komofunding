import styled from 'styled-components';

// isValid 유효성 검사 true / false 값
// Input 사용하는 곳에서 유효성 검사 시행시에 true/false로 보내기

const StyledInput = styled.input`
    padding: 10px 10px ;
    margin: ${(props) => props.margin || "5px 0 0 0"};
width: ${(props) => props.width || '97%'}; /* props로 width를 받을 수 있도록 설정 */

      font-size: ${(props) => {
    switch (props.size) {
      case 'small':
        return '20px';
      case 'medium':
        return '26px';
      case 'large':
        return '30px';
      default:
        return '24px';  // 기본값 설정
    }
  }}
    `;

function Input({ type, placeholder, onChange,margin, value, gridArea, size, width}) {
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
      />
  );
}

export default Input;
