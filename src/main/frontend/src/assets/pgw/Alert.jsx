import React, { useState } from 'react';
import { motion } from 'framer-motion';  
import './Alert.css';

const Alert = () => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const openAlert = () => {
    setIsAlertOpen(true); 
  };

  const closeAlert = () => {
    setIsAlertOpen(false); 
  };

  return (
    <>
      <button className="alert-button" onClick={openAlert}>Alert 띄우기</button>
      
      <div className="container">
        {isAlertOpen && (
          <motion.div
            className="alert"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}    
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.3 }}        
          >
            <div className="alert-header">
          
            </div>
            <div className="alert-body">
              <p>해당 이메일로 인증코드를 보냈습니다.</p>
            </div>
            <div className="alert-footer">
              <button className="confirm-btn" onClick={closeAlert}>확인</button>
              <button className="cancel-btn" onClick={closeAlert}>취소</button>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default Alert;
