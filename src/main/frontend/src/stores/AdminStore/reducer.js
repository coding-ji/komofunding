import {
  UPDATE_USER,
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_ADMIN_PROJECTS,
  FETCH_ADMIN_PROJECTS_SUCCESS,
  UPDATE_PROJECT
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
    
    case FETCH_ADMIN_PROJECTS:
      return {...state}

    case FETCH_ADMIN_PROJECTS_SUCCESS:
      return {...state, project : action.payload}

    case UPDATE_PROJECT:
      return {...state, project : action.payload}
  
    default:
      return state;
  }
};
