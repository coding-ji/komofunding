import { createComment, createQuestion, replyQna, updateComment } from "../../service/apiService"

// COMMENT(댓글) 혹은 QUESTION(1:1문의)
export const CHANGE_QNA_CATEGORY = "CHANGE_QNA_CATEGORY";
export const CHANGE_QNA_NUMBER = "CHANGE_QNA_NUMBER";

// 작성자
export const CHANGE_NICKNAME = "CHANGE_NICKNAME";
export const CHANGE_USER_NUM = "CHANGE_USER_NUM";
export const CHANGE_WRITTEN_DATE = "CHANGE_WRITTEN_DATE";
export const CHANGE_TITLE = "CHANGE_TITLE";
export const CHANGE_QUESTION_COMMENT = "CHANGE_QUESTION_COMMENT";

// 답변자
export const CHANGE_ANSWER_NICKNAME = "CHANGE_ANSWER_NICKNAME";
export const CHANGE_ANSWER_NUM = "CHANGE_ANSWER_NUM";
export const CHANGE_ANSWER_WRITTEN_DATE = "CHANGE_ANSWER_WRITTEN_DATE";
export const CHANGE_ANSWER = "CHANGE_ANSWER";

// 전체 업데이트 
export const UPDATE_ALL_FIELDS = 'UPDATE_ALL_FIELDS';

// 초기화 
export const RESET_STATE = "RESET_STATE";

// CRUD
export const READ_QNA = "READ_QNA";
export const CREATE_QNA = "CREATE_QNA";
export const UPDATE_QNA = "UPDATE_PROJECT";
export const DELETE_QNA = "DELETE_QNA";

// 액션 생성 함수
export const changeQnaCategory = (qnaCategory) => ({
    type: CHANGE_QNA_CATEGORY,
    payload: qnaCategory,
});

export const changeQnaNumber = (qnaNumber) => ({
    type: CHANGE_QNA_NUMBER,
    payload: qnaNumber,
});

export const changeNickName = (nickName) => ({
    type: CHANGE_NICKNAME,
    payload: nickName,
});

export const changeUserNum = (userNum) => ({
    type: CHANGE_USER_NUM,
    payload: userNum,
});

export const changeWrittenDate = (writtenDate) => ({
    type: CHANGE_WRITTEN_DATE,
    payload: writtenDate,
});

export const changeTitle = (title) => ({
    type: CHANGE_TITLE,
    payload: title,
});

export const changeQuestionComment = (questionComment) => ({
    type: CHANGE_QUESTION_COMMENT,
    payload: questionComment,
});

export const changeAnswerNickName = (answerNickName) => ({
    type: CHANGE_ANSWER_NICKNAME,
    payload: answerNickName,
});

export const changeAnswerNum = (answerNum) => ({
    type: CHANGE_ANSWER_NUM,
    payload: answerNum,
});

export const changeAnswerWrittenDate = (answerWrittenDate) => ({
    type: CHANGE_ANSWER_WRITTEN_DATE,
    payload: answerWrittenDate,
});

export const changeAnswer = (answer) => ({
    type: CHANGE_ANSWER,
    payload: answer,
});

export const updateAllFields = (fields) => ({
    type: UPDATE_ALL_FIELDS,
    payload: fields,
});

export const resetState = () => ({
    type: RESET_STATE,
});


export const createProjectComment = (projectNum, commentData) => async (dispatch) => {
    try {
        const response = await createComment(projectNum, commentData);
        dispatch({
            type: "CREATE_QNA",
            payload: response.data
        });
    } catch (error) {
        console.error("프로젝트 댓글을 불러올 수 없습니다.");
    }
}

export const createNewQuestion = (commentData) => async (dispatch) => {
    try {
        const response = await createQuestion(commentData);
        dispatch({
            type: "CREATE_QNA",
            payload: response.data
        });
    } catch (error) {
        console.error("1:1 문의사항을 불러올 수 없습니다.");
    }
}


export const updateReplyQna = (qnaNumber, text) => async (dispatch) => {
    try{
        const response = await replyQna(qnaNumber, text);
        dispatch({
            type: "UPDATE_QNA",
            payload: response.data
        });
    }catch(error){
        console.error("답변을 등록할 수 없습니다.");
    }
}

export const updatedComment = (qnaNumber, text) => async (dispatch) => {
    try{
        const response = await updateComment(qnaNumber, text);
        dispatch({
            type: "UPDATE_QNA",
            payload: response.data
        })
    }catch(error){
        console.error("문의를 수정할 수 없습니다.")
    }
}