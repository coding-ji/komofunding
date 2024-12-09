import { useReducer } from "react";
import { initialState, reducer } from "./reducer";
import {
    changeUserNickname,
    changeEmail,
    changePhoneNumber,
    changeUserShortDescription,
    changeProjectNum,
    changeTitle,
    changeProjectCategory,
    changeProjectThumbnailImgs,
    changeProjectShortDescription,
    changeDescription,
    changeItems,
    changeCurrentAmount,
    changeTotalAmount,
    changeProjectStartDate,
    changeProjectEndDate,
    changeWrittenDate,
    changeApprovalDate,
    changeRejectionDate,
    changeIsHidden,
    changeProgressRate,
    changeQnaList,
    changeSupporters,
    resetState,
    readProjects,
    readProjectDetail,
    readProjectsByCategoryAndStatus,
    readUserProjects,
    createNewProject,
    updateExistingProject,
    deleteExistingProject
} from "./action";

export const useStore = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const actions = {
        // 프로젝트 유저 관련
        changeUserNickname: (nickname) => dispatch(changeUserNickname(nickname)),
        changeEmail: (email) => dispatch(changeEmail(email)),
        changePhoneNumber: (phoneNumber) => dispatch(changePhoneNumber(phoneNumber)),
        changeUserShortDescription: (shortDescription) => dispatch(changeUserShortDescription(shortDescription)),

        // 프로젝트 관련
        changeProjectNum: (projectNum) => dispatch(changeProjectNum(projectNum)),
        changeTitle: (title) => dispatch(changeTitle(title)),
        changeProjectCategory: (category) => dispatch(changeProjectCategory(category)),
        changeProjectThumbnailImgs: (thumbnailImgs) => dispatch(changeProjectThumbnailImgs(thumbnailImgs)),
        changeProjectShortDescription: (shortDescription) => dispatch(changeProjectShortDescription(shortDescription)),
        changeDescription: (description) => dispatch(changeDescription(description)),
        changeItems: (items) => dispatch(changeItems(items)),
        changeCurrentAmount: (currentAmount) => dispatch(changeCurrentAmount(currentAmount)),
        changeTotalAmount: (totalAmount) => dispatch(changeTotalAmount(totalAmount)),
        changeProjectStartDate: (startDate) => dispatch(changeProjectStartDate(startDate)),
        changeProjectEndDate: (endDate) => dispatch(changeProjectEndDate(endDate)),
        changeWrittenDate: (writtenDate) => dispatch(changeWrittenDate(writtenDate)),
        changeApprovalDate: (approvalDate) => dispatch(changeApprovalDate(approvalDate)),
        changeRejectionDate: (rejectionDate) => dispatch(changeRejectionDate(rejectionDate)),
        changeIsHidden: (isHidden) => dispatch(changeIsHidden(isHidden)),
        changeProgressRate: (progressRate) => dispatch(changeProgressRate(progressRate)),
        changeQnaList: (qnaList) => dispatch(changeQnaList(qnaList)),
        changeSupporters: (supporters) => dispatch(changeSupporters(supporters)),

        // 초기화
        resetState: () => dispatch(resetState()),

        // 프로젝트 API 서비스 관련
        readProjects: () => dispatch(readProjects()),
        readProjectDetail: (projectNum) => dispatch(readProjectDetail(projectNum)),
        readProjectsByCategoryAndStatus: (projectCategory, fundingStatus) => dispatch(readProjectsByCategoryAndStatus(projectCategory, fundingStatus)),
        readUserProjects: (userNum) => dispatch(readUserProjects(userNum)),
        createNewProject: (userNum, projectData) => dispatch(createNewProject(userNum, projectData)),
        updateExistingProject: (userNum, updateData) => dispatch(updateExistingProject(userNum, updateData)),
        deleteExistingProject: (userNum, projectNum) => dispatch(deleteExistingProject(userNum, projectNum))
    };

    return { state, actions };
};