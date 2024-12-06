import React, { useState, useRef } from "react";
import "./CreatorApply.css";
import TitleText from "../../../components/TitleText";
import "../../../index.css";
import MyNavLine from "../../../components/MyNavLine";
import { Btn, WhiteBtn, ProductBtn1 } from "../../../components/MyBtn";
import Alert from "../../../components/Alert/Alert";
import PopupInquiry from "../writeQnA/PopupInquiry";
import TermsPopup from "./TermsPopup";


const CreatorApply = () => {
  const [type, setType] = useState("개인"); // 법인 또는 개인 선택 상태
  const [files, setFiles] = useState([]); // 업로드된 파일 목록
  const [agree, setAgree] = useState(""); // 이용약관 동의 상태
  const [isPopupOpen, setIsPopupOpen] = useState(false)//신청완료
  const [isPopupOpen2, setIsPopupOpen2] = useState(false)//취소 버튼
  const [isPopupOpen3, setIsPopupOpen3] = useState(false)//이용약관 아니오
  const [isPopupOpen4, setIsPopupOpen4] = useState(false)//이용약관 팝업창
  const fileInputRef = useRef(null); // 파일 input 참조

  // 파일 추가 핸들러
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles([...files, ...selectedFiles]);
  };

  // 파일 업로드 버튼 클릭 핸들러
  const handleClick = (e) => {
    e.preventDefault(); // form의 기본 동작 방지
    if (fileInputRef.current) {
      fileInputRef.current.click(); // 숨겨진 input 클릭
    }
  };

  // 드래그 앤 드롭 핸들러
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles([...files, ...droppedFiles]);
  };

  // 드래그 중 기본 이벤트 방지
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // 파일 삭제 핸들러
  const handleFileDelete = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // form 제출 동작 방지
    if (!agree) {
      alert("이용 약관에 동의해주세요.");
      return;
    }
    console.log("제출 데이터:", { type, files, agree });

    // 서버로 데이터 전송 로직 추가 가능
    setIsPopupOpen(true)
  };


  const handlePopupClose = () => {
    setIsPopupOpen(false); // 팝업 닫기
    setIsPopupOpen2(false); // 팝업 닫기
  };


  const handleCancel = (e) => {
    e.preventDefault(); // form 제출 동작 방지
    setFiles([]);
    setAgree(false);
    setIsPopupOpen2(true);
  };

  return (
    <div className="creator-application">
      <TitleText title="제작자 신청" />
      <div className="box">
        <MyNavLine />
        <form onSubmit={handleSubmit}>
          {/* 인증 서류 제출하기 */}
          <div className="section">
            <div className="submission">
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
              {type === "개인" ? (
                <>
                  <div className="BusinessType">개인 제작자</div>
                  <ul className="list">
                    <li>제출 서류 : 신분증 사본</li>
                    <li>
                      추가요건 : 한국에 개설된 본인 명의의 입금 가능한 은행 계좌, 연락 가능한 한국 통신사의 핸드폰 번호 등록
                    </li>
                  </ul>
                  <div className="BusinessType">개인 사업자</div>
                  <ul className="list">
                    <li>제출 서류 : 사업자 등록증</li>
                    <li>
                      추가요건 : 한국에 개설된 본인 명의의 입금 가능한 은행 계좌, 연락 가능한 한국 통신사의 핸드폰 번호 등록
                    </li>
                  </ul>
                </>
              ) : (
                <>
                  <div className="BusinessType">법인 사업자</div>
                  <ul className="list">
                    <li>제출 서류 : 사업자 등록증</li>
                    <li>
                      추가요건 : 한국에 개설된 본인 명의의 입금 가능한 은행
                      계좌, 연락 가능한 한국 통신사의 핸드폰 번호 등록
                    </li>
                  </ul>
                </>
              )}
            </div>
          </div>

          <MyNavLine />

          {/* 파일 업로드 */}
          <div className="section">
            <div className="submissionfile">

              <p className="pstyle">파일 첨부</p>
              <button className="btn" onClick={handleClick}
              >
                파일업로드
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx"
                multiple
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
            <div
              className="drag-area"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <p className="filetext">
                5MB 이하의 jpg, jpeg, png, zip, hwp 확장자 및 Word, Excel에서
                작성된 문서만 가능합니다.
              </p>
            </div>
            <div className="file-list">
              {files.length > 0 ? (
                files.map((file, index) => (
                  <div key={index} className="file-item">
                    {file.name}
                    <button
                      className="delete-button"
                      onClick={() => handleFileDelete(index)}
                    >
                      X
                    </button>
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
            <div className="submission">
              <div className="submissionfile">
                <p className="pstyle">
                  제출하기 전에 이용 약관에 동의하셨습니까?
                </p>
                <button
                  className="btn"
                  onClick={(e) => {
                    e.preventDefault(); // 기본 동작 방지
                    e.stopPropagation(); // 이벤트 전파 방지
                    setIsPopupOpen4(true); // 팝업 열기
                  }}
                >
                  내용확인
                </button>
                {isPopupOpen4 && <TermsPopup onClose={() => setIsPopupOpen4(false)} />}
              </div>
              <div className="checkbox-container">
                <label>
                  <input
                    type="checkbox"
                    checked={agree === "yes"} // "예" 상태 확인
                    onChange={() => setAgree(agree === "yes" ? "" : "yes")} // 토글 동작
                  />
                  예
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={agree === "no"} // "아니오" 상태 확인
                    onChange={() => {
                      if (agree !== "no") {
                        setAgree("no");
                        setIsPopupOpen3(true); // 팝업 열기
                      } else {
                        setAgree(""); // 체크 해제
                      }
                    }} // 토글 동작
                  />
                  아니오
                </label>
              </div>
            </div>
          </div>

          <p className="info-text">승인까지 3일에서 5일 정도 소요되며 잘못된 정보를 요청하면 승인이 반려될 수 있습니다.</p>

          {/* 버튼 */}
          <div className="buttons">
            <Btn text="확인"
              width="8rem" height="2rem" fontSize="1rem" padding="2px 15px"
              onClick={handleSubmit}
            />
            <WhiteBtn text="취소"
              width="8rem" height="2rem" fontSize="1rem" padding="2px 15px"
              onClick={handleCancel} />
          </div>
        </form>
      </div>
      {isPopupOpen && (
        <PopupInquiry
          message={
            <>
              제작자 신청이 완료되었습니다. <br />
              승인까지는 3~5일이 소모됩니다.
            </>
          }
          onClose={handlePopupClose} // 팝업 닫기 함수
          navigateTo="/" // 이동할 경로
        />
      )}

      {isPopupOpen2 && (
        <PopupInquiry
          message={
            <>
              제작자 신청이 취소되었습니다.
            </>
          }
          onClose={handlePopupClose} // 팝업 닫기 함수
          navigateTo="/" // 이동할 경로
        />
      )}

      {isPopupOpen3 && (
        <PopupInquiry
          message={
            <>
              개인정보 수집에 동의하지 않으시면 제작자 신청을 할 수 없습니다.
            </>
          }
          onClose={() => setIsPopupOpen3(false)} // 팝업 닫기 핸들러
          navigateTo="/create-apply" // 이동할 경로 (필요 시 수정 가능)
        />
      )}
    </div>
  );
};

export default CreatorApply;
