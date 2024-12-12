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

const DonateGuide = () => {
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
        <TitleText title="후원 가이드" />
      </Header>

      <Divider />

      <MainContent>
        <TextBox>
        {/* <h2 style={{ color: '#256e91', fontWeight: 'bold', fontSize: '24px' }}>
            제목 입력..
          </h2> */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '10x',
              fontSize: '14px',
              color: '#888',
            }}
          >
            <span style={{ color: '#256E91' }}>2024-11-09</span>
            <span style={{ color: '#256E91' }}>관리자</span>
          </div>
          <Divider />

          <p>
            코모 펀딩을 이용하는 후원자 분들께 꼭 알아야 할 사항을 몇 가지 사항을 안내드리겠습니다.
            <br />
            <br />

            코모 펀딩이란? <br />
            제작자의 창의적인 프로젝트를 발견하고 일정 금액을 후원할 경우,

            특별한 경험을 선물받을 수 있는 공간입니다.
            <br />
            <br />

            프로젝트란?<br />

            프로젝트는 제작자만의 새로운 제품 혹은 독립적인 콘텐츠에 대한 기획서입니다.
            <br />
            자신이 원하는 카테고리에 맞게 후원자 분들이 원하는 제품을 만나볼 수 있습니다.
            <br />
            <br />
            후원이란?
            후원은 제작자의 프로젝트 제작 비용을 지원하는 것으로 제작자가 선정한 목표 금액을 달성할 경우, 해당 제품을 선물받을 수 있습니다.
            <br />

            <br />
            KOMO FUNDING 을 여행할 준비 되었나요?
            그럼 즐거운 시간 되시길 바랍니다 :)


          </p>
        </TextBox>
      </MainContent>

      <BackButton href="/home">홈으로</BackButton>
    </PageWrapper>
  );
};

export default DonateGuide;
