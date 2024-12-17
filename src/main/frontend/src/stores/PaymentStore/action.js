import {
    fetchDonorsByProjectNum,
    createPayment,
    getMyFunding,
    deletePayment
} from "../../service/apiService";


// 환불관련
export const CHANGE_USER_NUM = "CHANGE_USER_NUM";
export const CHANGE_BANK_NAME = "CHANGE_BANK_NAME";
export const CHANGE_ACCOUNT_NUMBER = "CHANGE_ACCOUNT_NUMBER";
export const CHANGE_ACCOUNT_HOLDER = "CHANGE_ACCOUNT_HOLDER";

// 결제관련
export const CHANGE_PAYMENT_ID = "CHANGE_PAYMENT_ID";
export const CHANGE_ITEMS = "CHANGE_ITEMS";
export const CHANGE_PAID_AMOUNT = "CHANGE_PAID_AMOUNT";
export const CHANGE_PAYMENT_DATE = "CHANGE_PAYMENT_DATE";
export const CHANGE_PAYMENT_METHOD = "CHANGE_PAYMENT_METHOD";
export const CHANGE_PAYMENT_STATUS = "CHANGE_PAYMENT_STATUS";
export const CHANGE_FAILURE_REASON = "CHANGE_FAILURE_REASON";
export const CHANGE_SENDER_NAME = "CHANGE_SENDER_NAME";
export const CHANGE_SHIPPING_NAME = "CHANGE_SHIPPING_NAME";
export const CHANGE_SHIPPING_PHONE = "CHANGE_SHIPPING_PHONE";
export const CHANGE_SHIPPING_ADDRESS = "CHANGE_SHIPPING_ADDRESS";
export const CHANGE_REFUND_BANK_NAME = "CHANGE_REFUND_BANK_NAME";
export const CHANGE_REFUND_ACCOUNT_HOLDER = "CHANGE_REFUND_ACCOUNT_HOLDER";
export const CHANGE_REFUND_ACCOUNT_NUMBER = "CHANGE_REFUND_ACCOUNT_NUMBER";
export const CHANGE_IS_REFUNDED = "CHANGE_IS_REFUNDED";

// 모든 필드 작성 및 초기화
export const UPDATE_ALL_FIELDS = "UPDATE_ALL_FIELDS";
export const RESET_STATE = "RESET_STATE";

//API관련
export const READ_PAYMENT = "READ_PAYMENT";
export const CREATE_PAYMENT = "CREATE_PAYMENT";
export const UPDATE_PAYMENT = "UPDATE_PAYMENT";
export const DELETE_PAYMENT = "DELETE_PAYMENT";


// 환불 관련 액션 생성자
export const changeUserNum = (userNum) => ({ type: CHANGE_USER_NUM, payload: userNum });
export const changeBankName = (bankName) => ({ type: CHANGE_BANK_NAME, payload: bankName });
export const changeAccountNumber = (accountNumber) => ({ type: CHANGE_ACCOUNT_NUMBER, payload: accountNumber });
export const changeAccountHolder = (accountHolder) => ({ type: CHANGE_ACCOUNT_HOLDER, payload: accountHolder });

// 결제 관련 액션 생성자
export const changePaymentId = (paymentId) => ({ type: CHANGE_PAYMENT_ID, payload: paymentId });
export const changeItems = (items) => ({ type: CHANGE_ITEMS, payload: items });
export const changePaidAmount = (paidAmount) => ({ type: CHANGE_PAID_AMOUNT, payload: paidAmount });
export const changePaymentDate = (paymentDate) => ({ type: CHANGE_PAYMENT_DATE, payload: paymentDate });
export const changePaymentMethod = (paymentMethod) => ({ type: CHANGE_PAYMENT_METHOD, payload: paymentMethod });
export const changePaymentStatus = (paymentStatus) => ({ type: CHANGE_PAYMENT_STATUS, payload: paymentStatus });
export const changeFailureReason = (failureReason) => ({ type: CHANGE_FAILURE_REASON, payload: failureReason });
export const changeSenderName = (senderName) => ({ type: CHANGE_SENDER_NAME, payload: senderName });
export const changeShippingName = (shippingName) => ({ type: CHANGE_SHIPPING_NAME, payload: shippingName });
export const changeShippingPhone = (shippingPhone) => ({ type: CHANGE_SHIPPING_PHONE, payload: shippingPhone });
export const changeShippingAddress = (shippingAddress) => ({ type: CHANGE_SHIPPING_ADDRESS, payload: shippingAddress });
export const changeRefundBankName = (refundBankName) => ({ type: CHANGE_REFUND_BANK_NAME, payload: refundBankName });
export const changeRefundAccountHolder = (refundAccountHolder) => ({ type: CHANGE_REFUND_ACCOUNT_HOLDER, payload: refundAccountHolder });
export const changeRefundAccountNumber = (refundAccountNumber) => ({ type: CHANGE_REFUND_ACCOUNT_NUMBER, payload: refundAccountNumber });
export const changeIsRefunded = (isRefunded) => ({ type: CHANGE_IS_REFUNDED, payload: isRefunded });

// 초기화 및 모든필드
export const updateAllFields = (data) => ({ type: UPDATE_ALL_FIELDS, payload: data });
export const resetState = () => ({ type: RESET_STATE });

//API관련
export const readDonorsByProjectNum = (projectNum) => async (dispatch) => {
    try {
        const response = await fetchDonorsByProjectNum(projectNum);
        dispatch({
            type: READ_PAYMENT,
            payload: response.data
        });
    } catch (error) {
        console.error("정보 불러오기 실패", error);
    }
}

export const createDonorByProject = (projectNum, payment) => async (dispatch) => {
    try {
        const response = await createPayment(projectNum, payment);
        dispatch({
            type: CREATE_PAYMENT,
            payload: response.data
        });
    } catch (error) {
        console.error("결제 실패", error);
    }
}

export const getMyFundingByProject = (projectStatus) => async (dispatch) => {
    try {
        const response = await getMyFunding(projectStatus);
        dispatch({
            type : READ_PAYMENT,
            payload: response.data
        });
    }catch (error) {
        console.error("불러오기 실패", error);
    }
} 

// 결제 생성
export const addPayment = (paymentNum, payment) => async(dispatch) => {
    try{
        const response = await createPayment(paymentNum, payment);
        dispatch({
            type: CREATE_PAYMENT,
            payload: response.data
        })
    }catch(error){
        console.error("결제 실패")
    }
}

// 결제 삭제 
export const removePayment = (paymentId) => async(dispatch) => {
    try{
        const response = await deletePayment(paymentId); 
        dispatch({
            type: DELETE_PAYMENT,
            payload: response.data
        })
    }catch(error){
        console.error("환불 실패")
    }
}