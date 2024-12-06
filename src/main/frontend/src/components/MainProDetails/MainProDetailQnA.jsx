import React, { forwardRef } from "react";
import DescriptionProduct from "../DescriptionProduct";
import TitleBox from "../TitleBox";
import { ProductBtn1, ProductBtn2 } from "../MyBtn";
import styled from "styled-components";

const Head = styled.div`
margin : 16px 16px 0px 16px;
display : flex;
justify-content: space-between



`;


const MainProDetailQnA = forwardRef((props, ref) => {
    return (
        <div ref={ref}> {/* ref를 여기에 전달해야 함 */}
            <TitleBox text="상품 문의" />
            <Head>
                <DescriptionProduct
                    color="black"
                    text="해당 제품과 관련 없는 글, 양도, 광고, 욕설, 비방 등은 예고 없이 삭제됩니다."
                    lineHeight="2rem"
                    fontSize="1rem"
                    fontWeight="bold"
                    letterSpacing="0.4px"
                />
                <ProductBtn2
                padding="3px 0px"
                width="90px"
                fontSize="1rem"
                text="문의하기" />
            </Head>

            
        </div>
    );
});

export default MainProDetailQnA;
