import {
    CHANGE_USER_NUM,
    CHANGE_BANK_NAME,
    CHANGE_ACCOUNT_NUMBER,
    CHANGE_ACCOUNT_HOLDER,
    CHANGE_PAYMENT_ID,
    CHANGE_ITEMS,
    CHANGE_PAID_AMOUNT,
    CHANGE_PAYMENT_DATE,
    CHANGE_PAYMENT_METHOD,
    CHANGE_PAYMENT_STATUS,
    CHANGE_FAILURE_REASON,
    CHANGE_SENDER_NAME,
    CHANGE_SHIPPING_NAME,
    CHANGE_SHIPPING_PHONE,
    CHANGE_SHIPPING_ADDRESS,
    CHANGE_REFUND_BANK_NAME,
    CHANGE_REFUND_ACCOUNT_HOLDER,
    CHANGE_REFUND_ACCOUNT_NUMBER,
    CHANGE_IS_REFUNDED,
    READ_PAYMENT,
    CREATE_PAYMENT,
    UPDATE_PAYMENT,
    DELETE_PAYMENT,
    UPDATE_ALL_FIELDS,
    RESET_STATE
} from "./action";

export const initialState = {items: []};

export const reducer = (state, action) => {
    switch (action.type) {
        case CHANGE_USER_NUM:
            return { ...state, userNum: action.payload };
        case CHANGE_BANK_NAME:
            return { ...state, bankName: action.payload };
        case CHANGE_ACCOUNT_NUMBER:
            return { ...state, accountNumber: action.payload };
        case CHANGE_ACCOUNT_HOLDER:
            return { ...state, accountHolder: action.payload };

        case CHANGE_PAYMENT_ID:
            return { ...state, paymentId: action.payload };
        case CHANGE_ITEMS:
            return { ...state, items: action.payload };
        case CHANGE_PAID_AMOUNT:
            return { ...state, paidAmount: action.payload };
        case CHANGE_PAYMENT_DATE:
            return { ...state, paymentDate: action.payload };
        case CHANGE_PAYMENT_METHOD:
            return { ...state, paymentMethod: action.payload };
        case CHANGE_PAYMENT_STATUS:
            return { ...state, paymentStatus: action.payload };
        case CHANGE_FAILURE_REASON:
            return { ...state, failureReason: action.payload };
        case CHANGE_SENDER_NAME:
            return { ...state, senderName: action.payload };
        case CHANGE_SHIPPING_NAME:
            return { ...state, shippingName: action.payload };
        case CHANGE_SHIPPING_PHONE:
            return { ...state, shippingPhone: action.payload };
        case CHANGE_SHIPPING_ADDRESS:
            return { ...state, shippingAddress: action.payload };
        case CHANGE_REFUND_BANK_NAME:
            return { ...state, refundBankName: action.payload };
        case CHANGE_REFUND_ACCOUNT_HOLDER:
            return { ...state, refundAccountHolder: action.payload };
        case CHANGE_REFUND_ACCOUNT_NUMBER:
            return { ...state, refundAccountNumber: action.payload };
        case CHANGE_IS_REFUNDED:
            return { ...state, isRefunded: action.payload };
        case READ_PAYMENT:
            return { ...state, payment: action.payload };
        case CREATE_PAYMENT:
            return { ...state, payment: action.payload };
        case UPDATE_PAYMENT:
            return { ...state, payment: action.payload };
        case DELETE_PAYMENT:
            return { ...state, payment: action.payload };
        case UPDATE_ALL_FIELDS:
            return { ...state, payment: action.payload };
        case RESET_STATE:
            return initialState;
        default:
            return state;
    }
}