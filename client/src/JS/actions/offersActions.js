import {
    OFFER_SUCCESS,
    OFFER_FAIL,
    LOAD_OFFER_FAIL,
    LOAD_OFFER_SUCCESS,
    DELETE_OFFER_SUCCESS,
    DELETE_OFFER_FAIL,
    OFFER_LIST_SUCCESS,
    OFFER_LIST_FAIL,
    OFFER_LIST_LOAD,
} from "../constants/types.js";

import axios from "axios";

// ADD OFFRE
export const addOffre = (offre, file) => (dispatch) => {
    console.log(offre);
    let formData = new FormData();
    formData.append("image", file);
    formData.append("offre", JSON.stringify(offre));
    axios
        .post("/offre", offre)
        .then((res) =>
        dispatch(
            {
            type: OFFER_SUCCESS,
            payload: res.data,
            }
        )
    )
        .catch((err) =>
        dispatch({
            type: OFFER_FAIL,
            payload: err.response.data.errors,
        })
        );
};

//Get user's offres
export const getUserOffre = (id) => (dispatch) => {
    dispatch({type:OFFER_LIST_LOAD});
    axios
        .get("/offre/" + id)
        .then((res) => {
        dispatch({
            type: LOAD_OFFER_SUCCESS,
            payload: res.data,
        });
        })
        .catch((err) =>
        dispatch({
            type: LOAD_OFFER_FAIL,
            payload: err.response.data.errors,
        })
        );
};

//Get all offre
export const getAllOffre = () => (dispatch) => {
    dispatch({type:OFFER_LIST_LOAD});
    axios
        .get("/offre/all/offre")
        .then((res) =>
        dispatch({
            type: OFFER_LIST_SUCCESS,
            payload: res.data,
        })
        )
        .catch((err) =>
            dispatch({
                type: OFFER_LIST_FAIL,
                payload: err.response.data.errors,
        })
    );
};

//Dlete user's offre
export const deleteOffre = (id) => (dispatch) => {
    axios
        .delete("/offre/" + id)
        .then((res) => {
        dispatch({
            type: DELETE_OFFER_SUCCESS,
            payload: res.data,
        });
        })
        .catch((err) =>
        dispatch({
            type: DELETE_OFFER_FAIL,
            payload: err.response.data.errors,
        })
        );
};