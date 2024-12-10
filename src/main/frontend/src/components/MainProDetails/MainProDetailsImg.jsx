import React from "react";
import styled from "styled-components";
import ImageCarousel from "../ImageCarousel/ImageCarousel";
import DescriptionProduct from "../DescriptionProduct";
import TitleProduct from "../TitleProduct";
import ProgressContainer from "../../components/ProgressContainer/ProgressContainer";
import OtherText from "../ProgressContainer/OtherText";

const BoxContainer = styled.div`
display: flex;
flex-direction : column;

`

const Container = styled.div`
  display: flex;
  flex-direction: rows;
  width : 100%;
  gap : 22px;
  flex-wrap: wrap;

   @media (max-width: 920px) {
    flex-direction: column; /* 화면이 좁아지면 세로 정렬 */
    gap: 16px; /* 간격 조정 */
  }

`;


const ImageCarouselWrapper = styled.div`
flex: 1
`;

const ProgressContainerWrapper = styled.div`

display: flex;
flex-direction : column;
gap : 22px;
flex: 1; /* 1의 비율 */
`;

const ProjectSection = styled.div`

`;

function MainProDetailsImg({ project }) {
  if (!project) {
    return <div>프로젝트 데이터가 없습니다.</div>;
  }

  return (
    <BoxContainer>
      <Container>
        <ImageCarouselWrapper>
          <ImageCarousel images={project.imgs} />
        </ImageCarouselWrapper>

        <ProgressContainerWrapper>
          <DescriptionProduct
            fontSize="1.4rem"
            fontWeight="bold"
            text={project.projectCategory} />

          <ProjectSection>

            <TitleProduct
              padding="0px"
              fontSize="3rem"
              text={project.projectTitle} />

            <DescriptionProduct
              fontSize="0.98rem"
              padding="0px"
              text={project.shortDescription} />
          </ProjectSection>

          <ProgressContainer />

        </ProgressContainerWrapper>
      </Container>
    </BoxContainer>
  );
}

export default MainProDetailsImg;
