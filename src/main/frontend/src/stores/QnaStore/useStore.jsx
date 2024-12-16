import { useReducer } from "react";
import { initialState, reducer } from "./reducer";
import { 
    changeQnaCategory, 
    changeQnaNumber,
    changeNickName,
    changeUserNum,
    changeWrittenDate,
    changeTitle,
    changeQuestionComment,
    changeAnswerNickName,
    changeAnswerNum,
    changeAnswerWrittenDate,
    changeAnswer,
    updateAllFields,
    resetState,
    createProjectComment,
    createNewQuestion,
    updateReplyQna,
    updatedComment,
    readAllQnas,
    readAllQnasByAdmin,
    readAllUserQuestions,
    readQnaDetailByQnaNumber
} from "./action";

export const useStore = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = {
    // 프로젝트 카테고리
    changeQnaCategory: (qnaCategory) => dispatch(changeQnaCategory(qnaCategory)),
    changeQnaNumber: (qnaNumber) => dispatch(changeQnaNumber(qnaNumber)),
    changeNickName: (nickName) => dispatch(changeNickName(nickName)),
    changeUserNum: (userNum) => dispatch(changeUserNum(userNum)),
    changeWrittenDate: (writtenDate) => dispatch(changeWrittenDate(writtenDate)),
    changeTitle: (title) => dispatch(changeTitle(title)),
    changeQuestionComment: (questionComment) => dispatch(changeQuestionComment(questionComment)),
    changeAnswerNickName: (answerNickName) => dispatch(changeAnswerNickName(answerNickName)),
    changeAnswerNum: (answerNum) => dispatch(changeAnswerNum(answerNum)),
    changeAnswerWrittenDate: (answerWrittenDate) => dispatch(changeAnswerWrittenDate(answerWrittenDate)),
    changeAnswer: (answer) => dispatch(changeAnswer(answer)),
    updateAllFields: (fields) => dispatch(updateAllFields(fields)),
    resetState: () => dispatch(resetState()),

    readAllQnas: ()=>readAllQnas()(dispatch), // 유저의 qna가져오기
    createProjectComment: (projectNum, commentData) => createProjectComment(projectNum, commentData)(dispatch),
    createNewQuestion: (commentData) => createNewQuestion(commentData)(dispatch),
    updateReplyQna: (qnaNumber, text) => updateReplyQna(qnaNumber, text)(dispatch),
    updatedComment: (qnaNumber,text) => updatedComment(qnaNumber,text)(dispatch),
    readQnaDetailByQnaNumber: (qnaNumber) => readQnaDetailByQnaNumber(qnaNumber)(dispatch),
     // Admin 전체 qna 불러오기
    readAllQnasByAdmin: () => readAllQnasByAdmin()(dispatch),
    // Admin 문의내역 불러오기
    readAllUserQuestions: () => readAllUserQuestions()(dispatch)
  };


  return { state, actions };
};