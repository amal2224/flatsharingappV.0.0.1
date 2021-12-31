import {
    NAME_SUCCESS,
    NAME_FAIL,
    ADDRESS_SUCCESS,
    ADDRESS_FAIL,
    PRONUMBER_SUCCESS,
    PRONUMBER_FAIL,
} from "../constants/types.js";
import axios from "axios";

export const nameAction = (
    fullName,
    setErr,
    showButton,
    setShowButton,
    updates,
    setUpdates
) => (dispatch) => {
    axios
    .post("/generalInfos/fullName", { fullName: fullName })
    .then((res) => {
      dispatch({
        type: NAME_SUCCESS,
        payload: res.data,
      });
      setShowButton({ ...showButton, showFullName: false });
      setErr([]);
      setUpdates({ ...updates, fullName: "" });
    })
    .catch((err) => {
      dispatch({
        type: NAME_FAIL,
        payload: err.response.data.errors,
      });
      setErr(err.response.data.errors);
    });
};

export const addressAction = (
  address,
  setErr,
  showButton,
  setShowButton,
  updates,
  setUpdates
) => (dispatch) => {
  axios
    .post("/generalInfos/address", { address: address })
    .then((res) => {
      dispatch({
        type: ADDRESS_SUCCESS,
        payload: res.data,
      });
      setShowButton({ ...showButton, showAddress: false });
      setErr([]);
      setUpdates({ ...updates, address: "" });
    })
    .catch((err) => {
      dispatch({
        type: ADDRESS_FAIL,
        payload: err.response.data.errors,
      });
      setErr(err.response.data.errors);
    });
};
export const phoneNumberAction = (
  phoneNumber,
  setErr,
  showButton,
  setShowButton,
  updates,
  setUpdates
) => (dispatch) => {
  axios
    .post("/generalInfos/phone", { phoneNumber: phoneNumber })
    .then((res) => {
      dispatch({
        type: PRONUMBER_SUCCESS,
        payload: res.data,
      });
      setShowButton({ ...showButton, showProNumber: false });
      setErr([]);
      setUpdates({ ...updates, phoneNumber: "" });
    })
    .catch((err) => {
      dispatch({
        type: PRONUMBER_FAIL,
        payload: err.response.data.errors,
      });
      setErr(err.response.data.errors);
    });
};