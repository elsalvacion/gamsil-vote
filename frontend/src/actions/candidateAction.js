import axios from "axios";
import {
  CREATE_CANDIDATE_ERROR,
  CREATE_CANDIDATE_LOADING,
  CREATE_CANDIDATE_SUCCESS,
  DELETE_CANDIDATE_ERROR,
  DELETE_CANDIDATE_LOADING,
  DELETE_CANDIDATE_SUCCESS,
  FETCH_CANDIDATE_ERROR,
  FETCH_CANDIDATE_LOADING,
  FETCH_CANDIDATE_SUCCESS,
  FETCH_SINGLE_CANDIDATE_ERROR,
  FETCH_SINGLE_CANDIDATE_LOADING,
  FETCH_SINGLE_CANDIDATE_SUCCESS,
  UPDATE_CANDIDATE_ERROR,
  UPDATE_CANDIDATE_LOADING,
  UPDATE_CANDIDATE_SUCCESS,
  UPLOAD_IMAGE_ERROR,
  UPLOAD_IMAGE_LOADING,
  UPLOAD_IMAGE_SUCCESS,
} from "../reducers/types/candidateTypes";
import { logoutUser } from "./userAction";

export const fetchCandidate = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: FETCH_CANDIDATE_LOADING,
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

    const { data } = await axios.get("/candidate", config);
    dispatch({
      type: FETCH_CANDIDATE_SUCCESS,
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
      type: FETCH_CANDIDATE_ERROR,
      payload: err.response.data.errors,
    });
  }
};

export const fetchSingleCandidate = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FETCH_SINGLE_CANDIDATE_LOADING,
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

    const { data } = await axios.get(`/candidate/${id}`, config);
    console.log(data);
    dispatch({
      type: FETCH_SINGLE_CANDIDATE_SUCCESS,
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
      type: FETCH_SINGLE_CANDIDATE_ERROR,
      payload: err.response.data.errors,
    });
  }
};

export const createCandidate = (details) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_CANDIDATE_LOADING,
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
      "/candidate",
      {
        ...details,
      },
      config
    );

    if (data) {
      dispatch({
        type: CREATE_CANDIDATE_SUCCESS,
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
      type: CREATE_CANDIDATE_ERROR,
      payload: err.response.data.errors,
    });
  }
};

export const deleteCandidate = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_CANDIDATE_LOADING,
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

    const { data } = await axios.delete(`/candidate/${id}`, config);

    if (data) {
      dispatch({
        type: DELETE_CANDIDATE_SUCCESS,
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
      type: DELETE_CANDIDATE_ERROR,
      payload: err.response.data.errors,
    });
  }
};

export const updateCandidate = (id, details) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_CANDIDATE_LOADING,
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
      `/candidate/${id}`,
      {
        ...details,
      },
      config
    );

    if (data) {
      dispatch({
        type: UPDATE_CANDIDATE_SUCCESS,
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
      type: UPDATE_CANDIDATE_ERROR,
      payload: err.response.data.errors,
    });
  }
};

export const uploadImage = (file) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPLOAD_IMAGE_LOADING,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const formData = new FormData();
    formData.append("file", file);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/upload", formData, config);

    dispatch({
      type: UPLOAD_IMAGE_SUCCESS,
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
      type: UPLOAD_IMAGE_ERROR,
      payload: err.response.data.errors,
    });
  }
};
