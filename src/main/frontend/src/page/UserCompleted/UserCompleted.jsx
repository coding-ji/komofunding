import MyContainers from "../../components/MyContainers";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function UserCompleted() {
  const { state, actions, loading } = useOutletContext();
  const navigate = useNavigate();

  if (!state.payment) {
    return <div>로딩 중...</div>;
  }

  const handleContainerClick = (product) => {
    navigate(`/home/product-details/${product.projectNum}`);
  };

  return (
    <div>
      {/* 데이터 렌더링 */}
      {Array.isArray(state.payment) && state.payment.length > 0 ? (
        <MyContainers
          products={state.payment}
          text="확인"
          onContainerClick={handleContainerClick}
        />
      ) : (
        <p>마감된 후원이 없습니다. </p>
      )}
    </div>
  );
}

export default UserCompleted;
