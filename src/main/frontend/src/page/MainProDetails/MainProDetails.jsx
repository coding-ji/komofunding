import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import TitleProduct from "../../components/TitleProduct";
import DescriptionProduct from "../../components/DescriptionProduct";
import MainProDetailsIntro from "../../components/MainProDetails/MainProDetailsIntro";
import MainProDetailsImg from "../../components/MainProDetails/MainProDetailsImg";

const ProDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: 1.875rem 10vw; /* 10vw는 화면 너비의 10% */
`;

function MainProDetails() {
  const [projects, setProjects] = useState([]);
  const [qnaList, setQnaList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectResponse, qnaResponse] = await Promise.all([
          axios.get("/data/projectData.json"), // 프로젝트 데이터
          axios.get("/data/prjQnaData.json"),  // QnA 데이터
        ]);

        if (Array.isArray(projectResponse.data)) {
          setProjects(projectResponse.data);
        } else if (projectResponse.data.projects) {
          setProjects(projectResponse.data.projects);
        } else {
          console.error("올바르지 않은 프로젝트 데이터 형식입니다:", projectResponse.data);
        }

        if (Array.isArray(qnaResponse.data)) {
          setQnaList(qnaResponse.data);
        } else {
          console.error("올바르지 않은 QnA 데이터 형식입니다:", qnaResponse.data);
        }

        setLoading(false);
      } catch (error) {
        console.error("데이터를 가져오는 데 실패했습니다:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!projects || projects.length === 0) {
    return <div>프로젝트 데이터를 찾을 수 없습니다.</div>;
  }

  // 첫 번째 프로젝트만 선택
  const selectedProject = projects[0];

  return (
    <ProDetails>
      <MainProDetailsImg project={selectedProject} /> 
      <TitleProduct text="상품 제목 들어가는 공간" fontSize="2rem" />
      <DescriptionProduct text="상품 설명 들어가는 공간" />
      <MainProDetailsIntro project={selectedProject} qnaList={qnaList} setQnaList={setQnaList} />
    </ProDetails>
  );
}

export default MainProDetails;
