import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

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
  padding: 40px;
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
  line-height: 1.6;

  p {
    color: #555;
    line-height: 1.5;
    margin: 10px 0;
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

const CreationGuide = () => {
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
        <TitleText title="창작가이드"/>
      </Header>

      <Divider />

      <MainContent>
        <TextBox>
          <h2 style={{ color: '#256e91', fontWeight: 'bold', fontSize: '24px' }}>
            코모는 프로젝트를 위한 크라우드펀딩 서비스를 제공합니다.
          </h2>
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
            디자인, 예술, 출판 등 다양한 분야에 대한 제작자의 창조적인 시도를 실현시키고,
            후원을 통해 제작 예산을 해결하여 독창적으로 프로젝트를 진행할 수 있도록 하였습니다.
          </p>
          <p>
            제작자는 '마이페이지'에서 제작자 신청을 통해 프로젝트를 등록할 수 있으며,
            프로젝트 계획 후 등록 등의 목표를 세우고 구체적인 편집을 준비하세요.
          </p>

          <StepsWrapper>
            {['프로젝트 등록', '심사', '편집', '결제', '정산', '배송'].map((step) => (
              <StepButton key={step}>{step}</StepButton>
            ))}
          </StepsWrapper>

          <p>
            프로젝트 등록 후에는 심사를 진행하게 됩니다. 심사를 거쳐 승인이 나면 편집이
            시작됩니다.
          </p>
          <p>
            심사는 보통 영업일 기준 3일 이내로 안됩니다. 만약 프로젝트가 잘 작성되었다면
            더 빠르게 승인될 수 있으며, 승인 후에는 편집 및 다른 단계가 진행됩니다.
          </p>
          <p>
            만약 프로젝트가 승인되지 않으면, 기한 연장을 요청하거나 수정 요청을 할 수
            있습니다.
          </p>
        </TextBox>
      </MainContent>

      <BackButton href="/">홈으로</BackButton>
    </PageWrapper>
  );
};

export default CreationGuide;
