import {
    DEMAND_SUCCESS,
    DEMAND_FAIL,
    LOAD_DEMAND_FAIL,
    LOAD_DEMAND_SUCCESS,
    DELETE_DEMAND_SUCCESS,
    DELETE_DEMAND_FAIL,
    DEMAND_LIST_SUCCESS,
    DEMAND_LIST_FAIL,
    DEMAND_LIST_LOAD
} from "../constants/types.js";

import axios from "axios";

export const addDemand = (demand, file) => (dispatch) => {
    console.log(demand);
    let formData = new FormData();
    formData.append("image", file);
    formData.append("demand", JSON.stringify(demand));
    axios
        .post("/demand", demand)
        .then((res) =>
        dispatch(
            {
            type: DEMAND_SUCCESS,
            payload: res.data,
            }
        )
    )
        .catch((err) =>
        dispatch({
            type: DEMAND_FAIL,
            payload: err.response.data.errors,
        })
        );
};

export const getUserDemand = (id) => (dispatch) => {
    dispatch({type:DEMAND_LIST_LOAD});
    axios
        .get("/demand/" + id)
        .then((res) => {
        dispatch({
            type: LOAD_DEMAND_SUCCESS,
            payload: res.data,
        });
        })
        .catch((err) =>
        dispatch({
            type: LOAD_DEMAND_FAIL,
            payload: err.response.data.errors,
        })
        );
};

export const getAllDemand = () => (dispatch) => {
    dispatch({type:DEMAND_LIST_LOAD});
    axios
        .get("/demand/all/demands")
        .then((res) =>
        dispatch({
            type: DEMAND_LIST_SUCCESS,
            payload: res.data,
        })
        )
        .catch((err) =>
            dispatch({
                type: DEMAND_LIST_FAIL,
                payload: err.response.data.errors,
        })
    );
};

export const deleteDemand = (id) => (dispatch) => {
    axios
        .delete("/demand/" + id)
        .then((res) => {
        dispatch({
            type: DELETE_DEMAND_SUCCESS,
            payload: res.data,
        });
        })
        .catch((err) =>
        dispatch({
            type: DELETE_DEMAND_FAIL,
            payload: err.response.data.errors,
        })
        );
};