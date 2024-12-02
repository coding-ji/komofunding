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
import { Outlet, useNavigate } from "react-router-dom";
import styles from './SelectPrj.module.css';  // CSS 모듈 임포트
import { useState } from "react";

const SelectBox = styled.div `
display:flex;
flex-direction : column;
gap : 30px;
`

const PrjFooter = styled.div`
display:flex;
flex-direction : row;
gap : 10px;
justify-content: flex-end;
margin-right : 10vw; 
margin-bottom : 20px;
`

function SelectPrj(){
    const navigate = useNavigate(); // useNavigate 훅 사용
    const [clickCount, setClickCount] = useState(0); // 클릭 횟수 상태를 useState로 정의


    const handleNextClick = () => {
        if (clickCount === 0) {
          // 첫 번째 클릭: 'prj-two'로 이동
          navigate("prj-two");
          setClickCount(1); // 클릭 횟수 증가
        } else if (clickCount === 1) {
          // 두 번째 클릭: 'prj-three'로 이동
          navigate("prj-three");
        }
      };

    return(
        <div>
        <SelectBox>
        <div className={styles.Title}>
        <TitleText title="새 프로젝트 등록"/>
        </div>
        <MyNavLine />
        </SelectBox>

    <div className={styles.Children}>
    <Outlet/>
    </div>

        <PrjFooter>
        <Btn
        width= "80px"
        fontSize= "0.9rem"
        padding="8px 3px"
        fontFamily="var(--kr-font)"
        text ="임시저장"/>
        
        <WhiteBtn 
        width= "80px"
        fontSize= "0.9rem"
        padding="8px 3px"
        onClick={handleNextClick} // 하위 경로로 이동

        text= "다음" />
        </PrjFooter>
        </div>
    )
}

export default SelectPrj;