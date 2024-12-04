import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TitleBox from "../../components/TitleBox";
import DescriptionProduct from "../../components/DescriptionProduct";
import TitleProduct from "../../components/TitleProduct";
import Input from "../../components/input";
import Category from "../../components/Category";
import MyNavLine from "../../components/MyNavLine";
import { Btn, WhiteBtn } from "../../components/MyBtn";

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
    const [projectTitle, setProjectTitle] = useState(""); // 제목 상태
    const [shortDescription, setShortDescription] = useState(""); // 소개글
    const [category, setCategory] = useState(""); // 카테고리 상태
    const navigate = useNavigate();

    const handleNextClick = () => {
        const projectData = {
            title: projectTitle,
            shortDescription: shortDescription,
            category: category
        };
        localStorage.setItem("projectData", JSON.stringify(projectData)); // 데이터 저장
        navigate("/selectprj/prj-two"); // 이동
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
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)} // 입력값 처리
                    />
                </div>
                <div>
                    <TitleProduct text="짧은 소개 글" />
                    <DescriptionProduct text="프로젝트를 간략하게 소개하고 후원자들이 프로젝트에 대해 빠르게 이해할 수 있도록 돕는 글을 작성해 주세요." />
                    <Input 
                        size="small" 
                        margin="5px" 
                        value={shortDescription}
                        onChange={(e) => setShortDescription(e.target.value)} // 입력값 처리
                    />
                </div>
                <div>
                    <TitleProduct text="카테고리" />
                    <DescriptionProduct text="프로젝트에 해당하는 여러 카테고리 중 가장 적합한 카테고리를 선택해주세요." />
                    <Category 
                        category={category} // 카테고리 상태 전달
                        onCategoryChange={setCategory} // 카테고리 업데이트 함수 전달
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
