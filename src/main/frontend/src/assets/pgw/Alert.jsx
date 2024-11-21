import React, { useState } from 'react';
import { motion } from 'framer-motion';  
import './Alert.css';

const Alert = ({ message, confirmText, cancelText, onConfirm, onCancel }) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const openAlert = () => {
    setIsAlertOpen(true);
  };

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    closeAlert();
  };

  return (
    <>

      <button className="alert-button" onClick={openAlert}>Alert 띄우기</button>

      <div className="container">
        {isAlertOpen && (
          <motion.div
            className="alert"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="alert-header">

            </div>
            <div className="alert-body">

              <p>{message}</p>     {/* 사용할 곳에  message="비밀번호를 변경하시겠습니까?" 본문 내용변경 가능 */}
            </div>
            <div className="alert-footer">
              <button className="confirm-btn" onClick={handleConfirm}>{confirmText}</button>  {/* 사용할 곳에  confirmText="변경" alert 버튼 내용 변경가능 */}
              <button className="cancel-btn" onClick={closeAlert}>{cancelText}</button> {/* 사용할 곳에  cancelText="변경" alert 버튼 내용 변경가능 */}
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default Alert;
