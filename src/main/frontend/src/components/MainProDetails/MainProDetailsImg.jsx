import React from "react";
import styled from "styled-components";
import ImageCarousel from "../ImageCarousel/ImageCarousel";
import DescriptionProduct from "../DescriptionProduct";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 20px;
`;

const ProjectSection = styled.div`

`;

const ProjectTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 16px;
`;

function MainProDetailsImg({ project }) {
  if (!project) {
    return <div>프로젝트 데이터가 없습니다.</div>;
  }

  return (
    <Container>
      <ProjectSection>
        <ImageCarousel images={project.imgs} />
        <ProjectTitle>{project.projectTitle} 상품 제목 불러올 거임</ProjectTitle>
        <DescriptionProduct
        padding="0px"
        text={project.description}></DescriptionProduct>
      </ProjectSection>
    </Container>
  );
}

export default MainProDetailsImg;
