import React from 'react';
import MyContainers from '../../components/MyContainers';
import { useNavigate } from 'react-router-dom';

// 샘플 데이터 정의
const products = [
  { id: 1, title: "진행중", description: "Description for product 1", text: "EDIT" },
  { id: 2, title: "진행중", description: "얄루얄루", text: "EDIT" },
  { id: 3, title: "진행중", description: "얄루얄루", text: "EDIT" },
  { id: 4, title: "진행중", description: "얄루얄루", text: "EDIT" },
  { id: 5, title: "진행중", description: "얄루얄루", text: "EDIT" },
  { id: 6, title: "진행중", description: "얄루얄루", text: "EDIT" },
  { id: 7, title: "진행중", description: "얄루얄루", text: "EDIT" },
  { id: 8, title: "진행중", description: "얄루얄루", text: "EDIT" },
  { id: 9, title: "진행중", description: "얄루얄루", text: "EDIT" },
];

function Ongoing() {
  const navigate = useNavigate(); // useNavigate 훅 사용

  // 'EDIT' 클릭 시 이동 함수
  const handleEditClick = (productId) => {
    navigate(`/home/product-details/${productId}`); // 해당 제품 상세 페이지로 이동
  };

  return (
    <div>
      <MyContainers 
        products={products}
        onEditClick={handleEditClick} // 클릭 핸들러 전달
      />
    </div>
  );
}

export default Ongoing;
