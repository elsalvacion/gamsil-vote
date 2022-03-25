import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import {
  createCandidateReducer,
  deleteCandidateReducer,
  editCandidateReducer,
  fetchCandidateReducer,
  fetchSingleCandidateReducer,
  uploadImageReducer,
} from "./reducers/candidateReducer";
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
  verifyUserReducer,
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
  verifyUser: verifyUserReducer,
  fetchCategory: fetchCategoryReducer,
  createCategory: createCategoryReducer,
  deleteCategory: deleteCategoryReducer,
  editCategory: editCategoryReducer,
  fetchSingleCategory: fetchSingleCategoryReducer,
  fetchCandidate: fetchCandidateReducer,
  createCandidate: createCandidateReducer,
  deleteCandidate: deleteCandidateReducer,
  editCandidate: editCandidateReducer,
  fetchSingleCandidate: fetchSingleCandidateReducer,
  uploadImage: uploadImageReducer,
});

const store = createStore(reducers, initialState, applyMiddleware(thunk));

export default store;
