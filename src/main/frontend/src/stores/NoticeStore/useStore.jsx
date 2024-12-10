import { useReducer } from "react";
import { initialState, reducer } from "./reducer";
import {
    readAllCommunities,
    createNewCommunity,
    updateExistingCommunity,
    deleteExistingCommunity,
    changeCommunities,
    changeCommunity,
    changeCommunityNumber,
    changeCommunityCategory,
    changeCommunityTitle,
    changeCommunityContent,
    changeWriteDate,
    changeUpdatedDate,
    changeEndDate,
    changeAuthor,
    changeIsHidden,
    resetCommunityState,
} from "./action";

export const useStore = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const actions = {
        // 상태 변경 액션
        changeCommunities: (communities) => dispatch(changeCommunities(communities)),
        changeCommunity: (community) => dispatch(changeCommunity(community)),
        changeCommunityNumber: (number) => dispatch(changeCommunityNumber(number)),
        changeCommunityCategory: (category) => dispatch(changeCommunityCategory(category)),
        changeCommunityTitle: (title) => dispatch(changeCommunityTitle(title)),
        changeCommunityContent: (content) => dispatch(changeCommunityContent(content)),
        changeWriteDate: (date) => dispatch(changeWriteDate(date)),
        changeUpdatedDate: (date) => dispatch(changeUpdatedDate(date)),
        changeEndDate: (date) => dispatch(changeEndDate(date)),
        changeAuthor: (author) => dispatch(changeAuthor(author)),
        changeIsHidden: (isHidden) => dispatch(changeIsHidden(isHidden)),
        resetCommunityState: () => dispatch(resetCommunityState()),

           // API 호출 액션
           readAllCommunities: async () => {
            try {
                await readAllCommunities()(dispatch);
            } catch (error) {
                console.error("Failed to fetch all communities", error);
            }
        },

        readCommunityDetail: (projectNum) => readProjectDetail(projectNum)(dispatch),

        createNewCommunity: async (communityData) => {
            try {
                await createNewCommunity(communityData)(dispatch);
            } catch (error) {
                console.error("Failed to create community", error);
            }
        },

        updateExistingCommunity: async (communityNumber, updateData) => {
            try {
                await updateExistingCommunity(communityNumber, updateData)(dispatch);
            } catch (error) {
                console.error(`Failed to update community ID: ${communityNumber}`, error);
            }
        },

        deleteExistingCommunity: async (communityNumber) => {
            try {
                await deleteExistingCommunity(communityNumber)(dispatch);
            } catch (error) {
                console.error(`Failed to delete community ID: ${communityNumber}`, error);
            }
        },
    };

    return { state, actions };
};