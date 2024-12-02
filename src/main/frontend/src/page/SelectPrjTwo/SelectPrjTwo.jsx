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
import styles from './SelectPrjTwo.module.css';  // CSS 모듈 임포트

function SelectPrjTwo(){
    return(
        <div className={styles.prjContainer}>
        <TitleBox text="프로젝트 상품 등록"/>

        <div>
        <TitleProduct text="상품 명"/>
        <DescriptionProduct text= "등록하고자 하는 상품의 이름을 작성해주세요." />
        <Input size="small" />
        </div>
    
        <div>
        <TitleProduct text = "상품 가격" />
        <DescriptionProduct text = "상품의 개당 가격을 작성해주세요. 해당 란 안에는 숫자만 기입해 주세요." />
        <Input size="small" />
        </div>

        <div>
        <TitleProduct text = "상품 수량" />
        <DescriptionProduct text = "해당 상품의 수량을 작성해주세요. 해당 란에는 숫자만 기입해 주세요." />
        <Input size="small" />
        </div>

        <div className={styles.selectBtn}>
        <WhiteBtn 
        width= "80px"
        fontSize= "0.9rem"
        padding="8px 3px"
        fontFamily="var(--kr-font)"
        text="등록" />
        </div>

        <MyNavLine />  

        <TitleBox text="프로젝트 상품 등록"/>

        <MyNavLine />  

        </div>
    )
}

export default SelectPrjTwo;