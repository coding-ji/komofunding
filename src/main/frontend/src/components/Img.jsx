import styled from "styled-components";
import '../index.css'; 
import { motion } from "framer-motion";

const StyledImg = styled(motion.div)`
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  width: 100%;
  min-height : 100px;
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
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 9%, rgba(61, 61, 61, 0.3) 70%);
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
`;

function Img({ src }) {
  return (
    <StyledImg
      initial={{ backgroundImage: `url(${src})` }} // 초기 배경
    >
      <Overlay
        whileHover={{
          opacity: 1 //
        }}
      />
    </StyledImg>
  );
}

export default Img;
