import styled from "styled-components";
import InnerProduct from "./InnerProduct";
import { motion } from "framer-motion";
import '../index.css';

const StyledDivHorizontal = styled(motion.div)`
  background-color: var(--main-product-color);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 13px 8px;
  perspective: 1200px;
  transform-style: preserve-3d;
  height : 485px;
  width : 100%


`;

function MainProductHorizontal() {
    
  const animations = [
    {
      initial: { opacity: 0,  rotateX: -90  },
      whileInView: { opacity: 1, rotateX: 0},
    },
    {
      initial: { opacity: 0, rotateX: 90 },
      whileInView: { opacity: 1, rotateX: 0 },
    },
    {
      initial: { opacity: 0, rotateY: -90 },
      whileInView: { opacity: 1, rotateY: 0 },
    },
    {
      initial: { opacity: 0, rotateY: 90 },
      whileInView: { opacity: 1, rotateY: 0 },
    },
  ];

  const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
    return (
        <StyledDivHorizontal
        {...randomAnimation}
    whileHover={{ scale: 1.02, boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.5)' }}
    transition={{ duration: 0.5 }}
    style={{ transformOrigin: 'center' }}

        // style={{ perspective: '1200px' }}
        >
            <InnerProduct />
        </StyledDivHorizontal>
    );
}

export default MainProductHorizontal;
