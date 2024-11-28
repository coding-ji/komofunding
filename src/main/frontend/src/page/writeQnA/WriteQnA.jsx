import Input from "../../components/input";
import TitleText from "../../components/TitleText";
import { useState } from "react";
import styles from "./WriteQnA.module.css";
import Editor from "../../components/EditorItem/EditorItem";
// import Footer from '../../components/Footer/Footer'

// 문의하기 글쓰기
function WriteQnA() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');



    return (
        <>

        <div className={styles.mainGrid}>
            {/* 상단 섹션 */}
            <div className={styles.topSection}>
                <TitleText title="문의하기" />
            </div>

            {/* 중단 섹션 */}
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
                      <Editor content={content} setContent={setContent} />
              
            </div>
        </div>

        {/* <Footer/> */}
        </>
    );
}

export default WriteQnA;
