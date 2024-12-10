import { useState, useEffect } from "react";
import styled from "styled-components";

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

function ImageUploader({ onImagesChange, images }) {
  const [localImages, setLocalImages] = useState(images || []); // 초기값 설정
  const [blobUrls, setBlobUrls] = useState([]); // Blob URL을 관리할 배열

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);

    // 새로 생성된 Blob URL 저장
    const newBlobUrls = files.map((file) => URL.createObjectURL(file));
    setBlobUrls((prev) => [...prev, ...newBlobUrls]);

    setLocalImages((prev) => [...prev, ...files]);

    if (onImagesChange) {
      onImagesChange([...localImages, ...files]);
    }
  };

  useEffect(() => {
    // 컴포넌트 언마운트 시 Blob URL 해제
    return () => {
      blobUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [blobUrls]);

  return (
    <>
    <ImageUploaderWrapper>
      <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
      {localImages.length > 0 && (
        <ImagePreview>
          {localImages.map((image, index) => (
            <img key={index} src={blobUrls[index]} alt={`첨부된 이미지 ${index + 1}`} />
          ))}
        </ImagePreview>
      )}
    </ImageUploaderWrapper>
</>
  )
};
export default ImageUploader;
