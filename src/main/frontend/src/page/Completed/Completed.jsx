import React, { useEffect, useState } from "react";
import MyContainers from "../../components/MyContainers";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

function Completed() {
  const { state } = useOutletContext(); // 부모로부터 상태와 액션 가져옴
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [filteredData, setFilteredData] = useState([]);

  // LIST 버튼 클릭 시 이동 함수
  const handleMovement = (projectNum) => {
    navigate(`/home/ordertable/${projectNum}`);
  };
  useEffect(() => {
    if (Array.isArray(state.project) && state.project.length > 0) {
      // 현재 날짜 기준으로 조건에 맞는 project 필터링
      const filtered = state.project.filter((product) => {
        const projectEndDate = new Date(product.projectEndDate); // 종료 날짜
        const today = new Date(); // 오늘 날짜

        // 시작 날짜와 종료 날짜 조건 모두 확인
        return projectEndDate > today;
      });

      setFilteredData(filtered); // 필터링된 데이터를 상태로 설정
    }
  }, [state.project]);

  return (
    <div>
      <MyContainers
        products={filteredData}
        onEdit={handleMovement} // onEditClick 전달
        text="확인"
      />
    </div>
  );
}

export default Completed;
