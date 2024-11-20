import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

// 스타일 정의
const SearchIcon = styled(FontAwesomeIcon)`
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
    color: #fff;
    cursor: pointer; /* 클릭 가능 표시 */

    

`;


const StyledDiv = styled.div`
  display: flex;
  align-items: center; /* 세로 가운데 정렬 */
  position: relative;
  width: 80%;
`;
//width : 100% 로 바꿔야함

const StyledInput = styled.input`
  padding: 10px;
  padding-right: 40px; /* 오른쪽 여백을 줘서 돋보기 아이콘이 겹치지 않도록 설정 */  
  border-radius: 2px;
  width: 100%;
  box-sizing: border-box; /* padding을 포함해 전체 너비 계산 */
  text-overflow: ellipsis; /* 텍스트가 넘치면 '...'으로 표시 */
  overflow: hidden; /* 넘치는 텍스트를 숨기기 */
  white-space: nowrap; /* 텍스트가 한 줄로 계속 나오도록 설정 */
  border: 2px solid #FFF;  
  background: rgba(217, 217, 217, 0.00);
  color : #fff;

`;



function SearchInput({onClick,onChange,value,placeholder}) {
  return (
    <StyledDiv>
      <StyledInput  onChange={onChange} value={value} placeholder={placeholder} />
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
