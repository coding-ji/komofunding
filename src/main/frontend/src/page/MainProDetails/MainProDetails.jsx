import { useEffect, useState } from "react";
import styled from "styled-components";
import MainProDetailsIntro from "../../components/MainProDetails/MainProDetailsIntro";
import MainProDetailsImg from "../../components/MainProDetails/MainProDetailsImg";
import { useStore as ProjectStore } from "../../stores/ProjectStore/useStore";
import { useStore as FileStore } from "../../stores/FileStore/useStore";
import { useStore as PaymentStore } from "../../stores/PaymentStore/useStore";
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
  const { state: fileState, actions: fileActions } = FileStore();
  const { state: paymentState, actions: paymentActions } = PaymentStore();

  useEffect(() => {
    const fetchData = async () => {
      if (projectNum) {
        await actions.readProjectDetail(projectNum);
      }
    };

    fetchData();
  }, [projectNum]);

  useEffect(() => {
    const fetchHtml = async () => {
      if (state.project) {
        try {
          await fileActions.readFileData(state.project.description);
        } catch (error) {
          console.error("Error fetching HTML file:", error);
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
      <MainProDetailsImg
        project={state.project}
        paymentState={paymentState}
        paymentActions={paymentActions}
      />
      <MainProDetailsIntro
        project={state.project}
        qnaList={qnaList}
        setQnaList={setQnaList}
        htmlContent={fileState}
      />
    </ProDetails>
  );
}

export default MainProDetails;
