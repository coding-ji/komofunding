import { useState, useEffect } from "react";
import styled from "styled-components";
import TitleBox from "../../components/TitleBox";
import DescriptionProduct from "../../components/DescriptionProduct";
import TitleProduct from "../../components/TitleProduct";
import Date from "../../components/Date";
import ImageUploader from "../../components/ImageUploader";
import { Btn } from "../../components/MyBtn";
import { useNavigate } from "react-router-dom";
import MyNavLine from "../../components/MyNavLine";
import EditorItem from "../../components/EditorItem/EditorItem";

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

function SelectPrjThree() {
  const [content, setContent] = useState(""); 
  const [images, setImages] = useState([]);
  const [startDate, setStartDate] = useState(""); // 시작일 상태
  const [endDate, setEndDate] = useState(""); // 종료일 상태
  const navigate = useNavigate();

  useEffect(() => {
    // localStorage에서 데이터 불러오기
    const projectData = JSON.parse(localStorage.getItem("projectData")) || {};
    if (projectData.content) {
      setContent(projectData.content);
    }
    if (projectData.images) {
      setImages(projectData.images);
    }
    if (projectData.startDate) {
      setStartDate(projectData.startDate);
    }
    if (projectData.endDate) {
      setEndDate(projectData.endDate);
    }
  }, []);

  const handleImagesChange = (updatedImages) => {
    setImages(updatedImages);
  };

  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleCompleteClick = () => {
    const projectData = JSON.parse(localStorage.getItem("projectData")) || {};
    projectData.content = content;
    projectData.images = images;
    projectData.startDate = startDate;
    projectData.endDate = endDate;
    localStorage.setItem("projectData", JSON.stringify(projectData));
    navigate("/selectprj/prjall");
  };

  return (
    <div>
      <SelectBox>
        <TitleBox text="프로젝트 기간" />
        <div>
          <TitleProduct text="이미지 첨부" />
          <DescriptionProduct text="프로젝트와 관련된 이미지를 첨부해주세요." />
          <ImageUploader onImagesChange={handleImagesChange} images={images} />
        </div>
       
        <div>
          <TitleProduct text="프로젝트 기간 설정" />
          <DescriptionProduct text="프로젝트 시작일과 종료일을 선택해주세요." />
          <Date 
            startDate={startDate} 
            endDate={endDate} 
            onDateChange={handleDateChange} 
          />
        </div>
       
        <div>
          <TitleProduct text="프로젝트 내용" />
          <DescriptionProduct text="프로젝트 상세 내용을 작성해주세요." />
          <EditorItem content={content} setContent={setContent} />
        </div>
       
        <MyNavLine />
      </SelectBox>
      
      <PrjFooter>
        <Btn
          width="80px"
          fontSize="0.9rem"
          padding="8px 3px"
          text="완료"
          onClick={handleCompleteClick}
        />
      </PrjFooter>
    </div>
  );
}

export default SelectPrjThree;
