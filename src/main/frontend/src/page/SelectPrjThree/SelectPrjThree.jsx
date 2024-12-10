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

  const quillRef = useRef(null);
  const [editorContent, setEditorContent] = useState(""); // 에디터 내용
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지를 위한 상태

  // localStorage에서 상태 복원
  useEffect(() => {
    const savedState = localStorage.getItem("projectState");
    if (savedState) {
      projectActions.updateAllFields(JSON.parse(savedState));
    }
  }, [projectActions]);

  // 시작일 & 종료일 처리
  const handleDateChange = (start, end) => {
    projectActions.changeProjectStartDate(start);
    projectActions.changeProjectEndDate(end);
  };

  // 이미지 변경 처리
  const handleImagesChange = (updatedImages) => {
    projectActions.changeProjectThumbnailImgs(updatedImages); // 이미지 상태 업데이트
    console.log(projectState);
  };

  // base64 데이터를 Blob으로 변환하는 유틸리티 함수
  const base64ToBlob = (base64) => {
    const byteString = atob(base64.split(",")[1]);
    const mimeString = base64.split(",")[0].split(":")[1].split(";")[0];

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  };

  // 업로드시에 files 로 변경해서, createImgData로 변환해서 response 반환
  const uploadImages = async (images) => {
    const uploadedImageUrls = []; // 업로드된 이미지 URL 저장 배열

    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const formData = new FormData();

        // base64 데이터일 경우 Blob으로 변환
        if (typeof image === "string" && image.startsWith("data:image")) {
          const blob = base64ToBlob(image);
          formData.append("file", blob, `image-${i}.png`);
        } else {
          formData.append("file", image); // 일반 파일 처리
        }

        try {
          const response = await fileActions.createImgData(formData);
          uploadedImageUrls.push(response); // 업로드된 URL 저장
        } catch (error) {
          console.error("이미지 업로드 실패:", error);
          setErrorMessage("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
          break; // 실패 시 중단
        }
      }
    } else {
      setErrorMessage("이미지가 선택되지 않았습니다.");
    }
    return uploadedImageUrls; // 업로드된 URL 배열 반환
  };

  // 에디터의 base64 이미지를 URL로 변환하는 함수 수정
  const updateEditorContentWithUrls = async () => {
    const base64Images =
      editorContent.match(/data:image\/[^;]+;base64[^"]+/g) || []; // 에디터에서 base64 이미지 추출
    const uploadedUrls = [];

    for (let i = 0; i < base64Images.length; i++) {
      const base64Image = base64Images[i];
      const blob = base64ToBlob(base64Image); // Blob으로 변환
      const formData = new FormData();
      formData.append("file", blob, `editor-image-${i}.png`);

      try {
        const uploadedUrl = await fileActions.createImgData(formData); // 업로드 요청
        uploadedUrls.push(uploadedUrl); // 업로드된 URL 저장
      } catch (error) {
        console.error("에디터 이미지 업로드 실패:", error);
        setErrorMessage(
          "에디터 이미지 업로드에 실패했습니다. 다시 시도해주세요."
        );
        return; // 실패 시 중단
      }
    }

    // 에디터 내용을 업데이트된 URL로 교체
    let updatedContent = editorContent;
    uploadedUrls.forEach((url, index) => {
      updatedContent = updatedContent.replace(base64Images[index], url);
    });

    setEditorContent(updatedContent); // 상태 업데이트
    return uploadedUrls; // 업로드된 URL 배열 반환
  };

  // 완료시 파일 처리
  const handleCompleteClick = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    try {
      // 1. 이미지 업로드 처리 (썸네일 이미지)
      const uploadedThumbnailUrls = await uploadImages(
        projectState.thumbnailImgs
      ); // 썸네일 이미지 업로드

      projectActions.changeProjectThumbnailImgs(uploadedThumbnailUrls); // 업로드된 썸네일 URL 저장

      // 2. 에디터에서 base64 이미지 처리 및 URL로 변환
      const uploadedUrls = await updateEditorContentWithUrls();

      // 3. 에디터 내용을 HTML 파일로 저장
      const formDataDescription = new FormData();
      const encoder = new TextEncoder(); // UTF-8 인코더 생성
      const utf8EncodedContent = encoder.encode(editorContent); // UTF-8로 인코딩된 배열

      // 3. HTML 콘텐츠 생성 (인코딩된 내용을 Blob으로 변환)
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

      // 4. Blob 객체 생성 (UTF-8 인코딩이 적용된 HTML로 설정)
      const htmlBlob = new Blob([htmlContent], {
        type: "text/html;charset=utf-8",
      });
      // 5. FormData에 HTML 파일 추가
      formDataDescription.append("file", htmlBlob, "description.html");

      // 4. 파일 데이터 업로드 처리 및 responseUrl 담기
      let uploadedDescriptionUrl = null;

      try {
        const fileResponse = await fileActions.createFileData(
          formDataDescription
        ); // 서버로 전송
        uploadedDescriptionUrl = fileResponse; // 서버에서 반환된 파일 URL 배열
        projectActions.changeDescription(uploadedDescriptionUrl); // 프로젝트 설명에 업로드된 파일 URL 저장
      } catch (error) {
        console.error("파일 업로드 실패: ", error);
        setErrorMessage("파일 업로드에 실패했습니다. 다시 시도해주세요.");
        return;
      }

      // 5. 최종 프로젝트 데이터 생성
      const finalProjectData = {
        ...projectState,
        description: uploadedDescriptionUrl, // 서버에서 받은 description.html URL
        thumbnailImgs: uploadedThumbnailUrls, // 썸네일 이미지 URL들
      };

      console.log("최종 프로젝트 데이터:", finalProjectData);

      // 6. 프로젝트 생성 요청
      await projectActions.createNewProject(user.userNum, finalProjectData);
      navigate("/home/selectprj/prjall"); // 프로젝트 목록 페이지로 이동
    } catch (error) {
      console.error("프로젝트 생성 실패: ", error);
      setErrorMessage("프로젝트 생성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 이전 단계로 이동
  const handleBeforeClick = () => {
    localStorage.setItem("projectState", JSON.stringify(projectState));
    navigate("/home/selectprj/prj-two");
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
        {errorMessage && (
          <div style={{ color: "red", marginTop: "20px" }}>{errorMessage}</div>
        )}{" "}
        {/* 에러 메시지 표시 */}
        <MyNavLine />
      </SelectBox>
      <PrjFooter>
        <WhiteBtn
          width="80px"
          fontSize="0.9rem"
          padding="8px 3px"
          text="이전"
          onClick={handleBeforeClick}
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
