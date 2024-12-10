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
  const [base64Images, setBase64Images] = useState([]); // Base64 이미지 저장할 배열

  // 이미지 업로드 처리
  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    
    // 파일을 base64로 변환
    const base64Promises = files.map((file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      })
    );

    try {
      const base64Results = await Promise.all(base64Promises); // 모든 파일을 base64로 변환
      setBase64Images((prev) => [...prev, ...base64Results]);
      setLocalImages((prev) => [...prev, ...files]);

      // base64 이미지 상태가 변경되면 onImagesChange를 통해 부모에게 전달
      if (onImagesChange) {
        onImagesChange([...localImages, ...base64Results]);
      }

      // base64 이미지를 localStorage에 저장
      localStorage.setItem("thumbnailImgs64", JSON.stringify([...base64Results]));
    } catch (error) {
      console.error("이미지 변환 실패:", error);
    }
  };

  // 컴포넌트가 마운트될 때 localStorage에서 이미지를 불러오기
  useEffect(() => {
    const savedBase64Images = localStorage.getItem("base64Images");
    if (savedBase64Images) {
      setBase64Images(JSON.parse(savedBase64Images));
    }
  }, []);

  return (
    <ImageUploaderWrapper>
      <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
      {base64Images.length > 0 && (
        <ImagePreview>
          {base64Images.map((base64Image, index) => (
            <img key={index} src={base64Image} alt={`첨부된 이미지 ${index + 1}`} />
          ))}
        </ImagePreview>
      )}
    </ImageUploaderWrapper>
  );
}

export default ImageUploader;