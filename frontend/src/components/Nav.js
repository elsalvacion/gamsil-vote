import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../actions/userAction";
import { FaVoteYea } from "react-icons/fa";
const Nav = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  return (
    <div className="bg-gradient-to-r  from-red-900 text-center py-4 px-2 flex justify-between">
      <Link
        to="/home"
        className="flex items-center text-white hover:text-gray-300"
      >
        <FaVoteYea fontSize={24} className="" />{" "}
        <span className="ml-2  text-xl font-bold">GAMSIL VOTE</span>
      </Link>
      {userInfo && (
        <div>
          {Number(userInfo.isAdmin) ? (
            <Link
              to="/adminpanel"
              className="px-3 py-2 border-2 border-gray-800 rounded-sm mx-1 hover:bg-gray-900 hover:text-gray-50 hover:border-gray-50"
            >
              ADMIN PANEL
            </Link>
          ) : null}
          <Link
            to="#!"
            className="px-3 py-2 border-2 border-gray-800 rounded-sm mx-1 hover:bg-gray-900 hover:text-gray-50 hover:border-gray-50"
            onClick={() => dispatch(logoutUser())}
          >
            LOGOUT
          </Link>
        </div>
      )}
    </div>
  );
};

export default Nav;
