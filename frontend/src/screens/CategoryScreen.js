import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Card from "../components/Card";
import { FaPlus, FaRegTrashAlt, FaEdit } from "react-icons/fa";
import Errors from "../components/Errors";
import { deleteCategory, fetchCategory } from "../actions/categoryAction";
import {
  DELETE_CATEGORY_RESET,
  FETCH_SINGLE_CATEGORY_RESET,
  UPDATE_CATEGORY_RESET,
} from "../reducers/types/categoryTypes";
const CategoryScreen = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, categories, errors } = useSelector(
    (state) => state.fetchCategory
  );
  const { success: editSuccess } = useSelector((state) => state.editCategory);

  const {
    loading: deleteLoading,
    success: deleteSuccess,
    errors: deleteErrors,
  } = useSelector((state) => state.deleteCategory);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (!userInfo || !Number(userInfo.isAdmin)) history.push("/");
    else {
      if (deleteSuccess)
        dispatch({
          type: DELETE_CATEGORY_RESET,
        });

      dispatch({
        type: UPDATE_CATEGORY_RESET,
      });
      dispatch({
        type: FETCH_SINGLE_CATEGORY_RESET,
      });
      dispatch(fetchCategory());
    }
  }, [userInfo, history, dispatch, deleteSuccess, editSuccess]);

  const handleUserDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteCategory(id));
    }
  };
  return (
    <div className="h-full w-full  flex justify-center">
      <Card>
        {/* header */}
        <div className="py-3 flex justify-between">
          <h2>Categories</h2>
          <button
            onClick={() => history.push("/create-category")}
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
            {categories && categories.length > 0 ? (
              <>
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex justify-between flex-wrap mb-3"
                  >
                    <p className="mb-1">{category.title}</p>
                    <div>
                      <button
                        className="mx-2"
                        onClick={() =>
                          history.push(`/edit-category/${category.id}`)
                        }
                      >
                        <FaEdit fontSize={20} />
                      </button>

                      <button
                        className="text-red-500 mx-2"
                        onClick={() => handleUserDelete(category.id)}
                      >
                        <FaRegTrashAlt fontSize={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <h2>No category found</h2>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default CategoryScreen;
