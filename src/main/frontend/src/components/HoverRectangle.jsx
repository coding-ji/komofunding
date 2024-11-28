import { motion } from "framer-motion";

const rectangleVariants = {
  hidden: { opacity: 0, scaleX: 0, originX: 0.5 },
  visible: { opacity: 1, scaleX: 1 }, 
};

const HoverRectangle = ({ isHovered }) => (
  <motion.div
    variants={rectangleVariants}
    initial="hidden"  
    animate={isHovered ? "visible" : "hidden"}  // hover 상태에 따라 애니메이션을 트리거
    transition={{ duration: 0.3, ease: "easeInOut" }}
    style={{
      position: "absolute",
      bottom: "-10px",
      left: "0",
      height: "8px",
      backgroundColor: "var(--darkblue-color)",
      width: "100%",  // 기본 너비 100%, scaleX가 이를 조정
      borderRadius: "2px",
    }}
  />
);

export default HoverRectangle;
