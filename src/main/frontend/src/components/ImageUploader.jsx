import { useState, useEffect } from "react";
import styled from "styled-components";
import { useStore } from "../stores/FileStore/useStore";

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

const ImageUploaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2px 5px;
`;

function ImageUploader({ thumbnailImgs, setThumbnailImgs }) {
  const { state, actions } = useStore();
  const [localImages, setLocalImages] = useState([]); // 로컬 이미지 Blob 상태
  const [isLoaded, setIsLoaded] = useState(false); // 이미지 업로드 완료 상태


  // localStorage에서 받아온 이미지 URL을 Blob 객체로 변환 (프로젝트 수정 시에)
  useEffect(() => {
    if (thumbnailImgs && thumbnailImgs.length > 0) {
      // URL.createObjectURL을 사용하여 Blob URL 생성
      const blobUrls = thumbnailImgs.map((image) => {
        // 이미지가 이미 Blob URL이라면 바로 반환, 아니면 Blob로 변환
        if (image instanceof Blob) {
          return URL.createObjectURL(image);
        }
        return image; // 이미지 URL이 이미 있으면 그대로 반환
      });
      setLocalImages(blobUrls);
    }
  }, [thumbnailImgs]);

  // 파일 선택 시 Blob URL 생성 및 상태 업데이트
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const newLocalImages = files.map((file) => URL.createObjectURL(file));

    // 로컬 이미지 상태 업데이트 (미리보기)
    setLocalImages((prev) => [...prev, ...newLocalImages]);

    const formData = new FormData();
    files.forEach((file) => formData.append("file", file));

    try {
      // 이미지 저장 요청 보내기
      await actions.createImgData(formData); // 서버에 이미지 업로드
      setIsLoaded(true); // 업로드 완료 상태 설정
    } catch (error) {
      console.error("이미지 업로드 실패", error);
    }
  };

  // 서버에서 이미지 URL을 받아서 상위 컴포넌트로 전달
  useEffect(() => {
    if (isLoaded) {
      setThumbnailImgs((prev) => [...prev, state]);
      setIsLoaded(false); // 상태 초기화
    }
    actions.resetState();
  }, [state]);

  return (
    <ImageUploaderWrapper>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
      />
      {localImages.length > 0 && (
        <ImagePreview>
          {localImages.map((blobUrl, index) => (
            <div key={index}>
              <img src={blobUrl} alt={`첨부된 이미지 ${index + 1}`} />
            </div>
          ))}
        </ImagePreview>
      )}
    </ImageUploaderWrapper>
  );
}

export default ImageUploader;
