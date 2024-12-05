import styled from "styled-components";
import { motion } from "framer-motion";

const Note = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-width: 942px; /* 최대 너비 설정 */
  height: 109px; /* 고정 높이 설정 */
  padding: 15px 37px;
  gap: 10px;
  border-radius: 2px;
  border: 1px solid #e4e4e4;
  cursor: pointer;

  @media (max-width: 1024px) {
    padding: 10px 25px;
  }

  @media (max-width: 768px) {
    padding: 10px 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
    height: auto;
  }
`;

const Notep = styled.p`
  color: #256e91;
  font-family: "Noto Sans KR";
  font-size: 15px;
  font-weight: 500;
  line-height: 22px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 1024px) {
    font-size: 14px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const NoteTitle = styled.h1`
  color: var(--user-mainHome, #282828);
  font-family: "Noto Sans KR";
  font-size: 20px;
  font-weight: 700;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 1024px) {
    font-size: 18px;
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const Notification = ({ props }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        transition: { duration: 0.3 },
      }}
      style={{
        width: "100%",
        maxWidth: "942px",
      }}
    >
      <Note>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Notep>{props.category}</Notep>
          <Notep>{props.date_author}</Notep>
        </div>
        <NoteTitle>{props.title}</NoteTitle>
      </Note>
    </motion.div>
  );
};

export default Notification;
