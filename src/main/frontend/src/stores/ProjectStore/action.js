

export const CHANGE_PROJECT_NUM = "CHANGE_PROJECT_NUM";
export const CHANGE_CREATOR_NAME = "CHANGE_CREATOR_NAME";
export const CHANGE_PROJECT_TITLE = "CHANGE_PROJECT_TITLE";
export const CHANGE_PROJECT_CATEGORY = "CHANGE_PROJECT_CATEGORY";
export const CHANGE_PROJECT_SHORT_DESCRIPTION = "CHANGE_PROJECT_SHORT_DESCRIPTION"; 
export const CHANGE_PROJECT_DESCRIPTION = "CHANGE_PROJECT_DESCRIPTION";
export const CHANGE_PROJECT_ITEMS = "CHANGE_PROJECT_ITEMS";
export const CHANGE_PROJECT_CURRENT_AMOUNT = "CHANGE_PROJECT_CURRENT_AMOUNT";
export const CHANGE_PROJECT_TOTAL_AMOUNT = "CHANGE_PROJECT_TOTAL_AMOUNT";
export const CHANGE_PROJECT_START_DATE = "CHANGE_PROJECT_START_DATE";
export const CHANGE_PROJECT_END_DATE = "CHANGE_PROJECT_END_DATE";
export const CHANGE_PROJECT_WRITTEN_DATE = "CHANGE_PROJECT_WRITTEN_DATE";
export const CHANGE_PROJECT_IMGS = "CHANGE_PROJECT_IMGS";
export const RESET_STATE = "RESET_STATE";

export const changeProjectNum = (projectNum) => ({type: CHANGE_PROJECT_NUM, payload: projectNum});
export const changeCreatorName = (creatorName) => ({type: CHANGE_CREATOR_NAME, payload: creatorName});
export const changeProjectTitle = (projectTitle) => ({type: CHANGE_PROJECT_TITLE, payload: projectTitle});
export const changeProjectCategory = (projectCategory) => ({type: CHANGE_PROJECT_CATEGORY, payload: projectCategory});
export const changeProjectShortDescription = (shortDescription) => ({type: CHANGE_PROJECT_SHORT_DESCRIPTION,payload: shortDescription});
export const changeProjectDescription = (description) => ({type: CHANGE_PROJECT_DESCRIPTION,payload: description});
export const changeProjectItems = (items) => ({ type: CHANGE_PROJECT_ITEMS, payload: items});
export const changeProjectCurrentAmount = (currentAmount) => ({type: CHANGE_PROJECT_CURRENT_AMOUNT,payload: currentAmount});
export const changeProjectTotalAmount = (totalAmount) => ({type: CHANGE_PROJECT_TOTAL_AMOUNT,payload: totalAmount});
export const changeProjectStartDate = (startDate) => ({type: CHANGE_PROJECT_START_DATE, payload: startDate});
export const changeProjectEndDate = (endDate) => ({type: CHANGE_PROJECT_END_DATE, payload: endDate});
export const changeProjectWrittenDate = (writtenDate) => ({type: CHANGE_PROJECT_WRITTEN_DATE, payload: writtenDate});
export const changeProjectImgs = (imgs) => ({type: CHANGE_PROJECT_IMGS, payload: imgs});
export const resetState = () => ({type: RESET_STATE});