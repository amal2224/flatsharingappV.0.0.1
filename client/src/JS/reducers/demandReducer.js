import {
    DEMAND_SUCCESS,
    DEMAND_FAIL,
    LOAD_DEMAND_FAIL,
    LOAD_DEMAND_SUCCESS,
    DELETE_DEMAND_SUCCESS,
    DELETE_DEMAND_FAIL,
    DEMAND_LIST_SUCCESS,
    DEMAND_LIST_FAIL,
    REMOVE,
    DEMAND_LIST_LOAD
} from "../constants/types.js";

let initState = {
    demands: [],
    allDemand:[],
    demandUploaded: false,
    demandDeleted: false,
    error: [],
    isLoadDemand:false,
};

const DemandReducer = (state = initState, action) => {
    switch (action.type) {
        case DEMAND_LIST_LOAD:
            return { ...state,isLoadDemand:true};
        case DEMAND_SUCCESS:
            return {
                ...state,
                demands: [...state.demands, action.payload],
                demandUploaded: true,
                error: [],
                isLoadDemand:false
            };
        case LOAD_DEMAND_SUCCESS:
            return {
                ...state,
                demands: action.payload,
                error: [],
                isLoadDemand:false
            };
    
        case DELETE_DEMAND_SUCCESS:
        return {
            ...state,
            demands: state.demands.filter((el) => el._id !== action.payload),
            demandDeleted: true,
            error: [],
            isLoadDemand:false
        };

        case DEMAND_LIST_SUCCESS:
        return {
            ...state,
            allDemand: action.payload,
            error: [],
            isLoadDemand:false
        };

        case DEMAND_LIST_FAIL:
        return {
            ...state,
            error: action.payload,
            isLoadDemand:false
        };

        case DEMAND_FAIL:
        case LOAD_DEMAND_FAIL:
        return {
            ...state,
            demandUploaded: false,
            error: action.payload,
            isLoadDemand:false
        };

        case DELETE_DEMAND_FAIL:
        return {
            ...state,
            demandDeleted: false,
            error: action.payload,
            isLoadDemand:false
        };

        case REMOVE:
        return {
            demands: [],
            demandUploaded: false,
            demandDeleted: false,
            error: [],
            isLoadDemand:false
        };

    default:
        return state;
}
};

export default DemandReducer;