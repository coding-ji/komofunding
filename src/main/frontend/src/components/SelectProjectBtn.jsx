import styled from "styled-components";



// 스타일드 컴포넌트 정의



const ProjectTitle = styled.p`
    color: #323232;
    font-family: var(--eng-font);
    font-size: 80px;
    font-style: normal;
    font-weight: 500;
    line-height: 80px; /* 100% */
    letter-spacing: 9.6px;
        grid-area: title;

`;

const ProjectAdd=styled.p`
color: #323232;
font-family:  var(--eng-font);
font-size: 16px;
font-style: normal;
font-weight: 500;
letter-spacing: 1.92px;
    grid-area:subtitle;

`

const BtnBox=styled.div`
border-radius: 2px;
background: #323232;
    grid-area: button;
    

`

const BtnText = styled.p`
color: #FFF;
font-family: var(--eng-font);
font-size: 40px;
font-style: normal;
font-weight: 500;
line-height: 90px; /* 225% */
letter-spacing: 4.8px;
text-decoration-line: underline;
text-decoration-style: solid;
text-decoration-skip-ink: auto;
text-decoration-thickness: auto;
text-underline-offset: auto;
text-underline-position: from-font;
text-align: center;
    grid-area: button;

`

const SelectDiv = styled.div`

color: #323232;
font-family: var(--eng-font);
font-size: 80px;
font-style: normal;
font-weight: 500;
line-height: 80px; /* 100% */
letter-spacing: 9.6px;
padding : 30px 27px 30px 27px;
    

    &:hover {
      background-color: var(--user-mainHome);
    } 
    
     &:hover ${ProjectTitle} {
        color: rgba(255, 255, 255, 0.95);

    } 

    &:hover ${ProjectAdd} {
        color: rgba(255, 255, 255, 0.95);

    }    

    &:hover ${BtnBox} {
background: rgba(255, 255, 255, 0.95);
    }   
    &:hover ${BtnText} {
color: var(--user-mainHome, #282828);
    } 

/* Grid 설정 */
    display : grid;
    grid-template:

        "title title title ..." 160px
        "subtitle ... ... ..." 30px
        "... .... button ..."; 69px / 104px 226px 226px 1fr 

`;


function SelectProjectBtn() {
    return (
        <SelectDiv >
            <ProjectTitle>PROJECT SELECT</ProjectTitle>
            <ProjectAdd>프로젝트 등록</ProjectAdd>
            <BtnBox>
            <BtnText>CLICK</BtnText>
            </BtnBox>
        </SelectDiv>
    );
}

export default SelectProjectBtn;