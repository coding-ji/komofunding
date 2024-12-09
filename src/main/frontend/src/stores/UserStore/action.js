
export const CHANGE_USER_NUM = "CHANGE_USER_NUM"; 
export const CHANGE_EMAIL = "CHANGE_EMAIL";
export const CHANGE_PASSWORD = "CHANGE_PASSWORD";
export const CHANGE_NAME = "CHANGE_NAME";
export const CHANGE_NICKNAME = "CHANGE_NICKNAME";
export const CHANGE_PHONE_NUMBER = "CHANGE_PHONE_NUMBER";
export const CHANGE_PROFILE_IMG = "CHANGE_PROFILE_IMG";
export const CHANGE_USER_SHORT_DESCRIPTION = "CHANGE_USER_SHORT_DESCRIPTION";
export const CHANGE_USER_ACTIVATED_STATUS = "CHANGE_USER_ACTIVATED_STATUS";
export const CHANGE_USER_BANK_NAME = "CHANGE_USER_BANK_NAME";
export const CHANGE_USER_ACCOUNT_NUMBER = "CHANGE_USER_ACCOUNT_NUMBER";
export const CHANGE_USER_ACCOUNT_HOLDER = "CHANGE_USER_ACCOUNT_HOLDER";
export const CHANGE_USER_JOIN_DATE = "CHANGE_USER_JOIN_DATE";
export const CHANGE_CORPORATION_NAME = "CHANGE_CORPORATION_NAME" ;
export const CHANGE_CORPORATION_TEL = "CHANGE_CORPORATION_TEL";
export const UPDATE_ALL_FIELDS = "UPDATE_ALL_FIELDS";
export const CHANGE_BSN = "CHANGE_BSN"; 
export const RESET_STATE = "RESET_STATE";
export const ADD_ITEM = 'ADD_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM'; 

export const changeUserNum = (userNum) => ({type: CHANGE_USER_NUM, payload: userNum});
export const changeEmail = (email) => ({type: CHANGE_EMAIL, payload: email});
export const changePassword = (password) => ({type: CHANGE_PASSWORD, payload: password});
export const changeName = (name) => ({type: CHANGE_NAME, payload: name});
export const changeNickName = (nickName) => ({type: CHANGE_NICKNAME, payload: nickName});
export const changePhoneNumber = (phoneNumber) => ({type: CHANGE_PHONE_NUMBER, payload: phoneNumber});
export const changeProfileImg = (profileImg) => ({type: CHANGE_PROFILE_IMG, payload: profileImg});
export const changeUserShortDescription = (userShortDescription) => ({type: CHANGE_USER_SHORT_DESCRIPTION, payload: userShortDescription});
export const changeUserActivatedStatus = (activatedStatus) => ({type: CHANGE_USER_ACTIVATED_STATUS, payload: activatedStatus});
export const changeUserBankName = (bankName) => ({type: CHANGE_USER_BANK_NAME, payload: bankName});
export const changeUserAccountNumber = (accountNumber) => ({type: CHANGE_USER_ACCOUNT_NUMBER, payload: accountNumber});
export const changeUserAccountHolder = (accountHolder) => ({type: CHANGE_USER_ACCOUNT_HOLDER, payload: accountHolder});
export const changeUserJoinDate = (joinDate) => ({type: CHANGE_USER_JOIN_DATE, payload: joinDate});
export const changeCorporationName = (corporationName) => ({type: CHANGE_CORPORATION_NAME, payload: corporationName});
export const changeCorporationTel = (corporationTel) => ({type: CHANGE_CORPORATION_TEL, payload: corporationTel});
export const updateAllFields = (fields) => ({ type: UPDATE_ALL_FIELDS, payload: fields });
export const changeBSN = (bsn) => ({type: CHANGE_BSN, payload: bsn});
export const resetState = () => ({type: RESET_STATE});

// axios 연동
export const addItem = (item) => async (dispatch) => {
    try {
        const response = await createItem(item);
        dispatch({ type: ADD_ITEM, payload: response.data });
    } catch (error) {
        console.error('Failed to add item', error);
    }
};

export const updateItemAction = (item) => async (dispatch) => {
    try {
        const response = await updateItem(item);
        dispatch({ type: UPDATE_ITEM, payload: response.data });
    } catch (error) {
        console.error('Failed to update item', error);
    }
};

export const deleteItemAction = (id) => async (dispatch) => {
    try {
        await deleteItem(id);
        dispatch({ type: DELETE_ITEM, payload: id });
    } catch (error) {
        console.error('Failed to delete item', error);
    }
};