import axios from "axios";

import {
  CREATE_CATEGORY_ERROR,
  CREATE_CATEGORY_LOADING,
  CREATE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_ERROR,
  DELETE_CATEGORY_LOADING,
  DELETE_CATEGORY_SUCCESS,
  FETCH_CATEGORY_ERROR,
  FETCH_CATEGORY_LOADING,
  FETCH_CATEGORY_SUCCESS,
  FETCH_SINGLE_CATEGORY_ERROR,
  FETCH_SINGLE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_ERROR,
  UPDATE_CATEGORY_LOADING,
  UPDATE_CATEGORY_SUCCESS,
} from "../reducers/types/categoryTypes";
import { FETCH_SINGLE_USER_LOADING } from "../reducers/types/userTypes";
import { logoutUser } from "./userAction";

export const fetchCategory = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: FETCH_CATEGORY_LOADING,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/category", config);
    console.log(data);
    dispatch({
      type: FETCH_CATEGORY_SUCCESS,
      payload: data.msg,
    });
  } catch (err) {
    console.log(err.response);
    err.response.forEach((error) => {
      if (
        error.msg === "Not Authorized: No Token" ||
        error.msg === "Not Authorized: Invalid User" ||
        error.msg === "Not authorized as an admin"
      ) {
        dispatch(logoutUser());
      }
    });
    dispatch({
      type: FETCH_CATEGORY_ERROR,
      payload: err.response.data.errors,
    });
  }
};

export const fetchSingleCategory = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FETCH_SINGLE_USER_LOADING,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/category/${id}`, config);
    console.log(data);
    dispatch({
      type: FETCH_SINGLE_CATEGORY_SUCCESS,
      payload: data.msg,
    });
  } catch (err) {
    console.log(err.response);
    err.response.forEach((error) => {
      if (
        error.msg === "Not Authorized: No Token" ||
        error.msg === "Not Authorized: Invalid User" ||
        error.msg === "Not authorized as an admin"
      ) {
        dispatch(logoutUser());
      }
    });
    dispatch({
      type: FETCH_SINGLE_CATEGORY_ERROR,
      payload: err.response.data.errors,
    });
  }
};

export const createCategory = (title) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_CATEGORY_LOADING,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      "/category",
      {
        title,
      },
      config
    );

    if (data) {
      dispatch({
        type: CREATE_CATEGORY_SUCCESS,
      });
    }
  } catch (err) {
    console.log(err.response);
    err.response.forEach((error) => {
      if (
        error.msg === "Not Authorized: No Token" ||
        error.msg === "Not Authorized: Invalid User" ||
        error.msg === "Not authorized as an admin"
      ) {
        dispatch(logoutUser());
      }
    });
    dispatch({
      type: CREATE_CATEGORY_ERROR,
      payload: err.response.data.errors,
    });
  }
};

export const deleteCategory = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_CATEGORY_LOADING,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/category/${id}`, config);

    if (data) {
      dispatch({
        type: DELETE_CATEGORY_SUCCESS,
      });
    }
  } catch (err) {
    console.log(err.response);
    err.response.forEach((error) => {
      if (
        error.msg === "Not Authorized: No Token" ||
        error.msg === "Not Authorized: Invalid User" ||
        error.msg === "Not authorized as an admin"
      ) {
        dispatch(logoutUser());
      }
    });
    dispatch({
      type: DELETE_CATEGORY_ERROR,
      payload: err.response.data.errors,
    });
  }
};

export const updateCategory = (id, details) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_CATEGORY_LOADING,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/category/${id}`,
      {
        ...details,
      },
      config
    );

    if (data) {
      dispatch({
        type: UPDATE_CATEGORY_SUCCESS,
      });
    }
  } catch (err) {
    console.log(err.response);
    err.response.forEach((error) => {
      if (
        error.msg === "Not Authorized: No Token" ||
        error.msg === "Not Authorized: Invalid User" ||
        error.msg === "Not authorized as an admin"
      ) {
        dispatch(logoutUser());
      }
    });
    dispatch({
      type: UPDATE_CATEGORY_ERROR,
      payload: err.response.data.errors,
    });
  }
};
