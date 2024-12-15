import { useEffect } from "react";
import styled from "styled-components";
import TitleBox from "../../components/TitleBox";
import DescriptionProduct from "../../components/DescriptionProduct";
import TitleProduct from "../../components/TitleProduct";
import Input from "../../components/input";
import Category from "../../components/Category";
import MyNavLine from "../../components/MyNavLine";
import { Btn } from "../../components/MyBtn";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useStore as ProjectStore } from "../../stores/ProjectStore/useStore";

const SelectBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PrjFooter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 20px;
  margin-bottom: 20px;
`;

function SelectPrjOne() {
  const navigate = useNavigate();
  const { data, projectNum } = useOutletContext();
  const { state: projectState, actions: projectActions } = ProjectStore();

  // 데이터와 상태 복원
  useEffect(() => {
    if (data) {
      projectActions.resetState();
      projectActions.updateAllFields(data); // data로 상태 업데이트
    }
  }, [data]);

  // 데이터와 상태 복원
  useEffect(() => {
    // 로컬 스토리지에서 복원한 데이터가 있다면 상태에 반영
    const savedState = localStorage.getItem("projectState");
    if (savedState) {
      projectActions.resetState();
      projectActions.updateAllFields(JSON.parse(savedState)); // 로컬 스토리지에서 복원
    }
  }, []);

  const handleNextClick = () => {
    // 상태를 로컬 스토리지에 저장
    localStorage.setItem("projectState", JSON.stringify(projectState));

    // projectNum 여부에 따라 분기 처리
    if (projectNum) {
      navigate(`/home/selectprj/edit/${projectNum}/prj-two`);
    } else {
      navigate("/home/selectprj/prj-two");
    }
  };

  return (
    <div>
      <SelectBox>
        <TitleBox text="프로젝트 기본 정보" />
        <div>
          <TitleProduct text="프로젝트 제목" />
          <DescriptionProduct text="프로젝트의 목적을 한눈에 알 수 있도록 작성해주세요." />
          <Input
            size="small"
            margin="5px"
            value={projectState.title}
            onChange={(e) => projectActions.changeTitle(e.target.value)}
          />
        </div>
        <div>
          <TitleProduct text="짧은 소개 글" />
          <DescriptionProduct text="프로젝트를 간략하게 소개하고 후원자들이 프로젝트에 대해 빠르게 이해할 수 있도록 돕는 글을 작성해 주세요." />
          <Input
            size="small"
            margin="5px"
            value={projectState.projectShortDescription}
            onChange={(e) =>
              projectActions.changeProjectShortDescription(e.target.value)
            }
          />
        </div>
        <div>
          <TitleProduct text="카테고리" />
          <DescriptionProduct text="프로젝트에 해당하는 여러 카테고리 중 가장 적합한 카테고리를 선택해주세요." />
          <Category
            categoryState={projectState.projectCategory} // 카테고리 상태 전달
            onCategoryChange={projectActions.changeProjectCategory} // 카테고리 업데이트 함수 전달
          />
        </div>
        <MyNavLine />
      </SelectBox>
      <PrjFooter>
        <Btn
          width="80px"
          fontSize="0.9rem"
          padding="8px 3px"
          text="다음"
          onClick={handleNextClick}
        />
      </PrjFooter>
    </div>
  );
}

export default SelectPrjOne;
