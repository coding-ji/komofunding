import React, { useState } from "react";
import styles from "./OrderTable.module.css";

const OrderTable = () => {
  const [orders, setOrders] = useState([
    {
      memberId: "20241234",
      name: "조인삼",
      phone: "010-1111-2222",
      orderDate: "2024-11-10",
      orderItem: "A세트 암양포실",
      quantity: 1,
      address: "서울시 영등포구 모모동 인삼아파트 101동 1101호",
    },
    {
      memberId: "20244786",
      name: "백송우",
      phone: "010-7449-0886",
      orderDate: "2024-11-14",
      orderItem: "B세트 암양포실",
      quantity: 5,
      address: "경기도 부천시 중동로 280번길",
    },
    {
        memberId: "20241234",
        name: "조인삼",
        phone: "010-1111-2222",
        orderDate: "2024-11-10",
        orderItem: "A세트 암양포실",
        quantity: 1,
        address: "서울시 영등포구 모모동 인삼아파트 101동 1101호",
      },
      {
        memberId: "20244786",
        name: "백송우",
        phone: "010-7449-0886",
        orderDate: "2024-11-14",
        orderItem: "B세트 암양포실",
        quantity: 5,
        address: "경기도 부천시 중동로 280번길",
      },
      {
        memberId: "20241234",
        name: "조인삼",
        phone: "010-1111-2222",
        orderDate: "2024-11-10",
        orderItem: "A세트 암양포실",
        quantity: 1,
        address: "서울시 영등포구 모모동 인삼아파트 101동 1101호",
      },
      {
        memberId: "20244786",
        name: "백송우",
        phone: "010-7449-0886",
        orderDate: "2024-11-14",
        orderItem: "B세트 암양포실",
        quantity: 5,
        address: "경기도 부천시 중동로 280번길",
      },
      {
        memberId: "20241234",
        name: "조인삼",
        phone: "010-1111-2222",
        orderDate: "2024-11-10",
        orderItem: "A세트 암양포실",
        quantity: 1,
        address: "서울시 영등포구 모모동 인삼아파트 101동 1101호",
      },
      {
        memberId: "20244786",
        name: "백송우",
        phone: "010-7449-0886",
        orderDate: "2024-11-14",
        orderItem: "B세트 암양포실",
        quantity: 5,
        address: "경기도 부천시 중동로 280번길",
      },
      {
        memberId: "20241234",
        name: "조인삼",
        phone: "010-1111-2222",
        orderDate: "2024-11-10",
        orderItem: "A세트 암양포실",
        quantity: 1,
        address: "서울시 영등포구 모모동 인삼아파트 101동 1101호",
      },
      {
        memberId: "20244786",
        name: "백송우",
        phone: "010-7449-0886",
        orderDate: "2024-11-14",
        orderItem: "B세트 암양포실",
        quantity: 5,
        address: "경기도 부천시 중동로 280번길",
      },
      {
        memberId: "20241234",
        name: "조인삼",
        phone: "010-1111-2222",
        orderDate: "2024-11-10",
        orderItem: "A세트 암양포실",
        quantity: 1,
        address: "서울시 영등포구 모모동 인삼아파트 101동 1101호",
      },
      {
        memberId: "20244786",
        name: "백송우",
        phone: "010-7449-0886",
        orderDate: "2024-11-14",
        orderItem: "B세트 암양포실",
        quantity: 5,
        address: "경기도 부천시 중동로 280번길",
      },
      
  ]);


   const [orderChecked, setOrderChecked] = useState(
    orders.map(() => false) // 각 주문 항목에 대해 체크 상태를 false로 초기화
  );
  const [allChecked, setAllChecked] = useState(false);

  // 전체 선택/해제
  const handleSelectAll = () => {
    const newChecked = !allChecked;
    setAllChecked(newChecked);
    setOrderChecked(orders.map(() => newChecked)); // 모든 항목을 선택/해제
  };

  // 개별 행의 체크박스를 클릭할 때
  const handleCheckboxChange = (index) => {
    const updatedChecked = [...orderChecked];
    updatedChecked[index] = !updatedChecked[index]; // 해당 인덱스의 체크 상태를 반전
    setOrderChecked(updatedChecked);
  };

  // 프린트 출력 함수
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>후원자 내역</h1>

      <div className={styles.buttonWrapper} >
        <div className={styles.printBtn}>
          <button className={styles.printButton} onClick={handlePrint}>
            프린트 출력
          </button>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={allChecked}
                  onChange={handleSelectAll}
                />
              </th>
              <th>회원번호</th>
              <th>이름</th>
              <th>휴대폰</th>
              <th>주문날짜</th>
              <th>주문항목</th>
              <th>수량</th>
              <th>주소</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={index}
                className={orderChecked[index] ? styles.selected : ""}
              >
                <td>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={orderChecked[index]}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </td>
                <td>{order.memberId}</td>
                <td>{order.name}</td>
                <td>{order.phone}</td>
                <td>{order.orderDate}</td>
                <td>{order.orderItem}</td>
                <td>{order.quantity}</td>
                <td>{order.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;