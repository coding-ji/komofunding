import { useReducer } from "react";
import { initialState, reducer } from "./reducer";
import { 
  changeUserNum,
  changeBankName,
  changeAccountNumber,
  changeAccountHolder,
  changePaymentId,
  changeItems,
  changePaidAmount,
  changePaymentDate,
  changePaymentMethod,
  changePaymentStatus,
  changeFailureReason,
  changeSenderName,
  changeShippingName,
  changeShippingPhone,
  changeShippingAddress,
  changeRefundBankName,
  changeRefundAccountHolder,
  changeRefundAccountNumber,
  changeIsRefunded,
  resetState, 
  updateAllFields, 
  createDonorByProject, 
  readDonorsByProjectNum } 
  from "./action";

export const useStore = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = {
    changeUserNum: (userNum) => dispatch(changeUserNum(userNum)),
    changeBankName: (bankName) => dispatch(changeBankName(bankName)),
    changeAccountNumber: (accountNumber) => dispatch(changeAccountNumber(accountNumber)),
    changeAccountHolder: (accountHolder) => dispatch(changeAccountHolder(accountHolder)),
    changePaymentId: (paymentId) => dispatch(changePaymentId(paymentId)),
    changeItems: (items) => dispatch(changeItems(items)),
    changePaidAmount: (paidAmount) => dispatch(changePaidAmount(paidAmount)),
    changePaymentDate: (paymentDate) => dispatch(changePaymentDate(paymentDate)),
    changePaymentMethod: (paymentMethod) => dispatch(changePaymentMethod(paymentMethod)),
    changePaymentStatus: (paymentStatus) => dispatch(changePaymentStatus(paymentStatus)),
    changeFailureReason: (failureReason) => dispatch(changeFailureReason(failureReason)),
    changeSenderName: (senderName) => dispatch(changeSenderName(senderName)),
    changeShippingName: (shippingName) => dispatch(changeShippingName(shippingName)),
    changeShippingPhone: (shippingPhone) => dispatch(changeShippingPhone(shippingPhone)),
    changeShippingAddress: (shippingAddress) => dispatch(changeShippingAddress(shippingAddress)),
    changeRefundBankName: (refundBankName) => dispatch(changeRefundBankName(refundBankName)),
    changeRefundAccountHolder: (refundAccountHolder) => dispatch(changeRefundAccountHolder(refundAccountHolder)),
    changeRefundAccountNumber: (refundAccountNumber) => dispatch(changeRefundAccountNumber(refundAccountNumber)),
    changeIsRefunded: (isRefunded) => dispatch(changeIsRefunded(isRefunded)),

    resetStat: () => dispatch(resetState),
    updateAllFields: (data) => dispatch(updateAllFields(data)),
    
    createDonorByProject: (projectNum, payment) => createDonorByProject(projectNum, payment)(dispatch),  
    readDonorsByProjectNum: (projectNum) => readDonorsByProjectNum(projectNum)(dispatch)
  };

  return { state, actions };
};
