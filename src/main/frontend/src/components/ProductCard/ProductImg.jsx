import styled from "styled-components";
import { motion } from "framer-motion";

// 동적 배경 이미지 설정
const StyledImg = styled(motion.div)`
   background-image: url(${(props) =>
    props.src ? props.src : "https://via.placeholder.com/450x450"});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; /* 이미지 반복 방지 */
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const Overlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 9%,
    rgba(61, 61, 61, 0.3) 70%
  );
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
`;


const ImgBox = styled(motion.div)`
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.height ? props.height : "100%")};
  display: flex;
  justify-content: center;
  align-items: center; /* 부모 크기에 맞춰 중앙 정렬 */
  position: relative; /* 자식 요소를 기준으로 위치 설정 가능 */
`


function ProductImg({ src, width, height }) {
  return (
    <ImgBox width={width} height={height} >
      <StyledImg src={src}>
        <Overlay
          whileHover={{
            opacity: 1, // Hover 시 투명도 애니메이션
          }}
        />
      </StyledImg>
    </ImgBox>
  );
}

export default ProductImg;
