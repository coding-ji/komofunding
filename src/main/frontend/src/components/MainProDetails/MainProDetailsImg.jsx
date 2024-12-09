import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import ImageCarousel from "../ImageCarousel/ImageCarousel";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 20px;
`;

const ProjectSection = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const ProjectTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 16px;
`;

function MainProDetailsImg() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/data/projectData.json")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setProjects(response.data); // JSON이 배열이라면 그대로 사용
        } else if (response.data.projects) {
          setProjects(response.data.projects); // JSON이 객체라면 변환
        } else {
          console.error("올바르지 않은 데이터 형식입니다:", response.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("데이터를 가져오는 데 실패했습니다:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!Array.isArray(projects)) {
    return <div>올바른 데이터 형식이 아닙니다.</div>;
  }

  return (
    <Container>
      {projects.map((project, index) => (
        <ProjectSection key={index}>
          <ProjectTitle>{project.projectTitle}</ProjectTitle>
          <ImageCarousel images={project.imgs} />
        </ProjectSection>
      ))}
    </Container>
  );
}

export default MainProDetailsImg;
