import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../actions/userAction";
import { FaVoteYea } from "react-icons/fa";
const Nav = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  return (
    <div
      className={`bg-red-700 text-center py-4 px-2 flex items-center ${
        userInfo && Number(userInfo.isAdmin)
          ? "flex-col justify-center"
          : "flex-row justify-between"
      }  md:flex-row md:justify-between`}
    >
      <Link
        to="/home"
        className={`flex items-center text-white hover:text-gray-300 ${
          userInfo ? "mb-5" : "mb-0"
        } md:mb-0`}
      >
        <FaVoteYea fontSize={24} />{" "}
        <span className="ml-2  text-xl font-bold">GAMSIL VOTE</span>
      </Link>
      {userInfo && (
        <div>
          {Number(userInfo.isAdmin) ? (
            <Link
              to="/adminpanel"
              className="p-3 text-blue-900 rounded mx-1 hover:bg-blue-900 hover:text-gray-50  bg-white"
            >
              ADMIN PANEL
            </Link>
          ) : null}
          <Link
            to="#!"
            className="p-3 text-blue-900 rounded mx-1 hover:bg-blue-900 hover:text-gray-50  bg-white"
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
