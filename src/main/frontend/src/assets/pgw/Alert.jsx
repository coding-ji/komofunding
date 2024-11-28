import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Alert.css';  // 스타일 import

const Alert = ({ 
  message, 
  confirmText, 
  cancelText, 
  onConfirm, 
  onCancel, 
  confirmButtonText,  // confirm 버튼 텍스트
  cancelButtonText,   // cancel 버튼 텍스트
  alertButtonText,    // 이메일 전송 버튼 텍스트
  alertButtonClass,   // 이메일 전송 버튼 클래스 이름
}) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const openAlert = () => {
    setIsAlertOpen(true); 
  };

  const closeAlert = () => {
    setIsAlertOpen(false); 
  };

  const handleConfirm = () => {
    if (onConfirm) onConfirm(); 
    closeAlert();
  };

  return (
    <div>
      <button 
        type='button' 
        className={alertButtonClass || "alert-button"}  // 전달된 클래스 이름이나 기본 클래스 사용
        onClick={openAlert}
      >
        {alertButtonText || "이메일 전송"}  {/* 버튼 텍스트 */}
      </button>
      
      {isAlertOpen && (
        <motion.div
          className="alert"
          initial={{ opacity: 0, scale: 0.8 }}  
          animate={{ opacity: 1, scale: 1 }}    
          exit={{ opacity: 0, scale: 0.8 }}    
          transition={{ duration: 0.3 }}        
        >
          <div className="alert-header">
            {/* Optional header */}
          </div>
          <div className="alert-body">
            <p>{message}</p> 
          </div>
          <div className="alert-footer">
            <button className="confirm-btn" onClick={handleConfirm}>
              {confirmButtonText || confirmText}  {/* confirm 버튼 텍스트 */}
            </button>
            <button className="cancel-btn" onClick={closeAlert}>
              {cancelButtonText || cancelText}  {/* cancel 버튼 텍스트 */}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Alert;
