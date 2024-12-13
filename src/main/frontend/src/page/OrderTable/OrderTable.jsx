import React, { useState, useEffect } from "react";
import styles from "./OrderTable.module.css";
import TitleText from "../../components/TitleText";
import { useParams } from "react-router-dom";
import { useStore } from "../../stores/PaymentStore/useStore";
import { formattedMMDD, formatCurrency } from "../../utils/formattedData";

const OrderTable = () => {
  const { projectNum } = useParams();
  const { state, actions } = useStore();
  const [isLoaded, setIsLoaded] = useState(false);

  // 주문 항목 체크 상태 관리
  const [orderChecked, setOrderChecked] = useState([]);
  const [allChecked, setAllChecked] = useState(false); // 전체 선택 상태

  useEffect(() => {
    const fetchData = async () => {
      await actions.readDonorsByProjectNum(projectNum);
      setIsLoaded(true); // 비동기 요청이 완료된 후에 isLoaded를 true로 설정
    };

    fetchData();
  }, [projectNum]);

  useEffect(() => {
    if (state.payment.length > 0) {
      // 주문 항목 체크 상태 초기화 (전체 항목 체크 여부에 따라)
      setOrderChecked(state.payment.map(() => false));
    }
  }, [state.payment]);

  // 전체 선택/해제
  const handleSelectAll = () => {
    const newChecked = !allChecked;
    setAllChecked(newChecked);
    setOrderChecked(state.payment.map(() => newChecked)); // 모든 항목을 선택/해제
  };
  // 개별 행의 체크박스를 클릭할 때
  const handleCheckboxChange = (index) => {
    const updatedChecked = [...orderChecked];
    updatedChecked[index] = !updatedChecked[index]; // 해당 인덱스의 체크 상태를 반전
    setOrderChecked(updatedChecked);

    // 전체 선택 체크 상태 업데이트
    setAllChecked(updatedChecked.every((checked) => checked));
  };

  // 프린트 출력 함수
  const handlePrint = () => {
    // 선택된 항목 필터링
    const selectedOrders = state.payment.filter(
      (order, index) => orderChecked[index]
    );

    // 새로운 창에서 출력
    const printWindow = window.open("", "", "height=500, width=800");
    printWindow.document.write(
      "<html><head><title>프린트</title></head><body>"
    );
    printWindow.document.write("<h1>후원자 내역</h1>");
    printWindow.document.write('<table border="1">');
    printWindow.document.write(
      "<thead><tr><th>회원번호</th><th>이름</th><th>휴대폰</th><th>주문날짜</th><th>주문항목</th><th>수량</th><th>주소</th></tr></thead><tbody>"
    );

    selectedOrders.forEach((order) => {
      // 각 주문 항목들을 하나의 문자열로 결합
      const itemNames = order.items.map((item) => item.itemName).join("<br>");;
      const itemAmounts = order.items
        .map((item) => formatCurrency(item.itemAmount))
        .join("<br>");

      printWindow.document.write("<tr>");
      printWindow.document.write(`<td>${order.userNum}</td>`);
      printWindow.document.write(`<td>${order.name}</td>`);
      printWindow.document.write(`<td>${order.phoneNumber}</td>`);
      printWindow.document.write(
        `<td>${formattedMMDD(order.paymentDate)}</td>`
      );
      printWindow.document.write(`<td>${itemNames}</td>`);
      printWindow.document.write(`<td>${itemAmounts}</td>`);
      printWindow.document.write(`<td>${order.shippingAddress}</td>`);
      printWindow.document.write("</tr>");
    });

    printWindow.document.write("</tbody></table>");
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
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
            {Array.isArray(state.payment) &&
              state.payment.length > 0 &&
              state.payment.map((order, index) => (
                <tr key={index} className={styles.selected}>
                  <td>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={orderChecked[index]}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </td>
                  <td>{order.userNum}</td>
                  <td>{order.name}</td>
                  <td>{order.phoneNumber}</td>
                  <td>{formattedMMDD(order.paymentDate)}</td>
                  <td>
                    {/* order.items가 배열이라면 각 항목을 순회 */}
                    {order.items.map((item, itemIndex) => (
                      <div key={itemIndex}>{item.itemName}</div>
                    ))}
                  </td>
                  <td>
                    {/* 각 item의 수량을 표시 */}
                    {order.items.map((item, itemIndex) => (
                      <div key={itemIndex}>
                        {formatCurrency(item.itemAmount)}
                      </div>
                    ))}
                  </td>
                  <td>{order.shippingAddress}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
