import {
  RESET_STATE,
  UPDATE_ALL_FIELDS,
  READ_USER,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  READ_PROJECT,
  CREATE_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
} from './action';

export const initialState = {};

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_ALL_FIELDS:
      return action.payload;

    case RESET_STATE:
      return initialState;

    // USER 관련
    case READ_USER:
      return { ...state, user: action.payload };

    case CREATE_USER:
      return { ...state, user: action.payload };

    case UPDATE_USER:
      return { ...state, user: action.payload };

    case DELETE_USER:
      return { ...state, user: action.payload };

    // PROJECT 관련
    case READ_PROJECT:
      return { ...state, project: action.payload };

    case CREATE_PROJECT:
      return { ...state, project: action.payload };

    case UPDATE_PROJECT:
      return { ...state, project: action.payload }

    case DELETE_PROJECT:
      return { ...state, project: action.payload }

    default:
      return state;
  }
};