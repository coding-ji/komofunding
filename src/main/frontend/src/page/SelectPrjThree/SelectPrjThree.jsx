import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import TitleBox from "../../components/TitleBox";
import DescriptionProduct from "../../components/DescriptionProduct";
import TitleProduct from "../../components/TitleProduct";
import Date from "../../components/Date";
import ImageUploader from "../../components/ImageUploader";
import { Btn, WhiteBtn } from "../../components/MyBtn";
import { useNavigate, useOutletContext } from "react-router-dom";
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
  const { projectNum } = useOutletContext();

  const quillRef = useRef(null);
  const [editorContent, setEditorContent] = useState(""); // 에디터 내용
  const [htmlContent, setHtmlContent] = useState(""); // 보내는 내용

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지를 위한 상태
  const [thumbnailImgs, setThumbnailImgs] = useState([]); // 하위컴포넌트에서 받아오는 썸네일

  const [isDone, setIsDone] = useState(false);

  // localStorage에서 상태 복원
  useEffect(() => {
    const savedState = localStorage.getItem("projectState");
    if (savedState) {
      const parsedState = JSON.parse(savedState);

      // 썸네일 이미지 상태 설정
      setThumbnailImgs(parsedState.thumbnailImgs || []);

      // 프로젝트 기간 설정
      if (parsedState.projectStartDate && parsedState.projectEndDate) {
        handleDateChange(
          parsedState.projectStartDate,
          parsedState.projectEndDate
        );
      }

      const fetchHtml = async () => {
        if (parsedState.description) {
          try {
            await fileActions.readFileData(parsedState.description);
          } catch (error) {
            console.error("Error fetching HTML file:", error);
          }
        }
      };

      fetchHtml();

      // Redux 상태 업데이트
      projectActions.updateAllFields(parsedState);
    }
  }, [projectNum]);

  useEffect(() => {
    if (fileState) {
      // HTML 파싱
      const parser = new DOMParser();
      const parsedHtml = parser.parseFromString(fileState, "text/html");
      const bodyContent = parsedHtml.body.innerHTML; // <body> 내부 내용만 추출

      // editorContent에 <body> 내용만 설정
      setHtmlContent(bodyContent);
    }
  }, [fileState]);

  // 시작일 & 종료일 처리
  const handleDateChange = (start, end) => {
    projectActions.changeProjectStartDate(start);
    projectActions.changeProjectEndDate(end);
  };

  // 이전 단계로 이동
  const handleBeforeClick = () => {
    const path = projectNum
      ? `/home/selectPrj/edit/${projectNum}/prj-two`
      : "/home/selectPrj/prj-two";
    localStorage.setItem("projectState", JSON.stringify(projectState));
    navigate(path);
  };

  const handleCompleteClick = async () => {
    const formDataDescription = new FormData();
    const encoder = new TextEncoder(); // UTF-8 인코더 생성
    const utf8EncodedContent = encoder.encode(editorContent); // UTF-8로 인코딩된 배열

    //HTML 콘텐츠 생성 (인코딩된 내용을 Blob으로 변환)
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

    await fileActions.createFileData(formDataDescription);
    setIsDone(true);
  };

  useEffect(() => {
    const createProject = async () => {
      if (isDone) {
        const projectData = {
          ...projectState,
          thumnailImgs: thumbnailImgs,
          description: fileState,
        };

        try {
          if (projectNum) {
            // projectNum이 있을 경우, 업데이트 로직
            await projectActions.updateExistingProject(projectNum, projectData);
            alert("프로젝트가 성공적으로 수정되었습니다.");
          } else {
            // projectNum이 없을 경우, 새 프로젝트 생성
            await projectActions.createNewProject(projectData);
            alert("프로젝트 심사까지는 3~5일 정도 소요됩니다.");
          }

          // 프로젝트 상태 저장 후 이동
          localStorage.removeItem("projectState");
          navigate("/home");
        } catch (error) {
          console.error("프로젝트 저장 실패:", error);
          setErrorMessage("프로젝트 생성 또는 수정 중 오류가 발생했습니다.");
        }
      }
    };

    createProject(); // 비동기 함수 호출
  }, [isDone]);

  return (
    <div>
      <SelectBox>
        <TitleBox text="프로젝트 기간" />
        <div>
          <TitleProduct text="이미지 첨부" />
          <DescriptionProduct text="프로젝트와 관련된 이미지를 첨부해주세요." />
          <ImageUploader
            thumbnailImgs={thumbnailImgs}
            setThumbnailImgs={setThumbnailImgs}
          />
        </div>
        <div>
          <TitleProduct text="프로젝트 기간 설정" />
          <DescriptionProduct text="프로젝트 시작일과 종료일을 선택해주세요." />
          <Date
            startDate={projectState.projectStartDate}
            endDate={projectState.projectEndDate}
            onDateChange={handleDateChange}
            projectActions={projectActions}
            projectNum={projectNum}
          />
        </div>
        <div>
          <TitleProduct text="프로젝트 내용" />
          <DescriptionProduct text="프로젝트 상세 내용을 작성해주세요." />
          <EditorItem
            editorContent={editorContent}
            setEditorContent={setEditorContent}
            quillRef={quillRef}
            htmlContent={htmlContent}
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
