import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import {
  createCategoryReducer,
  deleteCategoryReducer,
  editCategoryReducer,
  fetchCategoryReducer,
  fetchSingleCategoryReducer,
} from "./reducers/categoryReducer";
import {
  deleteUserReducer,
  editUserReducer,
  fetchSingleUserReducer,
  fetchUserReducer,
  registerUserReducer,
  userLoginReducer,
} from "./reducers/userReducer";

const initialState = {
  userLogin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

const reducers = combineReducers({
  userLogin: userLoginReducer,
  fetchUser: fetchUserReducer,
  registerUser: registerUserReducer,
  deleteUser: deleteUserReducer,
  editUser: editUserReducer,
  fetchSingleUser: fetchSingleUserReducer,
  fetchCategory: fetchCategoryReducer,
  createCategory: createCategoryReducer,
  deleteCategory: deleteCategoryReducer,
  editCategory: editCategoryReducer,
  fetchSingleCategory: fetchSingleCategoryReducer,
});

const store = createStore(reducers, initialState, applyMiddleware(thunk));

export default store;
