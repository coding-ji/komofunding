import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 임포트
import MyContainers from '../../components/MyContainers';

function Completed() {
    const navigate = useNavigate(); // useNavigate 훅 사용

    // 초기 데이터
    const products = [
        { title: "진행마감", description: "Description for product 1", text: "LIST" },
        { title: "진행마감", description: "얄루얄루", text: "LIST" },
        { title: "진행마감", description: "얄루얄루", text: "LIST" },
        { title: "진행마감", description: "얄루얄루", text: "LIST" },
        { title: "진행마감", description: "얄루얄루", text: "LIST" },
        { title: "진행마감", description: "얄루얄루", text: "LIST" },
        { title: "진행마감", description: "얄루얄루", text: "LIST" },
        { title: "진행마감", description: "얄루얄루", text: "LIST" },
        { title: "진행마감", description: "얄루얄루", text: "LIST" },
    ];

    // LIST 버튼 클릭 시 이동 함수
    const handleEditClick = (id) => {
        navigate(`/home/ordertable`);  // 수정 경로로 이동
    };

    return (
        <div>
            <MyContainers 
                products={products} 
                onEditClick={handleEditClick}  // onEditClick 전달
            />
        </div>
    );
}

export default Completed;
