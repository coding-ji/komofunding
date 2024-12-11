import React, { useState } from 'react';
import styles from './AddressSearchModal.module.css'; // 스타일 파일

const AddressSearchModal = ({ onClose, onAddressSelect }) => {
  const [address, setAddress] = useState("");

  const handleSearch = () => {
    // 주소를 검색하고 결과를 처리하는 로직
    if (address) {
      onAddressSelect(address);  // 부모 컴포넌트로 선택된 주소 전달
      onClose();  // 모달 닫기
    } else {
      alert("주소를 입력하세요");
    }
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h2>주소 검색</h2>
        <input
          type="text"
          placeholder="도로명 주소를 입력하세요"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button onClick={handleSearch}>주소 검색</button>
        <button onClick={() => onClose()}>닫기</button>
      </div>
    </div>
  );
};

export default AddressSearchModal;
