import styled from "styled-components";

const ProgressWrapper = styled.div`
  width: 100%;
  background-color: #F2F2F2; /* 바탕색 */
  overflow: hidden;
`;

const ProgressBar = styled.div`
  width: ${(props) => (props.value / props.max) * 100}%;
  background-color: ${(props) => props.color || "var(--navy-color)"}; /* 진행 색상 */
  height: 20px;
//   transition: width 0.3s ease; /* 애니메이션 */
`;

function Progress({ color, value, max }) {
  return (
    <ProgressWrapper>
      <ProgressBar color={color} value={value} max={max} />
    </ProgressWrapper>
  );
}

export default Progress;
