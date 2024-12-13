import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import MainProDetailsIntro from "../../components/MainProDetails/MainProDetailsIntro";
import MainProDetailsImg from "../../components/MainProDetails/MainProDetailsImg";
import { useStore as ProjectStore } from "../../stores/ProjectStore/useStore";
import { useStore as FileStore } from "../../stores/FileStore/useStore";
import { useParams } from "react-router-dom";
import TitleBox from "../../components/TitleBox";
import DescriptionProduct from "../../components/DescriptionProduct";

const ProDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: 1.875rem 10vw; /* 10vw는 화면 너비의 10% */
`;

function MainProDetails() {
  const { projectNum } = useParams();
  const [qnaList, setQnaList] = useState(["고쳐야함.."]);  
  const { state, actions } = ProjectStore();
  const { state:fileState, actions:fileActions} = FileStore();

  useEffect(() => {
    const fetchData = async () => {
      if (projectNum) {
        await actions.readProjectDetail(projectNum);
      }
    };

    fetchData();
  }, [projectNum]);

  
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    const fetchHtml = async () => {
      if (state.project) {
        try {
          const response = await fileActions.readFileData(state.project.description); // HTML 파일을 요청
          if (!response.ok) {
            throw new Error("HTML 파일을 불러오는 데 실패했습니다.");
          }
          const data = await response.text(); // HTML 내용을 텍스트로 읽기
          setHtmlContent(data); // 상태에 저장
        } catch (error) {
          console.error("Error fetching HTML file:", error);
          setHtmlContent("소개 내용을 불러오는 데 실패했습니다.");
        }
      }
    };

    fetchHtml();
  }, [state.project]);


  // 데이터가 없을 경우 로딩 상태 표시
  if (!state.project) {
    return (
      <div>
        <TitleBox text="전체 프로젝트 정보" />
        <DescriptionProduct text="데이터를 불러오는 중입니다..." />
      </div>
    );
  }

  return (
    <ProDetails>
      <MainProDetailsImg project={state.project} />
      <MainProDetailsIntro
        project={state.project}
        qnaList={qnaList}
        setQnaList={setQnaList}
        htmlContent={htmlContent}
      />
    </ProDetails>
  );
}

export default MainProDetails;
