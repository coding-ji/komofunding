
  // 액션 타입 정의
  export const FETCH_USERS = 'FETCH_USERS';
  export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
  export const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR';
  
  export const FETCH_USER_BY_ID = 'FETCH_USER_BY_ID';
  export const FETCH_USER_BY_ID_SUCCESS = 'FETCH_USER_BY_ID_SUCCESS';
  export const FETCH_USER_BY_ID_ERROR = 'FETCH_USER_BY_ID_ERROR';
  
  // 액션 생성자
  export const fetchUsers = () => async (dispatch) => {
    dispatch({ type: FETCH_USERS });
    try {
      const response = await apiFetchAllUsers();
      dispatch({ type: FETCH_USERS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_USERS_ERROR, payload: error.message });
    }
  };
  
  export const fetchUserById = (userNum) => async (dispatch) => {
    dispatch({ type: FETCH_USER_BY_ID });
    try {
      const response = await apiFetchUserById(userNum);
      dispatch({ type: FETCH_USER_BY_ID_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_USER_BY_ID_ERROR, payload: error.message });
    }
  };
  