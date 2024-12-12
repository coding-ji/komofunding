import React, { useState } from "react";
import MyContainers from "../../components/MyContainers";
import PopupInquiry from "../MyPage/writeQnA/PopupInquiry";
import { useOutletContext } from "react-router-dom";

function Upcoming() {
  const { state, actions, setIsDeleted } = useOutletContext(); // 부모로부터 상태와 액션 가져옴
  const [isPopupOpen, setIsPopupOpen] = useState(false); // 팝업 상태 관리
  const [productToDelete, setProductToDelete] = useState(null); // 삭제할 항목 추적

  // 삭제 버튼 클릭 시 팝업 열기
  const handleDeleteClick = (product) => {
    setProductToDelete(product); // 삭제할 항목 설정
    setIsPopupOpen(true); // 팝업 열기
  };

  // 팝업에서 삭제 확인 버튼 클릭 시 실행
  const handleConfirmDelete = async () => {
    if (productToDelete) {
      const updatedState = state.project.filter(
        (product) => product.projectNum !== productToDelete.projectNum
      );

      // DB에서 삭제할 프로젝트를 제외한 상태로 클라이언트 상태 갱신
      await actions.deleteExistingProject(productToDelete.projectNum);

      // 상태를 갱신한 후 업데이트된 상태로 화면에 반영
      await actions.updateAllFields(updatedState);
      setIsDeleted(true);
    }

    // 팝업 닫기 및 삭제 대상 초기화
    setIsPopupOpen(false);
    setProductToDelete(null);
  };

  return (
    <div>
      <MyContainers
        products={state} // 상태 전달
        onDelete={handleDeleteClick} // 삭제 핸들러 전달
      />

      {/* 팝업 */}
      {isPopupOpen && (
        <PopupInquiry
          message={`"${productToDelete?.title}"을(를) 삭제하시겠습니까?`}
          onClose={() => setIsPopupOpen(false)} // 팝업 닫기
          handleButtonClick={handleConfirmDelete} // 삭제 실행
          text="삭제"
        />
      )}
    </div>
  );
}

export default Upcoming;
