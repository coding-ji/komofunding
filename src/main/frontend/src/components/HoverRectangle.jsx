import { motion } from "framer-motion";

const rectangleVariants = {
  hidden: { opacity: 0, scaleX: 0, originX: 0.5 },  // 초기 상태: 숨겨지고 크기 0
  visible: { opacity: 1, scaleX: 1 },  // visible 상태: 크기 1로 확장되고 불투명도 1
};

const HoverRectangle = ({ isHovered }) => (
  <motion.div
    variants={rectangleVariants}
    initial="hidden"  // 초기 상태를 "hidden"으로 명시적으로 설정
    animate={isHovered ? "visible" : "hidden"}  // hover 상태에 따라 애니메이션을 트리거
    transition={{ duration: 0.3, ease: "easeInOut" }}
    style={{
      position: "absolute",
      bottom: "-10px",
      left: "0",
      height: "8px",
      backgroundColor: "var(--darkblue-color)",
      width: "100%",  // 기본 너비는 100%로 설정, scaleX가 이를 조정
      borderRadius: "2px",
    }}
  />
);

export default HoverRectangle;
