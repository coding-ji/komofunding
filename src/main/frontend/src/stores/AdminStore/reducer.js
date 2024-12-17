import {
  UPDATE_USER,
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  UPDATE_PROJECT,
  READ_PROJECT
} from './action';

export const initialState = {};

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return {...state, user : action.payload};

    case FETCH_USERS:
      return {...state};
    
    case FETCH_USERS_SUCCESS:
      return {...state, user : action.payload};

    case READ_PROJECT:
      return {...state, project : action.payload};

    case UPDATE_PROJECT:
      return {...state, project : action.payload}
  
    default:
      return state;
  }
};
