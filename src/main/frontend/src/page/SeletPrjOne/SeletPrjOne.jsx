import { motion } from "framer-motion";
import styled from "styled-components";
import TitleText from "../../components/TitleText";
import MyNavLine from "../../components/MyNavLine";
import TitleBox from "../../components/TitleBox";
import DescriptionProduct from "../../components/DescriptionProduct";
import TitleProduct from "../../components/TitleProduct";
import { style } from "framer-motion/client";
import Input from "../../components/input";
import Category from "../../components/Category";
import { Btn, WhiteBtn } from "../../components/MyBtn";

const SelectBox = styled.div `
display:flex;
flex-direction : column;
gap : 20px;
`

function SelectPrjOne(){
    return(
        <SelectBox>

        <TitleBox text="프로젝트 기본 정보"/>

        <div>
        <TitleProduct text="프로젝트 제목"/>
        <DescriptionProduct text= "프로젝트 제목을 통해 프로젝트의 목적을 한눈에 알 수 있도록 작성해주세요." />
        <Input size="small" margin="5px"/>
        </div>
    
        <div>
        <TitleProduct text = "짧은 소개 글" />
        <DescriptionProduct text = "프로젝트를 간략하게 소개하고 후원자들이 프로젝트에 대해 빠르게 이해할 수 있도록 돕는 글을 작성해 주세요." />
        <Input size="small" margin="5px" />
        </div>

        <div>
        <TitleProduct text = "카테고리" />
        <DescriptionProduct text = "프로젝트에 해당하는 여러 카테고리 중 가장 적합한 카테고리를 선택해주세요. " />
        <Category />
        </div>

        <MyNavLine />  

        </SelectBox>
    )
}

export default SelectPrjOne;