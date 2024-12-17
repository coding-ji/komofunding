import React, { useState, useEffect } from "react";
import { Btn, WhiteBtn } from "../MyBtn";
import styles from "./ProgressContainer.module.css";
import Progress from "../Progress";
import AmountInfo from "./AmountInfo";
import MyNavLine from "../MyNavLine";
import { formatCurrency, formatAchievementRate } from "../../utils/formattedData";

const ProgressContainer = ({ project, paymentState, paymentActions, onClickPayButton }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false); // 아코디언 상태 관리

  // 프로젝트 시작일과 현재 날짜 비교
  const currentDate = new Date();
  const projectStartDate = new Date(project.projectStartDate);
  const projectEndDate = new Date(project.projectEndDate);
  const isProjectStarted = projectStartDate <= currentDate;
  const isProjectEnded = projectEndDate < currentDate;

  // 선택된 아이템들의 총 금액 계산
  useEffect(() => {
    if (Array.isArray(paymentState.items)) {
      const calculatedTotalPrice = paymentState.items.reduce(
        (sum, item) => sum + item.itemPrice * item.itemAmount, // 총 금액 계산
        0
      );
      paymentActions.changePaidAmount(calculatedTotalPrice); // 총 금액 업데이트
    }
  }, [paymentState.items]);

  // 아이템 추가 함수
  const handleAddItem = async (item) => {
    // 기존 아이템이 이미 있다면, 그 아이템의 수량을 증가시킴
    const existingItemIndex = paymentState.items.findIndex(
      (existingItem) => existingItem.itemName === item.itemName
    );

    if (existingItemIndex >= 0) {
      // 기존 아이템이 있으면, 수량만 증가
      const updatedItems = [...paymentState.items];
      updatedItems[existingItemIndex].itemAmount += 1;
      await paymentActions.changeItems(updatedItems); // 상태 갱신
    } else {
      // 기존 아이템이 없으면, 새 아이템을 추가
      const updatedItems = [...paymentState.items, { ...item, itemAmount: 1 }];
      await paymentActions.changeItems(updatedItems); // 상태 갱신
    }

    setIsAccordionOpen(false);
  };

  // 아이템 제거 함수
  const handleRemoveItem = (index) => {
    const updatedItems = paymentState.items.filter((_, i) => i !== index);
    paymentActions.changeItems(updatedItems); // 아이템 제거 후 상태 업데이트
  };

  // 수량 업데이트 함수
  const handleUpdateCount = (index, newCount) => {
    const updatedItems = [...paymentState.items];
    updatedItems[index].itemAmount = newCount; // 새로운 수량으로 업데이트
    paymentActions.changeItems(updatedItems); // 상태 업데이트
  };

  // 링크 복사 함수
  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        alert("링크가 클립보드에 복사되었습니다!");
      })
      .catch((err) => {
        console.error("링크 복사 실패:", err);
      });
  };

  return (
    <div className={styles.container}>
      {/* 금액 정보 */}
      <div className={styles.amountInfoWrapper}>
        <AmountInfo
          amount={project.currentAmount}
          percentage={formatAchievementRate(project.progressRate)}
        />
      </div>

      {/* Progress 영역 */}
      <div className={styles.progressWrapper}>
        <Progress
          color="#F5E6D6"
          value={project.currentAmount}
          max={project.totalAmount}
        />
        <p className={styles.targetAmount}>
          목표금액 : {formatCurrency(project.totalAmount)} 원
        </p>
      </div>
      <div>
        <MyNavLine />
      </div>

    {/* 드롭다운(아코디언) */}
    <div className={styles.accordionWrapper}>
      {/* 프로젝트 종료 상태일 경우 메시지 표시 */}
      {isProjectEnded ? (
        <div style={{ textAlign: "center", color: "red" }}>
          프로젝트가 종료되었습니다
        </div>
      ) : (
        <>
          <button
            className={`${styles.accordionToggle} ${
              isAccordionOpen ? styles.open : ""
            }`}
            onClick={() => setIsAccordionOpen(!isAccordionOpen)}
            disabled={!isProjectStarted} // 프로젝트 시작 전에는 드롭다운을 비활성화
          >
            상품을 선택해주세요
          </button>

          {/* 프로젝트가 시작되지 않았으면 메시지 표시 */}
          {!isProjectStarted && (
            <div style={{ textAlign: "center" }}>
              아직 시작하지 않은 후원입니다
            </div>
          )}

          {/* 프로젝트가 시작되었을 때만 드롭다운 표시 */}
          {isProjectStarted && (
            <div
              className={styles.dropdownContent}
              style={{ visibility: isAccordionOpen ? "visible" : "hidden" }}
            >
              {Array.isArray(project.items) &&
                project.items.map((item) => (
                  <div
                    key={item.itemName}
                    className={styles.dropdownItem}
                    onClick={() => handleAddItem(item)}
                  >
                    <span>{item.itemName}</span>
                    <span className={styles.itemPrice}>
                      {formatCurrency(item.itemPrice)} 원
                    </span>
                  </div>
                ))}
            </div>
          )}
        </>
      )}
    </div>


      {/* 선택된 아이템 상자 */}
      <div className={styles.itemsContainer}>
        {Array.isArray(paymentState.items) &&
          paymentState.items.map((item, index) => (
            <div key={item.itemName} className={styles.selectedItemBox}>
              <div className={styles.itemBtnName}>
                <p className={styles.itemName}>{item.itemName}</p>
                <div
                  className={styles.closeBtn}
                  onClick={() => handleRemoveItem(index)}
                >
                  x
                </div>
              </div>
              <div className={styles.itemControls}>
                <button
                  onClick={() =>
                    handleUpdateCount(index, Math.max(1, item.itemAmount - 1))
                  }
                  className={styles.controlBtn}
                >
                  -
                </button>
                <span>{item.itemAmount}</span>
                <button
                  onClick={() => handleUpdateCount(index, item.itemAmount + 1)}
                  className={styles.controlBtn}
                >
                  +
                </button>
                <span className={styles.itemPrice}>
                  {formatCurrency(item.itemPrice * item.itemAmount)} 원
                </span>
              </div>
            </div>
          ))}
      </div>

      {/* 선택된 상품 총 금액 */}
      <div className={styles.totalPrice}>
        총 금액: {formatCurrency(paymentState.paidAmount)} 원
      </div>

      {/* 버튼 영역 */}
      <div className={styles.buttonContainer}>
        <Btn
          text="후원하기"
          width="78%"
          height="50px"
          fontSize="1.2rem"
          padding="10px"
          onClick={onClickPayButton}
        />
        <WhiteBtn
          text="링크"
          width="20%"
          height="50px"
          fontSize="1.2rem"
          padding="10px"
          onClick={handleCopyLink}
        />
      </div>
    </div>
  );
};

export default ProgressContainer;
