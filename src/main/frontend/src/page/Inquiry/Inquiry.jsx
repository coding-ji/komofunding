import Input from "../../components/input";
import MyBtn from "../../components/MyBtn";
import RichTextEditor from "../../components/RichTextEditor";
import TitleText from "../../components/TitleText";
import { useState } from "react";
import styles from "./Inquiry.module.css";

function Inquiry() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleConfirm = () => {
        console.log('문의 제목:', title);
        console.log('문의 내용:', content);
        alert('문의가 등록되었습니다!');
    };

    const handleCancel = () => {
        setTitle('');
        setContent('');
        alert('문의가 취소되었습니다.');
    };

    return (
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
                <RichTextEditor
                    onChange={(value) => setContent(value)}
                />
            </div>

            {/* 하단 섹션 */}
            <div className={styles.bottomSection}>
                <div className={styles.buttons}>
                    <MyBtn text="확인" onClick={handleConfirm} />
                    <MyBtn text="취소" onClick={handleCancel} />
                </div>
            </div>
        </div>
    );
}

export default Inquiry;
