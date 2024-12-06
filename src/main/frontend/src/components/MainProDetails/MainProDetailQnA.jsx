import React, { forwardRef } from "react";
import DescriptionProduct from "../DescriptionProduct";
import TitleBox from "../TitleBox";

const MainProDetailQnA = forwardRef((props, ref) => {
    return (
        <div ref={ref}> {/* ref를 여기에 전달해야 함 */}
            <TitleBox text="상품 문의" />
            <DescriptionProduct
                color="black"
                text="이거 데이터 어떻게 받아올거예요?"
            />
        </div>
    );
});

export default MainProDetailQnA;
