import styles from './CommunityWrite.module.css';
import EditorItem from '../../../../components/EditorItem/EditorItem';
import WriteForm from './WriteForm';
import { useState, useRef, useEffect } from 'react';
import { Btn, WhiteBtn } from '../../../../components/MyBtn';
import TitleText from '../../../../components/TitleText';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStore as CommunityStore } from '../../../../stores/NoticeStore/useStore';
import Popup from '../../../../components/Popupmodal/Popup';

function CommunityWrite() {
  const { state, actions } = CommunityStore();
  const navigate = useNavigate();
  const quillRef = useRef(null);
  const location = useLocation();

  const [modalOpenSubmit, setModalOpenSubmit] = useState(false);
  const [modalOpenCancel, setModalOpenCancel] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);


 // 초기 데이터 설정 (수정 모드 확인)
 useEffect(() => {
  const announcement = location.state?.announcement;
  if (announcement) {
    setIsEditing(true); // 수정 모드 활성화
    actions.changeCommunity({
      communityNumber: announcement.communityNumber,
      communityTitle: announcement.communityTitle,
      communityContent: announcement.communityContent,
      communityCategory: announcement.communityCategory,
      writeDate: announcement.writeDate,
      endDate: announcement.endDate,
      author: announcement.author,
      isHidden: announcement.isHidden,
    }); // 기존 데이터 설정
  } else {
    actions.resetCommunityState(); // 초기화
  }
}, [location.state, actions]);



  // 에디터 내용 변경 핸들러
  const handleEditorChange = (newContent) => {
    actions.changeCommunityContent(newContent);
  };

  // 제출 핸들러
  const handleSubmit = async () => {
    const communityData = state.community;

    // 필수값 확인
    if (!communityData.communityTitle?.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }
    if (!communityData.communityContent?.trim()) {
      alert('내용을 입력해주세요.');
      return;
    }
    if (
      communityData.communityCategory === 'EVENT' &&
      !communityData.endDate?.trim()
    ) {
      alert('이벤트 글은 종료일을 반드시 입력해야 합니다.');
      return;
    }

    try {
      const response = isEditing
        ? await actions.updateExistingCommunity(communityData)
        : await actions.createNewCommunity(communityData);

      if (response) {
        alert('작업이 성공적으로 완료되었습니다.');
        navigate('/admin/community/notice-faq');
      }
    } catch (error) {
      console.error('작업 중 오류 발생:', error);
      alert('작업에 실패했습니다.');
    }
  };

  // 삭제 핸들러
  const handleDelete = async () => {
    const confirmDelete = window.confirm('정말 삭제하시겠습니까?');
    if (!confirmDelete) return;

    try {
      await actions.deleteExistingCommunity(state.community.communityId);
      alert('삭제가 완료되었습니다.');
      navigate('/admin/community/notice-faq');
    } catch (error) {
      console.error('삭제 중 오류 발생:', error);
      alert('삭제에 실패했습니다.');
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
      <TitleText title={isEditing ? '글 수정' : '글쓰기'} />
      <div className={styles.editor}>
        <EditorItem
          editorContent={state.communityContent || ''}
          setEditorContent={handleEditorChange}
          quillRef={quillRef}
        />
      </div>
      <div className={styles.optionForm}>
        <WriteForm state={state} action={actions} />
      </div>
      <div className={styles.buttonContainer}>
        <Btn
          text={isEditing ? '수정 완료' : '작성 완료'}
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
          message={isEditing ? '글을 수정하시겠습니까?' : '글을 작성하시겠습니까?'}
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
          onConfirm={() => navigate('/admin/community/notice-faq')}
          onClose={closeSubmitModal}
        />
      )}
    </div>
  );
}

export default CommunityWrite;
