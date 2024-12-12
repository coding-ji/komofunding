import styles from './CommunityWrite.module.css';
import EditorItem from '../../../components/EditorItem/EditorItem';
import WriteForm from './WriteForm';
import { useState, useRef, useEffect } from 'react';
import { Btn, WhiteBtn } from '../../../components/MyBtn';
import TitleText from '../../../components/TitleText';
import { useNavigate } from 'react-router-dom';
import {useStore as CommunityStore} from '../../../stores/NoticeStore/useStore'


function CommunityWrite() {
    const { state, actions } = CommunityStore(); // Store의 state와 actions
    const navigate = useNavigate();
    const quillRef = useRef(null); // Quill 인스턴스 관리용 ref
    

   // 에디터 내용 변경 시 호출되는 함수
   const handleEditorChange = (newContent) => {
    actions.changeCommunityContent(newContent);
};




 // 폼 제출 핸들러
 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const communityData = state.community;
        const response = await actions.createNewCommunity(communityData); // response를 반환받음

        if (response) { 
            const responseData = await response.json();
            console.log("응답 데이터:", responseData);
            alert(responseData.message || "글이 성공적으로 작성되었습니다.");
            navigate('/');
        }
        // } else {
        //     const errorText = await response.text();
        //     console.error("Server Error Response:", errorText);
        //     alert("서버에서 오류가 발생했습니다: " + errorText);
        // }
    } catch (error) {
        console.error("글 작성 중 오류 발생:", error);
        alert("글 작성에 실패했습니다.");
    }
};


    return (
        <div className={styles.container}>
            <TitleText title="글쓰기" />
            <div className={styles.editor}>
                <EditorItem
                    editorContent={state.communityContent ||''}
                    setEditorContent={handleEditorChange}
                    quillRef={quillRef} // Quill 인스턴스를 관리할 ref 전달
                />
            </div>
            <div className={styles.optionForm}>
                <WriteForm 
                state={state} action={actions}
                 />
            </div>
            <div className={styles.buttonContainer}>
                <Btn
                    text="작성 완료"
                    onClick={handleSubmit}
                    width="130px"
                    padding="2px 10px"
                    fontSize="1rem"
                    height="40px"
                />
                <WhiteBtn
                    text="취소"
                    width="130px"
                    padding="2px 10px"
                    fontSize="1rem"
                    height="40px"
                    onClick={() => navigate('/')}
                />
            </div>
        </div>
    );
}

export default CommunityWrite;