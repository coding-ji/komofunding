import React, { useState, useEffect } from "react";
import styles from "./OrderTable.module.css";
import TitleText from "../../components/TitleText";
import { useParams } from "react-router-dom";
import { useStore } from "../../stores/PaymentStore/useStore";

const OrderTable = () => {
  const { projectNum } = useParams();
  const { state, actions } = useStore();

  useEffect(async () => {
    await actions.readDonorsByProjectNum(projectNum);
  }, [projectNum]);

  // const [orderChecked, setOrderChecked] = useState(
  //   orders.map(() => false) // 각 주문 항목에 대해 체크 상태를 false로 초기화
  // );
  const [allChecked, setAllChecked] = useState(false);


  // // 전체 선택/해제
  // const handleSelectAll = () => {
  //   const newChecked = !allChecked;
  //   setAllChecked(newChecked);
  //   setOrderChecked(state.project.map(() => newChecked)); // 모든 항목을 선택/해제
  // };

  // // 개별 행의 체크박스를 클릭할 때
  // const handleCheckboxChange = (index) => {
  //   const updatedChecked = [...orderChecked];
  //   updatedChecked[index] = !updatedChecked[index]; // 해당 인덱스의 체크 상태를 반전
  //   setOrderChecked(updatedChecked);
  // };

  // 프린트 출력 함수
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={styles.wrapper}>
      <TitleText height="150px" title="후원자 내역" />


      <div className={styles.buttonWrapper}>
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
                  onChange={() => {console.log("다선택")}}
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
            {Array.isArray(state.payment) &&
              state.payment.map((order, index) => (
                <tr
                  key={index}
                  className={orderChecked[index] ? styles.selected : ""}
                >
                  <td>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={() => console.log("고칠거")}
                      onChange={() => console.log("고칠거")}
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
