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

const ChargePolicy = () => {
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
        <TitleText title="이용 약관" />
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
            제1조 (목적)
            <br />
            본 약관은 KOMO Funding이 운영하는 크라우드펀딩 플랫폼에서 메이커와 회사 간의 권리 및 의무를 규정하는 것을 목적으로 합니다.
          </p>
          <p>
            제2조 (정의)
            <br />
            1. 서비스: 회사가 제공하는 플랫폼.<br />
            2. 메이커: 프로젝트를 개설하고 펀딩을 모집하는 개인 또는 법인.<br />
            3. 서포터: 프로젝트에 참여해 펀딩하는 자.<br />
            4. 리워드: 펀딩에 대한 대가로 제공되는 제품 또는 서비스.
          </p>
          <p>
            제3조 (약관 개정)
            <br />
            회사는 필요시 약관을 개정할 수 있으며, 개정 내용은 시행일 7일 전 공지합니다. 불리한 변경 시 30일 전 공지합니다.
          </p>
          <p>
            제4조 (서비스 이용)
            <br />
            메이커는 회사의 승인을 통해 프로젝트를 개설하며, 정확한 정보를 제공해야 합니다.
          </p>
          <p>
  제5조 (프로젝트 관리)<br />
  1. 메이커는 서포터에게 명시된 리워드 제공 일정을 준수해야 합니다.<br />
  2. 리워드 제공과 관련된 모든 책임은 메이커에게 있으며, 서포터와의 분쟁은 메이커가 직접 해결해야 합니다.<br />
  3. 프로젝트 변경 사항(리워드 제공 일정 등)이 발생할 경우, 메이커는 즉시 서포터에게 공지해야 합니다.<br />
  4. 메이커는 회사가 제공하는 관리 도구를 사용하여 프로젝트 상태를 최신화해야 합니다.<br />
  5. 리워드 제공 지연 시 사전에 공지하지 않으면, 서포터는 환불을 요청할 수 있습니다.
</p>

        </TextBox>
      </MainContent>

      <BackButton href="/">홈으로</BackButton>
    </PageWrapper>
  );
};

export default ChargePolicy;
