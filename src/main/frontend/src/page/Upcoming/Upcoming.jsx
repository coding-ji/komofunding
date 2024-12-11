import React, { useState } from 'react';
import MyContainers from '../../components/MyContainers';
import PopupInquiry from '../MyPage/writeQnA/PopupInquiry';

function Upcoming() {
    // 초기 데이터
    const initialProducts = [
        { id: 1, title: "Product 1", description: "Description for product 1", text: "DELETE" },
        { id: 2, title: "포실포실하덕", description: "얄루얄루", text: "DELETE" },
        { id: 3, title: "포실포실하덕", description: "얄루얄루", text: "DELETE" },
        { id: 4, title: "포실포실하덕", description: "얄루얄루", text: "DELETE" },
        { id: 5, title: "포실포실하덕", description: "얄루얄루", text: "DELETE" },
        { id: 6, title: "포실포실하덕", description: "얄루얄루", text: "DELETE" },
        { id: 7, title: "포실포실하덕", description: "얄루얄루", text: "DELETE" },
        { id: 8, title: "포실포실하덕", description: "얄루얄루", text: "DELETE" },
        { id: 9, title: "포실포실하덕", description: "얄루얄루", text: "DELETE" },
    ];

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

            {/* 데이터 전달 */}
            <MyContainers
                products={products}
                onDelete={handleDeleteClick} // 삭제 핸들러 전달
            />
        </div>
    );
}

export default Upcoming;
