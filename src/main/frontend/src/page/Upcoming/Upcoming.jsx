import React, { useState } from 'react';
import MyContainers from '../../components/MyContainers';
import PopupInquiry from '../MyPage/writeQnA/PopupInquiry';
import { useOutletContext } from "react-router-dom";


function Upcoming() {
    const state = useOutletContext();



    const [products, setProducts] = useState(initialProducts); // 상태로 데이터 관리
    const [isPopupOpen, setIsPopupOpen] = useState(false); // 팝업 상태
    const [productToDelete, setProductToDelete] = useState(null); // 삭제할 아이템 추적

    // 삭제 버튼 클릭 시 팝업 열기
    const handleDeleteClick = (product) => {
        setProductToDelete(product);
        setIsPopupOpen(true);
    };

    // 팝업에서 삭제 클릭 시 삭제
    const handleConfirmDelete = () => {
        if (productToDelete) {
            // id로 비교하여 삭제
            setProducts(products.filter((p) => p.id !== productToDelete.id));
        }
        setIsPopupOpen(false); // 팝업 닫기
        setProductToDelete(null); // 초기화
    };

    return (
        <div>
            {/* 팝업 */}
            {isPopupOpen && (
                <PopupInquiry
                    message={`"${productToDelete?.title}"을(를) 삭제하시겠습니까?`}
                    onClose={() => setIsPopupOpen(false)}
                    handleButtonClick={handleConfirmDelete} // 삭제 실행
                    text="삭제"
                />
            )}
            {console.log(state)}

            {/* 데이터 전달 */}
            <MyContainers
                products={products}
                onDelete={handleDeleteClick} // 삭제 핸들러 전달
            />
        </div>
    );
}

export default Upcoming;
