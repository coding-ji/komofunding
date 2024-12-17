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
import { useNavigate } from "react-router-dom";

const ProDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: 1.875rem 10vw; /* 10vw는 화면 너비의 10% */
`;

function MainProDetails() {
  const { projectNum } = useParams();
  const navigate = useNavigate();
  const { state: projectState, actions: projectActions } = ProjectStore();
  const { state: fileState, actions: fileActions } = FileStore();
  const { state: paymentState, actions: paymentActions } = PaymentStore();

  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (projectNum) {
        await projectActions.readProjectDetail(projectNum);
      }
    };

    fetchData();
    if (isAdded) {
      setIsAdded(false);
    }
  }, [projectNum, isAdded]);

  useEffect(() => {
    const fetchHtml = async () => {
      if (projectState.project) {
        try {
          await fileActions.readFileData(projectState.project.description);
        } catch (error) {
          console.error("Error fetching HTML file:", error);
        }
      }
    };

    fetchHtml();
  }, [projectState.project]);

  const onClickPayButton = () => {
    // 이동하면서 상태 전달
    navigate(`/home/fundingpay/${projectNum}`, {
      state: { "project" : projectState.project , "payment" : paymentState },
    });
  };

  // 데이터가 없을 경우 로딩 상태 표시
  if (!projectState.project) {
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
        project={projectState.project}
        paymentState={paymentState}
        paymentActions={paymentActions}
        onClickPayButton={onClickPayButton}
      />
      <MainProDetailsIntro
        project={projectState.project}
        projectActions={projectActions}
        htmlContent={fileState}
        setIsAdded={setIsAdded}
      />
    </ProDetails>
  );
}

export default MainProDetails;
