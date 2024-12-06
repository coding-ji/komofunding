import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TitleProduct from "../../components/TitleProduct";
import DescriptionProduct from "../../components/DescriptionProduct";
import TitleText from "../../components/TitleText";
import PrjCategory from "../../components/PrjCategory";
// import ImageCarousel from "../../components/ImageCarousel/ImageCarousel";
import ProgressContainer from "../../components/ProgressContainer";
import MainProDetailsIntro from "../../components/MainProDetails/MainProDetailsIntro";

const ProDetails = styled.div`

  display: flex;
  flex-direction: column;
  gap: 30px;
`;


function MainProDetails() {
    return (
        <ProDetails>
            {/* <ImageCarousel images={images} /> */}
            <ProgressContainer></ProgressContainer>
            <TitleProduct text="상품 제목 들어가는 공간" fontSize="2rem" />
            <DescriptionProduct text="상품 설명 들어가는 공간" />
            <MainProDetailsIntro />

        </ProDetails>      
    )
}

export default MainProDetails;