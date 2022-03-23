import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Card from "../components/Card";
import { FaPlus, FaRegTrashAlt, FaUserEdit } from "react-icons/fa";
import Errors from "../components/Errors";
import { deleteUser, fetchUsers } from "../actions/userAction";
import {
  DELETE_USER_RESET,
  FETCH_SINGLE_USER_RESET,
  UPDATE_USER_RESET,
} from "../reducers/types/userTypes";
const UserScreen = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, users, errors } = useSelector((state) => state.fetchUser);
  const { success: editSuccess } = useSelector((state) => state.editUser);

  const {
    loading: deleteLoading,
    success: deleteSuccess,
    errors: deleteErrors,
  } = useSelector((state) => state.deleteUser);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (!userInfo || !Number(userInfo.isAdmin)) history.push("/");
    else {
      if (deleteSuccess)
        dispatch({
          type: DELETE_USER_RESET,
        });

      dispatch({
        type: UPDATE_USER_RESET,
      });
      dispatch({
        type: FETCH_SINGLE_USER_RESET,
      });
      dispatch(fetchUsers());
    }
  }, [userInfo, history, dispatch, deleteSuccess, editSuccess]);

  const handleUserDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUser(id));
    }
  };
  return (
    <div className="h-screen flex justify-center">
      <Card>
        {/* header */}
        <div className="py-3 flex justify-between">
          <h2>Voters</h2>
          <button
            onClick={() => history.push("/create-user")}
            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
          >
            <FaPlus fontSize={20} />
          </button>
        </div>

        {loading || deleteLoading ? (
          <h2 className="my-2">{loading ? "Loading ..." : "Deleting ..."}</h2>
        ) : errors || deleteErrors ? (
          <Errors errors={errors || deleteErrors} />
        ) : (
          <div className="mt-4">
            {users && users.length > 0 ? (
              <>
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="flex justify-between flex-wrap mb-3"
                  >
                    <p className="mb-1">{user.email}</p>
                    <div>
                      <button
                        className="mx-2"
                        onClick={() => history.push(`/edit-user/${user.id}`)}
                      >
                        <FaUserEdit fontSize={20} />
                      </button>

                      <button
                        className="text-red-500 mx-2"
                        onClick={() => handleUserDelete(user.id)}
                      >
                        <FaRegTrashAlt fontSize={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <h2>No registered voters</h2>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default UserScreen;
