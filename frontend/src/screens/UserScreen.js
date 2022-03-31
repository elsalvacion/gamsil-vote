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
import Loading from "../components/Loading";
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
          loading ? (
            <Loading text="Fetch users ..." />
          ) : (
            <Loading text="Deleting ..." />
          )
        ) : errors || deleteErrors ? (
          <Errors errors={errors || deleteErrors} />
        ) : (
          <div className="mt-4">
            <table className="table-auto w-full border-collapse border border-gray-400">
              <thead>
                <tr className="mb-3">
                  <th className="text-left border-collapse border border-gray-400 p-2">
                    Email
                  </th>

                  <th className="text-left border-collapse border border-gray-400"></th>
                </tr>
              </thead>
              <tbody>
                {users && users.length > 0 ? (
                  <>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="my-3 border-collapse border border-gray-400 p-2">
                          {user.email}
                        </td>

                        <td className="flex p-2 items-center my-3">
                          <button
                            className="mx-2"
                            onClick={() =>
                              history.push(`/edit-user/${user.id}`)
                            }
                          >
                            <FaUserEdit fontSize={20} />
                          </button>

                          <button
                            className="text-red-500 mx-2"
                            onClick={() => handleUserDelete(user.id)}
                          >
                            <FaRegTrashAlt fontSize={20} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <tr>
                    <h2>No user found</h2>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default UserScreen;
