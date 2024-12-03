import { useState } from "react";
import styled from "styled-components";
import TitleBox from "../../components/TitleBox";
import DescriptionProduct from "../../components/DescriptionProduct";
import TitleProduct from "../../components/TitleProduct";
import Date from "../../components/Date";
import ReactQuill from "react-quill"; // react-quill import
import "react-quill/dist/quill.snow.css"; // quill 기본 스타일 import
import ImageUploader from "../../components/ImageUploader"; // ImageUploader 컴포넌트 import
import { Btn, WhiteBtn } from "../../components/MyBtn";
import { useNavigate } from "react-router-dom"; // useNavigate import
import MyNavLine from "../../components/MyNavLine";

const SelectBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PrjFooter = styled.div`
  width : 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top : 20px;
  margin-bottom: 20px;
  justify-content: space-between
  


`;

function SelectPrjThree() {
  const [content, setContent] = useState(""); // 에디터의 내용 관리 상태
  const [images, setImages] = useState([]); // 부모 컴포넌트에서 이미지 상태 관리
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleImagesChange = (updatedImages) => {
    setImages(updatedImages); // ImageUploader에서 변경된 이미지 상태를 업데이트
  };

  const handlePreviewClick = () => {
    navigate("/selectprj/prj-two");
  };


  const handleCompleteClick = () => {
    navigate("/selectprj/prjall"); // 완료 버튼 클릭 시 경로 이동
  };

  return (
    <div>
      <SelectBox>

        <TitleBox text="프로젝트 기간" />

        <div>
          <TitleProduct text="이미지 첨부" />
          <DescriptionProduct text="프로젝트와 관련된 이미지를 첨부해주세요." />
          <ImageUploader onImagesChange={handleImagesChange} />
        </div>

        <div>
          <TitleProduct text="프로젝트 기간 설정" />
          <DescriptionProduct text="프로젝트 시작일과 종료일을 선택해주세요." />
          <Date />
        </div>

        <div>
          <TitleProduct text="프로젝트 상세 정보" />
          <ReactQuill value={content} onChange={setContent} />
        </div>

        <MyNavLine />

      </SelectBox>

      <PrjFooter>
        <WhiteBtn
          width="80px"
          fontSize="0.9rem"
          padding="8px 3px"
          fontFamily="var(--kr-font)"
          text="이전"
          onClick={handlePreviewClick}
        />

        <Btn
          width="80px"
          fontSize="0.9rem"
          padding="8px 3px"
          text="완료"
          onClick={handleCompleteClick} // 완료 버튼 클릭 핸들러 추가
        />
      </PrjFooter>
    </div>
  );
}

export default SelectPrjThree;
