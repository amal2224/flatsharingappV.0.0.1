import {
    ALL_USER_FAIL,
    ALL_USER_SUCCESS,
    GET_ALL_USER_LOAD
} from "../constants/types.js";

let initState = {
    usersList:[],
    error: [],
    isError:false, 
    isLoadListUser:false,
};

const CardsReducer = (state = initState, action) => {

switch (action.type) {
    case GET_ALL_USER_LOAD:
            return { ...state,isLoadListUser:true};   
    case ALL_USER_SUCCESS:
        return {
            ...state,
            usersList: action.payload,
            error: [],
            isError:false,
            isLoadListUser:false
        };
    
    case ALL_USER_FAIL:
        return {
            ...state,
            error: action.payload,
            isLoadListUser:false,
            isError:false, 
        };

    default:
        return state;
}
};

export default CardsReducer;