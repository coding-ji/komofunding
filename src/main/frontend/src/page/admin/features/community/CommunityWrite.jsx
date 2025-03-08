import styles from "./CommunityWrite.module.css";
import EditorItem from "../../../../components/EditorItem/EditorItem";
import WriteForm from "./WriteForm";
import { useState, useRef, useEffect } from "react";
import {
  AdminBtn1,
  AdminBtn2,
  Btn,
  WhiteBtn,
} from "../../../../components/MyBtn";
import TitleText from "../../../../components/TitleText";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useStore as CommunityStore } from "../../../../stores/NoticeStore/useStore";
import { useStore as QnaStore } from "../../../../stores/QnaStore/useStore";
import { useStore as FileStore } from "../../../../stores/FileStore/useStore";
import Popup from "../../../../components/Popupmodal/Popup";

function CommunityWrite() {
  const { userNum, communityNumber } = useParams();

  // 유저는 QnaStore
  const { state: qnaState, actions: qnaActions } = QnaStore();

  // 관리자는 fileStore를 사용해서 html파일로 해당 파일 저장
  const { state: fileState, actions: fileActions } = FileStore();

  // 관리자는 communityStore를 통해서 이벤트 작성
  const { state, actions } = CommunityStore();

  const navigate = useNavigate();
  const location = useLocation();

  // 글쓰기 퀼
  const quillRef = useRef(null);
  const [editorContent, setEditorContent] = useState(""); // 에디터 내용
  const [htmlContent, setHtmlContent] = useState(""); // 보내는 내용
  const [modalOpenSubmit, setModalOpenSubmit] = useState(false);
  const [modalOpenCancel, setModalOpenCancel] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  // 수정 모드 여부 체크
  useEffect(() => {
    if (communityNumber) {
      actions.readCommunityById(communityNumber);
    }
  }, [communityNumber]);

  //HTML 파일 로드
  useEffect(() => {
    if (state.communities) {
      const { communityContent } = state.communities;
      fileActions.readFileData(communityContent);
      actions.updateAllFields(state.communities);
    }
  }, [state.communities]);

  // html 파일 전환
  useEffect(() => {
    if (fileState && communityNumber) {
      // HTML 파싱
      const parser = new DOMParser();
      const parsedHtml = parser.parseFromString(fileState, "text/html");
      // editorContent에 <body> 내용만 설정
      setHtmlContent(parsedHtml.body.innerHTML);

      setIsEditing(true);
    }
  }, [fileState, communityNumber]);

  // 생성
  // 관리자 > HTML Blob 생성 및 파일 저장
  const saveHtmlToFile = async () => {
    const encoder = new TextEncoder();
    const utf8EncodedContent = encoder.encode(editorContent);

    const htmlContent = `
        <html>
          <head>
            <meta charset="UTF-8">
            <title>Editor Content</title>
          </head>
          <body>
            ${editorContent}
          </body>
        </html>
      `;
    const htmlBlob = new Blob([htmlContent], {
      type: "text/html;charset=utf-8",
    });
    const formDataDescription = new FormData();
    formDataDescription.append("file", htmlBlob, "description.html");

    // File 저장
    await fileActions.createFileData(formDataDescription);
  };

  // HTML 태그 제거 함수
  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  // 제출 핸들러
  const handleSubmit = async () => {
    // 필수 값 체크
    const title = state.community.communityTitle?.trim(); // 공백 제거 후 제목 값 확인
    const questionComment = stripHtmlTags(editorContent); // HTML 태그를 제거한 내용

    if (!title) {
      // 제목이 비어있는 경우
      alert("제목을 입력해주세요.");
      return;
    }
    if (!editorContent?.trim()) {
      // 에디터 내용이 비어있는 경우
      alert("내용을 입력해주세요.");
      return;
    }
    try {
      if (location.pathname.includes("admin")) {
        // Admin: 파일 저장 후 커뮤니티 데이터 저장
        await saveHtmlToFile();
        setIsDone(true);
      } else if (location.pathname.includes("inquiry")) {
        // Inquiry: QnaStore를 사용하여 질문 작성
        const questionData = {
          qnaCategory: "QUESTION",
          title: state.community.communityTitle,
          questionComment: questionComment,
        };
        await qnaActions.createNewQuestion(questionData);
      }
    } catch (error) {
      console.error("작업 중 오류 발생:", error);
      alert("작업에 실패했습니다.");
    }

    navigate(location.pathname.includes("inquiry") && "/home/inquiry");
  };

  useEffect(() => {
    const createCommunity = async () => {
      if (isDone) {
        const updatedCommunityData = {
          ...state.community,
          communityContent: fileState,
          // endDate 처리: T00:00:00을 추가하여 LocalDateTime 형식으로 변환
          endDate: state.community.endDate 
            ? `${state.community.endDate}T00:00:00` 
            : "",
        };
        if (isEditing) {
          await actions.updateExistingCommunity(
            communityNumber,
            updatedCommunityData
          );
        } else {
          await actions.createNewCommunity(updatedCommunityData);
        }

        alert("작업이 성공적으로 완료되었습니다.");
        navigate(
          location.pathname.includes("admin") &&
            "/admin/community/notice-faq?tab=ALL"
        );
      }
    };

    createCommunity();
  }, [isDone]);

  // 삭제 핸들러
  const handleDelete = async () => {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      await actions.deleteExistingCommunity(state.community.communityId);
      alert("삭제가 완료되었습니다.");
      navigate("/admin/community/notice-faq");
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
      alert("삭제에 실패했습니다.");
    }
  };

  // 모달 닫기
  const closeSubmitModal = () => {
    setModalOpenSubmit(false);
    setModalOpenCancel(false);
    setErrorModalOpen(false);
  };

  return (
    <div className={styles.container}>
      {location.pathname.includes("admin") && (
        <>
          <TitleText title={isEditing ? "글 수정" : "글쓰기"} />
          <div className={styles.editor}>
            <EditorItem
              editorContent={editorContent}
              setEditorContent={setEditorContent}
              quillRef={quillRef}
              htmlContent={htmlContent}
            />
          </div>
          <div className={styles.optionForm}>
            <WriteForm state={state} actions={actions} />
          </div>
          <div className={styles.buttonContainer}>
            <AdminBtn1
              text={isEditing ? "수정 완료" : "작성 완료"}
              onClick={() => setModalOpenSubmit(true)}
              width="130px"
              padding="2px 10px"
              fontSize="1rem"
              height="40px"
            />
            {isEditing && (
              <WhiteBtn
                text="삭제"
                width="130px"
                padding="2px 10px"
                fontSize="1rem"
                height="40px"
                onClick={handleDelete}
              />
            )}
            <AdminBtn2
              text="취소"
              width="130px"
              padding="2px 10px"
              fontSize="1rem"
              height="40px"
              onClick={() => setModalOpenCancel(true)}
            />
          </div>
          {modalOpenSubmit && (
            <Popup
              message={
                isEditing ? "글을 수정하시겠습니까?" : "글을 작성하시겠습니까?"
              }
              onConfirm={handleSubmit}
              onClose={closeSubmitModal}
            />
          )}
          {modalOpenCancel && (
            <Popup
              message={
                <>
                  지금 나가시면 작성 중인 내용이 저장되지 않습니다. <br />
                  계속하시겠습니까?
                </>
              }
              onConfirm={() => navigate("/admin/community/notice-faq")}
              onClose={closeSubmitModal}
            />
          )}
        </>
      )}

      {location.pathname.includes("inquiry") && (
        <>
          <TitleText title={isEditing ? "글 수정" : "문의하기"} />
          <div className={styles.titleForm}>
            <label>제목</label>
            <input
              type="text"
              value={state.communityTitle}
              onChange={(e) => actions.changeCommunityTitle(e.target.value)}
              className={styles.titleInput} 
            />
          </div>
          <div className={styles.editor}>
            <EditorItem
              editorContent={editorContent}
              setEditorContent={setEditorContent}
              quillRef={quillRef}
              htmlContent={htmlContent}
            />
          </div>
          <div className={styles.buttonContainer}>
            <Btn
              text={isEditing ? "수정 완료" : "작성 완료"}
              onClick={() => setModalOpenSubmit(true)}
              width="130px"
              padding="2px 10px"
              fontSize="1rem"
              height="40px"
            />
            {isEditing && (
              <WhiteBtn
                text="삭제"
                width="130px"
                padding="2px 10px"
                fontSize="1rem"
                height="40px"
                onClick={handleDelete}
              />
            )}
            <WhiteBtn
              text="취소"
              width="130px"
              padding="2px 10px"
              fontSize="1rem"
              height="40px"
              onClick={() => setModalOpenCancel(true)}
            />
          </div>
          {modalOpenSubmit && (
            <Popup
              message={
                isEditing ? "글을 수정하시겠습니까?" : "글을 작성하시겠습니까?"
              }
              onConfirm={handleSubmit}
              onClose={closeSubmitModal}
            />
          )}
          {modalOpenCancel && (
            <Popup
              message={
                <>
                  지금 나가시면 작성 중인 내용이 저장되지 않습니다. <br />
                  계속하시겠습니까?
                </>
              }
              onConfirm={() => navigate("/home/inquiry")}
              onClose={closeSubmitModal}
            />
          )}
        </>
      )}
    </div>
  );
}

export default CommunityWrite;
