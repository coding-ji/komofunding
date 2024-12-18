import React, { useEffect, useState } from "react";
import MyContainers from "../../components/MyContainers";
import PopupInquiry from "../MyPage/writeQnA/PopupInquiry";
import { useNavigate, useOutletContext } from "react-router-dom";

function Upcoming() {
  const { state, actions, setIsDeleted } = useOutletContext(); // 부모로부터 상태와 액션 가져옴
  const [isPopupOpen, setIsPopupOpen] = useState(false); // 팝업 상태 관리
  const [productToDelete, setProductToDelete] = useState(null); // 삭제할 항목 추적
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  const handleContainerClick = (product) => {  
    navigate(`/home/product-details/${product.projectNum}`);
  };

  useEffect(() => {
    if (Array.isArray(state.project) && state.project.length > 0) {
      // 현재 날짜 이후의 project만 필터링
      const filtered = state.project.filter((product) => {
        const projectStartDate = new Date(product.projectStartDate); // 시작 날짜를 Date 객체로 변환
        const today = new Date(); // 현재 날짜
        return projectStartDate > today; // 시작일이 오늘 이후인 항목만 반환
      });

      setFilteredData(filtered); // 필터링된 데이터를 상태로 설정
    }
  }, [state.project]);

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
        products={filteredData} // 상태 전달
        onDelete={handleDeleteClick} // 삭제 핸들러 전달
        onContainerClick={handleContainerClick}   
        text="삭제"
      />
      {/* 팝업 */}
      {isPopupOpen && (
        <PopupInquiry
          message={`"${productToDelete?.title}"을(를) 삭제하시겠습니까?`}
          onClose={() => setIsPopupOpen(false)} // 팝업 닫기
          handleButtonClick={handleConfirmDelete} // 삭제 실행
        />
      )}
    </div>
  );
}

export default Upcoming;
