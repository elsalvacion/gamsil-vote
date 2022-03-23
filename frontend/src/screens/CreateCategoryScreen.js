import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Errors from "../components/Errors";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { useHistory } from "react-router-dom";
import { CREATE_CATEGORY_RESET } from "../reducers/types/categoryTypes";
import { createCategory } from "../actions/categoryAction";
const CreateCategoryScreen = () => {
  const dispatch = useDispatch();
  const { loading, errors, success } = useSelector(
    (state) => state.createCategory
  );
  const history = useHistory();
  useEffect(() => {
    if (success) history.push("/category");

    dispatch({
      type: CREATE_CATEGORY_RESET,
    });
  }, [success, history, dispatch]);
  const [title, setTitle] = useState("");

  const [formErrors, setFormErrors] = useState([]);
  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title !== "") {
      dispatch(createCategory(title));
    } else {
      setFormErrors([
        {
          msg: "Title is required",
        },
      ]);
    }
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <h2 className="mb-5 font-bold uppercase text-center text-xl">
          ADD CATEGORY
        </h2>

        {formErrors.length > 0 && <Errors errors={formErrors} />}
        {errors && <Errors errors={errors} />}
        <form onSubmit={handleSubmit}>
          <label htmlFor="title" className="block">
            Enter title
          </label>
          <input
            type="title"
            id="title"
            name="title"
            placeholder="Title"
            className="border-2 block w-full py-2 rounded px-2 mb-5"
            value={title}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="bg-white border-2 block px-3 py-1 text-black rounded flex items-center text-center"
            disabled={loading}
          >
            <span className="mr-3">SUBMIT</span>
            {loading && <Spinner />}
          </button>
        </form>
      </Card>
    </div>
  );
};

export default CreateCategoryScreen;
