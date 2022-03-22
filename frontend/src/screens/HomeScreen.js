import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const history = useHistory();
  useEffect(() => {
    if (!userInfo) history.push("/");
  }, [userInfo, history]);
  return <div className="px-2">HomeScreen</div>;
};

export default HomeScreen;
