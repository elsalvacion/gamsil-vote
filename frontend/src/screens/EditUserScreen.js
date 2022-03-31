import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Errors from "../components/Errors";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleUser, updateUser } from "../actions/userAction";
import Spinner from "../components/Spinner";
import { useHistory, useParams } from "react-router-dom";
import Loading from "../components/Loading";
const EditUserScreen = () => {
  const dispatch = useDispatch();

  const { loading, errors, success } = useSelector((state) => state.editUser);
  const { errors: fetchUserErrors, user } = useSelector(
    (state) => state.fetchSingleUser
  );
  const { userInfo } = useSelector((state) => state.userLogin);

  const history = useHistory();
  const { id } = useParams();
  useEffect(() => {
    if (!userInfo) history.push("/");
    else {
      if (success) history.push("/user");
      if (user) {
        setValues({
          ...user,
          isAdmin: Boolean(user.isAdmin),
        });
      } else {
        dispatch(fetchSingleUser(id));
      }
    }
  }, [success, history, dispatch, id, user, userInfo]);
  const [values, setValues] = useState({
    email: "",
    isAdmin: false,
  });

  const [formErrors, setFormErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors([]);
    if (values.email !== "") {
      const splitEmail = values.email.split("@");
      if (splitEmail[1] !== "iut-dhaka.edu")
        setFormErrors([
          {
            msg: "You must use an IUT email",
          },
        ]);
      else dispatch(updateUser(id, values));
    }
  };
  return (
    <div className="h-screen flex justify-center">
      <Card>
        <h2 className="mb-5 font-bold uppercase text-center text-xl">
          EDIT USER
        </h2>

        {formErrors.length > 0 && <Errors errors={formErrors} />}
        {errors && <Errors errors={errors} />}
        {fetchUserErrors && <Errors errors={fetchUserErrors} />}
        {loading && <Loading text="Updating user" />}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="block">
            Edit email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="border-2 block w-full py-2 rounded px-2 mb-5"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            required
          />

          <input
            type="checkbox"
            id="isAdmin"
            className="border-2 p-3 rounded mb-5 mr-3"
            value={values.isAdmin}
            onChange={(e) =>
              setValues({ ...values, isAdmin: e.target.checked })
            }
            checked={values.isAdmin}
          />
          <label htmlFor="isAdmin" className="">
            Make admin
          </label>

          <button
            type="submit"
            className="bg-white border-2 block px-3 py-1 text-black rounded flex items-center text-center"
          >
            <span className="mr-3">SUBMIT</span>
            {loading && <Spinner />}
          </button>
        </form>
      </Card>
    </div>
  );
};

export default EditUserScreen;
