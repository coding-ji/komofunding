import {
    UPDATE_ALL_FIELDS,
    RESET_STATE,
    READ_APPLICATION,
    CREATE_APPLICATION,
    DELETE_APPLICATION,
    UPDATE_APPLICATION
} from "./action";

export const initialState = {};

export const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_ALL_FIELDS:
            return { ...state, ...action.payload };
        case RESET_STATE:
            return { ...initialState };
        case READ_APPLICATION:
            return { ...state, application: action.payload };

        case CREATE_APPLICATION:
            return { ...state, application: action.payload };

        case UPDATE_APPLICATION:
            return { ...state, application: action.payload };

        case DELETE_APPLICATION:
            return { ...state, application: action.payload };
    }
}