import React, { useState, useRef } from "react";
import Input from "../../../components/input";
import TitleText from "../../../components/TitleText";
import styles from "./WriteQnA.module.css";
import Editor from "../../../components/EditorItem/EditorItem";
import PopupInquiry from "./PopupInquiry"
import { Btn, WhiteBtn } from "../../../components/MyBtn";
import { useNavigate } from "react-router-dom";

function WriteQnA() {
  const [title, setTitle] = useState("");
  const [editorContent, setEditorContent] = useState(""); // 에디터 내용
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const quillRef = useRef(null); // Quill 인스턴스 참조

  const navigate = useNavigate();

  const handleSave = () => {
    console.log(title , editorContent );
    setIsPopupOpen(true);
  };

  const handleCancel = () => {
    navigate("/myqna");
    setTitle("");
    setEditorContent("");
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <div className={styles.mainGrid}>
        <div className={styles.topSection}>
          <TitleText title="문의하기" />
        </div>

        <div className={styles.middleSection}>
          <p className={styles.subtitle}>제목</p>
          <Input
            className={styles.input}
            type="text"
            placeholder="문의 제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <p className={styles.subtitle}>글 내용</p>
          <Editor
            editorContent={editorContent}
            setEditorContent={setEditorContent}
            quillRef={quillRef} 
          />
        </div>

        <div className={styles.buttonContainer}>

          <Btn text="확인" onClick={handleSave} 
          width="100px" height="40px" fontSize="1.1rem" padding="2px 1rem"
           />
          <WhiteBtn text="취소" onClick={handleCancel}
           width="100px" height="40px" fontSize="1.1rem" padding="2px 1rem"
            />

        </div>
      </div>

      {isPopupOpen && (
        <PopupInquiry
          message={
            <>
              문의 글이 등록되었습니다.
              <br />
              답변은 나의 문의 내역에서 확인하세요.
            </>
          }
          onClose={handlePopupClose}
          navigateTo="/myqna"
        />
      )}
    </>
  );
}

export default WriteQnA;
