import styled from "styled-components";
import { motion } from "framer-motion";
import "../index.css";
import ProductImg from "./ProductCard1/ProductImg";
import ProductTitle from "./ProductCard1/ProductTitle";
import ProductDescription from "./ProductCard1/ProductDescription";
import { Btn } from "./MyBtn";

const Styleddiv = styled(motion.div)`
  display: grid;
  grid-template-rows: 3fr 0.3fr 0.3fr 0.3fr; /* 각 항목의 비율을 조정 */
  width: 100%;
  height: 100%; /* 부모 컨테이너 높이에 맞게 확장 */
  border-radius: 2px;
`;

function MyContainer({ onContainerClick, text, product, onClick }) {
  return (
    <Styleddiv
      whileHover={{
        scale: 1.02,
        boxShadow: "10px 10px 15px rgba(0, 0, 0, 0.3)",
      }}
      transition={{ type: "spring", stiffness: 100, transition: 0.1 }}
    >
      <motion.div>
        <ProductImg src={product.thumbnailImgs[0]} />
      </motion.div>
      <motion.div onClick={onContainerClick}>
        <ProductTitle
          title={product.title}
          fontFamily="var(--kr-font)"
        />
      </motion.div>
      <motion.div>
        <ProductDescription description={product.projectShortDescription} />
      </motion.div>
      <motion.div>
        <Btn text={text} fontFamily="var(--eng-font)" onClick={onClick} />
      </motion.div>
    </Styleddiv>
  );
}

export default MyContainer;
