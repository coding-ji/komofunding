import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {motion} from 'framer-motion'


// 스타일 정의
const SearchIcon = styled(FontAwesomeIcon)`
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
    color: #fff;
    cursor: pointer; /* 클릭 가능 표시 */

&:hover {
  transform: translateY(-50%) scale(1.1); /* scale 효과 추가 */
  transition: transform 0.3s ease-in-out; /* 부드러운 애니메이션 */
}
    

`;


const StyledDiv = styled.div`
  display: flex;
  align-items: center; /* 세로 가운데 정렬 */
  position: relative;
  
`;

const StyledInput = styled(motion.input)`
  padding: 10px;
  padding-right: 40px; /* 오른쪽 여백을 줘서 돋보기 아이콘이 겹치지 않도록 설정 */  
  border-radius: 2px;
  width: 100%;
  overflow: hidden; /* 넘치는 텍스트를 숨기기 */
  white-space: nowrap; /* 텍스트가 한 줄로 계속 나오도록 설정 */
  border: 2px solid #FFF;  
  background: rgba(217, 217, 217, 0.00);
  color : #fff;
  

`;



function SearchInput({onClick,onChange,value,placeholder}) {
  return (
    <StyledDiv>
      <StyledInput  
      onChange={onChange} 
      value={value} 
      placeholder={placeholder}
      maxLength={30} // 최대길이
      initial={{ width: "6rem" }} // 초기 width
        whileFocus={{ width: "8rem" }} // 포커스 시 width 변경
        transition={{ duration: 0.3 }} // 애니메이션 속도
    
      />
      <SearchIcon icon={faMagnifyingGlass} onClick={onClick}/>
    </StyledDiv>
  );
}

export default SearchInput;


//-------------------------------------------------------
//아래와 같이 인풋... 음...


// function App() {

//   const [searchValue, setSearchValue] = useState("");

//   const handleInputChange = (event) => {
//     setSearchValue(event.target.value);
//   };

//   const handleSearchClick = () => {
//     alert(`검색 내용: ${searchValue}`);
//   };

//   return (
//     <>
//        <SearchInput
//         onClick={handleSearchClick}
//         onChange={handleInputChange}
//         value={searchValue}
//         placeholder="검색어를 입력하세요"
//       />
//     </>
//   )
// }

// export default App
