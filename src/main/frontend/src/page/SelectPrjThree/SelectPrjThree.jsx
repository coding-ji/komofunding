import { useState } from "react";
import styled from "styled-components";
import TitleText from "../../components/TitleText";
import MyNavLine from "../../components/MyNavLine";
import TitleBox from "../../components/TitleBox";
import DescriptionProduct from "../../components/DescriptionProduct";
import TitleProduct from "../../components/TitleProduct";
import Input from "../../components/input";
import Category from "../../components/Category";
import { Btn, WhiteBtn } from "../../components/MyBtn";
import Date from "../../components/Date";
import ReactQuill from "react-quill"; // react-quill import
import "react-quill/dist/quill.snow.css"; // quill 기본 스타일 import

const SelectBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

function SelectPrjThree() {
  const [content, setContent] = useState(""); // 에디터의 내용 관리 상태

  return (
    <SelectBox>
      <TitleBox text="프로젝트 기간" />
      <div>
      <TitleProduct text="프로젝트 기간 설정"/>
        <DescriptionProduct text="프로젝트 시작일과 종료일을 선택해주세요." />
        <Date />
      </div>

      <div>
        <TitleProduct text="프로젝트 상세 정보" />
        {/* ReactQuill을 사용하여 에디터 추가 */}
        <ReactQuill value={content} onChange={setContent} />
      </div>

      <MyNavLine />
    </SelectBox>
  );
}

export default SelectPrjThree;
