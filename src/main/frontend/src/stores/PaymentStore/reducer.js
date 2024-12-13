import {
    READ_PAYMENT,
    CREATE_PAYMENT,
    UPDATE_PAYMENT,
    DELETE_PAYMENT,
    UPDATE_ALL_FIELDS,
    RESET_STATE    
} from "./action";

export const initialState = { payment: []};

export const reducer = (state, action) => {
    switch(action.type){
        case READ_PAYMENT :
            return {...state, payment: action.payload};
        case CREATE_PAYMENT:
            return {...state, payment: action.payload};
        case UPDATE_PAYMENT :
            return {...state, payment: action.payload};
        case DELETE_PAYMENT:
            return {...state, payment: action.payload};
        case UPDATE_ALL_FIELDS:
            return {...state, payment: action.payload};
        case RESET_STATE:
            return initialState;
    }
}