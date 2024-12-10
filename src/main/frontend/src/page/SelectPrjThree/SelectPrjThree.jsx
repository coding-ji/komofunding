import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import TitleBox from "../../components/TitleBox";
import DescriptionProduct from "../../components/DescriptionProduct";
import TitleProduct from "../../components/TitleProduct";
import Date from "../../components/Date";
import ImageUploader from "../../components/ImageUploader";
import { Btn, WhiteBtn } from "../../components/MyBtn";
import { useNavigate } from "react-router-dom";
import MyNavLine from "../../components/MyNavLine";
import EditorItem from "../../components/EditorItem/EditorItem";
import { useStore as ProjectStore } from "../../stores/ProjectStore/useStore";
import { useStore as FileStore } from "../../stores/FileStore/useStore";

const SelectBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PrjFooter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
`;

function SelectPrjThree() {
  const { state: projectState, actions: projectActions } = ProjectStore();
  const { state: fileState, actions: fileActions } = FileStore();

  // 퀼 Editor
  const quillRef = useRef(null);
  const [editorContent, setEditorContent] = useState("");
  const navigate = useNavigate();

  // localStorage에서 상태 복원
  useEffect(() => {
    const savedState = localStorage.getItem("projectState");
    if (savedState) {
      projectActions.updateAllFields(JSON.parse(savedState));
    }
  }, [projectActions]);

  // 시작일 & 종료일 결정
  const handleDateChange = (start, end) => {
    projectActions.changeProjectStartDate(start);
    projectActions.changeProjectEndDate(end);
  };

  const handleImagesChange = (updatedImages) => {
    projectActions.changeProjectThumbnailImgs(updatedImages); // 상위 컴포넌트에서 이미지 상태 업데이트
  };

  const handleCompleteClick = async () => {
    const user = JSON.parse(localStorage.getItem("user")); // user 정보를 JSON으로 파싱

    // 이미지 업로드 처리
    const formData = new FormData();

    // 여러 이미지를 formData에 추가
    projectState.thumbnailImgs.forEach((image) => {
      formData.append("files", image); // 'files'로 설정하여 다수의 이미지를 보냄
    });

    try {
      const response = await fileActions.createImgData(formData); // 서버로 이미지 업로드
      const uploadedImages = response; // 서버에서 반환된 이미지 URL 배열 (data 필드 확인)
      projectActions.changeProjectThumbnailImgs(uploadedImages); // 이미지를 URL로 변환
    } catch (error) {
      console.log("이미지 업로드 실패: ", error);
    }

    // 프로젝트 설명 처리
    const formDataDescription = new FormData();

    // 에디터에서 텍스트와 파일을 함께 보냄
    if (editorContent) {
      formDataDescription.append("description", editorContent); // 에디터 내용 추가
    }

    // 파일이 있는 경우 추가
    const files = projectState.files || []; // projectState에 저장된 파일 목록을 가져옴
    files.forEach((file) => {
      formDataDescription.append("file", file); // 'file'로 여러 개의 파일을 formData에 추가
    });

    try {
      const fileResponse = await fileActions.createFileData(
        formDataDescription
      ); // 서버로 전송
      const uploadedFileUrls = fileResponse; // 서버에서 반환된 파일 URL 배열
      projectActions.changeDescription(uploadedFileUrls); // 프로젝트 설명에 업로드된 파일 URL 설정
    } catch (error) {
      console.error("파일 업로드 실패: ", error);
    }
    // 최종 프로젝트 생성
    try {
      if (projectState.description && projectState.thumbnailImgs) {
        await projectActions.createNewProject(user.userNum, projectState); // 프로젝트 생성
        navigate("/selectprj/prjall"); // 저장 성공 시 프로젝트 목록 페이지로 이동
      } else {
        console.error("프로젝트 설명 또는 썸네일 이미지가 누락되었습니다.");
      }
    } catch (error) {
      console.error("프로젝트 생성 실패: ", error);
    }
  };

  return (
    <div>
      <SelectBox>
        <TitleBox text="프로젝트 기간" />
        <div>
          <TitleProduct text="이미지 첨부" />
          <DescriptionProduct text="프로젝트와 관련된 이미지를 첨부해주세요." />
          <ImageUploader
            onImagesChange={handleImagesChange}
            images={projectState.thumbnailImgs}
          />
        </div>

        <div>
          <TitleProduct text="프로젝트 기간 설정" />
          <DescriptionProduct text="프로젝트 시작일과 종료일을 선택해주세요." />
          <Date
            startDate={projectState.startDate}
            endDate={projectState.endDate}
            onDateChange={handleDateChange}
          />
        </div>

        <div>
          <TitleProduct text="프로젝트 내용" />
          <DescriptionProduct text="프로젝트 상세 내용을 작성해주세요." />
          <EditorItem
            editorContent={editorContent}
            setEditorContent={setEditorContent}
            quillRef={quillRef}
          />
        </div>

        <MyNavLine />
      </SelectBox>
      <PrjFooter>
        <WhiteBtn
          width="80px"
          fontSize="0.9rem"
          padding="8px 3px"
          text="이전"
          onClick={() => navigate("/home/selectprj/prj-two")}
        />
        <Btn
          width="80px"
          fontSize="0.9rem"
          padding="8px 3px"
          text="완료"
          onClick={handleCompleteClick}
        />
      </PrjFooter>
    </div>
  );
}

export default SelectPrjThree;
