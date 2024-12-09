import React, { useState } from "react";
import styled from "styled-components";

const CarouselContainer = styled.div`
  display: flex; /* 메인 이미지와 썸네일/버튼을 나란히 배치 */
  align-items: center;
  gap: 20px;
`;

const MainImage = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const SideContainer = styled.div`
  display: flex;
  flex-direction: column; /* 위아래로 버튼과 썸네일 배치 */
  align-items: center;
  gap: 10px;
`;

const ThumbnailContainer = styled.div`
  display: flex;
  flex-direction: column; /* 썸네일을 세로로 배치 */
  gap: 10px;
  overflow-y: scroll; /* 세로 스크롤 가능 */
  max-height: 300px; /* 썸네일 영역 높이 제한 */
  scrollbar-width: none; /* Firefox 스크롤바 숨기기 */
  -ms-overflow-style: none; /* Internet Explorer/Edge 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari 스크롤바 숨기기 */
  }
`;

const Thumbnail = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  border: ${(props) => (props.isSelected ? "2px solid #007BFF" : "none")};
`;

const NavButton = styled.button`
  padding: 8px 12px;
  font-size: 16px;
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f4f4f4;
  &:hover {
    background-color: #e0e0e0;
  }
`;

function ImageCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <CarouselContainer>
      <MainImage src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} />
      <SideContainer>
        <div>
          <NavButton onClick={handlePrev}>▲</NavButton>
        </div>
        <ThumbnailContainer>
          {images.map((image, index) => (
              <Thumbnail
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => handleThumbnailClick(index)}
              isSelected={currentIndex === index}
              />
            ))}
        </ThumbnailContainer>
            <NavButton onClick={handleNext}>▼</NavButton>
      </SideContainer>
    </CarouselContainer>
  );
}

export default ImageCarousel;
