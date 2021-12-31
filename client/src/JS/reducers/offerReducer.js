import {
  OFFER_SUCCESS,
  OFFER_FAIL,
  LOAD_OFFER_SUCCESS,
  LOAD_OFFER_FAIL,
  DELETE_OFFER_SUCCESS,
  DELETE_OFFER_FAIL,
  REMOVE,
  OFFER_LIST_SUCCESS,
  OFFER_LIST_FAIL,
  OFFER_LIST_LOAD,
} from "../constants/types.js";

let initState = {
  offres: [],
  allOffre:[],
  offreUploaded: false,
  offreDeleted: false,
  error: [],
  isLoadOffer:false,
};

const OffreReducer = (state = initState, action) => {
  switch (action.type) {
    case OFFER_LIST_LOAD:
      return { ...state,isLoadOffer:true};
    case OFFER_SUCCESS:
      return {
        ...state,
        offres: [...state.offres, action.payload],
        offreUploaded: true,
        error: [],
        isLoadOffer:false,
      };
      // esseyer de supprimer load offer success à quoi sert!!!!
    case LOAD_OFFER_SUCCESS:
      return {
        ...state,
        offres: action.payload,
        error: [],
      };
    
    case DELETE_OFFER_SUCCESS:
      return {
        ...state,
        offres: state.offres.filter((el) => el._id !== action.payload),
        offreDeleted: true,
        error: [],
        isLoadOffer:false
      };

    case OFFER_LIST_SUCCESS:
      return {
        ...state,
        allOffre: action.payload,
        error: [],
        offreUploaded: false,
        isLoadOffer:false
      };

    case OFFER_LIST_FAIL:
      return {
        ...state,   //...state.allOffre,
        error: action.payload,
        offreUploaded: false,
        isLoadOffer:false
      };

    case OFFER_FAIL:
    case LOAD_OFFER_FAIL:
      return {
        ...state,
        offreUploaded: false,
        error: action.payload,
        isLoadOffer:false
      };

    case DELETE_OFFER_FAIL:
      return {
        ...state,
        offreDeleted: false,
        error: action.payload,
        isLoadOffer:false
      };

    case REMOVE:
      return {
        offres: [],
        offreUploaded: false,
        offreDeleted: false,
        error: [],
        isLoadOffer:false
      };

    default:
      return state;
  }
};

export default OffreReducer;