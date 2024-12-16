import React, { useState } from 'react';
import MyContainers from '../../components/MyContainers';
import PopupInquiry from '../MyPage/writeQnA/PopupInquiry';

function UserCompleted() {
    // 초기 데이터
    const initialProducts = [
        { id: 1, title: "Product 1", description: "Description for product 1", text: "DELETE" },
        { id: 2, title: "포실포실하덕", description: "얄루얄루", text: "DELETE" },
        { id: 3, title: "포실포실하덕", description: "얄루얄루", text: "DELETE" },
    ];

    const [products, setProducts] = useState(initialProducts ?? []); // 상태 초기화
    const [isPopupOpen, setIsPopupOpen] = useState(false); // 팝업 상태
    const [productToDelete, setProductToDelete] = useState(null); // 삭제할 상품 추적

    // 삭제 버튼 클릭 시 팝업 열기
    const handleDeleteClick = (product) => {
        if (!product) {
            console.warn("삭제하려는 상품이 존재하지 않습니다:", product);
            return;
        }
        setProductToDelete(product);
        setIsPopupOpen(true);
    };

    // 팝업에서 삭제 확인 시 실행
    const handleConfirmDelete = () => {
        if (!productToDelete) {
            console.warn("삭제할 상품이 없습니다.");
            return;
        }

        // 삭제 로직 수행
        setProducts((prevProducts) =>
            prevProducts.filter((p) => p.id !== productToDelete.id)
        );

        // 팝업 상태 및 삭제 상품 초기화
        setIsPopupOpen(false);
        setProductToDelete(null);
    };

    return (
        <div>
            {/* 팝업 */}
            {isPopupOpen && productToDelete && (
                <PopupInquiry
                    message={`"${productToDelete.title}"을(를) 삭제하시겠습니까?`}
                    onClose={() => {
                        console.log("팝업 닫힘");
                        setIsPopupOpen(false);
                    }}
                    handleButtonClick={() => {
                        console.log("삭제 확인 클릭");
                        handleConfirmDelete();
                    }}
                    text="삭제"
                />
            )}

            {/* 데이터 렌더링 */}
            <MyContainers
                products={products} 
                onDelete={handleDeleteClick}
            />
        </div>
    );
}

export default UserCompleted;
