function CommunityWrite() {
  const { state, actions } = CommunityStore(); // Store의 state와 actions
  const navigate = useNavigate();
  const quillRef = useRef(null); // Quill 인스턴스 관리용 ref
  const [modalOpenSubmit, setModalOpenSubmit] = useState(false)
  const [modalOpenCancel, setModalOpenCancel] = useState(false)
  const [errorModalOpen, setErrorModalOpen] = useState(false); // 오류 모달 상태 // 이벤트에서 종료일 미설정
  

 // 에디터 내용 변경 시 호출되는 함수
 const handleEditorChange = (newContent) => {
  actions.changeCommunityContent(newContent);
};


// 모달 닫기
const closeSubmitModal = () => {
  setModalOpenSubmit(false);
  setModalOpenCancel(false);  
  setErrorModalOpen(false); // 오류 모달 닫기
};


// 폼 제출 핸들러
const handleSubmit = async () => {
const communityData = state.community;

console.log("communityCategory:", communityData.communityCategory);
console.log("endDate:", communityData.endDate);

if (
    communityData.communityCategory === "EVENT" &&
    (!communityData.endDate || communityData.endDate.trim() === "")
) {
    console.log("조건 충족: 종료일이 입력되지 않음");
    setErrorModalOpen(true); // 상태 업데이트
    return;
}

try {
    const response = await actions.createNewCommunity(communityData);
    if (response) {
        const responseData = await response.json();
        alert(responseData.message || "글이 성공적으로 작성되었습니다.");
    }
    navigate("/admin");
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
                  onClick={()=>{setModalOpenSubmit(true)}}
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
                  onClick={()=>{setModalOpenCancel(true)}}
              />
          </div>
          {modalOpenSubmit && (
      <Popup
        message="글을 작성하시겠습니까?"
        onConfirm={() => {
          handleSubmit(); // 제출 핸들러 호출
          closeSubmitModal(); // 모달 닫기
        }}
        onClose={closeSubmitModal} // 모달 닫기
      />
    )}
       {modalOpenCancel && (
      <Popup
        message="작성을 취소하시겠습니까?"
        onConfirm={()=>{
          navigate('/admin')// /admin으로 이동
          closeSubmitModal()} // 모달 닫기
        }
        onClose={closeSubmitModal} // 모달 닫기         
      />
    )}
    {errorModalOpen && (
                 <Popup
                 message="이벤트 글은 종료일을 반드시 입력해야 합니다."
                 onConfirm={closeSubmitModal} // onConfirm을 올바르게 설정
             />
          )}
      </div>
  );
}

export default CommunityWrite;