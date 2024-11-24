import styled from 'styled-components';

// isValid 유효성 검사 true / false 값
// Input 사용하는 곳에서 유효성 검사 시행시에 true/false로 보내기

const StyledInput = styled.input`
    border-radius: 10px;
    border: 1px solid var(--line-color);
    padding: 10px;
    margin-top: 5px;
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

function Input({ type, placeholder, onChange, value, gridArea, size}) {
  return (
      <StyledInput
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        size={size}
        style={{ gridArea: gridArea }}
      />
  );
}

export default Input;
