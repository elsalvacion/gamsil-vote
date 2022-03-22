import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../actions/userAction";
import { FaVoteYea } from "react-icons/fa";
const Nav = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  return (
    <div className="bg-gradient-to-r  from-red-400 text-center py-5 px-2 flex justify-between px-2 ">
      <Link to="/home" className="flex items-center">
        <FaVoteYea fontSize={24} /> <span className="ml-2">GAMSIL VOTE</span>
      </Link>
      {userInfo && (
        <div>
          {Boolean(userInfo.isAdmin) && (
            <Link to="/adminpanel" className="px-3 py-1">
              ADMIN PANEL
            </Link>
          )}
          <Link
            to="#!"
            className="px-3 py-1"
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
