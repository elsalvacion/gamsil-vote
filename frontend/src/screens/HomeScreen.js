import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchCategory } from "../actions/categoryAction";
import VoteCategory from "../components/VoteCategory";

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const history = useHistory();
  const {
    loading: categoryLoading,
    categories,
    errors: categoryErrors,
  } = useSelector((state) => state.fetchCategory);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userInfo) history.push("/");
    else {
      if (!Number(userInfo.isVerified)) history.push("/not-verified");
    }
    if (!categories) {
      dispatch(fetchCategory());
    }
  }, [userInfo, history]);
  return (
    <div className="h-screen">
      {categoryLoading ? (
        <h2>Loading ...</h2>
      ) : (
        categories &&
        categories.map((category) => (
          <VoteCategory key={category.id} category={category.title} />
        ))
      )}
    </div>
  );
};

export default HomeScreen;
