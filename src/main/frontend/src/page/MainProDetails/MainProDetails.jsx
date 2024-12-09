import { useEffect, useState } from "react";
import styled from "styled-components";
import TitleProduct from "../../components/TitleProduct";
import DescriptionProduct from "../../components/DescriptionProduct";
import MainProDetailsIntro from "../../components/MainProDetails/MainProDetailsIntro";
import projectData from "../../../public/data/projectData.json";
import qnaData from "../../../public/data/prjQnaData.json";

const ProDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
function MainProDetails() {
  const [project, setProject] = useState(null);
  const [qnaList, setQnaList] = useState([]);

  useEffect(() => {
    // 프로젝트 데이터 설정
    if (projectData && projectData.length > 0) {
      setProject(projectData[0]);
    }
    // QnA 데이터 설정
    if (qnaData && qnaData.length > 0) {
      setQnaList(qnaData);
    }
  }, []);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <ProDetails>
      <TitleProduct text="상품 제목 들어가는 공간" fontSize="2rem" />
      <DescriptionProduct text="상품 설명 들어가는 공간" />
      {/* setQnaList 전달 */}
      <MainProDetailsIntro project={project} qnaList={qnaList} setQnaList={setQnaList} />
    </ProDetails>
  );
}

export default MainProDetails;
