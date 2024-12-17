import React, { useEffect } from "react";
import MyContainers from "../../components/MyContainers";
import { useOutletContext, useNavigate } from "react-router-dom";

function UserIng() {
  //Outlet에 전달된 context가져오기
  const { state, actions, loading, setIsChanged} = useOutletContext();
  const navigate = useNavigate();

  if (!state.payment) {
    return <div>로딩 중...</div>;
  }

  // 환불 핸들러
  const handleRefund = (product) => {
    const isConfirmed = window.confirm(
      `${product.title}을/를 환불하시겠습니까?`
    );
    if (isConfirmed) {
      const updatedPayments = state.payment.filter(
        (payment) => payment.paymentId !== product.paymentId
      );
      actions.updateAllFields(updatedPayments);

      actions.removePayment(product.paymentId); // 예시: 환불 요청을 하는 액션 호출
      alert("환불이 완료되었습니다.");
      setIsChanged(true);
    } else {
      console.log("환불을 취소했습니다.");
    }
  };

  // 컨테이너 클릭 시의 핸들러 예시 (제품 클릭 시 어떤 동작을 할지 정의)
  const handleContainerClick = (product) => {
    navigate(`/home/product-details/${product.projectNum}`);
  };

  return (
    <div>
      {Array.isArray(state.payment) && state.payment.length > 0 ? (
        <MyContainers
          text="환불"
          products={state.payment}
          onDelete={handleRefund}
          onContainerClick={handleContainerClick}
        />
      ) : (
        <p>후원 중인 프로젝트가 없습니다.</p>
      )}
    </div>
  );
}

export default UserIng;
