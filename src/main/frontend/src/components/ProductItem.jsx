import styled from "styled-components";
import { motion } from "framer-motion"; // framer-motion import

const DetailLabel = styled.span`
  font-weight: bold;
`;

const DetailValue = styled.span`
  font-weight: normal;
`;

const DetailItem = styled.p`
  margin: 10px 0;
`;

const ProductItem = ({ product }) => {
  // framer-motion을 이용해 opacity 애니메이션 설정
  return (
    <motion.div
      initial={{ opacity: 0 }} // 초기 opacity 값
      animate={{ opacity: 1 }} // 애니메이션이 끝났을 때 opacity 값
      transition={{ duration: 0.3 }} // 애니메이션의 지속 시간
    >
      <DetailItem>
        <DetailLabel>상품명: </DetailLabel>
        <DetailValue>{product.name}</DetailValue>
      </DetailItem>
      <DetailItem>
        <DetailLabel>상품 가격: </DetailLabel>
        <DetailValue>{product.price}</DetailValue>
      </DetailItem>
      <DetailItem>
        <DetailLabel>상품 수량: </DetailLabel>
        <DetailValue>{product.quantity}</DetailValue>
      </DetailItem>
    </motion.div>
  );
};

export default ProductItem;
