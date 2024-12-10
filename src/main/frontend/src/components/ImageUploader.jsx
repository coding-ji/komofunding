import { useState } from "react";
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
  padding : 2px 5px;
`;

function ImageUploader({ onImagesChange, images }) {
  const [localImages, setLocalImages] = useState(images || []); // 부모에서 전달된 이미지를 초기값으로 설정

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        newImages.push(reader.result);
        if (newImages.length === files.length) {
          setLocalImages((prevImages) => {
            const updatedImages = [...prevImages, ...newImages];
            onImagesChange(updatedImages); // 부모 컴포넌트에 이미지 업데이트 전달
            return updatedImages;
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <>
    <ImageUploaderWrapper>
      <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
      {localImages.length > 0 && (
        <ImagePreview>
          {localImages.map((image, index) => (
            <img key={index} src={image} alt={`첨부된 이미지 ${index + 1}`} />
          ))}
        </ImagePreview>
      )}
    </ImageUploaderWrapper>
</>
  )
};
export default ImageUploader;
