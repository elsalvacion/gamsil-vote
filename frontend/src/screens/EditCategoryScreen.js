import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Errors from "../components/Errors";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { useHistory, useParams } from "react-router-dom";
import { fetchSingleCategory, updateCategory } from "../actions/categoryAction";
import Loading from "../components/Loading";
const EditCategoryScreen = () => {
  const dispatch = useDispatch();

  const { loading, errors, success } = useSelector(
    (state) => state.editCategory
  );
  const { errors: fetchUserErrors, category } = useSelector(
    (state) => state.fetchSingleCategory
  );
  const { userInfo } = useSelector((state) => state.userLogin);

  const history = useHistory();
  const { id } = useParams();
  useEffect(() => {
    if (!userInfo || !Number(userInfo.isAdmin)) history.push("/");
    else {
      if (success) history.push("/category");
      if (category) {
        setValues(category);
      } else {
        dispatch(fetchSingleCategory(id));
      }
    }
  }, [success, history, dispatch, id, category, userInfo]);
  const [values, setValues] = useState({
    title: "",
  });

  const [formErrors, setFormErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.title !== "") {
      dispatch(updateCategory(id, values));
    } else {
      setFormErrors([
        {
          msg: "Title is required",
        },
      ]);
    }
  };

  return (
    <div className="h-full w-full  flex justify-center ">
      <Card>
        <h2 className="mb-5 font-bold uppercase text-center text-xl">
          EDIT CATEGORY
        </h2>

        {formErrors.length > 0 && <Errors errors={formErrors} />}
        {errors && <Errors errors={errors} />}
        {fetchUserErrors && <Errors errors={fetchUserErrors} />}
        {loading && <Loading text="Updating category " />}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="block">
            Edit title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Title"
            className="border-2 block w-full py-2 rounded px-2 mb-5"
            value={values.title}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
            required
          />

          <button
            type="submit"
            className="bg-white border-2 px-3 py-1 text-black rounded flex items-center text-center"
          >
            <span className="mr-3">SUBMIT</span>
            {loading && <Spinner />}
          </button>
        </form>
      </Card>
    </div>
  );
};

export default EditCategoryScreen;
