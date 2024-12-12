import {
    fetchPosts,
    fetchDetailPost,
    fetchPostsByCategoryAndStatus,
    fetchUserProjects,
    createProject,
    updateProject,
    deleteProject
} from "../../service/apiService";

// 프로젝트 유저
export const CHANGE_USER_NICKNAME = "CHANGE_USER_NICKNAME";
export const CHANGE_EMAIL = "CHANGE_EMAIL";
export const CHANGE_PHONE_NUMBER = "CHANGE_PHONE_NUMBER";
export const CHANGE_USER_SHORT_DESCRIPTION = "CHANGE_USER_SHORT_DESCRIPTION";

// 프로젝트 관련
export const CHANGE_PROJECT_NUM = "CHANGE_PROJECT_NUM";
export const CHANGE_TITLE = "CHANGE_TITLE";
export const CHANGE_PROJECT_CATEGORY = "CHANGE_PROJECT_CATEGORY";
export const CHANGE_PROJECT_THUMBNAIL_IMGS = "CHANGE_PROJECT_THUMBNAIL_IMGS";
export const CHANGE_PROJECT_SHORT_DESCRIPTION = "CHANGE_PROJECT_SHORT_DESCRIPTION";
export const CHANGE_DESCRIPTION = "CHANGE_DESCRIPTION";
export const CHANGE_ITEMS = "CHANGE_ITEMS";
export const CHANGE_CURRENT_AMOUNT = "CHANGE_CURRENT_AMOUNT";
export const CHANGE_TOTAL_AMOUNT = "CHANGE_TOTAL_AMOUNT";
export const CHANGE_PROJECT_START_DATE = "CHANGE_PROJECT_START_DATE";
export const CHANGE_PROJECT_END_DATE = "CHANGE_PROJECT_END_DATE";
export const CHANGE_WRITTEN_DATE = "CHANGE_WRITTEN_DATE";
export const CHANGE_APPROVAL_DATE = "CHANGE_APPROVAL_DATE";
export const CHANGE_REJECTION_DATE = "CHANGE_REJECTION_DATE";
export const CHANGE_IS_HIDDEN = "CHANGE_IS_HIDDEN";
export const CHANGE_PROGRESS_RATE = "CHANGE_PROGRESS_RATE";
export const CHANGE_QNA_LIST = "CHANGE_QNA_LIST";
export const CHANGE_SUPPORTERS = "CHANGE_SUPPORTERS";
export const UPDATE_ALL_FIELDS = 'UPDATE_ALL_FIELDS';


// 초기화 
export const RESET_STATE = "RESET_STATE";

// 프로젝트 CRUD
export const READ_PROJECT = "READ_PROJECT";
export const CREATE_PROJECT = 'CREATE_PROJECT';
export const UPDATE_PROJECT = 'UPDATE_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';



//프로젝트 유저관련
export const changeUserNickname = (nickname) => ({
    type: CHANGE_USER_NICKNAME,
    payload: nickname,
});

export const changeEmail = (email) => ({
    type: CHANGE_EMAIL,
    payload: email,
});

export const changePhoneNumber = (phoneNumber) => ({
    type: CHANGE_PHONE_NUMBER,
    payload: phoneNumber,
});

export const changeUserShortDescription = (shortDescription) => ({
    type: CHANGE_USER_SHORT_DESCRIPTION,
    payload: shortDescription,
});

// 프로젝트 관련
export const changeProjectNum = (projectNum) => ({
    type: CHANGE_PROJECT_NUM,
    payload: projectNum,
});

export const changeTitle = (title) => ({
    type: CHANGE_TITLE,
    payload: title,
});

export const changeProjectCategory = (projectCategory) => ({
    type: CHANGE_PROJECT_CATEGORY,
    payload: projectCategory,
});

export const changeProjectThumbnailImgs = (thumnailImgs) => ({
    type: CHANGE_PROJECT_THUMBNAIL_IMGS,
    payload: thumnailImgs,
});

export const changeProjectShortDescription = (shortDescription) => ({
    type: CHANGE_PROJECT_SHORT_DESCRIPTION,
    payload: shortDescription,
});

export const changeDescription = (description) => ({
    type: CHANGE_DESCRIPTION,
    payload: description,
});

export const changeItems = (items) => ({
    type: CHANGE_ITEMS,
    payload: items,
});

export const changeCurrentAmount = (currentAmount) => ({
    type: CHANGE_CURRENT_AMOUNT,
    payload: currentAmount,
});

export const changeTotalAmount = (totalAmount) => ({
    type: CHANGE_TOTAL_AMOUNT,
    payload: totalAmount,
});

export const changeProjectStartDate = (projectStartDate) => ({
    type: CHANGE_PROJECT_START_DATE,
    payload: projectStartDate,
});

export const changeProjectEndDate = (projectEndDate) => ({
    type: CHANGE_PROJECT_END_DATE,
    payload: projectEndDate,
});

export const changeWrittenDate = (writtenDate) => ({
    type: CHANGE_WRITTEN_DATE,
    payload: writtenDate,
});

export const changeApprovalDate = (approvalDate) => ({
    type: CHANGE_APPROVAL_DATE,
    payload: approvalDate,
});

export const changeRejectionDate = (rejectionDate) => ({
    type: CHANGE_REJECTION_DATE,
    payload: rejectionDate,
});

export const changeIsHidden = (isHidden) => ({
    type: CHANGE_IS_HIDDEN,
    payload: isHidden,
});

export const changeProgressRate = (progressRate) => ({
    type: CHANGE_PROGRESS_RATE,
    payload: progressRate,
});

export const changeQnaList = (qnaList) => ({
    type: CHANGE_QNA_LIST,
    payload: qnaList,
});

export const changeSupporters = (supporters) => ({
    type: CHANGE_SUPPORTERS,
    payload: supporters,
});

export const updateAllFields = (fields) => ({
    type: UPDATE_ALL_FIELDS,
    payload: fields
});

// 초기화
export const resetState = () => ({
    type: RESET_STATE,
});

// 프로젝트 API 서비스
// 전체 프로젝트 조회
export const readProjects = () => async (dispatch) => {
    try {
        const response = await fetchPosts();
        dispatch({
            type: READ_PROJECT,
            payload: response.data
        });
    } catch (error) {
        console.error("프로젝트를 불러올 수 없습니다.", error);
    }
};



// 특정 프로젝트 조회
export const readProjectDetail = (projectNum) => async (dispatch) => {
    try {
        const response = await fetchDetailPost(projectNum);
        dispatch({
            type: READ_PROJECT,
            payload: response.data
        });
    } catch (error) {
        console.error("프로젝트 상세 정보를 불러올 수 없습니다.", error);
    }
};

// 카테고리 & 상태별 프로젝트 조회
export const readProjectsByCategoryAndStatus = (projectCategory, fundingStatus) => async (dispatch) => {
    try {
        const response = await fetchPostsByCategoryAndStatus(projectCategory, fundingStatus);  // 조건에 맞는 프로젝트 목록 API 호출
        dispatch({
            type: READ_PROJECT,
            payload: response.data
        });
    } catch (error) {
        console.error("카테고리 및 상태별 프로젝트를 불러올 수 없습니다.", error);
    }
};

// 사용자 프로젝트 조회
export const readUserProjects = () => async (dispatch) => {
    try {
        const response = await fetchUserProjects(); // 특정 사용자의 프로젝트 목록 API 호출

        if (response.status === 200) {
            // 성공 상태
            dispatch({
                type: READ_PROJECT,
                payload: response.data, // 사용자 프로젝트 목록
            });
            return response.data; // 성공 시 데이터 반환
        }
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                console.error("비밀번호 검증 실패: 잘못된 비밀번호");
                return "fail"; // 비밀번호 검증 실패
            }
        }
        console.error("사용자 프로젝트 조회 실패: 알 수 없는 오류", error);
        return "error"; // 기타 오류
    }
};


// 새로운 프로젝트 생성 (CREATE)
export const createNewProject = (projectData) => async (dispatch) => {
    try {
        const response = await createProject(projectData);  // 새로운 프로젝트 생성 API 호출
        dispatch({
            type: CREATE_PROJECT,
            payload: response.data  // 생성된 프로젝트 데이터
        });
    } catch (error) {
        console.error("프로젝트를 생성할 수 없습니다.", error);
    }
};

// 프로젝트 업데이트 (UPDATE) ** updateData에 projectNum으로 수정
export const updateExistingProject = (updateData) => async (dispatch) => {
    try {
        const response = await updateProject(updateData);
        dispatch({
            type: UPDATE_PROJECT,
            payload: response.data  // 업데이트된 프로젝트 데이터
        });
    } catch (error) {
        console.error("프로젝트를 업데이트할 수 없습니다.", error);
    }
};

// 프로젝트 삭제 (DELETE)
export const deleteExistingProject = (projectNum) => async (dispatch) => {
    try {
        const response = await deleteProject(projectNum);  // 특정 프로젝트 삭제 API 호출

        if (response.data === 200) {
            dispatch({
                type: DELETE_PROJECT,
                payload: response.data  // 삭제된 프로젝트의 ID를 전달
            });

            return response.data;
        }
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                console.error("삭제 실패");
                return "fail";
            }
        }
        console.error("사용자 프로젝트 조회 실패: 알 수 없는 오류", error);
        return "error";
    }
};