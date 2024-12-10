import { useEffect, useState } from "react";
import styled from "styled-components";
import TitleBox from "../../components/TitleBox";
import DescriptionProduct from "../../components/DescriptionProduct";
import TitleProduct from "../../components/TitleProduct";

const PrjAllBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ImagePreview = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;

  img {
    max-width: 150px;
    height: auto;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 5px;
  }
`;

function PrjAll() {
  const [projectData, setProjectData] = useState({
    content: "",
    images: [],
    title: "",
    shortDescription: "",
    category: "카테고리가 선택되지 않았습니다.",
    startDate: "",
    endDate: "",
    products: []
  });

  useEffect(() => {
    const storedData = localStorage.getItem("projectData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setProjectData(parsedData); // 로컬 스토리지에서 데이터 가져오기
    }
  }, []);

  // 데이터가 로드되지 않았을 때 로딩 화면을 표시
  if (!projectData.title) {
    return <div>Loading...</div>;
  }

  return (
    <PrjAllBox>
      <TitleBox text="전체 프로젝트 정보" />
      <TitleProduct text="프로젝트 제목" />
      <DescriptionProduct text={projectData.title || "제목이 없습니다."} />
      <TitleProduct text="짧은 소개 글" />
      <DescriptionProduct text={projectData.shortDescription || "소개 글이 없습니다."} />
      <TitleProduct text="카테고리" />
      <DescriptionProduct text={projectData.category || "카테고리가 선택되지 않았습니다."} />
      <TitleProduct text="프로젝트 기간" />
      <DescriptionProduct text={`시작일: ${projectData.startDate || "시작일 없음"}, 종료일: ${projectData.endDate || "종료일 없음"}`} />
      <TitleProduct text="상품 정보" />
      {projectData.products && projectData.products.length > 0 ? (
        projectData.products.map((product, index) => (
          <DescriptionProduct key={index} text={`${product.name} - ${product.price}원`} />
        ))
      ) : (
        <DescriptionProduct text="등록된 상품이 없습니다." />
      )}
      <TitleProduct text="프로젝트 내용" />
      <DescriptionProduct text={projectData.content || "프로젝트 내용이 없습니다."} /> {/* content 표시 */}
      
      {/* 이미지 출력 */}
      <TitleProduct text="첨부된 이미지" />
      {projectData.images.length > 0 ? (
        <ImagePreview>
          {projectData.images.map((image, index) => (
            <img key={index} src={image} alt={`첨부된 이미지 ${index + 1}`} />
          ))}
        </ImagePreview>
      ) : (
        <DescriptionProduct text="첨부된 이미지가 없습니다." />
      )}
    </PrjAllBox>
  );
}

export default PrjAll;
