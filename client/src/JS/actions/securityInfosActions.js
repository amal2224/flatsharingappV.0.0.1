import {
    EMAIL_SUCCESS,
    EMAIL_FAIL,
    PASSWORD_SUCCESS,
    PASSWORD_FAIL,
} from "../constants/types.js";
import axios from "axios";

export const emailAction = (
    email,
    setErr,
    showButton,
    setShowButton,
    updates,
    setUpdates
) => (dispatch) => {
    axios
        .post("/securityInfos/email", { email: email })
        .then((res) => {
        dispatch({
            type: EMAIL_SUCCESS,
            payload: res.data,
        });
        setShowButton({ ...showButton, showEmail: false });
        setErr([]);
        setUpdates({ ...updates, email: "" });
    })
    .catch((err) => {
        dispatch({
            type: EMAIL_FAIL,
            payload: err.response.data.errors,
        });
        setErr(err.response.data.errors);
    });
};

export const passwordAction = (
    actualPassword,
    newPassword,
    confirmPassword,
    setErr,
    showButton,
    setShowButton,
    updates,
    setUpdates
) => (dispatch) => {
  axios
    .post("/securityInfos/password", {
      actualPassword: actualPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    })
    .then((res) => {
      dispatch({
        type: PASSWORD_SUCCESS,
        payload: res.data,
      });
      setShowButton({ ...showButton, showPassword: false });
      setErr([]);
      setUpdates({
        ...updates,
        actualPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    })
    .catch((err) => {
      setErr(err.response.data.errors);
      dispatch({
        type: PASSWORD_FAIL,
        payload: err.response.data.errors,
      });
    });
};