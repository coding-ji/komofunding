import {
    CHANGE_COMMUNITIES,
    CHANGE_COMMUNITY,
    CHANGE_COMMUNITY_NUMBER,
    CHANGE_COMMUNITY_CATEGORY,
    CHANGE_COMMUNITY_TITLE,
    CHANGE_COMMUNITY_CONTENT,
    CHANGE_WRITE_DATE,
    CHANGE_UPDATED_DATE,
    CHANGE_END_DATE,
    CHANGE_AUTHOR,
    CHANGE_IS_HIDDEN,
    RESET_COMMUNITY_STATE,
    CREATE_COMMUNITY,
    UPDATE_COMMUNITY,
    DELETE_COMMUNITY,
    READ_COMMUNITY,
    UPDATE_ALL_FIELDS
} from "./action";

// 초기 상태
export const initialState = {};

export const reducer = (state = initialState, action) => {
    switch (action.type) {


        case CHANGE_COMMUNITIES:
            return { ...state, communities: action.payload };

        case CHANGE_COMMUNITY:
            return { ...state, community: action.payload };

        case CHANGE_COMMUNITY_NUMBER:
            return { ...state, community: { ...state.community, communityNumber: action.payload } };

        case CHANGE_COMMUNITY_CATEGORY:
            return { ...state, community: { ...state.community, communityCategory: action.payload } };

        case CHANGE_COMMUNITY_TITLE:
            return { ...state, community: { ...state.community, communityTitle: action.payload } };

        case CHANGE_COMMUNITY_CONTENT:
            return { ...state, community: { ...state.community, communityContent: action.payload } };

        case CHANGE_WRITE_DATE:
            return { ...state, community: { ...state.community, writeDate: action.payload } };

        case CHANGE_UPDATED_DATE:
            return { ...state, community: { ...state.community, updatedDate: action.payload } };

        case CHANGE_END_DATE:
            return { ...state, community: { ...state.community, endDate: action.payload } };

        case CHANGE_AUTHOR:
            return { ...state, community: { ...state.community, author: action.payload } };

        case CHANGE_IS_HIDDEN:
            return { ...state, community: { ...state.community, isHidden: action.payload } };

        // 초기화
        case RESET_COMMUNITY_STATE:
            return initialState;

        case UPDATE_ALL_FIELDS:
            return { ...state, community: {...state.community, ...action.payload} };

        // CRUD 처리

        case CREATE_COMMUNITY:
            return { ...state, communities: [...state.communities, action.payload] };

        case READ_COMMUNITY:
            return { ...state, communities: action.payload }; // 전체 커뮤니티 목록 업데이트


        case UPDATE_COMMUNITY:
            return { ...state, communities: action.payload };

        case DELETE_COMMUNITY:
            return { ...state, communities: action.payload };

        default:
            return state;
    }
};