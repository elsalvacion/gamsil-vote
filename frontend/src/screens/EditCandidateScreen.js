import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Errors from "../components/Errors";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { useHistory, useParams } from "react-router-dom";
import { fetchCategory } from "../actions/categoryAction";
import {
  fetchSingleCandidate,
  updateCandidate,
  uploadImage,
} from "../actions/candidateAction";
import { FaTimes } from "react-icons/fa";
import { RiImageEditFill } from "react-icons/ri";
import Loading from "../components/Loading";
const EditCandidateScreen = () => {
  const dispatch = useDispatch();

  const { loading, errors, success } = useSelector(
    (state) => state.editCandidate
  );
  const { errors: fetchCandidateErrors, candidate } = useSelector(
    (state) => state.fetchSingleCandidate
  );
  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    loading: uploading,
    errors: uploadingErrors,
    image: imageUploaded,
  } = useSelector((state) => state.uploadImage);
  const {
    loading: categoryLoading,
    categories,
    errors: categoryErrors,
  } = useSelector((state) => state.fetchCategory);
  const history = useHistory();
  const { id } = useParams();
  useEffect(() => {
    if (!userInfo || !Number(userInfo.isAdmin)) history.push("/");
    else {
      if (!categories) {
        dispatch(fetchCategory());
      }
      if (!candidate) {
        dispatch(fetchSingleCandidate(id));
      } else {
        setValues(candidate);
      }

      if (imageUploaded) setOpenUpload(false);
      if (success) history.push("/candidate");
    }
  }, [
    history,
    dispatch,
    id,
    userInfo,
    candidate,
    categories,
    imageUploaded,
    success,
  ]);
  const [values, setValues] = useState({
    name: "",
    image: "",
    category: "",
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const [formErrors, setFormErrors] = useState([]);
  const [openUpload, setOpenUpload] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (values.image === "") {
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
      dispatch(updateCandidate(id, values));
    }
  };

  const handleUpload = () => {
    dispatch(uploadImage(values.image));
  };

  return (
    <div className="h-full w-full flex justify-center pb-20">
      <Card>
        <h2 className="mb-5 font-bold uppercase text-center text-xl">
          EDIT CANDIDATE
        </h2>

        {formErrors.length > 0 && <Errors errors={formErrors} />}
        {errors && <Errors errors={errors} />}
        {uploadingErrors && <Errors errors={uploadingErrors} />}
        {fetchCandidateErrors && <Errors errors={fetchCandidateErrors} />}
        {uploading && <Loading text="Uploading ..." />}

        <div className="flex flex-col justify-between">
          <label htmlFor="name" className="block">
            Image
          </label>
          {openUpload && (
            <input
              type="file"
              name="file"
              accept="image/*"
              className="border-2 block w-full py-2 rounded px-2 mb-2"
              disabled={uploading}
              onChange={(e) =>
                setValues({ ...values, image: e.target.files[0] })
              }
            />
          )}
          {!openUpload && (
            <img
              src={`/${values.image}`}
              alt={values.name}
              className="w-full h-72 object-cover mb-3"
            />
          )}
          <div className="flex items-center">
            {openUpload && (
              <button
                className="bg-blue-500 text-white rounded py-1 px-1 mb-5 border-2 mr-2 hover:bg-blue-700"
                onClick={handleUpload}
              >
                Upload
              </button>
            )}
            <button
              className="py-1 rounded px-1 mb-5 border-2 mr-2"
              onClick={() => setOpenUpload(!openUpload)}
            >
              {openUpload ? (
                <FaTimes fontSize={24} />
              ) : (
                <RiImageEditFill fontSize={24} />
              )}
            </button>
          </div>
        </div>

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
            disabled={uploading}
          />
          <label htmlFor="category" className="block">
            Category
          </label>
          <select
            name="category"
            id="category"
            onChange={handleChange}
            className="border-2 block w-full py-2 rounded px-2 mb-5 bg-transparent"
            disabled={uploading}
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
            disabled={loading || uploading}
          >
            <span className="mr-3">UPDATE</span>
            {loading && <Spinner />}
          </button>
        </form>
      </Card>
    </div>
  );
};

export default EditCandidateScreen;
