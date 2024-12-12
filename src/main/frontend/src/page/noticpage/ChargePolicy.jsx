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
          <TitleText title="수수료 정책" />
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
              제1조 (수수료 정책)
              <br />
              KOMO Funding은 성공한 프로젝트에 대해 펀딩금의 일정 비율을 수수료로 부과합니다.
            </p>
            <p>
              제2조 (수수료율)
              <br />
              수수료율은 프로젝트 카테고리에 따라 다르며, 상세 내용은 별도로 안내합니다.
            </p>
            <p>
              제3조 (정산 절차)
              <br />
              프로젝트 종료 후, 정산 절차를 통해 수수료를 제외한 금액을 메이커에게 지급합니다.
            </p>
            <p>
              제4조 (환불 수수료)<br />
              서포터가 펀딩금을 환불받을 경우, 메이커는 환불에 따른 추가 수수료를 부담해야 할 수 있습니다.<br />
              - 환불 수수료는 펀딩금의 일정 비율로 산정됩니다.<br />
            </p>
            <p>
              제5조 (프로모션 할인 수수료)<br />
              KOMO Funding은 특정 조건에서 메이커에게 프로모션을 제공하며, 이로 인해 수수료 할인 혜택을 적용받을 수 있습니다.<br />
              - 프로모션 적용 여부는 회사의 내부 정책에 따라 결정됩니다.<br />
            </p>
          </TextBox>
        </MainContent>

        <BackButton href="/">홈으로</BackButton>
      </PageWrapper>
    );
  };

  export default ChargePolicy;
