import React, { useState } from "react";
import "./CreatorApply.css";
import TitleText from "../../../components/TitleText";
import "../../../index.css";
import MyNavLine from "../../../components/MyNavLine";
import { Btn, WhiteBtn } from "../../../components/MyBtn";

const CreatorApply = () => {
  const [type, setType] = useState("개인"); // 법인 또는 개인 선택 상태
  const [files, setFiles] = useState([]); // 업로드된 파일 목록
  const [agree, setAgree] = useState(false); // 이용약관 동의 상태

  // 파일 선택 핸들러
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files); // 선택된 파일들
    setFiles([...files, ...selectedFiles]);
  };

  // 드래그 앤 드롭 핸들러
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files); // 드롭된 파일들
    setFiles([...files, ...droppedFiles]);
  };

  // 드래그 중 기본 이벤트 방지
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agree) {
      alert("이용 약관에 동의해주세요.");
      return;
    }
    alert("신청이 제출되었습니다!");
    // 서버로 데이터 전송 로직 추가 가능
  };

  return (
    <div className="creator-application">
      <TitleText title="제작자 신청" />
      <div className="box">
        <MyNavLine />
        <form onSubmit={handleSubmit}>
          {/* 인증 서류 제출하기 */}
          <div className="section">
            <div className="submissionBox">
              <p className="submissionText">인증 서류 제출하기</p>
              <div className="type-selection">
                <label>
                  <input
                    type="radio"
                    value="법인"
                    checked={type === "법인"}
                    onChange={() => setType("법인")}
                  />
                  법인
                </label>
                <label>
                  <input
                    type="radio"
                    value="개인"
                    checked={type === "개인"}
                    onChange={() => setType("개인")}
                  />
                  개인
                </label>
              </div>
            </div>

            {/* 개인/법인 서류 안내 */}
            <div className="instructions">
              <h3>{type} 제작자</h3>
              {type === "개인" ? (
                <p>
                  - 서류: 신분증 사본
                  <br />- 제출 대상: 개인 제작자
                </p>
              ) : (
                <p>
                  - 서류: 사업자등록증, 법인등기부등본
                  <br />- 제출 대상: 법인 제작자
                </p>
              )}
            </div>
          </div>

          <MyNavLine />

          {/* 파일 업로드 */}
          <div className="section">
            <h3>파일 업로드</h3>
            <div
              className="drag-area"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <label htmlFor="file-input" className="file-button">
                파일 검색
              </label>
              <input
                id="file-input"
                type="file"
                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx"
                multiple
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <p>여기로 파일을 드래그하거나 파일 검색 버튼을 클릭하세요.</p>
            </div>
            <div className="file-list">
              {files.length > 0 ? (
                files.map((file, index) => (
                  <div key={index} className="file-item">
                    {file.name}
                  </div>
                ))
              ) : (
                <p>첨부된 파일이 없습니다.</p>
              )}
            </div>
          </div>

          <MyNavLine />

          {/* 이용약관 동의 */}
          <div className="section">
            <h3>제출하기 전에 이용 약관에 동의하셨습니까?</h3>
            <label>
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              동의합니다
            </label>
          </div>

          {/* 버튼 */}
          <div className="buttons">
            <Btn text="확인" />
            <WhiteBtn
              text="취소"
              onClick={() => {
                setFiles([]);
                setAgree(false);
                alert("취소되었습니다.");
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatorApply;
