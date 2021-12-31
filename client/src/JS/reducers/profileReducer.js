import {
  GET_PROFILE_FAIL,
  GET_PROFILE_SUCCESS,
  REMOVE,
  PROFILE_LOAD
} from "../constants/types.js";

const initState = {
  profile: null,
  isprofile: false,
  error: [],
  isLoadProfile:false,
};

const ProfileReducer = (state = initState, action) => {
  switch (action.type) {
    case PROFILE_LOAD:
      return { ...state,isLoadProfile:true};
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        isprofile: true,
        error: [],
        isLoadProfile:false,
      };

    case GET_PROFILE_FAIL:
      return {
        ...state,
        profile: null,
        isprofile: false,
        error: action.payload,
        isLoadProfile:false,
      };

    case REMOVE:
      return {
        profile: null,
        isprofile: false,
        error: [],
        isLoadProfile:false,
      };

    default:
      return state;
  }
};

export default ProfileReducer;