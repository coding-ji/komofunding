import React from "react";
import ProductItem from "./ProductItem"; // ProductItem 컴포넌트 임포트
import styled from "styled-components";
import '../index.css';


const ProductDetails = styled.div`
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family : var(--kr-font);
  font-size : 1rem;

`;

function ProductList({ products }) {
  return (
    <>
      {products.length > 0 && (
        <ProductDetails>
          {products.map((product, index) => (
            <ProductItem key={index} product={product} />
          ))}
        </ProductDetails>
      )}
    </>
  );
}

export default ProductList;
