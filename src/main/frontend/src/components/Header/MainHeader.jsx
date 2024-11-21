import React from "react";
import styled from "styled-components";
import HeaderMenu from "./HeaderMenu"; // 메뉴 컴포넌트
import a from "../Header/Logo.svg";
import SearchInput from "./SearchInput";
import { motion } from "framer-motion";

// 헤더 스타일
const HeaderContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  padding: 15px 20px;
  height: 81px;
  background-color: var(--header-color);
  color: #fff;
  width: 100%;

`;

// 로고 및 메뉴를 감싸는 컨테이너
const LogoAndMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 20px; /* 로고와 메뉴 사이 간격 */
  flex-shrink: 0; /* 로고와 메뉴 크기 고정 */
  cursor : pointer;
`;

// 로고 스타일
const LogoSection = styled(motion.div)`
  display: flex;
  align-items: center;

  img {
    height: auto;
    width: 154px;
  }
`;

// 메뉴 리스트 스타일
const MenuList = styled.div`
  display: flex;
  gap: 41px;
`;

// 검색 및 버튼 스타일
const SearchAndButtons = styled(motion.div)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  flex-grow: 1; /* 검색 및 버튼 섹션이 오른쪽 끝으로 밀리도록 설정 */
`;

const Button = styled(motion.button)`
  font-family: var(--eng-font);
  color: #fff;
  cursor: pointer;
  width: 70px;
  padding: 5px 0px;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-decoration: underline;
  text-underline-offset: 2px;
  background: none;
  border: none;
`;

// 메인 헤더 컴포넌트
const MainHeader = () => {
  return (
    <HeaderContainer>
      {/* 로고 및 메뉴 섹션 */}
      <LogoAndMenu>
        <LogoSection
           whileHover={{scale:1.05}}>
          <img src={a} alt="로고이미지" />
        </LogoSection>
        <MenuList>
          <HeaderMenu name="HOME" href="#home" />
          <HeaderMenu name="UPCOMING" href="#upcoming" />
          <HeaderMenu name="ACTIVE" href="#active" />
          <HeaderMenu name="MORE" href="#more" />
        </MenuList>
      </LogoAndMenu>

      {/* 검색 및 버튼 */}
      <SearchAndButtons>
        <SearchInput 
        //  onChange={onChange} value={value} 
        //  placeholder={placeholder} onClick={onClick} 
         
         />
        <Button
           whileHover={{scale:1.05}}
           whileTap={{scale:0.98}}
        >Log In</Button>
        <Button
              whileHover={{scale:1.05}}
              whileTap={{scale:0.98}}
        >Sign Up</Button>
      </SearchAndButtons>
    </HeaderContainer>
  );
};

export default MainHeader;
