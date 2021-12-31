import {
    ALL_USER_FAIL,
    ALL_USER_SUCCESS,
    GET_ALL_USER_LOAD
} from "../constants/types.js";

import axios from "axios";

//Get all user
export const getAllUser = () => (dispatch) => {
    dispatch({type:GET_ALL_USER_LOAD});
    axios
        .get("/profile/all/users")
        .then((res) =>
        dispatch({
            type: ALL_USER_SUCCESS,
            payload: res.data,
        })
        )
        .catch((err) =>
            dispatch({
                type: ALL_USER_FAIL,
                payload: err.response.data.errors,
        })
    );
};