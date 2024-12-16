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
  readCommunityById,
} from "./action";

export const useStore = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = {
    // 상태 변경 액션
    changeCommunities: (communities) =>
      dispatch(changeCommunities(communities)),
    changeCommunity: (community) => dispatch(changeCommunity(community)),
    changeCommunityNumber: (number) => dispatch(changeCommunityNumber(number)),
    changeCommunityCategory: (category) =>
      dispatch(changeCommunityCategory(category)),
    changeCommunityTitle: (title) => dispatch(changeCommunityTitle(title)),
    changeCommunityContent: (content) =>
      dispatch(changeCommunityContent(content)),
    changeWriteDate: (date) => dispatch(changeWriteDate(date)),
    changeUpdatedDate: (date) => dispatch(changeUpdatedDate(date)),
    changeEndDate: (date) => dispatch(changeEndDate(date)),
    changeAuthor: (author) => dispatch(changeAuthor(author)),
    changeIsHidden: (isHidden) => dispatch(changeIsHidden(isHidden)),
    resetCommunityState: () => dispatch(resetCommunityState()),

    readAllCommunities: () => readAllCommunities()(dispatch),
    readCommunityById: (communityNumber) =>
      readCommunityById(communityNumber)(dispatch),
    createNewCommunity: (communityData) =>
      createNewCommunity(communityData)(dispatch),
    updateExistingCommunity: (communityNumber, updateData) =>
      updateExistingCommunity(communityNumber, updateData)(dispatch),
    deleteExistingCommunity: (communityNumber) =>
      deleteExistingCommunity(communityNumber)(dispatch),
  };

  return { state, actions };
};
