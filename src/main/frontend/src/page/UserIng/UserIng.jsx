import React, { useEffect } from "react";
import MyContainers from "../../components/MyContainers";
import { useOutletContext } from "react-router-dom";

function UserIng() {
  //Outlet에 전달된 context가져오기
  const { state, actions, loading } = useOutletContext();

  if (!state.payment) {
    return <div>로딩 중...</div>;
  }

  // 삭제 핸들러 예시 (여기에 실제 삭제 로직을 추가할 수 있습니다)
  const handleDelete = (product) => {
    console.log(`삭제하려는 제품: ${product.title}`);
    // 삭제 로직 추가 (예: API 호출 후 상태 업데이트)
  };

  // 수정 핸들러 예시 (여기에 실제 수정 로직을 추가할 수 있습니다)
  const handleEdit = (product) => {
    console.log(`수정하려는 제품: ${product.title}`);
    // 수정 로직 추가 (예: 수정 페이지로 이동)
  };

  // 컨테이너 클릭 시의 핸들러 예시 (제품 클릭 시 어떤 동작을 할지 정의)
  const handleContainerClick = (product) => {
    console.log(`컨테이너 클릭한 제품: ${product.title}`);
    // 클릭 후 어떤 동작을 할지 정의 (예: 상세 페이지로 이동)
  };

  return (
    <div>
      {Array.isArray(state.payment) && state.payment.length > 0 ? (
        <MyContainers
          text="ongoing"
          products={state.payment}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onContainerClick={handleContainerClick}
        />
      ) : (
        <p>후원 중인 프로젝트가 없습니다.</p>
      )}
    </div>
  );
}

export default UserIng;
