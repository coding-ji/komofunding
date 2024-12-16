import {
    FETCH_USERS,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_ERROR,
    FETCH_USER_BY_ID,
    FETCH_USER_BY_ID_SUCCESS,
    FETCH_USER_BY_ID_ERROR,
  } from './action';
  
  export const initialState = {
    users: [],
    selectedUser: null,
    loading: false,
    error: null,
  };
  
  export const reducer = (state, action) => {
    switch (action.type) {
      case FETCH_USERS:
      case FETCH_USER_BY_ID:
        return { ...state, loading: true, error: null };
  
      case FETCH_USERS_SUCCESS:
        return { ...state, loading: false, users: action.payload };
  
      case FETCH_USER_BY_ID_SUCCESS:
        return { ...state, loading: false, selectedUser: action.payload };
  
      case FETCH_USERS_ERROR:
      case FETCH_USER_BY_ID_ERROR:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  