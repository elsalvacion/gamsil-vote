import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Errors from "../components/Errors";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { useHistory } from "react-router-dom";

import { createCandidate, uploadImage } from "../actions/candidateAction";
import { fetchCategory } from "../actions/categoryAction";

const CreateCandidateScreen = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    loading: uploading,
    errors: uploadingErrors,
    image: imageUploaded,
  } = useSelector((state) => state.uploadImage);
  const { loading, errors, success } = useSelector(
    (state) => state.createCandidate
  );
  const {
    loading: categoryLoading,
    categories,
    errors: categoryErrors,
  } = useSelector((state) => state.fetchCategory);
  const history = useHistory();
  useEffect(() => {
    if (!userInfo || !Number(userInfo.isAdmin)) history.push("/");
    if (success) history.push("/candidate");

    if (!categories) {
      dispatch(fetchCategory());
    }
  }, [success, history, dispatch, userInfo, categories]);
  const [values, setValues] = useState({
    name: "",
    image: "",
    category: "",
  });
  const [formErrors, setFormErrors] = useState([]);
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!imageUploaded) {
      setFormErrors([
        {
          msg: "Upload an image",
        },
      ]);
    } else if (values.category === "") {
      setFormErrors([
        {
          msg: "Category is required",
        },
      ]);
    } else if (values.name === "") {
      setFormErrors([
        {
          msg: "Name is required",
        },
      ]);
    } else {
      setValues({
        ...values,
        image: imageUploaded,
      });
      dispatch(
        createCandidate({
          ...values,
          image: imageUploaded,
        })
      );
    }
  };

  const handleUpload = () => {
    dispatch(uploadImage(values.image));
  };
  return (
    <div className="h-full w-full flex justify-center">
      <Card>
        <h2 className="mb-5 font-bold uppercase text-center text-xl">
          ADD CANDIDATE
        </h2>

        {formErrors.length > 0 && <Errors errors={formErrors} />}
        {errors && <Errors errors={errors} />}
        {uploadingErrors && <Errors errors={uploadingErrors} />}
        {uploading && <h2 className="my-2 font-semibold">Uploading ...</h2>}
        {!imageUploaded ? (
          <>
            <input
              type="file"
              name="file"
              accept="image/*"
              className="border-2 block w-full py-2 rounded px-2 mb-2"
              disabled={uploading || imageUploaded}
              onChange={(e) =>
                setValues({ ...values, image: e.target.files[0] })
              }
            />
            <button
              className="bg-blue-500 text-white rounded py-1 px-2 hover:bg-blue-700 mb-5"
              onClick={handleUpload}
            >
              Upload
            </button>
          </>
        ) : (
          <>
            <label htmlFor="name" className="block">
              Image
            </label>
            <input
              className="border-2 block w-full py-2 rounded px-2 mb-5"
              type="text"
              value={imageUploaded}
              disabled
            />
          </>
        )}
        <form onSubmit={handleSubmit}>
          <label htmlFor="name" className="block">
            Enter name
          </label>
          <input
            type="name"
            id="name"
            name="name"
            placeholder="Name"
            className="border-2 block w-full py-2 rounded px-2 mb-5"
            value={values.name}
            onChange={handleChange}
            required
            disabled={uploading || !imageUploaded}
          />
          <label htmlFor="category" className="block">
            Category
          </label>
          <select
            name="category"
            id="category"
            onChange={handleChange}
            className="border-2 block w-full py-2 rounded px-2 mb-5 bg-transparent"
            disabled={uploading || !imageUploaded}
            value={values.category}
          >
            <>
              <option value="" className="w-full my-2">
                Choose a category
              </option>
              {categoryLoading ? (
                <p>Loading ...</p>
              ) : categoryErrors ? (
                <Errors errors={categoryErrors} />
              ) : (
                categories &&
                categories.map((category) => (
                  <option
                    className="w-full my-2"
                    value={category.title}
                    key={category.id}
                  >
                    {category.title}
                  </option>
                ))
              )}
            </>
          </select>
          <button
            type="submit"
            className="bg-white border-2 px-3 py-1 text-black rounded flex items-center text-center"
            disabled={loading || uploading || !imageUploaded}
          >
            <span className="mr-3">SUBMIT</span>
            {loading && <Spinner />}
          </button>
        </form>
      </Card>
    </div>
  );
};

export default CreateCandidateScreen;
