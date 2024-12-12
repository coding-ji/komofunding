import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import TitleText from '../../components/TitleText';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  font-family: "Arial", sans-serif;
  padding: 20px;
  margin: 70px 0;
`;

const Header = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 1px;

  h1 {
    font-size: 36px;
    font-weight: bold;
    color: #333;
    max-width: 1100px;
    width: 100%;
  }
`;

const Divider = styled.hr`
  width: 100%;
`;

const MainContent = styled.main`
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 20px 40px;
  max-width: 1043px;
  width: 100%;
  box-sizing: border-box;
`;

const TextBox = styled.div`
  padding: 10px;
  max-width: 958px;
  width: 100%;
  color: #6b6b6b;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 18px;
  text-align: left;
  line-height: 1.8;

  p {
    color: #444;
    line-height: 1.8;
    margin: 12px 0;
    font-weight: 400;
    word-break: keep-all; /* 긴 텍스트도 보기 좋게 줄바꿈 */
  }

  p::first-line {
    font-weight: bold; /* 첫 줄 강조 */
  }

  p + p {
    margin-top: 16px; /* 문단 간격 추가 */
  }
`;


const StepsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
`;

const StepButton = styled.button`
  padding: 12px 20px;
  background-color: #256e91;
  color: white;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: #1d4e6d;
  }
`;

const BackButton = styled.a`
  display: block;
  margin: 20px auto 0;
  padding: 10px 20px;
  background-color: #256e91;
  color: #fff;
  border-radius: 7px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  text-decoration: none;

  &:hover {
    background-color: #1d4e6d;
  }
`;

const PrivacyPolicy = () => {
  return (
    <PageWrapper>
      <Header
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <TitleText title="개인정보처리방침" />
      </Header>

      <Divider />

      <MainContent>
        <TextBox>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '10px',
              fontSize: '14px',
              color: '#888',
            }}
          >
            <span style={{ color: '#256E91' }}>2024-11-09</span>
            <span style={{ color: '#256E91' }}>관리자</span>
          </div>
          <Divider />

          <p>
            제1조 (개인정보의 수집 목적)
            <br />
            KOMO Funding은 안전한 거래를 위해 최소한의 개인정보를 수집합니다.
          </p>
          <p>
            제2조 (수집하는 개인정보 항목)
            <br />
            - 필수 항목: 이름, 이메일, 연락처<br />
            - 선택 항목: 주소, 배송 정보
          </p>
          <p>
            제3조 (보유 및 이용 기간)
            <br />
            개인정보는 목적 달성 시 파기되며, 법령에 따라 일정 기간 보관될 수 있습니다.
          </p>
          <p>
  제4조 (개인정보의 제3자 제공)<br />
  KOMO Funding은 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다. 다만, 다음의 경우에는 예외로 합니다.<br />
  - 법령에 의해 요구되는 경우<br />
  - 서비스 제공을 위해 필요한 최소한의 범위 내에서 배송업체 등 제3자에게 제공하는 경우<br />
  - 이용자의 사전 동의를 받은 경우<br />
</p>
<p>
  제5조 (개인정보 보호를 위한 기술적 대책)<br />
  회사는 개인정보의 안전성을 확보하기 위해 다음과 같은 조치를 시행합니다.<br />
  - 개인정보 접근 권한의 제한<br />
  - 데이터 암호화<br />
  - 정기적인 보안 점검 및 모니터링<br />
</p>
        </TextBox>
      </MainContent>

      <BackButton href="/">홈으로</BackButton>
    </PageWrapper>
  );
};

export default PrivacyPolicy;
