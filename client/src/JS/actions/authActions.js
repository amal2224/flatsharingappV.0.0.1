import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOG_OUT,
    REMOVE_AUTH_ERROR,
    AUTH_LOAD
} from "../constants/types.js";

import axios from "axios";
import setToken from "../../setTokenInHeader";

//Register Action
export const registerUser = (info) => (dispatch) => {
    dispatch({type:AUTH_LOAD});
    axios
    .post("/users/register", info)
    .then((res) =>{
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
        });
        // history.push("/EditProfile");
    })
    .catch((err) => {
        console.log(err.response.data);
        dispatch({
            type: REGISTER_FAIL,
            payload: err.response.data.errors,
        });
    });
};

//Load connected user Action
export const loadUser = () => (dispatch) => {
    setToken();
    dispatch({type:AUTH_LOAD});
    axios
    .get("/users/login")
    .then((res) =>
        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: res.data,
        })
    )
    .catch((err) =>
        dispatch({
            type: LOAD_USER_FAIL,
            payload: err.response.data.errors,
        })
    );
};

//Login
export const SignInUser = (info) => (dispatch) => {
    dispatch({type:AUTH_LOAD});
    axios
    .post("/users/login", info)
    .then((res) =>
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        })
    )
    .catch((err) =>
        dispatch({
            type: LOGIN_FAIL,
            payload: err.response.data.errors,
        })
    );
};

export const LogOut = () => {
    return {
        type: LOG_OUT,
    };
};

//remove error
export const removeAuthErr = () => {
    return {
        type: REMOVE_AUTH_ERROR,
        payload: [],
    };
};