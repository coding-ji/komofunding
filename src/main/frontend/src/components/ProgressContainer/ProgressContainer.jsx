import React, { useState, useEffect } from 'react';
import { Btn, ProductBtn1, ProductBtn2, WhiteBtn } from '../MyBtn';
import styles from './ProgressContainer.module.css';
import Progress from '../Progress';
import AmountInfo from './AmountInfo';
import OtherText from './OtherText';
import MyNavLine from '../MyNavLine';

const ProgressContainer = () => {
  const [projectData, setProjectData] = useState([]); // JSON 데이터를 저장
  const [selectedProject, setSelectedProject] = useState(null); // 선택된 프로젝트 저장
  const [selectedItems, setSelectedItems] = useState([]); // 선택된 아이템들 저장
  const [isAccordionOpen, setIsAccordionOpen] = useState(false); // 아코디언 상태 관리
  const [totalSelectedPrice, setTotalSelectedPrice] = useState(0); // 선택된 아이템들의 총 금액

  // 초기 JSON 데이터 로드
  // useEffect(() => {
  //   const fetchProjectData = async () => {
  //     const response = await fetch('/data/projectData.json'); // JSON 경로
  //     const data = await response.json();
  //     setProjectData(data);
  //   };
  //   fetchProjectData();
  // }, []);

  // 선택된 아이템들의 총 금액 계산
  useEffect(() => {
    const calculatedTotalPrice = selectedItems.reduce(
      (sum, item) => sum + item.itemPrice * item.count,
      0
    );
    setTotalSelectedPrice(calculatedTotalPrice);
  }, [selectedItems]);

  const handleAddItem = (project, item) => {
    setSelectedProject(project); // 선택된 프로젝트 저장
    setSelectedItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (selectedItem) => selectedItem.itemName === item.itemName
      );
      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].count += 1; // 기존 아이템의 수량 증가
        return updatedItems;
      }
      return [...prevItems, { ...item, count: 1 }]; // 새 아이템 추가
    });
    setIsAccordionOpen(false);
  };

  const handleRemoveItem = (index) => {
    setSelectedItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleUpdateCount = (index, newCount) => {
    setSelectedItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index].count = newCount;
      return updatedItems;
    });
  };

  // JSON 데이터에서 현재금액 및 목표금액 가져오기
  const currentAmount = selectedProject ? parseInt(selectedProject.currentAmount, 10) : 0;
  const targetAmount = selectedProject ? parseInt(selectedProject.totalAmount, 10) : 0;

  // 퍼센트 계산 로직 유지
  const percentage = targetAmount ? ((currentAmount / targetAmount) * 100).toFixed(2) : 0;

  return (
    <div className={styles.container}>
      {/* 기타 영역 */}
      <div className={styles.OtherTextWrapper}>
        <OtherText text="기타" />
      </div>

      {/* 버튼 영역 */}
      <div className={styles.buttonWrapper}>
        <ProductBtn1 text="삭제" width="100px" height="40px" fontSize="1rem" padding="5px" />
      </div>

      {/* 금액 정보 */}
      <div className={styles.amountInfoWrapper}>
        <AmountInfo amount={currentAmount} percentage={percentage} />
      </div>

      {/* Progress 영역 */}
      <div className={styles.progressWrapper}>
        <Progress color="#F5E6D6" value={currentAmount} max={targetAmount} />
        <p className={styles.targetAmount}>목표금액 : {targetAmount.toLocaleString()} 원</p>
      </div>
      <div>
        <MyNavLine />
      </div>

      {/* 드롭다운(아코디언) */}
      <div className={styles.accordionWrapper}>
        <button
          className={`${styles.accordionToggle} ${isAccordionOpen ? styles.open : ''}`}
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
        >
          상품을 선택해주세요
        </button>
        {isAccordionOpen && (
          <div className={styles.dropdownContent}>
            {projectData.map((project) =>
              project.items.map((item) => (
                <div
                  key={item.itemName}
                  className={styles.dropdownItem}
                  onClick={() => handleAddItem(project, item)}
                >
                  <span>{item.itemName}</span>
                  <span className={styles.itemPrice}>{item.itemPrice.toLocaleString()} 원</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* 선택된 아이템 상자 */}
      {selectedItems.map((item, index) => (
        <div key={item.itemName} className={styles.selectedItemBox}>
          <div className={styles.closeBtn} onClick={() => handleRemoveItem(index)}>
            x
          </div>
          <p className={styles.itemName}>{item.itemName}</p>
          <div className={styles.itemControls}>
            <button
              onClick={() => handleUpdateCount(index, Math.max(1, item.count - 1))}
              className={styles.controlBtn}
            >
              -
            </button>
            <span>{item.count}</span>
            <button
              onClick={() => handleUpdateCount(index, item.count + 1)}
              className={styles.controlBtn}
            >
              +
            </button>
            <span className={styles.itemPrice}>
              {(item.itemPrice * item.count).toLocaleString()} 원
            </span>
          </div>
        </div>
      ))}

      {/* 선택된 상품 총 금액 */}
      <div className={styles.totalPrice}>
        총 금액: {totalSelectedPrice.toLocaleString()} 원
      </div>

      {/* 버튼 영역 */}
      <div className={styles.buttonContainer}>
        <Btn text="후원하기" width="78%" height="50px" fontSize="1.2rem" padding="10px" />
        <WhiteBtn text="링크" width="20%" height="50px" fontSize="1.2rem" padding="10px" />
      </div>
    </div>
  );
};

export default ProgressContainer;
