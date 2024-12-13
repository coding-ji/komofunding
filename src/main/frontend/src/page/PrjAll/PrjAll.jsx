import { useEffect, useState } from "react";
import styled from "styled-components";
import TitleBox from "../../components/TitleBox";
import DescriptionProduct from "../../components/DescriptionProduct";
import TitleProduct from "../../components/TitleProduct";
import { useParams } from "react-router-dom";
import { useStore as ProjectStore } from "../../stores/ProjectStore/useStore";

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
  const { projectNum } = useParams();
  const { state, actions } = ProjectStore();

  useEffect(() => {
    const fetchData = async () => {
      if (projectNum) {
        await actions.readProjectDetail(projectNum);
      }
    };

    fetchData();
  }, [projectNum]);

  // 데이터가 없을 경우 로딩 상태 표시
  if (!state || Object.keys(state).length === 0) {
    return (
      <PrjAllBox>
        <TitleBox text="전체 프로젝트 정보" />
        <DescriptionProduct text="데이터를 불러오는 중입니다..." />
      </PrjAllBox>
    );
  }

  return (
    <PrjAllBox>
      <TitleBox text="전체 프로젝트 정보" />
      <TitleProduct text="프로젝트 제목" />
      <DescriptionProduct text={state.title || "제목이 없습니다."} />
      <TitleProduct text="짧은 소개 글" />
      <DescriptionProduct
        text={state.projectShortDescription || "소개 글이 없습니다."}
      />
      <TitleProduct text="카테고리" />
      <DescriptionProduct
        text={state.projectCategory || "카테고리가 선택되지 않았습니다."}
      />
      <TitleProduct text="프로젝트 기간" />
      <DescriptionProduct
        text={`시작일: ${state.projectStartDate || "시작일 없음"}, 종료일: ${
          state.projectEndDate || "종료일 없음"
        }`}
      />
      <TitleProduct text="상품 정보" />
      {state.items && state.items.length > 0 ? (
        state.items.map((product, index) => (
          <DescriptionProduct
            key={index}
            text={`${product.itemName} - ${product.itemPrice}원`}
          />
        ))
      ) : (
        <DescriptionProduct text="등록된 상품이 없습니다." />
      )}
      <TitleProduct text="프로젝트 내용" />
      <DescriptionProduct
        text={state.description || "프로젝트 내용이 없습니다."}
      />{" "}
      <TitleProduct text="첨부된 이미지" />
      {Array.isArray(state.thumbnailImgs) && state.thumbnailImgs.length > 0 ? (
        <ImagePreview>
          {state.thumbnailImgs.map((image, index) => (
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
