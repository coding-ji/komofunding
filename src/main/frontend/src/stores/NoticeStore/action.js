import {
    fetchAllCommunities,
    fetchCommunityById,
    createCommunity,
    updateCommunity,
    deleteCommunity,
} from "../../service/apiService";

// 액션 타입 정의
export const CHANGE_COMMUNITIES = "CHANGE_COMMUNITIES";
export const CHANGE_COMMUNITY = "CHANGE_COMMUNITY";
export const CHANGE_COMMUNITY_NUMBER = "CHANGE_COMMUNITY_NUMBER";
export const CHANGE_COMMUNITY_CATEGORY = "CHANGE_COMMUNITY_CATEGORY";
export const CHANGE_COMMUNITY_TITLE = "CHANGE_COMMUNITY_TITLE";
export const CHANGE_COMMUNITY_CONTENT = "CHANGE_COMMUNITY_CONTENT";
export const CHANGE_WRITE_DATE = "CHANGE_WRITE_DATE";
export const CHANGE_UPDATED_DATE = "CHANGE_UPDATED_DATE";
export const CHANGE_END_DATE = "CHANGE_END_DATE";
export const CHANGE_AUTHOR = "CHANGE_AUTHOR";
export const CHANGE_IS_HIDDEN = "CHANGE_IS_HIDDEN";


// 초기화 
export const UPDATE_ALL_FIELDS = "UPDATE_ALL_FIELDS";
export const RESET_COMMUNITY_STATE = "RESET_COMMUNITY_STATE";


// 프로젝트 CRUD
export const READ_COMMUNITY = "READ_COMMUNITY";
export const CREATE_COMMUNITY = "CREATE_COMMUNITY";
export const UPDATE_COMMUNITY = "UPDATE_COMMUNITY";
export const DELETE_COMMUNITY = "DELETE_COMMUNITY";


// 액션 생성 함수
export const changeCommunities = (communities) => ({
    type: CHANGE_COMMUNITIES,
    payload: communities,
});

export const changeCommunity = (community) => ({
    type: CHANGE_COMMUNITY,
    payload: community,
});

export const changeCommunityNumber = (communityNumber) => ({
    type: CHANGE_COMMUNITY_NUMBER,
    payload: communityNumber,
});

export const changeCommunityCategory = (communityCategory) => ({
    type: CHANGE_COMMUNITY_CATEGORY,
    payload: communityCategory,
});

export const changeCommunityTitle = (communityTitle) => ({
    type: CHANGE_COMMUNITY_TITLE,
    payload: communityTitle,
});

export const changeCommunityContent = (communityContent) => ({
    type: CHANGE_COMMUNITY_CONTENT,
    payload: communityContent,
});

export const changeWriteDate = (writeDate) => ({
    type: CHANGE_WRITE_DATE,
    payload: writeDate,
});

export const changeUpdatedDate = (updatedDate) => ({
    type: CHANGE_UPDATED_DATE,
    payload: updatedDate,
});

export const changeEndDate = (endDate) => ({
    type: CHANGE_END_DATE,
    payload: endDate,
});

export const changeAuthor = (author) => ({
    type: CHANGE_AUTHOR,
    payload: author,
});

export const changeIsHidden = (isHidden) => ({
    type: CHANGE_IS_HIDDEN,
    payload: isHidden,
});


// 초기화
export const updateAllFields = (data) => ({ type: UPDATE_ALL_FIELDS, payload: data });
export const resetCommunityState = () => ({
    type: RESET_COMMUNITY_STATE,
});


// API 관련 액션
// 전체 커뮤니티 조회
export const readAllCommunities = () => async (dispatch) => {
    try {
        const response = await fetchAllCommunities();
        dispatch({ type: READ_COMMUNITY, payload: response.data });
        return response.data; // 데이터를 반환
    } catch (error) {
        console.error("Failed to fetch all communities", error);
    }
};


// 특정 커뮤니티 조회
export const readCommunityById = (communityNumber) => async (dispatch) => {
    try {
        const response = await fetchCommunityById(communityNumber);
        dispatch({
            type: READ_COMMUNITY,
            payload: response.data
        });
    } catch (error) {
        console.error(`ID: ${communityNumber} 커뮤니티 데이터를 가져올 수 없습니다.`, error);
    }
};


// 커뮤니티 생성
export const createNewCommunity = (communityData) => async (dispatch) => {
    try {
        const response = await createCommunity(communityData);
        dispatch({
            type: CREATE_COMMUNITY,
            payload: response.data,
        });
    } catch (error) {
        console.error("글을 생성할 수 없습니다.", error);
    }
};

// 커뮤니티 수정
export const updateExistingCommunity = (communityNumber, updateData) => async (dispatch) => {
    try {
        const response = await updateCommunity(communityNumber, updateData);
        dispatch({
            type: UPDATE_COMMUNITY,
            payload: response.data,
        });
    } catch (error) {
        console.error("글을 수정할 수 없습니다.", error);
    }
};

// 커뮤니티 삭제
export const deleteExistingCommunity = (communityNumber) => async (dispatch) => {
    try {
        await deleteCommunity(communityNumber);
        dispatch({
            type: DELETE_COMMUNITY,
            payload: communityNumber,
        });
    } catch (error) {
        console.error("글을 삭제할 수 없습니다.", error);
    }
};
