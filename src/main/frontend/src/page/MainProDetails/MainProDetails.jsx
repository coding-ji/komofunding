import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TitleProduct from "../../components/TitleProduct";
import DescriptionProduct from "../../components/DescriptionProduct";
import TitleText from "../../components/TitleText";
import PrjCategory from "../../components/PrjCategory";
import ImageCarousel from "../../components/ImageCarousel/ImageCarousel";

const ProDetails = styled.div`
`;

    const images = [
      {
        large: "https://via.placeholder.com/450x450",
        thumbnail: "https://via.placeholder.com/450x450"
      },
      {
        large: "https://via.placeholder.com/320x320",
        thumbnail: "https://via.placeholder.com/320x320"
      },
      {
        large: "https://via.placeholder.com/250x250",
        thumbnail: "https://via.placeholder.com/250x250"
      }
    ];


function MainProDetails() {
    return (
        <ProDetails>
            {/* <ImageCarousel images={images} /> */}
            <TitleProduct text="상품 제목 들어가는 공간" fontSize="2rem" />
            <DescriptionProduct text="상품 설명 들어가는 공간" />
            <TitleProduct text="프로젝트 스토리" />
            <PrjCategory ></PrjCategory>

        </ProDetails>      
    )
}

export default MainProDetails;