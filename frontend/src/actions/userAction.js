import axios from "axios";
import {
  DELETE_USER_ERROR,
  DELETE_USER_LOADING,
  DELETE_USER_SUCCESS,
  FETCH_SINGLE_USER_ERROR,
  FETCH_SINGLE_USER_LOADING,
  FETCH_SINGLE_USER_SUCCESS,
  FETCH_USERS_ERROR,
  FETCH_USERS_LOADING,
  FETCH_USERS_SUCCESS,
  REGISTER_USER_ERROR,
  REGISTER_USER_LOADING,
  REGISTER_USER_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_USER_LOADING,
  UPDATE_USER_SUCCESS,
  USER_LOGIN_ERROR,
  USER_LOGIN_LOADING,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../reducers/types/userTypes";
export const loginUser = (email) => async (dispatch) => {
  console.log(email);
  try {
    dispatch({
      type: USER_LOGIN_LOADING,
    });

    const { data } = await axios.post(
      "/user/login",
      {
        email,
      },
      {
        "Content-Type": "application/json",
      }
    );
    console.log(data);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data.msg,
    });

    localStorage.setItem("userInfo", JSON.stringify(data.msg));
  } catch (err) {
    console.log(err.response);
    dispatch({
      type: USER_LOGIN_ERROR,
      payload: err.response.data.errors,
    });
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch({
    type: USER_LOGOUT,
  });
  localStorage.removeItem("userInfo");
};

export const fetchUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: FETCH_USERS_LOADING,
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

    const { data } = await axios.get("/user", config);
    console.log(data);
    dispatch({
      type: FETCH_USERS_SUCCESS,
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
      type: FETCH_USERS_ERROR,
      payload: err.response.data.errors,
    });
  }
};

export const fetchSingleUser = (id) => async (dispatch, getState) => {
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

    const { data } = await axios.get(`/user/${id}`, config);
    console.log(data);
    dispatch({
      type: FETCH_SINGLE_USER_SUCCESS,
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
      type: FETCH_SINGLE_USER_ERROR,
      payload: err.response.data.errors,
    });
  }
};

export const registerUser = (email) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REGISTER_USER_LOADING,
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
      "/user/register",
      {
        email,
      },
      config
    );

    if (data) {
      dispatch({
        type: REGISTER_USER_SUCCESS,
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
      type: REGISTER_USER_ERROR,
      payload: err.response.data.errors,
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_USER_LOADING,
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

    const { data } = await axios.delete(`/user/${id}`, config);

    if (data) {
      dispatch({
        type: DELETE_USER_SUCCESS,
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
      type: DELETE_USER_ERROR,
      payload: err.response.data.errors,
    });
  }
};

export const updateUser = (id, details) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_USER_LOADING,
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
      `/user/${id}`,
      {
        ...details,
      },
      config
    );

    if (data) {
      dispatch({
        type: UPDATE_USER_SUCCESS,
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
      type: UPDATE_USER_ERROR,
      payload: err.response.data.errors,
    });
  }
};
