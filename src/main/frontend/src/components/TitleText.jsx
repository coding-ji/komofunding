import styled from "styled-components";
import "../index.css";
import { motion } from "framer-motion";

// 텍스트를 감싸는 부모 컨테이너 (overflow: hidden)
const Wrapper = styled.div`
  display: inline-block;
  overflow: hidden; /* 텍스트가 컨테이너 밖으로 넘치지 않도록 설정 */
  height: 80px; /* 텍스트 높이에 맞게 설정 */
  width:100%
`;

const StyledTitleText = styled(motion.p)`
  color: black;
  text-align: center;
  font-family: var(--kr-noto);
  font-size: 64px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.32px;
  margin: 0;

    @media (max-width: 768px) {
    font-size: 48px; /* 태블릿 및 작은 화면용 */
  }

  @media (max-width: 480px) {
    font-size: 36px; /* 모바일 화면용 */
  }
`;

// 컴포넌트 정의
function TitleText({ title }) {
  return (
    <Wrapper>
      <StyledTitleText
        initial={{ y: "100%" }} // 텍스트가 아래쪽에 숨겨진 상태로 시작
        animate={{ y: "0%" }} // 텍스트가 위로 올라오면서 완전히 보임
        transition={{
          duration: 1, // 애니메이션 지속 시간
          ease: "easeOut", // 부드러운 종료 효과
        }}
      >
        {title}
      </StyledTitleText>
    </Wrapper>
  );
}

export default TitleText;
