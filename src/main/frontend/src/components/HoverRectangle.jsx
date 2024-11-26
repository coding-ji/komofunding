import { motion } from "framer-motion";

const rectangleVariants = {
  hidden: { opacity: 0, scaleX: 0, originX: 0.5}, // scaleX 초기 상태를 0으로 설정
  visible: { opacity: 1, scaleX: 1 }, // scaleX를 1로 설정 (가운데에서 확장)
};

const HoverRectangle = ({ isHovered }) => (
  <motion.div
    variants={rectangleVariants}
    animate={isHovered ? "visible" : "hidden"}  // 상태에 따라 애니메이션을 트리거
    transition={{ duration: 0.3, ease: "easeInOut" }}
    style={{
      position: "absolute",
      bottom: "-10px",
      left: "0",
      height: "8px",
      backgroundColor: "var(--darkblue-color)",
      width: "100%",  // 기본 너비는 100%로 설정, scaleX가 이를 조정
      borderRadius: "2px"
    }}
  />
);

export default HoverRectangle;
