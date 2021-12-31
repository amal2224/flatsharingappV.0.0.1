import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOG_OUT,
    REMOVE_AUTH_ERROR,
    AVATAR_SUCCESS,
    AVATAR_FAIL,
    NAME_SUCCESS,
    NAME_FAIL,
    ADDRESS_SUCCESS,
    ADDRESS_FAIL,
    PRONUMBER_SUCCESS,
    PRONUMBER_FAIL,
    FACEBOOK_SUCCESS,
    FACEBOOK_FAIL,
    TWITTER_SUCCESS,
    TWITTER_FAIL,
    INSTAGRAM_SUCCESS,
    INSTAGRAM_FAIL,
    PASSWORD_SUCCESS,
    PASSWORD_FAIL,
    AUTH_LOAD,
} from "../constants/types.js";

let initState = {
    token: localStorage.getItem("token"),
    user: {
        fullName: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
        facebook: "",
        twitter: "",
        instagram: "",
        avatar: "",
        sex:"",
    },
    isAuth: false,
    IsLoad:false,
    error: [],
};

const AuthReducer = (state = initState, action) => {
    switch (action.type) {
    case AUTH_LOAD:
        return { ...state,IsLoad:true};
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      //Set token in the localStorage
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("auth", "true");
        return {
            ...state,
            token: action.payload.token,
            isAuth: true,
            error: [],
            IsLoad:false,
        };
    case LOAD_USER_SUCCESS:
        return {
            ...state,
            isAuth: true,
            user: action.payload,
            error: [],
            IsLoad:false
        };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOAD_USER_FAIL:
      // Delete token
        localStorage.removeItem("token");
        localStorage.removeItem("auth");
        return {
        ...state,
        isAuth: false,
        error: action.payload,
        IsLoad:false
        };

    case LOG_OUT:
        localStorage.removeItem("token");
        localStorage.removeItem("auth");
        return {
            user: {
                fullName: "",
                email: "",
                phoneNumber: "",
                address: "",
                facebook: "",
                twitter: "",
                instagram: "",
                avatar: "",
            },
        isAuth: false,
        error: [],
        IsLoad:false
        };

    // Update avatar
    case AVATAR_SUCCESS:
        return {
            ...state,
            user: { ...state.user, avatar: action.payload },
            error: [],
            IsLoad:false
        };

    case AVATAR_FAIL:
        return {
            ...state,
            error: action.payload,
            IsLoad:false
        };

    // Update name
    case NAME_SUCCESS:
        return {
            ...state,
            user: { ...state.user, fullName: action.payload },
            error: [],
            IsLoad:false
        };

    case NAME_FAIL:
        return {
            ...state,
            error: action.payload,
            IsLoad:false
        };

    // Update address
    case ADDRESS_SUCCESS:
        return {
            ...state,
            user: { ...state.user, address: action.payload },
            error: [],
            IsLoad:false
        };

    case ADDRESS_FAIL:
        return {
            ...state,
            error: action.payload,
            IsLoad:false
        };

    // Update proNumber
    case PRONUMBER_SUCCESS:
        return {
            ...state,
            user: { ...state.user, phoneNumber: action.payload },
            error: [],
            IsLoad:false
        };

    case PRONUMBER_FAIL:
        return {
            ...state,
            error: action.payload,
            IsLoad:false
        };

    // Update facebook
    case FACEBOOK_SUCCESS:
        return {
            ...state,
            user: { ...state.user, facebook: action.payload },
            error: [],
            IsLoad:false
        };

    case FACEBOOK_FAIL:
        return {
            ...state,
            error: action.payload,
            IsLoad:false
        };

    // Update twitter
    case TWITTER_SUCCESS:
        return {
            ...state,
            user: { ...state.user, twitter: action.payload },
            error: [],
            IsLoad:false
        };

    case TWITTER_FAIL:
        return {
            ...state,
            error: action.payload,
            IsLoad:false
        };

    // Update instagram
    case INSTAGRAM_SUCCESS:
        return {
            ...state,
            user: { ...state.user, instagram: action.payload },
            error: [],
            IsLoad:false
        };

    case INSTAGRAM_FAIL:
        return {
            ...state,
            error: action.payload,
            IsLoad:false
        };

    // Update password
    case PASSWORD_SUCCESS:
        return {
            ...state,
            user: { ...state.user, password: action.payload },
            passwordAlert: action.payload,
            error: [],
            IsLoad:false
        };

    case PASSWORD_FAIL:
        return {
            ...state,
            error: action.payload,
            IsLoad:false
        };

    case REMOVE_AUTH_ERROR:
        return {
            ...state,
            error: action.payload,
            IsLoad:false
        };

    default:
        return state;
    }
};

export default AuthReducer;