import { useReducer } from "react";
import { initialState, reducer } from "./reducer";
import {
    changeProjectNum,
    changeCreatorName,
    changeProjectTitle,
    changeProjectCategory,
    changeProjectShortDescription,
    changeProjectDescription,
    changeProjectItems,
    changeProjectCurrentAmount,
    changeProjectTotalAmount,
    changeProjectStartDate,
    changeProjectEndDate,
    changeProjectWrittenDate,
    changeProjectImgs,
    resetState
} from "./action";

export const useStore = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const actions = {
        // 프로젝트 글 번호 변경
        changeProjectNum: (projectNum) => dispatch(changeProjectNum(projectNum)),
        // 제작자 이름 변경
        changeCreatorName: (creatorName) => dispatch(changeCreatorName(creatorName)),
        // 프로젝트 제목 변경
        changeProjectTitle: (projectTitle) => dispatch(changeProjectTitle(projectTitle)),
        // 프로젝트 카테고리 변경
        changeProjectCategory: (projectCategory) => dispatch(changeProjectCategory(projectCategory)),
        // 프로젝트 간략 설명 변경
        changeProjectShortDescription: (shortDescription) => dispatch(changeProjectShortDescription(shortDescription)),
        // 프로젝트 상세 설명 변경
        changeProjectDescription: (description) => dispatch(changeProjectDescription(description)),
        // 프로젝트 아이템 변경
        changeProjectItems: (items) => dispatch(changeProjectItems(items)),
        // 프로젝트 현재 모금액 변경
        changeProjectCurrentAmount: (currentAmount) => dispatch(changeProjectCurrentAmount(currentAmount)),
        // 프로젝트 목표 금액 변경
        changeProjectTotalAmount: (totalAmount) => dispatch(changeProjectTotalAmount(totalAmount)),
        // 프로젝트 시작 날짜 변경
        changeProjectStartDate: (startDate) => dispatch(changeProjectStartDate(startDate)),
        // 프로젝트 종료 날짜 변경
        changeProjectEndDate: (endDate) => dispatch(changeProjectEndDate(endDate)),
        // 프로젝트 작성 날짜 변경
        changeProjectWrittenDate: (writtenDate) => dispatch(changeProjectWrittenDate(writtenDate)),
        // 프로젝트 이미지 변경
        changeProjectImgs: (imgs) => dispatch(changeProjectImgs(imgs)),
        // 상태 초기화
        resetState: () => dispatch(resetState())
    };

    return { state, actions };
};