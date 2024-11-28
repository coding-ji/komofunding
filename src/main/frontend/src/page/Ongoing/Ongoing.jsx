import React from 'react';
import MyContainers from '../../components/MyContainers';

// 샘플 데이터 정의
const products = [
  { title: "진행중", description: "Description for product 1", text: "EDIT" },
  { title: "진행중", description: "얄루얄루", text: "EDIT" },
  { title: "진행중", description: "얄루얄루", text: "EDIT" },
  { title: "진행중", description: "얄루얄루", text: "EDIT" },
  { title: "진행중", description: "얄루얄루", text: "EDIT" },
  { title: "진행중", description: "얄루얄루", text: "EDIT" },
  { title: "진행중", description: "얄루얄루", text: "EDIT" },
  { title: "진행중", description: "얄루얄루", text: "EDIT" },
  { title: "진행중", description: "얄루얄루", text: "EDIT" },
];

function Ongoing() {
    return (
        <div>
            <MyContainers products={products} /> {/* 데이터 전달 */}
        </div>
    )
}

export default Ongoing;
