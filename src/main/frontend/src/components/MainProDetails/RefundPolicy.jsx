import React, { forwardRef } from "react";
import DescriptionProduct from "../DescriptionProduct";
import TitleBox from "../TitleBox";
import styled from "styled-components";
import MyNavLine from "../MyNavLine";

const BigBox = styled.div`
display: flex;
flex-direction : column;
gap: 20px;
width: 100%; /* 화면 너비에 맞춰서 설정 */

`


const Box = styled.div`

display: flex;
gap : 10px
width: 100vw; /* 화면 너비에 맞춰서 설정 */


`;


const RefundPolicy = forwardRef((props, ref) => {
    return (
        <BigBox ref={ref}> {/* ref를 div에 전달 */}
            <TitleBox text="환불/정책" />
            <Box>
                <DescriptionProduct
                display="flex"
                justifyContent="center"
                flexDirection="column"
                textAlign="center"
                    minWidth="250px"
                    color="black"
                    fontSize="1.0rem"
                    fontWeight="bold"
                    text={`결제 취소 및 환불 안내`}
                />
                <DescriptionProduct
                                    minWidth="50vw"

                    color="black"
                    fontSize="1.0rem"
                    lineHeight="1.9rem"
                    text={`프로젝트 종료 전 까지 결제 취소 가능합니다.
                    환불 신청은 리워드 수령(배송 완료) 후 7일 이내 가능합니다.
                    단순변심: 반품비 서포터 부담
                    리워드 품질 하자: 반품비 메이커 부담
                    환불 정책에 따라 꼼꼼한 확인 절차를 통해 진행됩니다.
                    메이커가 리워드 발송 시작 예정일까지 리워드를 발송하지 않을 경우 환불 신청 이후 즉시 결제 취소됩니다.(2~5영업일 소요)`}
                />
            </Box>
            <MyNavLine />
            <Box>
                <DescriptionProduct
                    minWidth="250px"
                    textAlign="center"
                    display="flex"
                    justifyContent="center"
                    flexDirection="column"
                    color="black"
                    fontSize="1.0rem"
                    fontWeight="bold"
                    text={`공통 환불 불가 유형`}
                />
                <DescriptionProduct
                                    minWidth="50vw"

                    color="black"
                    fontSize="1.0rem"
                    lineHeight="1.9rem"
                    text={`서포터의 단순변심으로 인한 반품/환불 요청이 리워드를 수령한 날로부터 7일이 지난 경우
                    서포터의 귀책 사유로 인하여 상품이 멸실·훼손된 경우 (의류에 화장품 얼룩이 묻어있는 경우, 구성품의 누락, 밀봉 상품의 포장을 훼손한 경우 등)
                    리워드의 사용 또는 소비로 인해 가치 등이 감소한 경우 (전자기기의 전력 연결 등 사용 흔적이 남아 있는 경우, 향수나 화장품 등을 사용한 경우 등)
                    전자책, CD, DVD, 소프트웨어 등 복제가 가능한 리워드를 개시 및 열람한 경우
                    기타 법령 및 약관에 의해 리워드 반품이 제한되는 경우`}
                />
            </Box>
            <MyNavLine />

            <Box>
                <DescriptionProduct
                    minWidth="250px"
                    textAlign="center"
                    display="flex"
                    justifyContent="center"
                    flexDirection="column"
                    color="black"
                    fontSize="1.0rem"
                    fontWeight="bold"
                    text={`리워드 특성상 환불이 불가한 경우`}
                />
                <DescriptionProduct
                    minWidth="50vw"
                    color="black"
                    fontSize="1.0rem"
                    lineHeight="1.9rem"
                    text={`각인, 도장, 1:1 맞춤 제작 등 주문에 따라 개별적으로 생산되는 리워드인 경우
                    신선·냉동식품, 식물 등 시간이 지남에 따라 재판매가 곤란할 정도로 가치가 떨어지는 리워드인 경우
                    숙박권, 촬영권 등 사전 예약이 필요한 리워드의 사용 기한이 임박하여 재판매가 어려운 경우
                    전자 티켓(QR코드, 바코드 포함) 등 사실상 회수가 불가능하여 메이커에게 중대한 피해가 예상되는 경우
                    해외에서 개별적으로 수입하는 제품으로서 반품 물류비용 발생 및 국내 재판매 불가 등으로 메이커에게 중대한 피해가 예상되는 경우
                    기부·후원 목적으로 성공금을 모집 및 사용하는 펀딩 프로젝트인 경우`}
                />
            </Box>
        </BigBox>
    );
});

export default RefundPolicy;
