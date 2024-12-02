import {
    CHANGE_PROJECT_NUM,
    CHANGE_CREATOR_NAME,
    CHANGE_PROJECT_TITLE,
    CHANGE_PROJECT_CATEGORY,
    CHANGE_PROJECT_SHORT_DESCRIPTION,
    CHANGE_PROJECT_DESCRIPTION,
    CHANGE_PROJECT_ITEMS,
    CHANGE_PROJECT_CURRENT_AMOUNT,
    CHANGE_PROJECT_TOTAL_AMOUNT,
    CHANGE_PROJECT_START_DATE,
    CHANGE_PROJECT_END_DATE,
    CHANGE_PROJECT_WRITTEN_DATE,
    CHANGE_PROJECT_IMGS,
    RESET_STATE
} from "./action";

export const initialState = {
    projectNum: "",
    creatorName: "",
    projectTitle: "",
    projectCategory: "",
    shortDescription: "",
    description: "",
    items: [
        {
            itemName: "",
            itemPrice: "",
            itemAmount: ""
        }
    ],
    currentAmount: "",
    totalAmount: "",
    startDate: "",
    endDate: "",
    writtenDate: "",
    imgs: []
};

export const reducer = (state, action) => {
    switch (action.type) {
        case CHANGE_PROJECT_NUM:
            return { ...state, projectNum: action.payload };
        case CHANGE_CREATOR_NAME:
            return { ...state, creatorName: action.payload };
        case CHANGE_PROJECT_TITLE:
            return { ...state, projectTitle: action.payload };
        case CHANGE_PROJECT_CATEGORY:
            return { ...state, projectCategory: action.payload };
        case CHANGE_PROJECT_SHORT_DESCRIPTION:
            return { ...state, shortDescription: action.payload };
        case CHANGE_PROJECT_DESCRIPTION:
            return { ...state, description: action.payload };
        case CHANGE_PROJECT_ITEMS:
            return { ...state, items: action.payload };
        case CHANGE_PROJECT_CURRENT_AMOUNT:
            return { ...state, currentAmount: action.payload };
        case CHANGE_PROJECT_TOTAL_AMOUNT:
            return { ...state, totalAmount: action.payload };
        case CHANGE_PROJECT_START_DATE:
            return { ...state, startDate: action.payload };
        case CHANGE_PROJECT_END_DATE:
            return { ...state, endDate: action.payload };
        case CHANGE_PROJECT_WRITTEN_DATE:
            return { ...state, writtenDate: action.payload };
         case CHANGE_PROJECT_IMGS:
            return {...state, imgs: action.payload};
        case RESET_STATE:
            return initialState;
        default:
            return state;
    }
};