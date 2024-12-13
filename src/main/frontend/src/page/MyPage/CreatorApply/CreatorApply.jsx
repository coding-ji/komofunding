import React, { useState, useRef, useEffect } from "react";
import "./CreatorApply.css";
import TitleText from "../../../components/TitleText";
import "../../../index.css";
import MyNavLine from "../../../components/MyNavLine";
import { Btn, WhiteBtn, ProductBtn1 } from "../../../components/MyBtn";
import PopupInquiry from "../writeQnA/PopupInquiry";
import TermsPopup from "./TermsPopup";
import { useStore as FileStore } from "../../../stores/FileStore/useStore";
import { useStore as ApplicationStore } from "../../../stores/Application/useStore";
const CreatorApply = () => {
  const [type, setType] = useState("개인"); // 법인 또는 개인 선택 상태
  const [files, setFiles] = useState([]); // 업로드된 파일 목록
  const [agree, setAgree] = useState(""); // 이용약관 동의 상태
  const [isPopupOpen, setIsPopupOpen] = useState(false); // 신청 완료 팝업
  const [isPopupOpen2, setIsPopupOpen2] = useState(false); // 취소 팝업
  const [isPopupOpen3, setIsPopupOpen3] = useState(false); // 이용약관 아니오 팝업
  const [isPopupOpen4, setIsPopupOpen4] = useState(false); // 이용약관 팝업
  const [isPopupOpen5, setIsPopupOpen5] = useState(false); // 파일첨부
  const fileInputRef = useRef(null); // 파일 input 참조
  const [isLoaded, setIsLoaded] = useState(false); // 이미지 업로드 완료 상태
  const [fileUrl, setFileUrl] = useState([]);

  const { state: fileState, actions: fileActions } = FileStore();
  const { state: applicationState, actions: applicationActions } = ApplicationStore();

  // 파일버튼 눌렀을때
  const handleFileChange = async (e) => {
    e.preventDefault();
    fileInputRef.current.click(); // 파일 선택 창 열기
  };

  const handleImgChange = async (e) => {
    e.preventDefault();
    const selectedFiles = e.target.files;
    if (selectedFiles.length === 0) return;
    try {
      // 선택된 파일 배열
      const uploadedFiles = [];

      // 하나씩 파일을 업로드
      for (const file of selectedFiles) {
        const formData = new FormData();
        formData.append("file", file, file.name); // 파일 이름을 명시적으로 추가

        // 각 파일을 개별적으로 업로드
        await fileActions.createImgData(formData);

        // 파일 추가 후, 상태 업데이트
        uploadedFiles.push(file);
      }
      // 업로드 완료 후 한 번에 상태 업데이트
      setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
      setIsLoaded(true); // 업로드 완료 상태
    } catch (error) {
      console.error("이미지 업로드 실패", error);
    }
  };

  useEffect(() => {
    if (fileState && isLoaded) {
      setFileUrl((prevUrls) => [...prevUrls, fileState]); // 새로운 URL 추가
      setIsLoaded(false);
    }
    fileActions.resetState();
  }, [fileState]);

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
  const handleFileDelete = (index, e) => {
    e.preventDefault();
    // 파일 목록에서 해당 인덱스를 제외한 새로운 배열 생성
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  // 데이터 제출 테스트
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agree || agree !== "yes") {
      setIsPopupOpen3(true);
      return;
    }

    if (files.length === 0) {
      setIsPopupOpen5(true);
      return;
    }

    applicationActions.updateAllFields(
      {
        applicationImage : fileUrl
      }
    )

    await applicationActions.createUserApplication(); 

    setIsPopupOpen(true); // 성공 팝업 열기
  };

  // 팝업 닫기 핸들러
  const handlePopupClose = () => {
    setIsPopupOpen(false);
    setIsPopupOpen2(false);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setFiles([]);
    setAgree("");
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
                      추가요건 : 한국에 개설된 본인 명의의 입금 가능한 은행
                      계좌, 연락 가능한 한국 통신사의 핸드폰 번호 등록
                    </li>
                  </ul>
                  <div className="BusinessType">개인 사업자</div>
                  <ul className="list">
                    <li>제출 서류 : 사업자 등록증</li>
                    <li>
                      추가요건 : 한국에 개설된 본인 명의의 입금 가능한 은행
                      계좌, 연락 가능한 한국 통신사의 핸드폰 번호 등록
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
              <button className="btn" onClick={handleFileChange}>
                파일업로드
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx"
                multiple
                onChange={handleImgChange}
                style={{ display: "none" }}
              />
            </div>
            <div
              className="drag-area"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <p className="filetext">
                5MB 이하의 jpg, jpeg, png만 가능합니다.
              </p>
            </div>
            <div className="file-list">
              {files.length > 0 ? (
                files.map((file, index) => (
                  <div key={index} className="file-item">
                    {file.name}
                    <button
                      className="delete-button"
                      onClick={(e) => handleFileDelete(index, e)}
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
                    e.preventDefault();
                    e.stopPropagation();
                    setIsPopupOpen4(true);
                  }}
                >
                  내용확인
                </button>
                {isPopupOpen4 && (
                  <TermsPopup onClose={() => setIsPopupOpen4(false)} />
                )}
              </div>
              <div className="checkbox-container">
                <label>
                  <input
                    type="checkbox"
                    checked={agree === "yes"}
                    onChange={() => setAgree(agree === "yes" ? "" : "yes")}
                  />
                  예
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={agree === "no"}
                    onChange={() => {
                      if (agree !== "no") {
                        setAgree("no");
                        setIsPopupOpen3(true); // 팝업 열기
                      } else {
                        setAgree(""); // 체크 해제
                      }
                    }}
                  />
                  아니오
                </label>
              </div>
            </div>
          </div>

          <p className="info-text">
            승인까지 3일에서 5일 정도 소요되며 잘못된 정보를 요청하면 승인이
            반려될 수 있습니다.
          </p>

          {/* 버튼 */}
          <div className="buttons">
            <Btn
              text="확인"
              width="8rem"
              height="2rem"
              fontSize="1rem"
              padding="2px 15px"
              onClick={handleSubmit}
            />
            <WhiteBtn
              text="취소"
              width="8rem"
              height="2rem"
              fontSize="1rem"
              padding="2px 15px"
              onClick={handleCancel}
            />
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
          onClose={handlePopupClose}
          navigateTo="/"
        />
      )}

      {isPopupOpen2 && (
        <PopupInquiry
          message={<>제작자 신청이 취소되었습니다.</>}
          onClose={handlePopupClose}
          navigateTo="/"
        />
      )}

      {isPopupOpen3 && (
        <PopupInquiry
          message={
            <>개인정보 수집에 동의하지 않으시면 제작자 신청을 할 수 없습니다.</>
          }
          onClose={() => setIsPopupOpen3(false)}
          navigateTo="/create-apply"
        />
      )}

      {isPopupOpen5 && (
        <PopupInquiry
          message={<>파일을 첨부해주세요.</>}
          onClose={() => setIsPopupOpen5(false)}
          navigateTo="/create-apply"
        />
      )}
    </div>
  );
};

export default CreatorApply;
